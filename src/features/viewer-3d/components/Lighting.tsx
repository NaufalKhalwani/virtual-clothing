import React from 'react';
import { ContactShadows } from '@react-three/drei';

export const Lighting: React.FC = () => {
  return (
    <>
      {/* Soft studio ambient light */}
      <ambientLight intensity={0.7} />

      {/* Key Light (Front-Right) */}
      <directionalLight
        position={[4, 5, 4]}
        intensity={1.2}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
      />

      {/* Fill Light (Front-Left) */}
      <directionalLight
        position={[-4, 3, 3]}
        intensity={0.6}
      />

      {/* Rim / Back Light (adds depth to garment edges) */}
      <directionalLight
        position={[0, 4, -4]}
        intensity={0.8}
        color="#f8fafc"
      />

      {/* Soft Ground Contact Shadow */}
      <ContactShadows
        position={[0, -0.58, 0]}
        opacity={0.5}
        scale={4}
        blur={1.8}
        far={1.2}
      />
    </>
  );
};
