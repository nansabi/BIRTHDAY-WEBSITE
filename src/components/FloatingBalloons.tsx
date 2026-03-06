import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

const COLORS = ['#FF1493', '#8A2BE2', '#FFD700', '#00BFFF', '#ADFF2F'];

export const FloatingBalloons = () => {
  const [balloons, setBalloons] = useState<{ id: number; x: number; color: string; size: number; duration: number; delay: number }[]>([]);

  useEffect(() => {
    const newBalloons = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: Math.random() * 40 + 30,
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 5,
    }));
    setBalloons(newBalloons);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {balloons.map((b) => (
        <motion.div
          key={b.id}
          initial={{ y: '110vh', x: `${b.x}vw`, opacity: 0 }}
          animate={{ 
            y: '-20vh', 
            opacity: [0, 0.7, 0.7, 0],
            x: [`${b.x}vw`, `${b.x + (Math.random() * 10 - 5)}vw`]
          }}
          transition={{
            duration: b.duration,
            repeat: Infinity,
            delay: b.delay,
            ease: "linear"
          }}
          className="absolute rounded-full"
          style={{
            width: b.size,
            height: b.size * 1.2,
            backgroundColor: b.color,
            boxShadow: `inset -5px -5px 15px rgba(0,0,0,0.2), 0 0 20px ${b.color}44`,
          }}
        >
          <div className="absolute bottom-[-10px] left-1/2 w-[1px] h-10 bg-white/20" />
        </motion.div>
      ))}
    </div>
  );
};
