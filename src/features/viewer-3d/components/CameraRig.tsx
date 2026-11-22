import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';
import { useUIStore } from '@/stores/ui.store';
import { CAMERA_PRESETS } from '@/constants/design.constants';

export const CameraRig: React.FC = () => {
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const activeCameraPreset = useUIStore((state) => state.activeCameraPreset);
  const autoRotate = useUIStore((state) => state.autoRotate);

  const targetPosition = useRef<THREE.Vector3>(
    new THREE.Vector3(...CAMERA_PRESETS[activeCameraPreset].position)
  );
  const isTransitioning = useRef<boolean>(false);

  useEffect(() => {
    const preset = CAMERA_PRESETS[activeCameraPreset];
    targetPosition.current.set(...preset.position);
    if (controlsRef.current) {
      controlsRef.current.object.position.set(...preset.position);
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.update();
    }
    isTransitioning.current = false;
  }, [activeCameraPreset]);

  useFrame(({ camera }) => {
    if (isTransitioning.current && controlsRef.current) {
      // Prevent passing directly through (0, 0, 0) which causes OrbitControls NaN singularity
      if (Math.abs(camera.position.z) < 0.5 && Math.abs(camera.position.x) < 0.4) {
        camera.position.x = 1.8;
      }
      camera.position.lerp(targetPosition.current, 0.12);
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.update();

      if (camera.position.distanceTo(targetPosition.current) < 0.05) {
        camera.position.copy(targetPosition.current);
        controlsRef.current.target.set(0, 0, 0);
        controlsRef.current.update();
        isTransitioning.current = false;
      }
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enableRotate
      enableZoom
      enablePan={false}
      minDistance={1.2}
      maxDistance={4.5}
      minPolarAngle={0.3}
      maxPolarAngle={Math.PI - 0.3}
      dampingFactor={0.08}
      enableDamping
      autoRotate={autoRotate}
      autoRotateSpeed={1.5}
      onStart={() => {
        isTransitioning.current = false;
      }}
    />
  );
};
