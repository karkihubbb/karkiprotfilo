"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowDown, ArrowUpRight, Github, Menu, X } from "lucide-react";

function PlanetScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "high-performance" });
    } catch {
      return;
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, window.innerWidth / window.innerHeight, 0.1, 120);
    camera.position.set(0, 0, 7.8);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, window.innerWidth < 700 ? 1.25 : 1.7));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.setClearColor(0x04060f, 0);

    const world = new THREE.Group();
    const planet = new THREE.Group();
    world.add(planet);
    scene.add(world);

    const vertexShader = `
      varying vec3 vLocal;
      varying vec3 vNormalView;
      varying vec3 vViewPosition;
      void main() {
        vLocal = position;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        vNormalView = normalize(normalMatrix * normal);
        vViewPosition = -mvPosition.xyz;
        gl_Position = projectionMatrix * mvPosition;
      }
    `;

    const noiseShader = `
      float hash31(vec3 p) {
        p = fract(p * 0.1031);
        p += dot(p, p.yzx + 33.33);
        return fract((p.x + p.y) * p.z);
      }
      float noise3(vec3 x) {
        vec3 i = floor(x);
        vec3 f = fract(x);
        f = f * f * (3.0 - 2.0 * f);
        return mix(mix(mix(hash31(i), hash31(i + vec3(1,0,0)), f.x),
                       mix(hash31(i + vec3(0,1,0)), hash31(i + vec3(1,1,0)), f.x), f.y),
                   mix(mix(hash31(i + vec3(0,0,1)), hash31(i + vec3(1,0,1)), f.x),
                       mix(hash31(i + vec3(0,1,1)), hash31(i + vec3(1,1,1)), f.x), f.y), f.z);
      }
      float fbm(vec3 p) {
        float value = 0.0;
        float amp = 0.5;
        for (int i = 0; i < 5; i++) {
          value += noise3(p) * amp;
          p *= 2.03;
          amp *= 0.5;
        }
        return value;
      }
    `;

    const planetMaterial = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 } },
      vertexShader,
      fragmentShader: `
        uniform float uTime;
        varying vec3 vLocal;
        varying vec3 vNormalView;
        varying vec3 vViewPosition;
        ${noiseShader}
        void main() {
          vec3 n = normalize(vNormalView);
          vec3 p = normalize(vLocal);
          vec3 lightDir = normalize(vec3(-0.58, 0.30, 0.76));
          float daylight = max(dot(n, lightDir), 0.0);
          float continent = fbm(p * 5.1 + vec3(0.0, 0.0, 0.2));
          float land = smoothstep(0.455, 0.535, continent);
          float terrain = fbm(p * 17.0);
          vec3 ocean = mix(vec3(0.008, 0.035, 0.095), vec3(0.018, 0.12, 0.20), terrain * 0.8);
          vec3 landColor = mix(vec3(0.025, 0.12, 0.14), vec3(0.16, 0.34, 0.31), smoothstep(0.35, 0.72, terrain));
          vec3 surface = mix(ocean, landColor, land);
          float coast = smoothstep(0.42, 0.49, continent) * (1.0 - smoothstep(0.52, 0.59, continent));
          surface += vec3(0.10, 0.30, 0.31) * coast * 0.22;
          float night = 1.0 - smoothstep(-0.18, 0.34, dot(n, lightDir));
          float cityNoise = fbm(p * 62.0 + vec3(3.0, 1.0, 2.0));
          float cityLights = smoothstep(0.68, 0.79, cityNoise) * land * night;
          surface = surface * (0.20 + daylight * 0.95);
          surface += vec3(1.0, 0.62, 0.28) * cityLights * 1.45;
          float oceanShimmer = pow(max(0.0, fbm(p * 34.0 + vec3(0.0, uTime * 0.025, 0.0)) - 0.49), 2.0);
          surface += oceanShimmer * (1.0 - land) * daylight * vec3(0.16, 0.48, 0.62);
          float rim = pow(1.0 - max(dot(normalize(vViewPosition), n), 0.0), 3.0);
          surface += vec3(0.16, 0.48, 0.72) * rim * 0.78;
          gl_FragColor = vec4(surface, 1.0);
        }
      `,
    });

    const sphere = new THREE.Mesh(new THREE.SphereGeometry(1.78, 96, 96), planetMaterial);
    planet.add(sphere);

    const cloudMaterial = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: { uTime: { value: 0 } },
      vertexShader,
      fragmentShader: `
        uniform float uTime;
        varying vec3 vLocal;
        varying vec3 vNormalView;
        varying vec3 vViewPosition;
        ${noiseShader}
        void main() {
          vec3 p = normalize(vLocal);
          float clouds = fbm(p * 11.0 + vec3(uTime * 0.012, 0.0, uTime * 0.006));
          clouds = smoothstep(0.54, 0.68, clouds);
          float edge = pow(1.0 - max(dot(normalize(vNormalView), normalize(vViewPosition)), 0.0), 1.7);
          float day = 0.24 + 0.76 * max(dot(normalize(vNormalView), normalize(vec3(-0.58,0.30,0.76))), 0.0);
          float alpha = clouds * day * (0.34 + edge * 0.28);
          gl_FragColor = vec4(vec3(0.68, 0.82, 0.91), alpha);
        }
      `,
    });
    const clouds = new THREE.Mesh(new THREE.SphereGeometry(1.805, 80, 80), cloudMaterial);
    planet.add(clouds);

    const atmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(1.91, 64, 64),
      new THREE.ShaderMaterial({
        transparent: true,
        side: THREE.BackSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexShader: `varying vec3 vNormalView; varying vec3 vViewPosition; void main(){ vec4 mv=modelViewMatrix*vec4(position,1.0); vNormalView=normalize(normalMatrix*normal); vViewPosition=-mv.xyz; gl_Position=projectionMatrix*mv; }`,
        fragmentShader: `varying vec3 vNormalView; varying vec3 vViewPosition; void main(){ float rim=pow(1.0-max(dot(normalize(vNormalView),normalize(vViewPosition)),0.0),2.5); gl_FragColor=vec4(vec3(0.10,0.34,0.72),rim*0.56); }`,
      })
    );
    planet.add(atmosphere);

    const starPositions = new Float32Array(1500 * 3);
    for (let i = 0; i < 1500; i++) {
      const radius = 24 + Math.random() * 52;
      const theta = Math.random() * Math.PI * 2;
      const z = Math.random() * 2 - 1;
      const ring = Math.sqrt(1 - z * z);
      starPositions[i * 3] = radius * ring * Math.cos(theta);
      starPositions[i * 3 + 1] = radius * z;
      starPositions[i * 3 + 2] = radius * ring * Math.sin(theta);
    }
    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    const stars = new THREE.Points(starGeometry, new THREE.PointsMaterial({ color: 0xb9d5ee, size: 0.075, transparent: true, opacity: 0.7, sizeAttenuation: true }));
    scene.add(stars);

    const stops = [
      { p: 0, x: 1.38, y: -0.82, s: 1.12 },
      { p: 0.32, x: -1.38, y: 0.05, s: 0.84 },
      { p: 0.68, x: 1.30, y: -0.08, s: 0.82 },
      { p: 1, x: 0.28, y: -0.30, s: 0.76 },
    ];
    const sample = (progress: number, key: "x" | "y" | "s") => {
      for (let i = 0; i < stops.length - 1; i++) {
        if (progress <= stops[i + 1].p) {
          const a = stops[i], b = stops[i + 1];
          const t0 = THREE.MathUtils.clamp((progress - a.p) / (b.p - a.p), 0, 1);
          const t = t0 * t0 * (3 - 2 * t0);
          return THREE.MathUtils.lerp(a[key], b[key], t);
        }
      }
      return stops[stops.length - 1][key];
    };

    let scrollProgress = 0;
    let current = { x: stops[0].x, y: stops[0].y, s: stops[0].s };
    let frame = 0;
    let previous = performance.now();
    const updateScroll = () => {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      scrollProgress = THREE.MathUtils.clamp(window.scrollY / maxScroll, 0, 1);
    };
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });

    const resize = () => {
      const width = window.innerWidth, height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, width < 700 ? 1.25 : 1.7));
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", resize);

    const animate = (now: number) => {
      frame = requestAnimationFrame(animate);
      const dt = Math.min((now - previous) / 1000, 0.05);
      previous = now;
      const target = {
        x: sample(scrollProgress, "x"),
        y: sample(scrollProgress, "y"),
        s: sample(scrollProgress, "s"),
      };
      const side = window.innerWidth < 700 ? 0.28 : 1;
      const damping = reduced ? 1 : Math.min(1, dt * 2.6);
      current.x = THREE.MathUtils.lerp(current.x, target.x * side, damping);
      current.y = THREE.MathUtils.lerp(current.y, window.innerWidth < 700 ? target.y - 0.25 : target.y, damping);
      current.s = THREE.MathUtils.lerp(current.s, target.s * (window.innerWidth < 700 ? 0.78 : 1), damping);
      world.position.set(current.x, current.y, 0);
      world.scale.setScalar(current.s);
      if (!reduced) {
        planet.rotation.y += dt * 0.035;
        planet.rotation.z = 0.20;
        clouds.rotation.y += dt * 0.012;
        stars.rotation.y -= dt * 0.0015;
      }
      planetMaterial.uniforms.uTime.value = now * 0.001;
      cloudMaterial.uniforms.uTime.value = now * 0.001;
      renderer.render(scene, camera);
    };
    frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", resize);
      sphere.geometry.dispose();
      planetMaterial.dispose();
      clouds.geometry.dispose();
      cloudMaterial.dispose();
      atmosphere.geometry.dispose();
      atmosphere.material.dispose();
      starGeometry.dispose();
      stars.material.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="planet-canvas" aria-hidden="true" />;
}

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 0.7, 0.2, 1] as const } },
};

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const reducedMotion = useReducedMotion();

  const enter: Variants = reducedMotion ? { hidden: {}, visible: {} } : reveal;

  return (
    <main className="portfolio-shell" id="top">
      <PlanetScene />
      <div className="ambient-shade" aria-hidden="true" />
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Sarwzya Karki home"><span className="brand-symbol">S</span><span>KARKI<span className="brand-period">.</span></span></a>
        <nav className={menuOpen ? "nav-links nav-open" : "nav-links"} aria-label="Main navigation">
          <a href="#work" onClick={() => setMenuOpen(false)}>Work</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </nav>
        <a className="header-cta" href="https://github.com/karkihubbb" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={14} /></a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close navigation" : "Open navigation"}>{menuOpen ? <X size={19} /> : <Menu size={19} />}</button>
      </header>

      <section className="hero-section">
        <div className="hero-meta"><span>INDEPENDENT DEVELOPER</span><span>NEPAL · DIGITAL CRAFT</span></div>
        <div className="hero-content">
          <motion.p className="eyebrow" variants={enter} initial="hidden" animate="visible" transition={{ delay: 0.12 }}>DESIGN-LED DEVELOPMENT</motion.p>
          <motion.h1 initial="hidden" animate="visible" variants={enter} transition={{ delay: 0.22 }}>Sarwzya<br /><span>Karki<span className="hero-dot">.</span></span></motion.h1>
          <motion.div className="hero-bottom" variants={enter} initial="hidden" animate="visible" transition={{ delay: 0.42 }}>
            <p>Creative developer exploring the space between thoughtful design, technology and interaction.</p>
            <a className="text-link" href="#work">Explore selected work <ArrowDown size={15} /></a>
          </motion.div>
        </div>
        <div className="hero-index"><span>PORTFOLIO</span><span>2026</span></div>
      </section>

      <section className="work-section section-wrap" id="work">
        <motion.div className="section-heading" variants={enter} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }}>
          <p className="eyebrow">01 / SELECTED WORK</p>
          <h2>A closer look at<br /><span>what I’m building.</span></h2>
        </motion.div>
        <motion.article className="project-feature" variants={enter} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.18 }}>
          <a className="project-art" href="https://karkiai.onrender.com/" target="_blank" rel="noreferrer" aria-label="Visit Karki AI">
            <div className="project-art-top"><span>FEATURED PROJECT / 001</span><span>LIVE PROJECT ↗</span></div>
            <div className="project-orbit orbit-one" /><div className="project-orbit orbit-two" />
            <div className="project-core"><span>k</span></div>
            <div className="project-wordmark">KARKI<span>AI</span></div>
            <div className="project-art-bottom"><span>INDEPENDENT PRODUCT</span><span>OPEN PROJECT <ArrowUpRight size={15} /></span></div>
          </a>
          <div className="project-info">
            <div><p className="eyebrow">01 — AI / DIGITAL PRODUCT</p><h3>Karki AI</h3><p className="project-description">An independent AI-focused project exploring the intersection of useful technology and considered interface design.</p></div>
            <a className="project-link" href="https://karkiai.onrender.com/" target="_blank" rel="noreferrer">Visit live project <ArrowUpRight size={16} /></a>
          </div>
        </motion.article>
      </section>

      <section className="about-section section-wrap" id="about">
        <motion.div className="section-heading" variants={enter} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }}>
          <p className="eyebrow">02 / A LITTLE ABOUT ME</p>
          <h2>Curious by nature.<br /><span>Intentional by design.</span></h2>
        </motion.div>
        <div className="about-content">
          <div className="about-mark" aria-hidden="true">SK<span>®</span></div>
          <motion.p variants={enter} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }}>I’m Sarwzya — a developer interested in how design and technology come together. I enjoy shaping clear interfaces, thoughtful interactions and digital experiences where the details feel considered.</motion.p>
        </div>
      </section>

      <section className="capabilities-section section-wrap">
        <div className="section-heading compact-heading"><p className="eyebrow">03 / WHAT I EXPLORE</p><h2>Good work starts<br /><span>with good thinking.</span></h2></div>
        <div className="capability-list">
          <div><span>01</span><h3>Interface development</h3><p>Building responsive, accessible interfaces with care for the details.</p></div>
          <div><span>02</span><h3>Interaction & motion</h3><p>Using movement with purpose to make experiences feel clear and alive.</p></div>
          <div><span>03</span><h3>Digital product design</h3><p>Exploring structure, usability and visual systems for the web.</p></div>
        </div>
      </section>

      <section className="contact-section section-wrap" id="contact">
        <motion.p className="eyebrow" variants={enter} initial="hidden" whileInView="visible" viewport={{ once: true }}>04 / GET IN TOUCH</motion.p>
        <motion.h2 variants={enter} initial="hidden" whileInView="visible" viewport={{ once: true }}>Have a good<br /><span>idea in mind?</span></motion.h2>
        <p className="contact-copy">I’m always interested in thoughtful ideas and interesting things to build.</p>
        <a className="contact-button" href="https://github.com/karkihubbb" target="_blank" rel="noreferrer">Find me on GitHub <ArrowUpRight size={16} /></a>
      </section>

      <footer className="site-footer">
        <a className="brand" href="#top"><span className="brand-symbol">S</span><span>KARKI<span className="brand-period">.</span></span></a>
        <span>© {new Date().getFullYear()} SARWZYA KARKI</span>
        <a href="https://github.com/karkihubbb" target="_blank" rel="noreferrer" aria-label="GitHub profile"><Github size={17} /></a>
      </footer>
    </main>
  );
}
