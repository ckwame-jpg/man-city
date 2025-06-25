// src/app/not-found.tsx
// src/app/not-found.tsx
// src/app/not-found.tsx
"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function NotFound() {
  return (
    <motion.div
      className="h-screen flex flex-col items-center justify-center text-center px-6 bg-[#011128] text-[#F5F5F5]"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <h1 className="relative text-6xl font-bold mb-4 glitch" data-text="404">
        404
      </h1>
      <p className="text-lg text-[#F5F5F5]/70 mb-6">This page doesn’t exist — or it’s lost in the void.</p>
      <Link
        href="/"
        className="px-4 py-2 border border-[#575365] hover:bg-[#2B2E3B] transition rounded text-sm"
      >
        Back to home
      </Link>
      <style jsx>{`
        .glitch {
          position: relative;
          color: #F5F5F5;
        }
        .glitch::before,
        .glitch::after {
          content: attr(data-text);
          position: absolute;
          left: 0;
          width: 100%;
          overflow: hidden;
          color: #a503c1;
          background: transparent;
          clip: rect(0, 900px, 0, 0);
        }
        .glitch::before {
          animation: glitchTop 1s infinite linear alternate-reverse;
        }
        .glitch::after {
          animation: glitchBottom 1s infinite linear alternate-reverse;
          color: #00ffe7;
        }
        @keyframes glitchTop {
          0% {
            clip: rect(0, 9999px, 0, 0);
          }
          10% {
            clip: rect(0, 9999px, 20px, 0);
          }
          20% {
            clip: rect(0, 9999px, 0, 0);
          }
          30% {
            clip: rect(5px, 9999px, 25px, 0);
          }
          100% {
            clip: rect(0, 9999px, 0, 0);
          }
        }
        @keyframes glitchBottom {
          0% {
            clip: rect(0, 9999px, 0, 0);
          }
          10% {
            clip: rect(20px, 9999px, 40px, 0);
          }
          20% {
            clip: rect(0, 9999px, 0, 0);
          }
          30% {
            clip: rect(10px, 9999px, 30px, 0);
          }
          100% {
            clip: rect(0, 9999px, 0, 0);
          }
        }
      `}</style>
    </motion.div>
  );
}