'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import ThemeToggle from '@/components/ThemeToggle';
import TerminalIntro from '@/components/TerminalIntro';
import GitHubHeatmap from '@/components/GitHubHeatmap';
import APIPlayground from '@/components/APIPlayground';
import KonamiEasterEgg from '@/components/KonamiEasterEgg';

const sections = [
  { id: 'about', label: 'about' },
  { id: 'skills', label: 'skills' },
  { id: 'projects', label: 'projects' },
  { id: 'playground', label: 'playground' },
  { id: 'experience', label: 'experience' },
];

const skillCategories = [
  { title: 'Backend', skills: ['Python', 'FastAPI', 'REST APIs', 'JWT Auth'] },
  { title: 'Infrastructure', skills: ['Docker', 'PostgreSQL', 'Vercel', 'CI/CD'] },
  { title: 'Frontend', skills: ['TypeScript', 'Next.js', 'Tailwind CSS', 'React'] },
  { title: 'Tools & Practices', skills: ['Git', 'GitHub', 'System Design', 'Agile'] },
];

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
};

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState('about');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const main = mainRef.current;
    if (!main) return;

    const move = (e: MouseEvent) => {
      const accent = getComputedStyle(document.documentElement).getPropertyValue('--bg-gradient-accent').trim();
      const base = getComputedStyle(document.documentElement).getPropertyValue('--bg-gradient-base').trim();
      main.style.background = `radial-gradient(circle at ${e.pageX}px ${e.pageY}px, ${accent} 0%, ${base} 45%)`;
    };

    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sectionEls = sections.map(s => ({
        id: s.id,
        ref: document.getElementById(s.id),
      }));
      const scrollY = window.scrollY;

      for (let i = sectionEls.length - 1; i >= 0; i--) {
        const section = sectionEls[i].ref;
        if (section && scrollY >= section.offsetTop - window.innerHeight / 2) {
          setActiveSection(sectionEls[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.querySelector(`#${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <div className="font-sans">
      {/* Mobile Navbar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-[var(--bg-primary)] border-b border-[var(--border-subtle)] px-6 py-4 flex items-center justify-between">
        <span className="text-lg font-semibold text-[var(--text-primary)]">Chris Prempeh</span>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <a href="https://github.com/ckwame-jpg" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[var(--text-primary)] hover:opacity-80" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 0C5.37 0 0 5.373 0 12a12 12 0 008.207 11.385c.6.11.82-.26.82-.577v-2.065c-3.338.727-4.043-1.61-4.043-1.61-.546-1.387-1.334-1.756-1.334-1.756-1.09-.745.083-.73.083-.73 1.205.084 1.84 1.238 1.84 1.238 1.072 1.835 2.812 1.305 3.498.998.108-.777.42-1.305.76-1.604-2.665-.305-5.466-1.334-5.466-5.933 0-1.31.468-2.381 1.235-3.22-.123-.305-.535-1.524.117-3.177 0 0 1.007-.322 3.3 1.23a11.49 11.49 0 016.003 0c2.292-1.552 3.297-1.23 3.297-1.23.653 1.653.24 2.872.118 3.177.77.839 1.234 1.91 1.234 3.22 0 4.61-2.803 5.625-5.476 5.921.432.37.814 1.103.814 2.222v3.293c0 .32.22.694.827.576A12.005 12.005 0 0024 12c0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/christopher-prempeh/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[var(--text-primary)] hover:opacity-80" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 0h-14C2.24 0 0 2.24 0 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5V5c0-2.76-2.24-5-5-5zM7.19 19H4.28V8.99h2.91V19zm-1.45-11.6c-.93 0-1.69-.76-1.69-1.7s.76-1.7 1.69-1.7 1.69.76 1.69 1.7-.76 1.7-1.69 1.7zM20 19h-2.91v-4.89c0-1.17-.02-2.67-1.63-2.67-1.63 0-1.88 1.27-1.88 2.58V19h-2.91V8.99h2.79v1.37h.04c.39-.74 1.33-1.52 2.74-1.52 2.93 0 3.47 1.93 3.47 4.44V19z"/>
            </svg>
          </a>
          <button
            type="button"
            className="flex flex-col justify-between w-6 h-4 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
          >
            <span className={`h-0.5 w-full bg-[var(--text-primary)] transform transition duration-300 ease-in-out ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
            <span className={`h-0.5 w-full bg-[var(--text-primary)] transition duration-300 ease-in-out ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`h-0.5 w-full bg-[var(--text-primary)] transform transition duration-300 ease-in-out ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden fixed top-16 left-0 right-0 bg-[var(--bg-primary)] z-40 border-t border-[var(--border-subtle)] px-6 py-6 space-y-4 text-[var(--text-primary)] text-base">
          {sections.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => {
                e.preventDefault();
                scrollTo(id);
                setMenuOpen(false);
              }}
              className="block hover:opacity-80 transition"
            >
              {label}
            </a>
          ))}
        </div>
      )}
      <main
        ref={mainRef}
        className="min-h-screen px-6 md:px-28 grid grid-cols-1 md:grid-cols-[320px_1fr] gap-52 pt-36 md:pt-20 bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors"
      >
        <div className="hidden md:flex flex-col justify-between sticky top-20 self-start pl-4 pb-20 h-[calc(100vh-9rem)]">
          <div className="flex flex-col items-start justify-start flex-grow pt-0 space-y-1">
            <TerminalIntro />
            <div className="space-y-6 text-base text-[var(--text-muted)] font-medium">
              {sections.map(({ id, label }) => (
                <div key={id} className="group flex items-center space-x-2">
                  <span
                    className={`h-px w-6 transition-all duration-300 ${
                      activeSection === id
                        ? 'bg-[var(--text-primary)] w-8'
                        : 'bg-[var(--nav-indicator)] group-hover:bg-[var(--text-primary)]'
                    }`}
                  />
                  <a
                    href={`#${id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(id);
                    }}
                    className={`transition-transform duration-300 hover:text-[var(--text-primary)] hover:scale-105 ${
                      activeSection === id ? 'text-[var(--text-primary)] scale-105' : ''
                    }`}
                  >
                    {label}
                  </a>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-4 mt-auto">
            <a href="https://github.com/ckwame-jpg" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-[var(--text-primary)] hover:opacity-80 transition-transform hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 0C5.37 0 0 5.373 0 12a12 12 0 008.207 11.385c.6.11.82-.26.82-.577v-2.065c-3.338.727-4.043-1.61-4.043-1.61-.546-1.387-1.334-1.756-1.334-1.756-1.09-.745.083-.73.083-.73 1.205.084 1.84 1.238 1.84 1.238 1.072 1.835 2.812 1.305 3.498.998.108-.777.42-1.305.76-1.604-2.665-.305-5.466-1.334-5.466-5.933 0-1.31.468-2.381 1.235-3.22-.123-.305-.535-1.524.117-3.177 0 0 1.007-.322 3.3 1.23a11.49 11.49 0 016.003 0c2.292-1.552 3.297-1.23 3.297-1.23.653 1.653.24 2.872.118 3.177.77.839 1.234 1.91 1.234 3.22 0 4.61-2.803 5.625-5.476 5.921.432.37.814 1.103.814 2.222v3.293c0 .32.22.694.827.576A12.005 12.005 0 0024 12c0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/christopher-prempeh/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-[var(--text-primary)] hover:opacity-80 transition-transform hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14C2.24 0 0 2.24 0 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5V5c0-2.76-2.24-5-5-5zM7.19 19H4.28V8.99h2.91V19zm-1.45-11.6c-.93 0-1.69-.76-1.69-1.7s.76-1.7 1.69-1.7 1.69.76 1.69 1.7-.76 1.7-1.69 1.7zM20 19h-2.91v-4.89c0-1.17-.02-2.67-1.63-2.67-1.63 0-1.88 1.27-1.88 2.58V19h-2.91V8.99h2.79v1.37h.04c.39-.74 1.33-1.52 2.74-1.52 2.93 0 3.47 1.93 3.47 4.44V19z"/>
              </svg>
            </a>
            <a
              href="/resume.pdf"
              download
              className="flex items-center space-x-1.5 px-3 py-1 border border-[var(--border-subtle)] rounded-full text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-hover)] transition-all hover:scale-105"
              aria-label="Download Resume"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>Resume</span>
            </a>
            <ThemeToggle />
          </div>
        </div>
        <div className="space-y-32">
          {/* About */}
          <section id="about" className="scroll-mt-16 space-y-4 text-base sm:text-lg text-[var(--text-secondary)]">
            <p>
              I build backend systems with <span className="text-[var(--text-primary)]">Python</span>, <span className="text-[var(--text-primary)]">FastAPI</span>, <span className="text-[var(--text-primary)]">Docker</span>, and <span className="text-[var(--text-primary)]">PostgreSQL</span>, focused on clean architecture, secure authentication, and infrastructure that holds up in production.
            </p>
            <p>
              I&apos;m currently finishing my <span className="text-[var(--text-primary)]">BS in Computer Science</span> while building full-stack projects that go beyond coursework. My work as a VAR Technical Manager, maintaining 100% uptime on live broadcast systems under real-time pressure, gave me a sharp instinct for reliability, monitoring, and operating systems where failure isn&apos;t an option.
            </p>
            <p>
              I&apos;m actively looking for <span className="text-[var(--text-primary)]">backend or full-stack engineering roles</span> where I can contribute to production systems and grow as an engineer.{' '}
              <a
                href="https://www.linkedin.com/in/christopher-prempeh/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--text-primary)] underline underline-offset-4 decoration-[var(--link-decoration)] hover:decoration-[var(--text-primary)] transition"
              >
                Let&apos;s connect on LinkedIn
              </a>.
            </p>
          </section>

          {/* Skills */}
          <section id="skills" className="scroll-mt-16 border-t border-[var(--border-subtle)] pt-10">
            <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-5">skills</h2>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {skillCategories.map(({ title, skills }) => (
                <motion.div
                  key={title}
                  variants={staggerItem}
                  className="rounded-lg px-6 py-5 border border-[var(--border-subtle)] bg-[var(--card-bg)] backdrop-blur-md"
                >
                  <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3">{title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 text-sm rounded-full border border-[var(--border-tag)] bg-[var(--card-bg)] text-[var(--text-secondary)]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* Projects */}
          <section id="projects" className="scroll-mt-16 border-t border-[var(--border-subtle)] pt-10">
            <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-5">projects</h2>
            <motion.div
              className="rounded-lg px-8 py-6 border border-[var(--border-subtle)] bg-[var(--card-bg)] backdrop-blur-md"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-[var(--text-primary)]">habitual habits</h3>
              <p className="text-[var(--text-secondary)] mt-2 text-base">
                A production-ready REST API built with FastAPI and clean architecture, including Pydantic schemas and SQLAlchemy models. Features JWT authentication, full CRUD operations, completion logging, Dockerized deployment, and a streak-tracking system that calculates consecutive days of habit completion.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {['FastAPI', 'Python', 'JWT Auth', 'Docker', 'SQLAlchemy', 'Pydantic', 'SQLite'].map((tag) => (
                  <span key={tag} className="px-3 py-1 text-xs rounded-full border border-[var(--border-tag)] bg-[var(--card-bg)] text-[var(--tag-text)]">
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href="https://github.com/ckwame-jpg/habit-tracker-api"
                className="inline-block mt-4 text-[var(--text-primary)] hover:opacity-80 transition-transform hover:scale-110"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Project Repository"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 transition-all duration-300 hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12a12.013 12.013 0 008.208 11.385c.6.111.82-.26.82-.577v-2.065c-3.338.726-4.043-1.61-4.043-1.61-.546-1.387-1.334-1.756-1.334-1.756-1.091-.745.083-.73.083-.73 1.205.084 1.84 1.238 1.84 1.238 1.072 1.835 2.812 1.305 3.498.998.108-.777.419-1.305.76-1.604-2.665-.304-5.466-1.333-5.466-5.933 0-1.31.469-2.381 1.235-3.22-.123-.304-.535-1.523.117-3.176 0 0 1.007-.322 3.3 1.23a11.487 11.487 0 016.003 0c2.292-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.872.12 3.176.769.839 1.233 1.91 1.233 3.22 0 4.61-2.803 5.625-5.475 5.921.43.37.813 1.103.813 2.222v3.293c0 .32.218.694.825.576A12.015 12.015 0 0024 12c0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </motion.div>

            {/* Fantasy Football Tool Card */}
            <motion.div
              className="rounded-lg px-8 py-6 border border-[var(--border-subtle)] bg-[var(--card-bg)] backdrop-blur-md mt-6"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-[var(--text-primary)]">fantasy football app</h3>
              <p className="text-[var(--text-secondary)] mt-2 text-base">
                A full-stack draft tool with a sortable draftboard, tier rankings (T1–T4), favorites by year, and live stat columns for fantasy, rushing, receiving, and passing. The FastAPI backend serves player data while the Next.js frontend handles real-time filtering and sorting with no page reloads.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {['FastAPI', 'Next.js', 'TypeScript', 'Tailwind CSS', 'React', 'Python'].map((tag) => (
                  <span key={tag} className="px-3 py-1 text-xs rounded-full border border-[var(--border-tag)] bg-[var(--card-bg)] text-[var(--tag-text)]">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center space-x-4 mt-4">
                <a
                  href="https://fantasy-tool-chris-prempehs-projects.vercel.app"
                  className="inline-block text-[var(--text-primary)] hover:opacity-80 transition-transform hover:scale-110"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Live Demo"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 transition-all duration-300 hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14 3h7v7h-2V6.414l-9.293 9.293-1.414-1.414L17.586 5H14V3z" />
                    <path d="M5 5h5V3H3v7h2V5zm0 14v-5H3v7h7v-2H5z" />
                  </svg>
                </a>

                {/* GitHub link */}
                <a
                  href="https://github.com/ckwame-jpg/fantasy-tool"
                  className="inline-block text-[var(--text-primary)] hover:opacity-80 transition-transform hover:scale-110"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Project Repository"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 transition-all duration-300 hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.373 0 0 5.373 0 12a12.013 12.013 0 008.208 11.385c.6.111.82-.26.82-.577v-2.065c-3.338.726-4.043-1.61-4.043-1.61-.546-1.387-1.334-1.756-1.334-1.756-1.091-.745.083-.73.083-.73 1.205.084 1.84 1.238 1.84 1.238 1.072 1.835 2.812 1.305 3.498.998.108-.777.419-1.305.76-1.604-2.665-.304-5.466-1.333-5.466-5.933 0-1.31.469-2.381 1.235-3.22-.123-.304-.535-1.523.117-3.176 0 0 1.007-.322 3.3 1.23a11.487 11.487 0 016.003 0c2.292-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.872.12 3.176.769.839 1.233 1.91 1.233 3.22 0 4.61-2.803 5.625-5.475 5.921.43.37.813 1.103.813 2.222v3.293c0 .32.218.694.825.576A12.015 12.015 0 0024 12c0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              </div>
            </motion.div>
          </section>

          {/* API Playground */}
          <section id="playground" className="scroll-mt-16 border-t border-[var(--border-subtle)] pt-10">
            <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-5">playground</h2>
            <p className="text-[var(--text-secondary)] text-base mb-4">
              Try out the Habit Tracker API. These are mock responses for now, live endpoints coming soon.
            </p>
            <APIPlayground />
          </section>

          <section id="experience" className="scroll-mt-16 border-t border-[var(--border-subtle)] pt-10 pb-60">
            <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-6">experience</h2>
            <div className="space-y-10 sm:ml-0 leading-loose">
              <div className="grid sm:grid-cols-[150px_1fr] sm:gap-10 items-start">
                <p className="text-base text-[var(--text-muted)] mb-1 sm:mb-0">Oct 2024 — Present</p>
                <div>
                  <h3 className="text-xl font-semibold text-[var(--text-primary)]">VAR Technical Manager · Sportec Solutions</h3>
                  <p className="text-[var(--text-secondary)] text-base mt-1">
                    Set up, monitored, and troubleshot technical video systems for MLS and international matches. Ensured 100% uptime of VAR and MSR equipment and coordinated seamlessly with referees and broadcast staff.
                  </p>
                </div>
              </div>
              <div className="grid sm:grid-cols-[150px_1fr] sm:gap-10 items-start">
                <p className="text-base text-[var(--text-muted)] mb-1 sm:mb-0">2021 — 2023</p>
                <div>
                  <h3 className="text-xl font-semibold text-[var(--text-primary)]">Data Entry Operator · Amazon</h3>
                  <p className="text-[var(--text-secondary)] text-base mt-1">
                    Managed high-volume data entry with 99.8% accuracy across multiple systems. Streamlined digital recordkeeping and consistently exceeded productivity benchmarks.
                  </p>
                </div>
              </div>
            </div>
          </section>
          <GitHubHeatmap />
          <div className="text-base text-[var(--text-faint)] mt-12 mb-35 md:pl-4">
            <p>
              designed and built in VS Code. built with Next.js and Tailwind CSS, version controlled with GitHub, and deployed via Vercel. coded in TypeScript.
            </p>
          </div>
        </div>
      </main>
      <KonamiEasterEgg />
      </div>
    </>
  );
}
