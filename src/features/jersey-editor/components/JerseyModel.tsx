import React, { useMemo, useEffect, useState, useRef } from 'react';
import { useGLTF, Center, Decal } from '@react-three/drei';
import * as THREE from 'three';
import type { GLTF } from 'three-stdlib';
import { useDesignerStore } from '@/stores/designer.store';
import { useUIStore } from '@/stores/ui.store';
import type { JerseyPanel } from '@/types/designer.types';

export const JERSEY_MODEL_PATH = '/models/jersey.glb';

type GLTFResult = GLTF & {
  nodes: Record<string, THREE.Object3D>;
  materials: Record<string, THREE.Material>;
};

// Panel configuration with target mesh IDs and calibrated 3D Decal coordinates
// Calibrated to span the full cloth geometry from shoulders to hem and flank to flank
const PANEL_DECAL_CONFIG: Record<
  JerseyPanel,
  {
    targetMesh: string;
    position: [number, number, number];
    rotation: [number, number, number];
    scale: [number, number, number];
  }
> = {
  // Front Body (V-neck chest & stomach, spans full front torso)
  front: {
    targetMesh: 'Cloth_mesh_18',
    position: [0.0, 1.28, 0.05],
    rotation: [0, 0, 0],
    scale: [0.44, 0.68, 0.24],
  },
  // Back Body (Upper back, squad number, player name, spans full back torso)
  back: {
    targetMesh: 'Cloth_mesh_12',
    position: [0.0, 1.28, -0.06],
    rotation: [0, Math.PI, 0],
    scale: [0.44, 0.68, 0.24],
  },
  // Left Sleeve
  left: {
    targetMesh: 'Cloth_mesh_3',
    position: [-0.20, 1.43, -0.04],
    rotation: [0, -Math.PI / 2, 0],
    scale: [0.18, 0.24, 0.20],
  },
  // Right Sleeve
  right: {
    targetMesh: 'Cloth_mesh',
    position: [0.20, 1.43, -0.04],
    rotation: [0, Math.PI / 2, 0],
    scale: [0.18, 0.24, 0.20],
  },
  // Left Shoulder (Raglan shoulder seam)
  leftShoulder: {
    targetMesh: 'Cloth_mesh_27',
    position: [-0.045, 1.58, 0.0],
    rotation: [-Math.PI / 6, -Math.PI / 4, 0],
    scale: [0.10, 0.10, 0.10],
  },
  // Right Shoulder (Raglan shoulder seam)
  rightShoulder: {
    targetMesh: 'Cloth_mesh_24',
    position: [0.045, 1.58, 0.0],
    rotation: [-Math.PI / 6, Math.PI / 4, 0],
    scale: [0.10, 0.10, 0.10],
  },
};

