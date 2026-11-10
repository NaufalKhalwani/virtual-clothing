import React, { useMemo, useEffect, useState } from 'react';
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
const PANEL_DECAL_CONFIG: Record<
  JerseyPanel,
  {
    targetMesh: string;
    position: [number, number, number];
    rotation: [number, number, number];
    scale: [number, number, number];
  }
> = {
  // Front Body (V-neck chest & stomach)
  front: {
    targetMesh: 'Cloth_mesh_18',
    position: [0, 1.35, 0.12],
    rotation: [0, 0, 0],
    scale: [0.26, 0.32, 0.2],
  },
  // Back Body (Upper back, squad number, player name)
  back: {
    targetMesh: 'Cloth_mesh_12',
    position: [0, 1.35, -0.14],
    rotation: [0, Math.PI, 0],
    scale: [0.26, 0.32, 0.2],
  },
  // Left Sleeve
  left: {
    targetMesh: 'Cloth_mesh_3',
    position: [-0.22, 1.44, -0.04],
    rotation: [0, -Math.PI / 2, 0],
    scale: [0.16, 0.18, 0.16],
  },
  // Right Sleeve
  right: {
    targetMesh: 'Cloth_mesh',
    position: [0.22, 1.44, -0.04],
    rotation: [0, Math.PI / 2, 0],
    scale: [0.16, 0.18, 0.16],
  },
  // Left Shoulder (Raglan shoulder seam)
  leftShoulder: {
    targetMesh: 'Cloth_mesh_27',
    position: [-0.08, 1.58, -0.02],
    rotation: [-Math.PI / 6, -Math.PI / 4, 0],
    scale: [0.12, 0.14, 0.12],
  },
  // Right Shoulder (Raglan shoulder seam)
  rightShoulder: {
    targetMesh: 'Cloth_mesh_24',
    position: [0.08, 1.58, -0.02],
    rotation: [-Math.PI / 6, Math.PI / 4, 0],
    scale: [0.12, 0.14, 0.12],
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

  // Dedicated PBR Fabric material for Jersey Body
  const fabricMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#FFFFFF',
      roughness: 0.65,
      metalness: 0.05,
      side: THREE.DoubleSide,
    });
  }, []);

  // Left Sleeve PBR material
  const sleeveLeftMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#FFFFFF',
      roughness: 0.65,
      metalness: 0.05,
      side: THREE.DoubleSide,
    });
  }, []);

  // Right Sleeve PBR material
  const sleeveRightMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#FFFFFF',
      roughness: 0.65,
      metalness: 0.05,
      side: THREE.DoubleSide,
    });
  }, []);

  // Dedicated PBR material for V-neck Collar & Rib Trims (Bisban)
  const collarMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#FFFFFF',
      roughness: 0.7,
      metalness: 0.05,
      side: THREE.DoubleSide,
    });
  }, []);

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
      const dataUrl = surfaces[key]?.textureDataUrl;
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

  // Cleanup GPU materials & textures on unmount
  useEffect(() => {
    return () => {
      fabricMaterial.dispose();
      collarMaterial.dispose();
      trimMaterial.dispose();
      Object.values(panelTextures).forEach((tex) => tex?.dispose());
    };
  }, [fabricMaterial, collarMaterial, trimMaterial, panelTextures]);

  if (!gltf || !gltf.scene) {
    return null;
  }

  return (
    <Center top>
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

        {/* 7. All other jersey elements (V-neck collar rib, hems, inner thickness, stitches) */}
        {otherMeshes.map((mesh) => {
          const matName = Array.isArray(mesh.material) ? mesh.material[0]?.name : mesh.material?.name;
          const isCollar = mesh.name.includes('Cloth_mesh_6') || matName?.includes('BISBAN');
          const isStitch = mesh.name.includes('BindedTrim');

          return (
            <mesh
              key={mesh.name}
              castShadow
              receiveShadow
              geometry={mesh.geometry}
              material={isCollar ? collarMaterial : isStitch ? trimMaterial : fabricMaterial}
            />
          );
        })}
      </group>
    </Center>
  );
};
