"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowDown, ArrowUpRight, Asterisk, Command, Github, Instagram, Linkedin, Menu, MoveUpRight, X } from "lucide-react";

const projects = [
  { id: "01", name: "KARKI AI", type: "AI / PRODUCT", note: "Featured project", position: "window-one" },
  { id: "02", name: "PROJECT TWO", type: "EXPERIMENT / WEB", note: "Preview awaiting real project asset", position: "window-two" },
  { id: "03", name: "PROJECT THREE", type: "INTERACTIVE / LAB", note: "Preview awaiting real project asset", position: "window-three" },
];

function FloatingUniverse() {
  const area = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 55, damping: 20 });
  const sy = useSpring(my, { stiffness: 55, damping: 20 });

  useEffect(() => {
    const node = area.current;
    if (!node) return;
    const move = (event: MouseEvent) => {
      const rect = node.getBoundingClientRect();
      mx.set((event.clientX - rect.left - rect.width / 2) / rect.width);
      my.set((event.clientY - rect.top - rect.height / 2) / rect.height);
    };
    const leave = () => { mx.set(0); my.set(0); };
    node.addEventListener("mousemove", move);
    node.addEventListener("mouseleave", leave);
    return () => { node.removeEventListener("mousemove", move); node.removeEventListener("mouseleave", leave); };
  }, [mx, my]);

  return (
    <section id="work" className="universe-section">
      <div className="section-topline"><span>01 / SELECTED WORK</span><span>AN OPEN CANVAS — 2026</span></div>
      <div className="universe-heading"><p>MADE TO MOVE.</p><h2>WORK<span> / </span>IN<br className="mobile-break" /> PROGRESS<span className="acid">.</span></h2></div>
      <div ref={area} className="universe-stage">
        <motion.div className="universe-orbit" style={{ x: sx, y: sy }}>
          <div className="orbit-ring ring-a" /><div className="orbit-ring ring-b" />
          <motion.button className="browser-window window-one" onClick={() => setActive("01")} whileHover={{ scale: 1.035, zIndex: 8 }} animate={{ y: [0, -13, 0], rotate: [-5, -3.5, -5] }} transition={{ y: { duration: 7, repeat: Infinity, ease: "easeInOut" }, rotate: { duration: 9, repeat: Infinity, ease: "easeInOut" } }}>
            <BrowserBar title="karki-ai / overview" />
            <div className="preview-karki"><span className="preview-index">01 — FEATURED PROJECT</span><div className="preview-karki-title">KARKI<br /><i>AI.</i></div><div className="preview-karki-foot"><span>PRODUCT / AI</span><span>OPEN PROJECT ↗</span></div></div>
          </motion.button>
          <motion.button className="browser-window window-two" onClick={() => setActive("02")} whileHover={{ scale: 1.04, zIndex: 8 }} animate={{ y: [0, 15, 0], rotate: [7, 5, 7] }} transition={{ y: { duration: 8, repeat: Infinity, ease: "easeInOut" }, rotate: { duration: 10, repeat: Infinity, ease: "easeInOut" } }}>
            <BrowserBar title="project-preview / 02" /><div className="preview-empty"><span>02</span><div className="preview-empty-mark">＋</div><p>REAL PROJECT<br />PREVIEW NEEDED</p><small>ASSET SLOT / 02</small></div>
          </motion.button>
          <motion.button className="browser-window window-three" onClick={() => setActive("03")} whileHover={{ scale: 1.04, zIndex: 8 }} animate={{ y: [0, -9, 0], rotate: [-2, 0, -2] }} transition={{ y: { duration: 6.5, repeat: Infinity, ease: "easeInOut" }, rotate: { duration: 8, repeat: Infinity, ease: "easeInOut" } }}>
            <BrowserBar title="experiment / 03" /><div className="preview-empty preview-empty-light"><span>03</span><div className="preview-empty-mark">＋</div><p>ANOTHER IDEA<br />IN THE MAKING</p><small>ASSET SLOT / 03</small></div>
          </motion.button>
        </motion.div>
        <div className="universe-note note-left"><span className="note-dot" /> DRAG YOUR CURSOR<br />THROUGH THE SPACE</div>
        <div className="universe-note note-right">SELECT A WINDOW<br />TO INSPECT <ArrowUpRight size={14} /></div>
        <div className="universe-crosshair">✳</div>
      </div>
      <div className="universe-caption"><span>THREE WINDOWS / ONE CREATIVE UNIVERSE</span><span>PROJECTS OPEN AS THEY BECOME REAL</span></div>
      <AnimatePresence>
        {active && <motion.div className="project-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div className="project-dialog" initial={{ y: 40, scale: .97 }} animate={{ y: 0, scale: 1 }} exit={{ y: 20, scale: .98 }}>
            <button className="dialog-close" onClick={() => setActive(null)} aria-label="Close project"><X size={20} /></button>
            <span className="eyebrow">PROJECT / {active}</span>
            <h3>{active === "01" ? "KARKI AI" : active === "02" ? "PROJECT TWO" : "PROJECT THREE"}</h3>
            <p>{active === "01" ? "The featured project. Its real screenshots, description, technology details and destination link will be added when supplied." : "This is an editable project slot. Add a real project and its actual preview before publishing it."}</p>
            <span className="dialog-status">CONTENT STATUS — AWAITING VERIFIED ASSETS</span>
          </motion.div>
        </motion.div>}
      </AnimatePresence>
    </section>
  );
}

