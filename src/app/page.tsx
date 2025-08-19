'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLElement>(null);
  const [activeSection, setActiveSection] = useState('about');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const main = mainRef.current;
    if (!main) return;

    const move = (e: MouseEvent) => {
      main.style.background = `radial-gradient(circle at ${e.pageX}px ${e.pageY}px, rgba(0, 16, 76, 0.76) 0%, #011128 45%)`;
    };

    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { id: 'about', ref: document.getElementById('about') },
        { id: 'projects', ref: document.getElementById('projects') },
        { id: 'experience', ref: document.getElementById('experience') }
      ];
      const scrollY = window.scrollY;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i].ref;
        if (section && scrollY >= section.offsetTop - window.innerHeight / 2) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className="font-sans">
      {/* Mobile Navbar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-[#011128] border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <span className="text-lg font-semibold text-[#F5F5F5]">Chris Prempeh</span>
        <div className="flex items-center space-x-4">
          <a href="https://github.com/ckwame-jpg" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#F5F5F5] hover:text-white" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 0C5.37 0 0 5.373 0 12a12 12 0 008.207 11.385c.6.11.82-.26.82-.577v-2.065c-3.338.727-4.043-1.61-4.043-1.61-.546-1.387-1.334-1.756-1.334-1.756-1.09-.745.083-.73.083-.73 1.205.084 1.84 1.238 1.84 1.238 1.072 1.835 2.812 1.305 3.498.998.108-.777.42-1.305.76-1.604-2.665-.305-5.466-1.334-5.466-5.933 0-1.31.468-2.381 1.235-3.22-.123-.305-.535-1.524.117-3.177 0 0 1.007-.322 3.3 1.23a11.49 11.49 0 016.003 0c2.292-1.552 3.297-1.23 3.297-1.23.653 1.653.24 2.872.118 3.177.77.839 1.234 1.91 1.234 3.22 0 4.61-2.803 5.625-5.476 5.921.432.37.814 1.103.814 2.222v3.293c0 .32.22.694.827.576A12.005 12.005 0 0024 12c0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/christopher-prempeh/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#F5F5F5] hover:text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 0h-14C2.24 0 0 2.24 0 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5V5c0-2.76-2.24-5-5-5zM7.19 19H4.28V8.99h2.91V19zm-1.45-11.6c-.93 0-1.69-.76-1.69-1.7s.76-1.7 1.69-1.7 1.69.76 1.69 1.7-.76 1.7-1.69 1.7zM20 19h-2.91v-4.89c0-1.17-.02-2.67-1.63-2.67-1.63 0-1.88 1.27-1.88 2.58V19h-2.91V8.99h2.79v1.37h.04c.39-.74 1.33-1.52 2.74-1.52 2.93 0 3.47 1.93 3.47 4.44V19z"/>
            </svg>
          </a>
          <button
            className="flex flex-col justify-between w-6 h-4 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
          >
            <span className={`h-0.5 w-full bg-[#F5F5F5] transform transition duration-300 ease-in-out ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
            <span className={`h-0.5 w-full bg-[#F5F5F5] transition duration-300 ease-in-out ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`h-0.5 w-full bg-[#F5F5F5] transform transition duration-300 ease-in-out ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden fixed top-16 left-0 right-0 bg-[#011128] z-40 border-t border-white/10 px-6 py-6 space-y-4 text-[#F5F5F5] text-base">
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              setMenuOpen(false);
            }}
            className="block hover:text-white transition"
          >
            about
          </a>
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              setMenuOpen(false);
            }}
            className="block hover:text-white transition"
          >
            projects
          </a>
          <a
            href="#experience"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#experience')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              setMenuOpen(false);
            }}
            className="block hover:text-white transition"
          >
            experience
          </a>
        </div>
      )}
      <main
        ref={mainRef}
        className="min-h-screen px-6 md:px-28 grid grid-cols-1 md:grid-cols-[320px_1fr] gap-52 pt-36 md:pt-20 bg-[#011128] text-[#F5F5F5] transition-colors"
      >
        <div className="hidden md:flex flex-col justify-between sticky top-20 self-start pl-4 pb-20 h-[calc(100vh-9rem)]">
          <div className="flex flex-col items-start justify-start flex-grow pt-0 space-y-1">
            <h1 className="text-6xl font-bold text-[#F5F5F5]">Chris Prempeh</h1>
            <h2 className="text-xl text-[#F5F5F5]/80 mt-2">Technical Manager</h2>
            <p className="text-[#F5F5F5]/60 mt-4 text-base mb-22">Developer currently building backend systems that are reliable, clean, and built to scale.</p>
            <div className="space-y-6 text-base text-[#F5F5F5]/60 font-medium">
              {[
                { id: 'about', label: 'about' },
                { id: 'projects', label: 'projects' },
                { id: 'experience', label: 'experience' },
              ].map(({ id, label }) => (
                <div key={id} className="group flex items-center space-x-2">
                  <span
                    className={`h-px w-6 transition-all duration-300 ${
                      activeSection === id
                        ? 'bg-[#F5F5F5] w-8'
                        : 'bg-[#F5F5F5]/30 group-hover:bg-[#F5F5F5]'
                    }`}
                  />
                  <a
                    href={`#${id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector(`#${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    className={`transition-transform duration-300 hover:text-white hover:scale-105 ${
                      activeSection === id ? 'text-white scale-105' : ''
                    }`}
                  >
                    {label}
                  </a>
                </div>
              ))}
            </div>
          </div>
          <div className="flex space-x-4 mt-auto">
            <a href="https://github.com/ckwame-jpg" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-[#F5F5F5] hover:text-white transition-transform hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 0C5.37 0 0 5.373 0 12a12 12 0 008.207 11.385c.6.11.82-.26.82-.577v-2.065c-3.338.727-4.043-1.61-4.043-1.61-.546-1.387-1.334-1.756-1.334-1.756-1.09-.745.083-.73.083-.73 1.205.084 1.84 1.238 1.84 1.238 1.072 1.835 2.812 1.305 3.498.998.108-.777.42-1.305.76-1.604-2.665-.305-5.466-1.334-5.466-5.933 0-1.31.468-2.381 1.235-3.22-.123-.305-.535-1.524.117-3.177 0 0 1.007-.322 3.3 1.23a11.49 11.49 0 016.003 0c2.292-1.552 3.297-1.23 3.297-1.23.653 1.653.24 2.872.118 3.177.77.839 1.234 1.91 1.234 3.22 0 4.61-2.803 5.625-5.476 5.921.432.37.814 1.103.814 2.222v3.293c0 .32.22.694.827.576A12.005 12.005 0 0024 12c0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/christopher-prempeh/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-[#F5F5F5] hover:text-white transition-transform hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14C2.24 0 0 2.24 0 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5V5c0-2.76-2.24-5-5-5zM7.19 19H4.28V8.99h2.91V19zm-1.45-11.6c-.93 0-1.69-.76-1.69-1.7s.76-1.7 1.69-1.7 1.69.76 1.69 1.7-.76 1.7-1.69 1.7zM20 19h-2.91v-4.89c0-1.17-.02-2.67-1.63-2.67-1.63 0-1.88 1.27-1.88 2.58V19h-2.91V8.99h2.79v1.37h.04c.39-.74 1.33-1.52 2.74-1.52 2.93 0 3.47 1.93 3.47 4.44V19z"/>
              </svg>
            </a>
          </div>
        </div>
        <div className="space-y-32">
          <section id="about" className="scroll-mt-16 space-y-4 text-base sm:text-lg text-[#F5F5F5]/80">
            <p>
              A developer who building secure, scalable systems that don’t break under pressure. At the moment I’m at the tail end of my BS in CompSci while steadily building a portfolio of different projects.
            </p>
            <p>
              Currently working in an environment where precision and reliability mattered trying to keep referees happy and pro soccer matches running smoothly as a VAR Tech Manager. It's definitely sharpened how I think about systems, pressure, and user expectations and that mindset carries into my code.
            </p>
            <p>
              Outside of work I'm a sports fanatic; Open to any sports debate as long as we can agree that Lebron and Messi are the GOATs. Feel free to connect or shoot me a message on my LinkedIn in regards to any questions, comments, or concerns.
            </p>
          </section>

          <section id="projects" className="scroll-mt-16 border-t border-white/10 pt-10">
            <h2 className="text-2xl font-semibold text-[#F5F5F5] mb-5">projects</h2>
            <motion.div
              className="rounded-lg px-8 py-6 border border-white/10 bg-white/5 backdrop-blur-md"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-[#F5F5F5]">habit tracker</h3>
              <p className="text-[#F5F5F5]/80 mt-2 text-base">
                A FastAPI backend project with JWT Auth, Docker support, and secure habit streak tracking. Built to strengthen my backend fundamentals and showcase professional-ready architecture.
              </p>
              <a
                href="https://github.com/ckwame-jpg/habit-tracker-api"
                className="inline-block mt-4 text-[#F5F5F5] hover:text-white transition-transform hover:scale-110"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Project Repository"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 transition-all duration-300 hover:scale-110 hover:text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12a12.013 12.013 0 008.208 11.385c.6.111.82-.26.82-.577v-2.065c-3.338.726-4.043-1.61-4.043-1.61-.546-1.387-1.334-1.756-1.334-1.756-1.091-.745.083-.73.083-.73 1.205.084 1.84 1.238 1.84 1.238 1.072 1.835 2.812 1.305 3.498.998.108-.777.419-1.305.76-1.604-2.665-.304-5.466-1.333-5.466-5.933 0-1.31.469-2.381 1.235-3.22-.123-.304-.535-1.523.117-3.176 0 0 1.007-.322 3.3 1.23a11.487 11.487 0 016.003 0c2.292-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.872.12 3.176.769.839 1.233 1.91 1.233 3.22 0 4.61-2.803 5.625-5.475 5.921.43.37.813 1.103.813 2.222v3.293c0 .32.218.694.825.576A12.015 12.015 0 0024 12c0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </motion.div>

            {/* Fantasy Football Tool Card */}
            <motion.div
              className="rounded-lg px-8 py-6 border border-white/10 bg-white/5 backdrop-blur-md mt-6"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-[#F5F5F5]">fantasy football app</h3>
              <p className="text-[#F5F5F5]/80 mt-2 text-base">
                A full-stack fantasy football app with sortable draftboard, tiers (T1–T4), favorites by year, and live stat columns (fantasy, rushing, receiving, passing). FastAPI backend + Next.js/TypeScript frontend with Tailwind CSS.
              </p>

              {/* GitHub link */}
              <a
                href="https://github.com/ckwame-jpg/fantasy-tool"
                className="inline-block mt-4 text-[#F5F5F5] hover:text-white transition-transform hover:scale-110"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Project Repository"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 transition-all duration-300 hover:scale-110 hover:text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12a12.013 12.013 0 008.208 11.385c.6.111.82-.26.82-.577v-2.065c-3.338.726-4.043-1.61-4.043-1.61-.546-1.387-1.334-1.756-1.334-1.756-1.091-.745.083-.73.083-.73 1.205.084 1.84 1.238 1.84 1.238 1.072 1.835 2.812 1.305 3.498.998.108-.777.419-1.305.76-1.604-2.665-.304-5.466-1.333-5.466-5.933 0-1.31.469-2.381 1.235-3.22-.123-.304-.535-1.523.117-3.176 0 0 1.007-.322 3.3 1.23a11.487 11.487 0 016.003 0c2.292-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.872.12 3.176.769.839 1.233 1.91 1.233 3.22 0 4.61-2.803 5.625-5.475 5.921.43.37.813 1.103.813 2.222v3.293c0 .32.218.694.825.576A12.015 12.015 0 0024 12c0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </motion.div>
          </section>

          <section id="experience" ref={experienceRef} className="scroll-mt-16 border-t border-white/10 pt-10 pb-60">
            <h2 className="text-2xl font-semibold text-[#F5F5F5] mb-6">experience</h2>
            <div className="space-y-10 sm:ml-0 leading-loose">
              <div className="grid sm:grid-cols-[150px_1fr] sm:gap-10 items-start">
                <p className="text-base text-[#F5F5F5]/60 mb-1 sm:mb-0">Oct 2024 — Present</p>
                <div>
                  <h3 className="text-xl font-semibold text-[#F5F5F5]">VAR Technical Manager · Sportec Solutions</h3>
                  <p className="text-[#F5F5F5]/80 text-base mt-1">
                    Set up, monitored, and troubleshot technical video systems for MLS and international matches. Ensured 100% uptime of VAR and MSR equipment and coordinated seamlessly with referees and broadcast staff.
                  </p>
                </div>
              </div>
              <div className="grid sm:grid-cols-[150px_1fr] sm:gap-10 items-start">
                <p className="text-base text-[#F5F5F5]/60 mb-1 sm:mb-0">2021 — 2023</p>
                <div>
                  <h3 className="text-xl font-semibold text-[#F5F5F5]">Data Entry Operator · Amazon</h3>
                  <p className="text-[#F5F5F5]/80 text-base mt-1">
                    Managed high-volume data entry with 99.8% accuracy across multiple systems. Streamlined digital recordkeeping and consistently exceeded productivity benchmarks.
                  </p>
                </div>
              </div>
            </div>
          </section>
          <div className="text-base text-[#F5F5F5]/50 mt-12 mb-35 md:pl-4">
            <p>
              designed and built in VS Code. built with Next.js and Tailwind CSS, version controlled with GitHub, and deployed via Vercel. coded in TypeScript.
            </p>
          </div>
        </div>
      </main>
      </div>
    </>
  );
}
