import React, {useRef, useState} from 'react';
import {useLoader, useFrame} from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const GltfModel = ({ modelPath, scale = 1, position = [0, 0, 0], rotation = {x:1,y:1,z:1} }) => {
  const ref = useRef();
  const gltf = useLoader(GLTFLoader, modelPath);
  const [hovered, hover] = useState(false);
  console.log(rotation);
  
  useFrame(
    (state, delta) => (
      (ref.current.rotation.y = rotation.y),
      (ref.current.rotation.x = rotation.x),
      (ref.current.rotation.z = rotation.z)
    )
  );

  return (
    <>
      <primitive
        ref={ref}
        object={gltf.scene}
        position={position}
        scale={hovered ? scale * 1.01 : scale}
        onPointerOver={(event) => hover(true)}
        onPointerOut={(event) => hover(false)}
      />
    </>
  );
}

export default GltfModel;