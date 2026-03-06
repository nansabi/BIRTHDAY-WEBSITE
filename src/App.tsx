/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Cake, Music, Volume2, VolumeX, ArrowDown } from 'lucide-react';
import { FloatingBalloons } from './components/FloatingBalloons';
import { MessageCard } from './components/MessageCard';
import { BirthdayCake } from './components/BirthdayCake';
import { triggerConfetti, triggerBurst } from './services/confettiService';

export default function App() {
  const [isMuted, setIsMuted] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Initial celebration
    const timer = setTimeout(() => {
      setShowContent(true);
      triggerConfetti();
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleMainClick = () => {
    triggerBurst();
  };

  return (
    <div className="min-h-screen relative selection:bg-celebration-pink/30">
      <FloatingBalloons />
      
      {/* Background Atmosphere */}
      <div className="fixed inset-0 pointer-events-none z-[-1]">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-celebration-purple/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-celebration-pink/10 blur-[120px] rounded-full" />
      </div>

      {/* Navigation / Controls */}
      <nav className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-50">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="font-display font-bold text-xl tracking-tighter"
        >
          AK<span className="text-celebration-pink">.</span>20
        </motion.div>
        
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => setIsMuted(!isMuted)}
          className="glass p-3 rounded-full hover:bg-white/10 transition-colors"
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </motion.button>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 container mx-auto px-6 pt-32 pb-20">
        <div className="flex flex-col items-center text-center space-y-12">
          <AnimatePresence>
            {showContent && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative"
              >
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -top-12 -left-12 text-gold opacity-50"
                >
                  <Sparkles size={48} />
                </motion.div>
                
                <h2 className="font-serif italic text-2xl md:text-3xl text-white/60 mb-4">
                  Celebrating the wonderful life of
                </h2>
                
                <h1 
                  onClick={handleMainClick}
                  className="font-display text-6xl md:text-9xl font-extrabold tracking-tighter cursor-pointer select-none"
                >
                  <span className="block text-white text-glow">ARASH</span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-celebration-pink via-celebration-purple to-gold animate-gradient">KUMAR</span>
                </h1>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 }}
                  className="mt-4 inline-block px-6 py-2 glass rounded-full font-display font-bold text-celebration-pink tracking-widest uppercase text-sm"
                >
                  Cheers to 20
                </motion.div>

                <motion.div
                  animate={{ rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                  className="absolute -bottom-8 -right-8 text-celebration-pink opacity-50"
                >
                  <Cake size={48} />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="max-w-2xl"
          >
            <p className="text-lg md:text-xl text-white/70 font-sans leading-relaxed">
              Today is a masterpiece because you're in it. May your year be filled with 
              extraordinary moments, boundless joy, and the kind of magic that only you bring to the world.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <button 
              onClick={handleMainClick}
              className="px-8 py-4 bg-white text-black font-display font-bold rounded-full hover:scale-105 transition-transform active:scale-95 shadow-xl shadow-white/10"
            >
              Make a Wish ✨
            </button>
            <button 
              onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
              className="px-8 py-4 glass text-white font-display font-bold rounded-full hover:bg-white/10 transition-all flex items-center gap-2"
            >
              See Surprises <ArrowDown size={18} />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <BirthdayCake />
          </motion.div>
        </div>

        {/* Interactive Message Grid */}
        <section className="mt-40 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MessageCard 
            icon="party"
            title="The Adventure"
            message="Another year of incredible journeys and unforgettable stories awaits you, Arash!"
            delay={0.1}
          />
          <MessageCard 
            icon="heart"
            title="Pure Joy"
            message="May your heart always be as full as the room whenever you walk into it."
            delay={0.2}
          />
          <MessageCard 
            icon="star"
            title="Bright Future"
            message="Your potential is as limitless as the stars. Keep shining your unique light."
            delay={0.3}
          />
          <MessageCard 
            icon="gift"
            title="Special Gift"
            message="The best gift is the friendship and inspiration you give to everyone around you."
            delay={0.4}
          />
        </section>

        {/* Footer Quote */}
        <footer className="mt-40 text-center pb-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="space-y-4"
          >
            <div className="h-px w-20 bg-white/20 mx-auto mb-8" />
            <p className="font-serif italic text-xl text-white/40">
              "The more you praise and celebrate your life, the more there is in life to celebrate."
            </p>
            <p className="font-display text-sm tracking-widest text-white/20 uppercase">
              Cheers to 20 • Happy Birthday, Arash Kumar
            </p>
          </motion.div>
        </footer>
      </main>

      {/* Custom Styles for Gradient Animation */}
      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 5s ease infinite;
        }
      `}</style>
    </div>
  );
}