function BrowserBar({ title }: { title: string }) {
  return <div className="browser-bar"><div className="browser-dots"><i /><i /><i /></div><span>{title}</span><div className="browser-menu">•••</div></div>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [time, setTime] = useState("");
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const elements = gsap.utils.toArray<HTMLElement>(".scroll-reveal");
    elements.forEach((element) => {
      gsap.fromTo(element, { y: 42, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: element, start: "top 86%", once: true } });
    });
    return () => { ScrollTrigger.getAll().forEach((trigger) => trigger.kill()); };
  }, []);

  useEffect(() => {
    const update = () => setTime(new Intl.DateTimeFormat("en", { timeZone: "Asia/Kathmandu", hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date()));
    update(); const id = window.setInterval(update, 60000); return () => window.clearInterval(id);
  }, []);

  return (
    <main className="portfolio-shell">
      <div className="grain" />
      <header className="site-header">
        <a className="brand-mark" href="#top" aria-label="Sarwzya Karki home">SK<span>®</span></a>
        <nav className={menuOpen ? "nav-links nav-open" : "nav-links"}>
          <a href="#work" onClick={() => setMenuOpen(false)}>WORK <sup>01</sup></a><a href="#about" onClick={() => setMenuOpen(false)}>ABOUT <sup>02</sup></a><a href="#contact" onClick={() => setMenuOpen(false)}>CONTACT <sup>03</sup></a>
        </nav>
        <div className="header-right"><span className="availability"><i /> AVAILABLE FOR IDEAS</span><span className="local-time">{time || "—"} NPT</span><button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X /> : <Menu />}</button></div>
      </header>

      <section id="top" className="hero-section">
        <div className="hero-meta"><span>INDEPENDENT CREATIVE DEVELOPER</span><span>BASED IN NEPAL · 27°N 85°E</span></div>
        <div className="hero-title-wrap"><motion.div className="hero-kicker" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .15, duration: .7 }}>DIGITAL EXPERIENCES / 2026</motion.div>
          <motion.h1 initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: .045, delayChildren: .25 } } }}>
            {"SARWZYA".split("").map((letter, i) => <motion.span key={i} variants={{ hidden: { y: "110%", opacity: 0, filter: "blur(12px)" }, visible: { y: "0%", opacity: 1, filter: "blur(0px)", transition: { duration: .9, ease: [0.16, 1, 0.3, 1] } } }}>{letter}</motion.span>)}
          </motion.h1>
          <div className="hero-second-line"><motion.h1 className="outline-name" initial={{ clipPath: "inset(0 100% 0 0)" }} animate={{ clipPath: "inset(0 0% 0 0)" }} transition={{ delay: .75, duration: 1.15, ease: [0.76, 0, 0.24, 1] }}>KARKI<span className="acid">.</span></motion.h1><motion.p initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.1, duration: .8 }}>I MAKE THE<br />INTERNET FEEL<br /><em>DIFFERENT.</em></motion.p></div>
        </div>
        <div className="hero-bottom"><span className="hero-asterisk"><Asterisk size={18} /> DESIGN-LED DEVELOPMENT</span><p>Curiosity first. Craft always.<br />Building ideas into digital experiences.</p><a href="#work" className="scroll-cue"><span>SCROLL TO EXPLORE</span><ArrowDown size={16} /></a></div>
        <div className="hero-side-index">PORTFOLIO / 001 — 026</div>
      </section>

      <div className="ticker" aria-hidden="true"><div className="ticker-track">{Array.from({ length: 4 }).map((_, i) => <span key={i}>DESIGN WITH INTENT <b>✳</b> CODE WITH CURIOSITY <b>✳</b> MAKE SOMETHING MATTER <b>✳</b></span>)}</div></div>

      <FloatingUniverse />

      <section id="about" className="about-section scroll-reveal">
        <div className="section-topline"><span>02 / THE PERSON BEHIND THE PIXELS</span><span>A SHORT INTRODUCTION</span></div>
        <div className="about-grid"><div className="about-stamp"><Command size={26} /><span>THINK<br />MAKE<br />REFINE</span><Asterisk size={34} /></div><div className="about-copy"><p className="eyebrow">A LITTLE ABOUT ME</p><h2>NOT HERE TO<br />MAKE MORE OF<br /><span>THE SAME.</span></h2><p className="about-description">I’m Sarwzya Karki. I’m interested in the intersection of design, technology and interaction — exploring how thoughtful details can turn a website into an experience.</p><p className="about-placeholder">This introduction is editable. Add a personal story and verified background here.</p></div></div>
      </section>

      <section className="toolkit-section scroll-reveal"><div className="section-topline"><span>03 / CREATIVE TOOLKIT</span><span>TOOLS ARE ONLY THE START</span></div><div className="toolkit-layout"><h2>THE<br /><span>TOOLBOX.</span></h2><div className="toolkit-list"><div><span>01</span><p>FRONTEND DEVELOPMENT</p><small>Next.js · React · TypeScript</small></div><div><span>02</span><p>MOTION & INTERACTION</p><small>GSAP · Framer Motion</small></div><div><span>03</span><p>DESIGN & PROTOTYPING</p><small>Tools and proficiency to be confirmed</small></div></div></div></section>

      <section id="contact" className="contact-section scroll-reveal"><div className="section-topline"><span>04 / START A CONVERSATION</span><span>THE NEXT THING STARTS HERE</span></div><p className="eyebrow">HAVE SOMETHING INTERESTING IN MIND?</p><h2>LET’S MAKE<br /><span>IT MATTER.</span></h2><p className="contact-note">Have an idea, a question, or something worth building? Reach out.</p><span className="contact-link contact-link-pending">CONTACT LINK TO BE ADDED <MoveUpRight size={17} /></span></section>

      <footer className="site-footer"><a className="brand-mark" href="#top">SK<span>®</span></a><span>© 2026 SARWZYA KARKI</span><span>MADE WITH INTENTION <b>✳</b></span><div className="social-links"><a href="https://github.com/karkihubbb" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={16} /></a><a href="#contact" aria-label="Instagram link to be added"><Instagram size={16} /></a><a href="#contact" aria-label="LinkedIn link to be added"><Linkedin size={16} /></a></div></footer>
    </main>
  );
}
