import React, { useMemo, useEffect, useState } from 'react';
import { useGLTF, Center, Decal } from '@react-three/drei';
import * as THREE from 'three';
import type { GLTF } from 'three-stdlib';
import { useDesignerStore } from '@/stores/designer.store';
import { useUIStore } from '@/stores/ui.store';

type GLTFResult = GLTF & {
  nodes: {
    T_Shirt_male?: THREE.Mesh;
    [key: string]: unknown;
  };
  materials: {
    lambert1?: THREE.MeshStandardMaterial;
    [key: string]: unknown;
  };
};

export const TSHIRT_MODEL_PATH = '/models/tshirt.glb';

export const TShirtModel: React.FC = () => {
  const { nodes, materials } = useGLTF(TSHIRT_MODEL_PATH) as unknown as GLTFResult;
  const baseColor = useDesignerStore((state) => state.baseColor);
  const surfaces = useDesignerStore((state) => state.surfaces);
  const wireframe = useUIStore((state) => state.wireframe);

  const [frontTexture, setFrontTexture] = useState<THREE.Texture | null>(null);
  const [backTexture, setBackTexture] = useState<THREE.Texture | null>(null);

  // Clone material to ensure dynamic fabric tinting works without shared leaks
  const shirtMaterial = useMemo(() => {
    if (materials.lambert1) {
      const mat = materials.lambert1.clone() as THREE.MeshStandardMaterial;
      mat.roughness = 0.65;
      mat.metalness = 0.05;
      mat.side = THREE.DoubleSide;
      return mat;
    }
    return new THREE.MeshStandardMaterial({
      color: '#FFFFFF',
      roughness: 0.65,
      metalness: 0.05,
      side: THREE.DoubleSide,
    });
  }, [materials.lambert1]);

  useEffect(() => {
    if (shirtMaterial) {
      shirtMaterial.color = new THREE.Color(baseColor);
      shirtMaterial.wireframe = wireframe;
      shirtMaterial.needsUpdate = true;
    }
  }, [baseColor, wireframe, shirtMaterial]);

  // Synchronize Front Decal Texture from Data URL
  useEffect(() => {
    const dataUrl = surfaces.front?.textureDataUrl;
    if (!dataUrl) {
      setFrontTexture((prev) => {
        prev?.dispose();
        return null;
      });
      return;
    }

    const loader = new THREE.TextureLoader();
    loader.load(
      dataUrl,
      (loadedTex) => {
        loadedTex.colorSpace = THREE.SRGBColorSpace;
        loadedTex.anisotropy = 16;
        loadedTex.needsUpdate = true;
        setFrontTexture((prev) => {
          prev?.dispose();
          return loadedTex;
        });
      },
      undefined,
      (err) => {
        console.error('Error loading front decal texture:', err);
      }
    );
  }, [surfaces.front?.textureDataUrl]);

  // Synchronize Back Decal Texture from Data URL
  useEffect(() => {
    const dataUrl = surfaces.back?.textureDataUrl;
    if (!dataUrl) {
      setBackTexture((prev) => {
        prev?.dispose();
        return null;
      });
      return;
    }

    const loader = new THREE.TextureLoader();
    loader.load(
      dataUrl,
      (loadedTex) => {
        loadedTex.colorSpace = THREE.SRGBColorSpace;
        loadedTex.anisotropy = 16;
        loadedTex.needsUpdate = true;
        setBackTexture((prev) => {
          prev?.dispose();
          return loadedTex;
        });
      },
      undefined,
      (err) => {
        console.error('Error loading back decal texture:', err);
      }
    );
  }, [surfaces.back?.textureDataUrl]);

  // Dispose GPU textures on unmount
  useEffect(() => {
    return () => {
      shirtMaterial.dispose();
      frontTexture?.dispose();
      backTexture?.dispose();
    };
  }, [shirtMaterial, frontTexture, backTexture]);

  if (!nodes.T_Shirt_male) {
    return null;
  }

  return (
    <Center top>
      <group dispose={null}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.T_Shirt_male.geometry}
          material={shirtMaterial}
        >
          {/* Front Surface Decal */}
          {frontTexture && (
            <Decal
              position={[0, 0.04, 0.15]}
              rotation={[0, 0, 0]}
              scale={[0.26, 0.32, 0.2]}
              map={frontTexture}
              depthTest={true}
              polygonOffsetFactor={-1}
            />
          )}

          {/* Back Surface Decal */}
          {backTexture && (
            <Decal
              position={[0, 0.04, -0.15]}
              rotation={[0, Math.PI, 0]}
              scale={[0.26, 0.32, 0.2]}
              map={backTexture}
              depthTest={true}
              polygonOffsetFactor={-1}
            />
          )}
        </mesh>
      </group>
    </Center>
  );
};

useGLTF.preload(TSHIRT_MODEL_PATH);
