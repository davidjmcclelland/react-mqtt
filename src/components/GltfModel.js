import React, {useRef, useState} from 'react';
import {useLoader, useFrame} from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const GltfModel = ({ modelPath, scale = 20, position = [0, 0, 0] }) => {
  const ref = useRef();
  const gltf = useLoader(GLTFLoader, modelPath);
  const [hovered, hover] = useState(false);

  useFrame(
    (state, delta) => (
      (ref.current.rotation.y += 0.003),
      (ref.current.rotation.x += 0.002),
      (ref.current.rotation.z += 0.001)
    )
  );
  return (
    <>
      <primitive
        ref={ref}
        object={gltf.scene}
        position={position}
        scale={hovered ? scale * 1.2 : scale}
        onPointerOver={(event) => hover(true)}
        onPointerOut={(event) => hover(false)}
      />
    </>
  )
}

export default GltfModel;