import * as THREE from 'three';
import { GLTFLoader } from 'three-stdlib';
import type { GarmentType, SurfaceDesign, JerseyPanel } from '@/types/designer.types';
import type { ExportUVOptions } from '../types/export.types';
import { sanitizeFileName, downloadDataUrl } from '../utils/download.utils';
import { TSHIRT_MODEL_PATH } from '@/features/viewer-3d/components/TShirtModel';
import { JERSEY_MODEL_PATH } from '@/features/jersey-editor/components/JerseyModel';

// Calibrated Jersey Decal coordinate specs
const JERSEY_DECAL_SPECS: Record<
  JerseyPanel,
  {
    targetMesh: string;
    position: [number, number, number];
    rotation: [number, number, number];
    scale: [number, number, number];
  }
> = {
  front: {
    targetMesh: 'Cloth_mesh_18',
    position: [0, 1.35, 0.12],
    rotation: [0, 0, 0],
    scale: [0.26, 0.32, 0.2],
  },
  back: {
    targetMesh: 'Cloth_mesh_12',
    position: [0, 1.35, -0.14],
    rotation: [0, Math.PI, 0],
    scale: [0.26, 0.32, 0.2],
  },
  left: {
    targetMesh: 'Cloth_mesh_3',
    position: [-0.22, 1.44, -0.04],
    rotation: [0, -Math.PI / 2, 0],
    scale: [0.16, 0.18, 0.16],
  },
  right: {
    targetMesh: 'Cloth_mesh',
    position: [0.22, 1.44, -0.04],
    rotation: [0, Math.PI / 2, 0],
    scale: [0.16, 0.18, 0.16],
  },
  leftShoulder: {
    targetMesh: 'Cloth_mesh_27',
    position: [-0.08, 1.58, -0.02],
    rotation: [-Math.PI / 6, -Math.PI / 4, 0],
    scale: [0.12, 0.14, 0.12],
  },
  rightShoulder: {
    targetMesh: 'Cloth_mesh_24',
    position: [0.08, 1.58, -0.02],
    rotation: [-Math.PI / 6, Math.PI / 4, 0],
    scale: [0.12, 0.14, 0.12],
  },
};

const loadTextureAsync = (url: string): Promise<THREE.Texture> => {
  return new Promise((resolve, reject) => {
    new THREE.TextureLoader().load(
      url,
      (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.anisotropy = 16;
        tex.needsUpdate = true;
        resolve(tex);
      },
      undefined,
      reject
    );
  });
};

// Custom GLSL Shader for GPU UV Texture Baking
const uvBakeVertexShader = `
  varying vec3 vWorldPosition;
  varying vec3 vWorldNormal;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPos.xyz;
    vWorldNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);

    // Map vertex directly into 2D UV canvas [-1, 1]
    // fract() ensures UVs in negative or wrapped space (like CLO3D) are properly mapped into [0, 1]
    float u = fract(uv.x);
    float v = fract(uv.y);
    gl_Position = vec4(u * 2.0 - 1.0, v * 2.0 - 1.0, 0.0, 1.0);
  }
`;

const uvBakeFragmentShader = `
  uniform vec3 uBaseColor;
  uniform sampler2D uDecalTexture;
  uniform bool uHasDecal;
  uniform mat4 uDecalInvMatrix;
  uniform vec3 uDecalForward;

  varying vec3 vWorldPosition;
  varying vec3 vWorldNormal;
  varying vec2 vUv;

  void main() {
    vec4 finalColor = vec4(uBaseColor, 1.0);

    if (uHasDecal) {
      vec4 localP = uDecalInvMatrix * vec4(vWorldPosition, 1.0);

      // Check if point falls within decal bounding box [-0.5, 0.5]
      if (abs(localP.x) <= 0.5 && abs(localP.y) <= 0.5 && abs(localP.z) <= 0.5) {
        // Avoid projection onto backfacing triangles
        if (dot(vWorldNormal, uDecalForward) > 0.05) {
          vec2 decalUv = vec2(localP.x + 0.5, 0.5 - localP.y);
          vec4 decalTexel = texture2D(uDecalTexture, decalUv);
          finalColor = mix(finalColor, vec4(decalTexel.rgb, 1.0), decalTexel.a);
        }
      }
    }

    gl_FragColor = finalColor;
  }
`;

