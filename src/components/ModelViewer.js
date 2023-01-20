import React, { Suspense, useEffect, useState } from "react";
import { Card } from "antd";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { OrbitControls, MathUtils } from "@react-three/drei";
import GltfModel from "./GltfModel";

let titleTopic = "";
let deviceName;


const ModelViewer = ({ payload, modelPath, scale = 1, position = [0, 0, 0] }) => {
  const [message, setMessage] = useState([]);

  useEffect(() => {
    if (payload.topic) {
      try {
        titleTopic = `${payload.topic} Twin`;
        let rawMessage = JSON.parse(payload.message);
        deviceName = rawMessage.deviceName;
        if (deviceName.indexOf("M5") > -1) {
          let xVal = parseInt(rawMessage.readings[0].value.x, 10);
          let yVal = parseInt(rawMessage.readings[0].value.y, 10);
          let zVal = parseInt(rawMessage.readings[0].value.z, 10);
          
          let xRad = THREE.MathUtils.degToRad(xVal);
          let yRad = THREE.MathUtils.degToRad(yVal);
          let zRad = THREE.MathUtils.degToRad(zVal);
          setMessage({ x: xRad, y: yRad, z: zRad });
        }
      } catch (error) {
        console.error(error, "Unexpected message format");
      }
    }
  }, [payload]);
  
  return (
    <Card id="ModelViewer" title={titleTopic}>
      <Canvas
        camera={{
          near: 0.1,
          far: 1000,
          zoom: 1,
        }}
      >
        <ambientLight intensity={0.3} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />

        <Suspense fallback={null}>
          <GltfModel
            modelPath={modelPath}
            scale={scale}
            position={position}
            rotation={message}
          />
          <OrbitControls />
        </Suspense>
      </Canvas>
    </Card>
  );
};

export default ModelViewer;