export const JerseyModel: React.FC = () => {
  const gltf = useGLTF(JERSEY_MODEL_PATH) as unknown as GLTFResult;
  const baseColor = useDesignerStore((state) => state.baseColor);
  const surfaces = useDesignerStore((state) => state.surfaces);
  const jerseyColors = useDesignerStore((state) => state.jerseyColors);
  const leftSleevePattern = useDesignerStore((state) => state.leftSleevePattern);
  const rightSleevePattern = useDesignerStore((state) => state.rightSleevePattern);
  const wireframe = useUIStore((state) => state.wireframe);

  // Textures for all 6 jersey surfaces
  const [panelTextures, setPanelTextures] = useState<Record<JerseyPanel, THREE.Texture | null>>({
    front: null,
    back: null,
    left: null,
    right: null,
    leftShoulder: null,
    rightShoulder: null,
  });

  // Procedural Athletic Sportswear Fabric Normal Map (Micro Pique Knit)
  const athleticFabricBumpTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    ctx.fillStyle = '#8080FF';
    ctx.fillRect(0, 0, 128, 128);

    // Micro-knit athletic weave
    for (let y = 0; y < 128; y += 4) {
      for (let x = 0; x < 128; x += 4) {
        const shift = ((y / 4) % 2) * 2;
        const px = (x + shift) % 128;
        ctx.fillStyle = '#9C9CFF';
        ctx.fillRect(px, y, 2, 2);
        ctx.fillStyle = '#6464EE';
        ctx.fillRect(px + 2, y + 2, 2, 2);
      }
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(24, 24);
    tex.needsUpdate = true;
    return tex;
  }, []);

  // Dedicated PBR Fabric material for Jersey Body
  const fabricMaterial = useMemo(() => {
    const mat = new THREE.MeshStandardMaterial({
      color: '#FFFFFF',
      roughness: 0.72,
      metalness: 0.04,
      side: THREE.DoubleSide,
    });
    if (athleticFabricBumpTexture) {
      mat.normalMap = athleticFabricBumpTexture;
      mat.normalScale = new THREE.Vector2(0.35, 0.35);
    }
    return mat;
  }, [athleticFabricBumpTexture]);

  // Left Sleeve PBR material
  const sleeveLeftMaterial = useMemo(() => {
    const mat = new THREE.MeshStandardMaterial({
      color: '#FFFFFF',
      roughness: 0.72,
      metalness: 0.04,
      side: THREE.DoubleSide,
    });
    if (athleticFabricBumpTexture) {
      mat.normalMap = athleticFabricBumpTexture;
      mat.normalScale = new THREE.Vector2(0.35, 0.35);
    }
    return mat;
  }, [athleticFabricBumpTexture]);

  // Right Sleeve PBR material
  const sleeveRightMaterial = useMemo(() => {
    const mat = new THREE.MeshStandardMaterial({
      color: '#FFFFFF',
      roughness: 0.72,
      metalness: 0.04,
      side: THREE.DoubleSide,
    });
    if (athleticFabricBumpTexture) {
      mat.normalMap = athleticFabricBumpTexture;
      mat.normalScale = new THREE.Vector2(0.35, 0.35);
    }
    return mat;
  }, [athleticFabricBumpTexture]);

  // Dedicated PBR material for V-neck Collar & Rib Trims (Bisban)
  const collarMaterial = useMemo(() => {
    const mat = new THREE.MeshStandardMaterial({
      color: '#FFFFFF',
      roughness: 0.68,
      metalness: 0.05,
      side: THREE.DoubleSide,
    });
    if (athleticFabricBumpTexture) {
      mat.normalMap = athleticFabricBumpTexture;
      mat.normalScale = new THREE.Vector2(0.4, 0.4);
    }
    return mat;
  }, [athleticFabricBumpTexture]);

  // Dedicated PBR material for Tournament Sleeve Cuffs
  const cuffMaterial = useMemo(() => {
    const mat = new THREE.MeshStandardMaterial({
      color: '#FFFFFF',
      roughness: 0.65,
      metalness: 0.04,
      side: THREE.DoubleSide,
    });
    if (athleticFabricBumpTexture) {
      mat.normalMap = athleticFabricBumpTexture;
      mat.normalScale = new THREE.Vector2(0.3, 0.3);
    }
    return mat;
  }, [athleticFabricBumpTexture]);

  // Stitching & Trim material
  const trimMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#E2E8F0',
      roughness: 0.8,
      metalness: 0.0,
      side: THREE.DoubleSide,
    });
  }, []);

  // Sync fabric colors and wireframe dynamically
  useEffect(() => {
    fabricMaterial.color.set(jerseyColors?.primary || baseColor);
    fabricMaterial.wireframe = wireframe;
    fabricMaterial.needsUpdate = true;

    sleeveLeftMaterial.color.set(leftSleevePattern?.primaryColor || jerseyColors?.sleeve || baseColor);
    sleeveLeftMaterial.wireframe = wireframe;
    sleeveLeftMaterial.needsUpdate = true;

    sleeveRightMaterial.color.set(rightSleevePattern?.primaryColor || jerseyColors?.sleeve || baseColor);
    sleeveRightMaterial.wireframe = wireframe;
    sleeveRightMaterial.needsUpdate = true;

    collarMaterial.color.set(jerseyColors?.collar || baseColor);
    collarMaterial.wireframe = wireframe;
    collarMaterial.needsUpdate = true;

    cuffMaterial.color.set(jerseyColors?.accent || '#FFFFFF');
    cuffMaterial.wireframe = wireframe;
    cuffMaterial.needsUpdate = true;

    trimMaterial.color.set(jerseyColors?.accent || '#E2E8F0');
    trimMaterial.wireframe = wireframe;
    trimMaterial.needsUpdate = true;
  }, [
    baseColor,
    jerseyColors,
    leftSleevePattern,
    rightSleevePattern,
    wireframe,
    fabricMaterial,
    sleeveLeftMaterial,
    sleeveRightMaterial,
    collarMaterial,
    cuffMaterial,
    trimMaterial,
  ]);

  // Extract all meshes from GLTF hierarchy
  const { targetMeshes, otherMeshes } = useMemo(() => {
    if (!gltf || !gltf.scene) {
      return { targetMeshes: {} as Record<JerseyPanel, THREE.Mesh>, otherMeshes: [] as THREE.Mesh[] };
    }

    const targets: Record<string, THREE.Mesh> = {};
    const others: THREE.Mesh[] = [];

    const targetNames = Object.values(PANEL_DECAL_CONFIG).map((c) => c.targetMesh);

    gltf.scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (targetNames.includes(mesh.name)) {
          // Find panel key
          const panelKey = (Object.keys(PANEL_DECAL_CONFIG) as JerseyPanel[]).find(
            (k) => PANEL_DECAL_CONFIG[k].targetMesh === mesh.name
          );
          if (panelKey) {
            targets[panelKey] = mesh;
          }
        } else {
          others.push(mesh);
        }
      }
    });

    return {
      targetMeshes: targets as Record<JerseyPanel, THREE.Mesh>,
      otherMeshes: others,
    };
  }, [gltf]);

  // Track previously loaded URLs to avoid redundant texture reloads on unaffected panels
  const lastLoadedUrlsRef = useRef<Record<string, string | null>>({});

  // Synchronize 6 panel textures from Fabric.js 2D canvas Data URLs
  useEffect(() => {
    const surfaceKeys: JerseyPanel[] = [
      'front',
      'back',
      'left',
      'right',
      'leftShoulder',
      'rightShoulder',
    ];
    const loader = new THREE.TextureLoader();

    surfaceKeys.forEach((key) => {
      const dataUrl = surfaces[key]?.textureDataUrl ?? null;
      if (lastLoadedUrlsRef.current[key] === dataUrl) {
        return; // Skip if texture has not changed
      }
      lastLoadedUrlsRef.current[key] = dataUrl;

      if (!dataUrl) {
        setPanelTextures((prev) => {
          if (!prev[key]) return prev;
          prev[key]?.dispose();
          return { ...prev, [key]: null };
        });
        return;
      }

      loader.load(
        dataUrl,
        (loadedTex) => {
          loadedTex.colorSpace = THREE.SRGBColorSpace;
          loadedTex.anisotropy = 16;
          loadedTex.needsUpdate = true;
          setPanelTextures((prev) => {
            prev[key]?.dispose();
            return { ...prev, [key]: loadedTex };
          });
        },
        undefined,
        (err) => {
          console.error(`Error loading texture for jersey panel ${key}:`, err);
        }
      );
    });
  }, [surfaces]);

  // Ref to hold current textures so unmount cleanup does not trigger on state updates
  const panelTexturesRef = useRef(panelTextures);
  panelTexturesRef.current = panelTextures;

  // Cleanup GPU materials & textures on unmount
  useEffect(() => {
    return () => {
      athleticFabricBumpTexture?.dispose();
      fabricMaterial.dispose();
      sleeveLeftMaterial.dispose();
      sleeveRightMaterial.dispose();
      collarMaterial.dispose();
      cuffMaterial.dispose();
      trimMaterial.dispose();
      Object.values(panelTexturesRef.current).forEach((tex) => tex?.dispose());
    };
  }, [athleticFabricBumpTexture, fabricMaterial, sleeveLeftMaterial, sleeveRightMaterial, collarMaterial, cuffMaterial, trimMaterial]);

  if (!gltf || !gltf.scene) {
    return null;
  }

  return (
    <Center>
      <group rotation={[0, 0, 0]} dispose={null}>
        {/* 1. Front Body Mesh with Front Decal */}
        {targetMeshes.front && (
          <mesh
            castShadow
            receiveShadow
            geometry={targetMeshes.front.geometry}
            material={fabricMaterial}
          >
            {panelTextures.front && (
              <Decal
                position={PANEL_DECAL_CONFIG.front.position}
                rotation={PANEL_DECAL_CONFIG.front.rotation}
                scale={PANEL_DECAL_CONFIG.front.scale}
                map={panelTextures.front}
                depthTest={true}
                polygonOffsetFactor={-1}
              />
            )}
          </mesh>
        )}

        {/* 2. Back Body Mesh with Back Decal */}
        {targetMeshes.back && (
          <mesh
            castShadow
            receiveShadow
            geometry={targetMeshes.back.geometry}
            material={fabricMaterial}
          >
            {panelTextures.back && (
              <Decal
                position={PANEL_DECAL_CONFIG.back.position}
                rotation={PANEL_DECAL_CONFIG.back.rotation}
                scale={PANEL_DECAL_CONFIG.back.scale}
                map={panelTextures.back}
                depthTest={true}
                polygonOffsetFactor={-1}
              />
            )}
          </mesh>
        )}

        {/* 3. Left Sleeve Mesh with Left Decal */}
        {targetMeshes.left && (
          <mesh
            castShadow
            receiveShadow
            geometry={targetMeshes.left.geometry}
            material={sleeveLeftMaterial}
          >
            {panelTextures.left && (
              <Decal
                position={PANEL_DECAL_CONFIG.left.position}
                rotation={PANEL_DECAL_CONFIG.left.rotation}
                scale={PANEL_DECAL_CONFIG.left.scale}
                map={panelTextures.left}
                depthTest={true}
                polygonOffsetFactor={-1}
              />
            )}
          </mesh>
        )}

        {/* 4. Right Sleeve Mesh with Right Decal */}
        {targetMeshes.right && (
          <mesh
            castShadow
            receiveShadow
            geometry={targetMeshes.right.geometry}
            material={sleeveRightMaterial}
          >
            {panelTextures.right && (
              <Decal
                position={PANEL_DECAL_CONFIG.right.position}
                rotation={PANEL_DECAL_CONFIG.right.rotation}
                scale={PANEL_DECAL_CONFIG.right.scale}
                map={panelTextures.right}
                depthTest={true}
                polygonOffsetFactor={-1}
              />
            )}
          </mesh>
        )}

        {/* 5. Left Shoulder Mesh with Left Shoulder Decal */}
        {targetMeshes.leftShoulder && (
          <mesh
            castShadow
            receiveShadow
            geometry={targetMeshes.leftShoulder.geometry}
            material={fabricMaterial}
          >
            {panelTextures.leftShoulder && (
              <Decal
                position={PANEL_DECAL_CONFIG.leftShoulder.position}
                rotation={PANEL_DECAL_CONFIG.leftShoulder.rotation}
                scale={PANEL_DECAL_CONFIG.leftShoulder.scale}
                map={panelTextures.leftShoulder}
                depthTest={true}
                polygonOffsetFactor={-1}
              />
            )}
          </mesh>
        )}

        {/* 6. Right Shoulder Mesh with Right Shoulder Decal */}
        {targetMeshes.rightShoulder && (
          <mesh
            castShadow
            receiveShadow
            geometry={targetMeshes.rightShoulder.geometry}
            material={fabricMaterial}
          >
            {panelTextures.rightShoulder && (
              <Decal
                position={PANEL_DECAL_CONFIG.rightShoulder.position}
                rotation={PANEL_DECAL_CONFIG.rightShoulder.rotation}
                scale={PANEL_DECAL_CONFIG.rightShoulder.scale}
                map={panelTextures.rightShoulder}
                depthTest={true}
                polygonOffsetFactor={-1}
              />
            )}
          </mesh>
        )}

        {/* 7. All other jersey elements (V-neck collar rib, tournament cuffs, hems, stitches) */}
        {otherMeshes.map((mesh) => {
          const matName = Array.isArray(mesh.material) ? mesh.material[0]?.name : mesh.material?.name;
          const isCollar = mesh.name.includes('Cloth_mesh_6') || matName?.includes('BISBAN');
          const isCuff =
            mesh.name.includes('Cloth_mesh_30') ||
            mesh.name.includes('Cloth_mesh_31') ||
            mesh.name.includes('Cloth_mesh_32') ||
            mesh.name.includes('Cloth_mesh_33') ||
            mesh.name.includes('Cloth_mesh_34') ||
            mesh.name.includes('Cloth_mesh_35');
          const isStitch = mesh.name.includes('BindedTrim');

          const assignedMaterial = isCollar
            ? collarMaterial
            : isCuff
            ? cuffMaterial
            : isStitch
            ? trimMaterial
            : fabricMaterial;

          return (
            <mesh
              key={mesh.name}
              castShadow
              receiveShadow
              geometry={mesh.geometry}
              material={assignedMaterial}
            />
          );
        })}
      </group>
    </Center>
  );
};

// Warm up 3D model in GPU cache
useGLTF.preload(JERSEY_MODEL_PATH);