export interface BakeUVParams {
  garmentType: GarmentType;
  options: ExportUVOptions;
  baseColor: string;
  surfaces: Record<string, SurfaceDesign>;
}

/**
 * GPU-accelerated UV Texture Baking based on actual GLB mesh UV coordinates
 */
export const bakeUVTextureToDataUrl = async (params: BakeUVParams): Promise<string> => {
  const { garmentType, options, baseColor, surfaces } = params;
  const { resolution, format } = options;

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    preserveDrawingBuffer: true,
    powerPreference: 'high-performance',
  });

  renderer.setSize(resolution, resolution);
  renderer.setPixelRatio(1);
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  // Background filled with base fabric color or clean neutral
  const baseColorObj = new THREE.Color(baseColor);
  renderer.setClearColor(baseColorObj, 1);

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 10);
  camera.position.z = 1;

  const gltfLoader = new GLTFLoader();
  const modelPath = garmentType === 'jersey' ? JERSEY_MODEL_PATH : TSHIRT_MODEL_PATH;
  const gltf = await gltfLoader.loadAsync(modelPath);

  const disposables: { dispose: () => void }[] = [];

  if (garmentType === 'tshirt') {
    const meshNode = gltf.scene.getObjectByName('T_Shirt_male') as THREE.Mesh | undefined;
    if (meshNode) {
      // First pass: Base fabric with Front Decal
      let frontTex: THREE.Texture | null = null;
      if (surfaces.front?.textureDataUrl) {
        frontTex = await loadTextureAsync(surfaces.front.textureDataUrl);
        disposables.push(frontTex);
      }

      // Front Decal matrices
      const frontPos = new THREE.Vector3(0, 0.04, 0.15);
      const frontQuat = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, 0));
      const frontScale = new THREE.Vector3(0.26, 0.32, 0.2);
      const frontMat = new THREE.Matrix4().compose(frontPos, frontQuat, frontScale);
      const frontInv = frontMat.clone().invert();
      const frontFwd = new THREE.Vector3(0, 0, 1).applyQuaternion(frontQuat).normalize();

      const frontShaderMat = new THREE.ShaderMaterial({
        vertexShader: uvBakeVertexShader,
        fragmentShader: uvBakeFragmentShader,
        uniforms: {
          uBaseColor: { value: baseColorObj },
          uDecalTexture: { value: frontTex },
          uHasDecal: { value: frontTex !== null },
          uDecalInvMatrix: { value: frontInv },
          uDecalForward: { value: frontFwd },
        },
        side: THREE.DoubleSide,
      });
      disposables.push(frontShaderMat);

      const frontBakeMesh = new THREE.Mesh(meshNode.geometry.clone(), frontShaderMat);
      disposables.push(frontBakeMesh.geometry);
      scene.add(frontBakeMesh);

      // Back Decal mesh layer if present
      if (surfaces.back?.textureDataUrl) {
        const backTex = await loadTextureAsync(surfaces.back.textureDataUrl);
        disposables.push(backTex);

        const backPos = new THREE.Vector3(0, 0.04, -0.15);
        const backQuat = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, Math.PI, 0));
        const backScale = new THREE.Vector3(0.26, 0.32, 0.2);
        const backMat = new THREE.Matrix4().compose(backPos, backQuat, backScale);
        const backInv = backMat.clone().invert();
        const backFwd = new THREE.Vector3(0, 0, 1).applyQuaternion(backQuat).normalize();

        const backShaderMat = new THREE.ShaderMaterial({
          vertexShader: uvBakeVertexShader,
          fragmentShader: uvBakeFragmentShader,
          uniforms: {
            uBaseColor: { value: baseColorObj },
            uDecalTexture: { value: backTex },
            uHasDecal: { value: true },
            uDecalInvMatrix: { value: backInv },
            uDecalForward: { value: backFwd },
          },
          transparent: true,
          side: THREE.DoubleSide,
        });
        disposables.push(backShaderMat);

        const backBakeMesh = new THREE.Mesh(meshNode.geometry.clone(), backShaderMat);
        disposables.push(backBakeMesh.geometry);
        scene.add(backBakeMesh);
      }
    }
  } else {
    // Jersey GPU UV Bake across meshes
    const jerseyGroup = gltf.scene;

    const panelKeys: JerseyPanel[] = ['front', 'back', 'left', 'right', 'leftShoulder', 'rightShoulder'];
    const activePanelsMap = new Map<string, { panelKey: JerseyPanel; dataUrl: string }>();

    for (const pk of panelKeys) {
      if (surfaces[pk]?.textureDataUrl) {
        activePanelsMap.set(JERSEY_DECAL_SPECS[pk].targetMesh, {
          panelKey: pk,
          dataUrl: surfaces[pk]!.textureDataUrl!,
        });
      }
    }

    // Traverse all meshes in jersey
    const meshesToBake: THREE.Mesh[] = [];
    jerseyGroup.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        meshesToBake.push(child as THREE.Mesh);
      }
    });

    for (const mesh of meshesToBake) {
      const activeData = activePanelsMap.get(mesh.name);
      let decalTex: THREE.Texture | null = null;
      let decalInv = new THREE.Matrix4();
      let decalFwd = new THREE.Vector3(0, 0, 1);

      if (activeData) {
        try {
          decalTex = await loadTextureAsync(activeData.dataUrl);
          disposables.push(decalTex);

          const spec = JERSEY_DECAL_SPECS[activeData.panelKey];
          const pos = new THREE.Vector3(...spec.position);
          const quat = new THREE.Quaternion().setFromEuler(new THREE.Euler(...spec.rotation));
          const scale = new THREE.Vector3(...spec.scale);

          const dMat = new THREE.Matrix4().compose(pos, quat, scale);
          decalInv = dMat.clone().invert();
          decalFwd = new THREE.Vector3(0, 0, 1).applyQuaternion(quat).normalize();
        } catch (e) {
          console.warn(`Failed loading decal for mesh ${mesh.name}:`, e);
        }
      }

      const meshBaseColor =
        mesh.name === 'Cloth_mesh_3'
          ? new THREE.Color(surfaces.left?.color || baseColor)
          : mesh.name === 'Cloth_mesh'
            ? new THREE.Color(surfaces.right?.color || baseColor)
            : baseColorObj;

      const shaderMat = new THREE.ShaderMaterial({
        vertexShader: uvBakeVertexShader,
        fragmentShader: uvBakeFragmentShader,
        uniforms: {
          uBaseColor: { value: meshBaseColor },
          uDecalTexture: { value: decalTex },
          uHasDecal: { value: decalTex !== null },
          uDecalInvMatrix: { value: decalInv },
          uDecalForward: { value: decalFwd },
        },
        side: THREE.DoubleSide,
      });
      disposables.push(shaderMat);

      const bakeMesh = new THREE.Mesh(mesh.geometry.clone(), shaderMat);
      disposables.push(bakeMesh.geometry);
      scene.add(bakeMesh);
    }
  }

  // Render UV bake
  renderer.render(scene, camera);

  const dataUrl = renderer.domElement.toDataURL(
    format === 'jpeg' ? 'image/jpeg' : 'image/png',
    0.95
  );

  // Cleanup
  disposables.forEach((d) => d.dispose());
  renderer.dispose();

  return dataUrl;
};

/**
 * Exports UV Texture Atlas directly to browser download
 */
export const exportUVTexture = async (
  garmentType: GarmentType,
  options: ExportUVOptions,
  baseColor: string,
  surfaces: Record<string, SurfaceDesign>,
  projectName: string
): Promise<string> => {
  const sanitized = sanitizeFileName(projectName);
  const ext = options.format;
  const filename = `${sanitized}-${garmentType}-uv-texture.${ext}`;

  const dataUrl = await bakeUVTextureToDataUrl({
    garmentType,
    options,
    baseColor,
    surfaces,
  });

  downloadDataUrl(dataUrl, filename);
  return filename;
};
