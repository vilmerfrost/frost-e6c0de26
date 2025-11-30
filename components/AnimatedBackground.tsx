'use client'

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Node {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
}

const AnimatedBackground = () => {
  const [nodes, setNodes] = useState<Node[]>([])
  useEffect(() => {
    const numNodes = 30;
    const initialNodes = Array.from({ length: numNodes }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      radius: Math.random() * 3 + 1,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
    }));
    setNodes(initialNodes);
  }, [])

  useEffect(() => {
    let animationFrameId: number;
    
    const animationFrame = () => {
      setNodes((prevNodes: Node[]) =>
        prevNodes.map((node: Node) => {
          let x = node.x + node.vx;
          let y = node.y + node.vy;

          if (x < 0 || x > window.innerWidth) node.vx = -node.vx;
          if (y < 0 || y > window.innerHeight) node.vy = -node.vy;

          return { ...node, x, y };
        })
      );

      animationFrameId = requestAnimationFrame(animationFrame);
    };

    animationFrameId = requestAnimationFrame(animationFrame);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);


  return (
    <svg
      className="fixed inset-0 w-full h-full"
      style={{ zIndex: -1 }}
    >
      {nodes.map((node: Node, index: number) => (
        <motion.circle
          key={index}
          cx={node.x}
          cy={node.y}
          r={node.radius}
          fill="rgba(100, 255, 218, 0.3)" // Adjust color and opacity
          animate={{
            x: node.x + node.vx,
            y: node.y + node.vy,
          }}
          transition={{ duration: 0 }}
        />
      ))}
    </svg>
  );
};

export default AnimatedBackground;