/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;

      if (totalScroll > 0) {
        setScrollProgress((currentScroll / totalScroll) * 100);
      }

      if (currentScroll > 400) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          id="back-to-top-btn"
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-brand-primary text-white flex items-center justify-center shadow-lg cursor-pointer hover:bg-brand-dark transition-all focus:outline-none"
          aria-label="العودة لأعلى الصفحة"
        >
          {/* Circular Scroll Progress Ring */}
          <svg className="absolute w-full h-full -rotate-90 pointer-events-none scale-102">
            <circle
              cx="24"
              cy="24"
              r="22"
              className="stroke-white/10 fill-none"
              strokeWidth="2"
            />
            <circle
              cx="24"
              cy="24"
              r="22"
              className="stroke-brand-accent fill-none transition-all duration-75"
              strokeWidth="2.5"
              strokeDasharray={138} // Circumference = 2 * pi * r = 2 * 3.14 * 22 ≈ 138
              strokeDashoffset={138 - (138 * scrollProgress) / 100}
            />
          </svg>
          <ChevronUp className="w-6 h-6 text-white relative z-10 animate-pulse" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
