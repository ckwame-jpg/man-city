"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';
import MiniTerminal from '@/components/MiniTerminal';

export default function NotFound() {
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-[var(--bg-primary)] text-[var(--text-primary)]"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' as const }}
    >
      <h1 className="relative text-6xl font-bold mb-4 glitch" data-text="404">
        404
      </h1>
      <p className="text-lg text-[var(--text-muted)] mb-6">This page doesn&apos;t exist, or it&apos;s lost in the void.</p>
      <Link
        href="/"
        className="px-4 py-2 border border-[var(--border-subtle)] hover:border-[var(--border-hover)] transition rounded text-sm"
      >
        Back to home
      </Link>
      <MiniTerminal />
    </motion.div>
  );
}
