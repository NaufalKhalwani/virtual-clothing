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

export const JerseyModel: React.FC = () => {
  const gltf = useGLTF(JERSEY_MODEL_PATH) as unknown as GLTFResult;
  const baseColor = useDesignerStore((state) => state.baseColor);
  const surfaces = useDesignerStore((state) => state.surfaces);
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

  // Find the primary jersey mesh
  const jerseyMesh = useMemo<THREE.Mesh | null>(() => {
    if (!gltf || !gltf.scene) return null;
    let found: THREE.Mesh | null = null;
    gltf.scene.traverse((child) => {
      if (!found && (child as THREE.Mesh).isMesh) {
        found = child as THREE.Mesh;
      }
    });
    return found;
  }, [gltf]);

  // Clone and adapt PBR fabric material
  const jerseyMaterial = useMemo(() => {
    if (jerseyMesh && jerseyMesh.material) {
      const orig = Array.isArray(jerseyMesh.material) ? jerseyMesh.material[0] : jerseyMesh.material;
      const mat = orig.clone() as THREE.MeshStandardMaterial;
      mat.roughness = 0.6;
      mat.metalness = 0.1;
      mat.side = THREE.DoubleSide;
      return mat;
    }
    return new THREE.MeshStandardMaterial({
      color: '#FFFFFF',
      roughness: 0.6,
      metalness: 0.1,
      side: THREE.DoubleSide,
    });
  }, [jerseyMesh]);

  // Sync fabric color and wireframe
  useEffect(() => {
    if (jerseyMaterial) {
      jerseyMaterial.color = new THREE.Color(baseColor);
      jerseyMaterial.wireframe = wireframe;
      jerseyMaterial.needsUpdate = true;
    }
  }, [baseColor, wireframe, jerseyMaterial]);

  // Synchronize 6 panel textures
  useEffect(() => {
    const surfaceKeys: JerseyPanel[] = ['front', 'back', 'left', 'right', 'leftShoulder', 'rightShoulder'];
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
          console.error(`Error loading texture for jersey surface ${key}:`, err);
        }
      );
    });
  }, [surfaces]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      jerseyMaterial.dispose();
      Object.values(panelTextures).forEach((tex) => tex?.dispose());
    };
  }, [jerseyMaterial, panelTextures]);

  if (!jerseyMesh) {
    return null;
  }

  return (
    <Center top>
      <group dispose={null}>
        <mesh
          castShadow
          receiveShadow
          geometry={jerseyMesh.geometry}
          material={jerseyMaterial}
        >
          {/* 1. Front Decal */}
          {panelTextures.front && (
            <Decal
              position={[0, 0.04, 0.15]}
              rotation={[0, 0, 0]}
              scale={[0.26, 0.32, 0.2]}
              map={panelTextures.front}
              depthTest={true}
              polygonOffsetFactor={-1}
            />
          )}

          {/* 2. Back Decal */}
          {panelTextures.back && (
            <Decal
              position={[0, 0.04, -0.15]}
              rotation={[0, Math.PI, 0]}
              scale={[0.26, 0.32, 0.2]}
              map={panelTextures.back}
              depthTest={true}
              polygonOffsetFactor={-1}
            />
          )}

          {/* 3. Left Sleeve Decal */}
          {panelTextures.left && (
            <Decal
              position={[-0.22, 0.08, 0]}
              rotation={[0, -Math.PI / 2, 0]}
              scale={[0.16, 0.18, 0.15]}
              map={panelTextures.left}
              depthTest={true}
              polygonOffsetFactor={-1}
            />
          )}

          {/* 4. Right Sleeve Decal */}
          {panelTextures.right && (
            <Decal
              position={[0.22, 0.08, 0]}
              rotation={[0, Math.PI / 2, 0]}
              scale={[0.16, 0.18, 0.15]}
              map={panelTextures.right}
              depthTest={true}
              polygonOffsetFactor={-1}
            />
          )}

          {/* 5. Left Shoulder Decal */}
          {panelTextures.leftShoulder && (
            <Decal
              position={[-0.14, 0.22, 0]}
              rotation={[-Math.PI / 6, -Math.PI / 4, 0]}
              scale={[0.12, 0.14, 0.12]}
              map={panelTextures.leftShoulder}
              depthTest={true}
              polygonOffsetFactor={-1}
            />
          )}

          {/* 6. Right Shoulder Decal */}
          {panelTextures.rightShoulder && (
            <Decal
              position={[0.14, 0.22, 0]}
              rotation={[-Math.PI / 6, Math.PI / 4, 0]}
              scale={[0.12, 0.14, 0.12]}
              map={panelTextures.rightShoulder}
              depthTest={true}
              polygonOffsetFactor={-1}
            />
          )}
        </mesh>
      </group>
    </Center>
  );
};
