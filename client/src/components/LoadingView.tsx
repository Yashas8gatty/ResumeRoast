import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const messages = [
  "Reading achievements...",
  "Measuring impact...",
  "Looking for buzzwords...",
  "Checking recruiter patience...",
  "Analyzing ATS structural traps...",
  "Evaluating bullet point strength...",
  "Pre-heating the roasting oven...",
];

export const LoadingView: React.FC = () => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-md mx-auto px-6 flex flex-col items-center justify-center min-h-[70vh] text-center">
      {/* Micro-animated subtle progress ring */}
      <div className="relative w-16 h-16 mb-8 flex items-center justify-center">
        {/* Outer Ring */}
        <div className="absolute inset-0 rounded-full border-2 border-neutral-100" />
        {/* Animated Accent Spinner */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-transparent border-t-accent"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="h-16 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={messageIndex}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="text-base font-medium text-primary tracking-tight"
          >
            {messages[messageIndex]}
          </motion.p>
        </AnimatePresence>
      </div>

      <p className="text-xs text-secondary mt-4 max-w-[280px] leading-relaxed">
        We're sending your resume text to the roaster. This typically takes about 20-25 seconds. Hold tight.
      </p>
    </div>
  );
};
