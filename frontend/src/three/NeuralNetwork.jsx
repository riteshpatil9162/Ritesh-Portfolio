import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const NeuralNetwork = () => {
  const groupRef = useRef();
  const particlesRef = useRef();
  
  // Create neural network nodes
  const nodes = useMemo(() => {
    const temp = [];
    const layers = 5;
    const nodesPerLayer = 6;
    
    for (let layer = 0; layer < layers; layer++) {
      for (let node = 0; node < nodesPerLayer; node++) {
        const x = (layer - layers / 2) * 2;
        const y = (node - nodesPerLayer / 2) * 1.5;
        const z = Math.sin(layer * 0.5) * 2;
        temp.push(new THREE.Vector3(x, y, z));
      }
    }
    return temp;
  }, []);

  // Create connections between nodes
  const connections = useMemo(() => {
    const temp = [];
    const layers = 5;
    const nodesPerLayer = 6;
    
    for (let layer = 0; layer < layers - 1; layer++) {
      for (let node = 0; node < nodesPerLayer; node++) {
        const currentIndex = layer * nodesPerLayer + node;
        
        // Connect to 2-3 nodes in the next layer
        const connectionsCount = Math.floor(Math.random() * 2) + 2;
        for (let i = 0; i < connectionsCount; i++) {
          const nextNode = Math.floor(Math.random() * nodesPerLayer);
          const nextIndex = (layer + 1) * nodesPerLayer + nextNode;
          temp.push([nodes[currentIndex], nodes[nextIndex]]);
        }
      }
    }
    return temp;
  }, [nodes]);

  // Floating particles
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 100; i++) {
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 20;
      temp.push(new THREE.Vector3(x, y, z));
    }
    return temp;
  }, []);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.1;
      groupRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.3) * 0.1;
    }
    
    if (particlesRef.current) {
      particlesRef.current.rotation.y = clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <group>
      {/* Neural Network */}
      <group ref={groupRef}>
        {/* Nodes */}
        {nodes.map((position, index) => (
          <mesh key={`node-${index}`} position={position}>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial
              color="#8B5CF6"
              emissive="#8B5CF6"
              emissiveIntensity={0.5}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
        ))}

        {/* Connections */}
        {connections.map((connection, index) => {
          const start = connection[0];
          const end = connection[1];
          const points = [start, end];
          const geometry = new THREE.BufferGeometry().setFromPoints(points);
          
          return (
            <line key={`connection-${index}`} geometry={geometry}>
              <lineBasicMaterial
                color="#00F0FF"
                opacity={0.3}
                transparent={true}
                linewidth={1}
              />
            </line>
          );
        })}
      </group>

      {/* Floating Particles */}
      <group ref={particlesRef}>
        {particles.map((position, index) => (
          <mesh key={`particle-${index}`} position={position}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshBasicMaterial
              color="#B794F4"
              transparent={true}
              opacity={0.6}
            />
          </mesh>
        ))}
      </group>

      {/* Ambient Light */}
      <ambientLight intensity={0.5} />
      
      {/* Point Lights */}
      <pointLight position={[10, 10, 10]} intensity={1} color="#8B5CF6" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00F0FF" />
      
      {/* Directional Light */}
      <directionalLight position={[0, 5, 5]} intensity={0.8} />
    </group>
  );
};

export default NeuralNetwork;
