"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, ArrowRight, Menu, X } from "lucide-react";

const reveal: Variants = {
  hidden: { opacity: 0, y: 34 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

function BrowserWindow({ className = "", children }: { className?: string; children: ReactNode }) {
  return (
    <div className={`browser-window ${className}`}>
      <div className="browser-bar">
        <div className="browser-dots"><i /><i /><i /></div>
        <div className="browser-address">karkiai.onrender.com</div>
        <span className="browser-menu">•••</span>
      </div>
      {children}
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const reducedMotion = useReducedMotion();
  const enter: Variants = reducedMotion ? { hidden: {}, visible: {} } : reveal;

  return (
    <main className="portfolio" id="top">
      <div className="grain" aria-hidden="true" />
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Sarwzya Karki home">SK<span>®</span></a>
        <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"}>{menuOpen ? <X /> : <Menu />}</button>
        <nav className={menuOpen ? "main-nav is-open" : "main-nav"} aria-label="Main navigation">
          <a href="#work" onClick={() => setMenuOpen(false)}>Work <span>01</span></a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About <span>02</span></a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact <span>03</span></a>
        </nav>
        <a className="availability" href="https://github.com/karkihubbb" target="_blank" rel="noreferrer"><i /> Open to ideas <ArrowUpRight size={13} /></a>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-topline">
          <span>INDEPENDENT CREATIVE DEVELOPER</span>
          <span>BASED IN NEPAL <b>—</b> 2026</span>
        </div>
        <div className="hero-copy">
          <p className="kicker"><span className="kicker-line" /> DESIGN MINDED. CODE DRIVEN.</p>
          <h1 id="hero-title"><span>SARWZYA</span><em>KARKI<span className="hero-star">✳</span></em></h1>
          <div className="hero-foot">
            <p>Building thoughtful digital experiences through <strong>design, technology</strong> and a little curiosity.</p>
            <a href="#work" className="round-link" aria-label="Explore selected work"><ArrowDownRight size={22} /></a>
          </div>
        </div>

        <div className="showcase" aria-label="Featured project preview">
          <motion.div className="showcase-note note-left" animate={reducedMotion ? undefined : { y: [0, -9, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
            <span className="note-index">SELECTED WORK / 001</span>
            <strong>Karki AI</strong>
            <span className="note-caption">A personal AI project</span>
          </motion.div>
          <motion.div className="showcase-window" initial={{ opacity: 0, y: 55, rotate: 2 }} animate={{ opacity: 1, y: 0, rotate: 0 }} transition={{ duration: 1.1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}>
            <BrowserWindow className="main-browser">
              <div className="live-preview">
                <iframe src="https://karkiai.onrender.com/" title="Live Karki AI project preview" loading="lazy" />
                <a className="preview-open" href="https://karkiai.onrender.com/" target="_blank" rel="noreferrer">OPEN LIVE PROJECT <ArrowUpRight size={13} /></a>
              </div>
            </BrowserWindow>
          </motion.div>
          <motion.div className="showcase-window-small" animate={reducedMotion ? undefined : { y: [0, 12, 0], rotate: [-5, -3, -5] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}>
            <BrowserWindow className="detail-browser">
              <div className="detail-content">
                <span>DESIGN × DEVELOPMENT</span>
                <strong>Ideas into<br />interfaces.</strong>
                <div className="detail-rule" />
                <small>PERSONAL PORTFOLIO / 2026</small>
              </div>
            </BrowserWindow>
          </motion.div>
          <div className="showcase-caption"><span>01 — FEATURED PROJECT</span><span>SCROLL TO EXPLORE <ArrowDownRight size={13} /></span></div>
        </div>
        <div className="hero-side-label">SELECTED DIGITAL WORK <span>↘</span></div>
      </section>

      <section className="work-section section-pad" id="work">
        <div className="section-top">
          <p className="eyebrow">01 / SELECTED WORK</p>
          <span className="section-count">ONE PROJECT. BUILT WITH INTENT.</span>
        </div>
        <motion.div className="work-heading" variants={enter} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }}>
          <h2>Less, but<br /><em>better.</em></h2>
          <p>I’d rather make one thing meaningful than fill a page with things that don’t matter.</p>
        </motion.div>
        <motion.a className="project-row" href="https://karkiai.onrender.com/" target="_blank" rel="noreferrer" variants={enter} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
          <div className="project-number">01</div>
          <div className="project-name"><span>AI / DIGITAL PRODUCT</span><h3>Karki AI</h3><p>An independent project exploring useful AI experiences and interface design.</p></div>
          <div className="project-action"><span>VIEW PROJECT</span><ArrowUpRight size={21} /></div>
        </motion.a>
      </section>

      <section className="about-section section-pad" id="about">
        <div className="section-top">
          <p className="eyebrow">02 / A LITTLE ABOUT ME</p>
          <span className="section-count">THE PERSON BEHIND THE PIXELS</span>
        </div>
        <motion.div className="about-layout" variants={enter} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
          <div className="about-stamp">SK<span>®</span></div>
          <div className="about-copy">
            <h2>Curious about<br /><em>what’s possible.</em></h2>
            <p>I’m Sarwzya — a developer drawn to the space where thoughtful design meets technology. I care about how things work, how they feel, and the small details that make a digital experience memorable.</p>
            <div className="about-tags"><span>INTERFACE DEVELOPMENT</span><span>INTERACTION & MOTION</span><span>DIGITAL PRODUCT DESIGN</span></div>
          </div>
        </motion.div>
      </section>

      <section className="contact-section section-pad" id="contact">
        <div className="section-top">
          <p className="eyebrow">03 / NEXT UP</p>
          <span className="section-count">HAVE SOMETHING IN MIND?</span>
        </div>
        <div className="contact-main">
          <h2>Let’s make<br /><em>it matter.</em></h2>
          <a className="contact-link" href="https://github.com/karkihubbb" target="_blank" rel="noreferrer"><span>GET IN TOUCH</span><ArrowUpRight size={24} /></a>
        </div>
      </section>

      <footer className="footer">
        <a className="wordmark" href="#top">SK<span>®</span></a>
        <span>© {new Date().getFullYear()} SARWZYA KARKI</span>
        <a href="https://github.com/karkihubbb" target="_blank" rel="noreferrer">GITHUB <ArrowUpRight size={12} /></a>
        <a className="back-top" href="#top">BACK TO TOP ↑</a>
      </footer>
    </main>
  );
}
