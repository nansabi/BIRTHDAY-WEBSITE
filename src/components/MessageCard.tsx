import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gift, Heart, Star, PartyPopper } from 'lucide-react';

interface MessageCardProps {
  title: string;
  message: string;
  icon: 'gift' | 'heart' | 'star' | 'party';
  delay?: number;
}

const icons = {
  gift: Gift,
  heart: Heart,
  star: Star,
  party: PartyPopper,
};

export const MessageCard = ({ title, message, icon, delay = 0 }: MessageCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = icons[icon];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      viewport={{ once: true }}
      onClick={() => setIsOpen(!isOpen)}
      className="relative group cursor-pointer"
    >
      <div className={`
        glass p-8 rounded-2xl transition-all duration-500 h-full
        ${isOpen ? 'scale-105 border-white/30 bg-white/10' : 'hover:bg-white/5'}
      `}>
        <div className="flex flex-col items-center text-center space-y-4">
          <div className={`
            p-4 rounded-full transition-colors duration-500
            ${isOpen ? 'bg-white text-black' : 'bg-white/10 text-white group-hover:bg-white/20'}
          `}>
            <Icon size={32} />
          </div>
          
          <h3 className="font-display text-xl font-semibold tracking-tight">
            {title}
          </h3>
          
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.p
                key="message"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="text-white/80 font-sans leading-relaxed"
              >
                {message}
              </motion.p>
            ) : (
              <motion.p
                key="hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-white/40 text-sm italic"
              >
                Click to reveal...
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};
