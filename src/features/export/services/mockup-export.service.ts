import * as THREE from 'three';
import { GLTFLoader, DecalGeometry } from 'three-stdlib';
import type { GarmentType, SurfaceDesign, JerseyPanel } from '@/types/designer.types';
import type { Export3DOptions } from '../types/export.types';
import { sanitizeFileName, downloadDataUrl } from '../utils/download.utils';
import { TSHIRT_MODEL_PATH } from '@/features/viewer-3d/components/TShirtModel';
import { JERSEY_MODEL_PATH } from '@/features/jersey-editor/components/JerseyModel';

// Decal configuration for Jersey 6 panels (matching JerseyModel.tsx)
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
    targetMesh: 'Cloth_mesh_12',
    position: [0, 1.35, -0.14],
    rotation: [0, 0, 0],
    scale: [0.26, 0.32, 0.2],
  },
  back: {
    targetMesh: 'Cloth_mesh_18',
    position: [0, 1.35, 0.12],
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

export interface Render3DMockupParams {
  garmentType: GarmentType;
  options: Export3DOptions;
  baseColor: string;
  surfaces: Record<string, SurfaceDesign>;
}

/**
 * High-resolution offscreen 3D render export using Three.js
 */
export const render3DMockupToDataUrl = async (params: Render3DMockupParams): Promise<string> => {
  const { garmentType, options, baseColor, surfaces } = params;
  const { resolution, format, cameraAngle, background } = options;

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    preserveDrawingBuffer: true,
    powerPreference: 'high-performance',
  });

  renderer.setSize(resolution, resolution);
  renderer.setPixelRatio(1);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  // Set background fill
  if (background === 'transparent' && format === 'png') {
    renderer.setClearColor(0x000000, 0);
  } else if (background === 'white') {
    renderer.setClearColor(0xffffff, 1);
  } else {
    // Elegant studio neutral dark/slate background
    renderer.setClearColor(0x0f172a, 1);
  }

  const scene = new THREE.Scene();

  // Studio Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
  scene.add(ambientLight);

  const keyLight = new THREE.DirectionalLight(0xffffff, 1.4);
  keyLight.position.set(3, 4, 3);
  keyLight.castShadow = true;
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0xffffff, 0.7);
  fillLight.position.set(-3, 2, -2);
  scene.add(fillLight);

  const rimLight = new THREE.DirectionalLight(0xffffff, 0.9);
  rimLight.position.set(0, 4, -4);
  scene.add(rimLight);

  // Camera setup
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  switch (cameraAngle) {
    case 'front':
      camera.position.set(0, 0, 2.5);
      break;
    case 'back':
      camera.position.set(0, 0, -2.5);
      break;
    case 'left':
      camera.position.set(-2.5, 0, 0);
      break;
    case 'right':
      camera.position.set(2.5, 0, 0);
      break;
    case 'isometric':
      camera.position.set(2, 1.5, 2);
      break;
  }
  camera.lookAt(0, 0, 0);

  // Load and assemble Garment Model
  const gltfLoader = new GLTFLoader();
  const modelPath = garmentType === 'jersey' ? JERSEY_MODEL_PATH : TSHIRT_MODEL_PATH;
  const gltf = await gltfLoader.loadAsync(modelPath);
  const rootGroup = new THREE.Group();

  const disposables: { dispose: () => void }[] = [];

  if (garmentType === 'tshirt') {
    const meshNode = gltf.scene.getObjectByName('T_Shirt_male') as THREE.Mesh | undefined;
    if (meshNode) {
      const shirtMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(baseColor),
        roughness: 0.65,
        metalness: 0.05,
        side: THREE.DoubleSide,
      });
      disposables.push(shirtMat);

      const tshirtMesh = new THREE.Mesh(meshNode.geometry.clone(), shirtMat);
      disposables.push(tshirtMesh.geometry);
      tshirtMesh.castShadow = true;
      tshirtMesh.receiveShadow = true;

      // Front Decal
      if (surfaces.front?.textureDataUrl) {
        try {
          const frontTex = await loadTextureAsync(surfaces.front.textureDataUrl);
          disposables.push(frontTex);
          const frontDecalGeom = new DecalGeometry(
            tshirtMesh,
            new THREE.Vector3(0, 0.04, 0.15),
            new THREE.Euler(0, 0, 0),
            new THREE.Vector3(0.26, 0.32, 0.2)
          );
          disposables.push(frontDecalGeom);
          const frontDecalMat = new THREE.MeshStandardMaterial({
            map: frontTex,
            transparent: true,
            depthTest: true,
            depthWrite: false,
            polygonOffset: true,
            polygonOffsetFactor: -4,
            roughness: 0.65,
            metalness: 0.05,
          });
          disposables.push(frontDecalMat);
          const frontDecalMesh = new THREE.Mesh(frontDecalGeom, frontDecalMat);
          tshirtMesh.add(frontDecalMesh);
        } catch (e) {
          console.warn('Failed to load front decal for 3D export:', e);
        }
      }

      // Back Decal
      if (surfaces.back?.textureDataUrl) {
        try {
          const backTex = await loadTextureAsync(surfaces.back.textureDataUrl);
          disposables.push(backTex);
          const backDecalGeom = new DecalGeometry(
            tshirtMesh,
            new THREE.Vector3(0, 0.04, -0.15),
            new THREE.Euler(0, Math.PI, 0),
            new THREE.Vector3(0.26, 0.32, 0.2)
          );
          disposables.push(backDecalGeom);
          const backDecalMat = new THREE.MeshStandardMaterial({
            map: backTex,
            transparent: true,
            depthTest: true,
            depthWrite: false,
            polygonOffset: true,
            polygonOffsetFactor: -4,
            roughness: 0.65,
            metalness: 0.05,
          });
          disposables.push(backDecalMat);
          const backDecalMesh = new THREE.Mesh(backDecalGeom, backDecalMat);
          tshirtMesh.add(backDecalMesh);
        } catch (e) {
          console.warn('Failed to load back decal for 3D export:', e);
        }
      }

      // Center geometry vertically
      tshirtMesh.geometry.computeBoundingBox();
      const bbox = tshirtMesh.geometry.boundingBox!;
      const center = new THREE.Vector3();
      bbox.getCenter(center);
      tshirtMesh.position.sub(center);

      rootGroup.add(tshirtMesh);
    }
  } else {
    // Jersey Model Assembly
    const jerseyGroup = gltf.scene.clone();
    jerseyGroup.rotation.set(0, Math.PI, 0); // Align Front to [0, 0, 2.5]

    const fabricMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(baseColor),
      roughness: 0.65,
      metalness: 0.05,
      side: THREE.DoubleSide,
    });
    disposables.push(fabricMat);

    const collarMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(baseColor),
      roughness: 0.7,
      metalness: 0.05,
      side: THREE.DoubleSide,
    });
    disposables.push(collarMat);

    // Apply materials across meshes
    jerseyGroup.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        const matName = Array.isArray(mesh.material)
          ? mesh.material[0]?.name || ''
          : mesh.material?.name || '';

        if (matName.includes('BISBAN')) {
          mesh.material = collarMat;
        } else {
          mesh.material = fabricMat;
        }
      }
    });

    // Project decals on the 6 jersey panels
    const panelKeys: JerseyPanel[] = ['front', 'back', 'left', 'right', 'leftShoulder', 'rightShoulder'];
    for (const panelKey of panelKeys) {
      const surfaceData = surfaces[panelKey];
      if (!surfaceData?.textureDataUrl) continue;

      const spec = JERSEY_DECAL_SPECS[panelKey];
      const targetMesh = jerseyGroup.getObjectByName(spec.targetMesh) as THREE.Mesh | undefined;
      if (!targetMesh) continue;

      try {
        const tex = await loadTextureAsync(surfaceData.textureDataUrl);
        disposables.push(tex);

        const decalGeom = new DecalGeometry(
          targetMesh,
          new THREE.Vector3(...spec.position),
          new THREE.Euler(...spec.rotation),
          new THREE.Vector3(...spec.scale)
        );
        disposables.push(decalGeom);

        const decalMat = new THREE.MeshStandardMaterial({
          map: tex,
          transparent: true,
          depthTest: true,
          depthWrite: false,
          polygonOffset: true,
          polygonOffsetFactor: -4,
          roughness: 0.65,
          metalness: 0.05,
        });
        disposables.push(decalMat);

        const decalMesh = new THREE.Mesh(decalGeom, decalMat);
        targetMesh.add(decalMesh);
      } catch (e) {
        console.warn(`Failed to project decal for panel ${panelKey}:`, e);
      }
    }

    // Center jersey at origin
    const bbox = new THREE.Box3().setFromObject(jerseyGroup);
    const center = new THREE.Vector3();
    bbox.getCenter(center);
    jerseyGroup.position.x -= center.x;
    jerseyGroup.position.y -= center.y;
    jerseyGroup.position.z -= center.z;

    rootGroup.add(jerseyGroup);
  }

  scene.add(rootGroup);

  // Render to high resolution
  renderer.render(scene, camera);

  const dataUrl = renderer.domElement.toDataURL(
    format === 'jpeg' ? 'image/jpeg' : 'image/png',
    0.95
  );

  // Cleanup GPU resources
  disposables.forEach((d) => d.dispose());
  renderer.dispose();

  return dataUrl;
};

/**
 * Exports high-resolution 3D Mockup directly to browser download
 */
export const export3DMockup = async (
  garmentType: GarmentType,
  options: Export3DOptions,
  baseColor: string,
  surfaces: Record<string, SurfaceDesign>,
  projectName: string
): Promise<string> => {
  const sanitized = sanitizeFileName(projectName);
  const ext = options.format;
  const filename = `${sanitized}-${garmentType}-mockup-${options.cameraAngle}.${ext}`;

  const dataUrl = await render3DMockupToDataUrl({
    garmentType,
    options,
    baseColor,
    surfaces,
  });

  downloadDataUrl(dataUrl, filename);
  return filename;
};
