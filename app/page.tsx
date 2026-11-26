import { ArrowDownRight, ArrowUpRight, Asterisk, MoveUpRight } from "lucide-react";

const nav = [{ label: "Work", href: "#work" }, { label: "About", href: "#about" }, { label: "Contact", href: "#contact" }];

export default function Home() {
  return (
    <main className="overflow-hidden">
      <div className="noise" />
      <header className="relative z-10 flex items-center justify-between px-6 py-6 md:px-12">
        <a href="#" className="text-sm font-semibold tracking-[-.04em]">SK<span className="text-[#d5ff3f]">.</span></a>
        <nav className="flex gap-6 text-[11px] uppercase tracking-[.16em] text-white/55 md:gap-10">
          {nav.map((item) => <a key={item.label} href={item.href} className="transition-colors hover:text-[#d5ff3f]">{item.label}</a>)}
        </nav>
        <a href="#contact" className="hidden items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-[10px] uppercase tracking-[.14em] transition hover:border-[#d5ff3f] hover:text-[#d5ff3f] sm:flex">Let&apos;s talk <MoveUpRight size={13} /></a>
      </header>

      <section className="relative grid min-h-[84vh] items-center px-6 pb-24 pt-20 md:min-h-[88vh] md:px-12">
        <div className="grid-lines absolute inset-0 opacity-30 [mask-image:linear-gradient(to_bottom,black,transparent_88%)]" />
        <div className="relative z-[1] mx-auto w-full max-w-[1400px]">
          <div className="mb-8 flex items-center gap-3 text-[10px] uppercase tracking-[.22em] text-white/45 reveal-up"><span className="h-2 w-2 rounded-full bg-[#d5ff3f] shadow-[0_0_16px_#d5ff3f]" /> Independent creative developer <span className="ml-auto hidden md:block">Portfolio / 2026</span></div>
          <h1 className="reveal-up text-[clamp(4rem,12.8vw,12rem)] font-semibold leading-[.78] tracking-[-.095em]">
            SARWZYA<br /><span className="outline-text">KARKI</span><span className="text-[#d5ff3f]">.</span>
          </h1>
          <div className="mt-12 flex flex-col justify-between gap-8 md:ml-[35%] md:flex-row md:items-end">
            <p className="max-w-sm text-base leading-relaxed text-white/55 md:text-lg">I build digital experiences with a focus on thoughtful design, technology, and details that matter.</p>
            <a href="#work" className="group flex h-14 w-14 items-center justify-center rounded-full bg-[#d5ff3f] text-black transition-transform hover:rotate-45"><ArrowDownRight size={25} /></a>
          </div>
        </div>
        <div className="absolute bottom-6 left-6 right-6 flex justify-between text-[9px] uppercase tracking-[.2em] text-white/30 md:left-12 md:right-12"><span>Scroll to explore</span><span>Design · Code · Ideas</span></div>
      </section>

      <section id="work" className="px-6 py-24 md:px-12 md:py-36">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-12 flex items-end justify-between border-b border-white/15 pb-5"><div><p className="mb-3 text-[10px] uppercase tracking-[.2em] text-[#d5ff3f]">01 / Selected work</p><h2 className="text-4xl tracking-[-.07em] md:text-6xl">Things I&apos;ve made<span className="text-[#d5ff3f]">.</span></h2></div><span className="hidden text-xs text-white/35 md:block">A growing collection</span></div>
          <a href="#contact" className="project-card group relative block overflow-hidden rounded-sm border border-white/15 bg-[#11120d] p-6 md:p-12">
            <div className="absolute right-0 top-0 h-full w-[65%] opacity-70" style={{background:"radial-gradient(ellipse at 70% 45%, rgba(213,255,63,.18), transparent 55%)"}} />
            <div className="relative z-[1] flex min-h-[330px] flex-col justify-between md:min-h-[420px]">
              <div className="flex items-center justify-between text-[10px] uppercase tracking-[.2em] text-white/40"><span>Featured project / 01</span><span>AI · Product</span></div>
              <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
                <div><p className="mb-3 text-sm text-[#d5ff3f]">A project by Sarwzya</p><h3 className="text-[clamp(3.5rem,9vw,8rem)] font-semibold leading-[.8] tracking-[-.09em]">KARKI AI<span className="text-[#d5ff3f]">.</span></h3><p className="mt-6 max-w-md text-sm leading-relaxed text-white/45">An AI project. A closer look at the product and its experience is coming soon.</p></div>
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/25 transition group-hover:border-[#d5ff3f] group-hover:bg-[#d5ff3f] group-hover:text-black"><ArrowUpRight size={22} /></span>
              </div>
            </div>
          </a>
          <p className="mt-5 text-[10px] uppercase tracking-[.18em] text-white/30">More work will appear here as projects are ready to share.</p>
        </div>
      </section>

      <section id="about" className="border-y border-white/10 px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto grid max-w-[1400px] gap-12 md:grid-cols-[.7fr_1.3fr]">
          <div><p className="mb-3 text-[10px] uppercase tracking-[.2em] text-[#d5ff3f]">02 / A little about me</p><h2 className="text-4xl tracking-[-.07em] md:text-5xl">Curious by<br />nature<span className="text-[#d5ff3f]">.</span></h2></div>
          <div className="max-w-2xl"><Asterisk className="mb-8 text-[#d5ff3f]" size={34} /><p className="text-2xl leading-[1.35] tracking-[-.04em] text-white/75 md:text-4xl">I enjoy exploring the space where design and technology meet — turning ideas into digital experiences that feel clear, useful, and memorable.</p><p className="mt-8 text-sm leading-relaxed text-white/40">This portfolio is a work in progress. More about me, my process, and the projects I can share will be added as they take shape.</p></div>
        </div>
      </section>

      <section id="contact" className="px-6 py-28 md:px-12 md:py-40">
        <div className="mx-auto max-w-[1400px]">
          <p className="mb-8 text-[10px] uppercase tracking-[.2em] text-[#d5ff3f]">03 / Get in touch</p>
          <h2 className="max-w-5xl text-[clamp(3.4rem,10vw,9rem)] font-semibold leading-[.82] tracking-[-.09em]">HAVE AN IDEA?<br /><span className="outline-text">LET&apos;S MAKE IT.</span></h2>
          <a href="#about" className="mt-12 inline-flex items-center gap-3 border-b border-[#d5ff3f] pb-3 text-sm text-[#d5ff3f] transition hover:gap-6">Contact details coming soon <MoveUpRight size={16} /></a>
        </div>
      </section>

      <footer className="flex flex-col justify-between gap-4 border-t border-white/10 px-6 py-6 text-[10px] uppercase tracking-[.16em] text-white/35 md:flex-row md:px-12"><span>© 2026 Sarwzya Karki</span><span>Made with intention <span className="text-[#d5ff3f]">✳</span></span><a href="#" className="hover:text-white">Back to top ↑</a></footer>
    </main>
  );
}