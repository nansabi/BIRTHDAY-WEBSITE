import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { triggerBurst } from '../services/confettiService';

export const BirthdayCake = () => {
  const [candlesOut, setCandlesOut] = useState(false);

  const handleBlow = () => {
    if (!candlesOut) {
      setCandlesOut(true);
      triggerBurst();
    } else {
      setCandlesOut(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-8 mt-20">
      <div 
        onClick={handleBlow}
        className="relative cursor-pointer group"
      >
        {/* Cake Base */}
        <div className="w-48 h-32 bg-celebration-purple rounded-t-3xl relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-4 bg-white/20" />
          <div className="absolute top-8 left-0 w-full h-2 bg-white/10" />
          <div className="absolute top-16 left-0 w-full h-2 bg-white/10" />
        </div>
        
        {/* Candles */}
        <div className="absolute -top-12 left-0 w-full flex justify-around px-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="relative flex flex-col items-center">
              <div className="w-2 h-12 bg-gold rounded-full" />
              <AnimatePresence>
                {!candlesOut && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ 
                      scale: [1, 1.2, 1],
                      y: [0, -2, 0]
                    }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ 
                      duration: 0.5, 
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                    className="absolute -top-6 w-4 h-6 bg-orange-500 rounded-full blur-[2px]"
                    style={{
                      boxShadow: '0 0 10px #f97316, 0 0 20px #f97316'
                    }}
                  />
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Hover Hint */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="bg-black/80 text-white px-3 py-1 rounded-full text-xs font-display">
            {candlesOut ? 'Relight?' : 'Blow out!'}
          </span>
        </div>
      </div>

      <div className="text-center">
        <h3 className="font-display text-xl font-semibold">
          {candlesOut ? "Wish granted! 🎉" : "Make a wish and blow the candles!"}
        </h3>
      </div>
    </div>
  );
};
