import squareLogoSrc from "@assets/TEK15_ORIGINAL_1774317532492.jpg";
import wideLogo from "@assets/TEK15_1774318570933.png";
import { useState, useEffect } from "react";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch("https://formspree.io/william@tek15.ca", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setFormStatus("success");
        form.reset();
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans">

      {/* NAV */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/5" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-4">
            <img src={squareLogoSrc} alt="TEK15" className="h-9 w-9 object-contain rounded-sm" />
            <img src={wideLogo} alt="TEK15" className="h-7 object-contain hidden sm:block" />
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {["Philosophy", "Services", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-xs tracking-[0.15em] uppercase text-white/50 hover:text-[#c9a84c] transition-colors duration-300"
              >
                {item}
              </a>
            ))}
            <a
              href="#contact"
              className="text-xs tracking-[0.15em] uppercase px-5 py-2 border border-[#c9a84c]/60 text-[#c9a84c] hover:bg-[#c9a84c] hover:text-black transition-all duration-300 rounded-sm"
            >
              Request Consultation
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-white/60 hover:text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <div className="flex flex-col gap-1.5 w-6">
              <span className={`block h-px bg-current transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block h-px bg-current transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block h-px bg-current transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-[#111111] border-t border-white/5 px-6 py-6 flex flex-col gap-5">
            {["Philosophy", "Services", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-xs tracking-[0.15em] uppercase text-white/50 hover:text-[#c9a84c] transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* HERO */}
      <section
        id="home"
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      >
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0f0f0f] to-[#0a0a0a]" />
        {/* Red Mercedes hero bg — kept dark so colour hints without dominating */}
        <div
          className="absolute inset-0 opacity-35 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url(/nightcar.png)" }}
        />
        {/* Gradient overlay — darkens top/bottom, lets the mid-car glow through */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/45 to-[#0a0a0a]/75" />
        {/* Radial gold glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_60%,rgba(201,168,76,0.07),transparent)]" />
        {/* Grid texture */}
        <div className="absolute inset-0 opacity-[0.025]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)`,
          backgroundSize: "60px 60px"
        }} />
        {/* Decorative line */}
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/15 to-transparent" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          {/* Eyebrow */}
          <p className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase mb-8 font-light">
            Automotive Concierge, Consulting, Inspection & Maintenance 
          </p>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[1.1] mb-6">
            <span className="font-normal text-white">Tailored Care.</span>
          </h1>

          {/* Wide PNG logo as "TEK15" brand mark */}
          <div className="flex justify-center mb-10">
            <div className="relative">
              <div className="absolute inset-0 blur-3xl bg-[#c9a84c]/8 scale-150" />
              <img
                src={wideLogo}
                alt="TEK15"
                className="relative h-16 sm:h-20 md:h-24 object-contain drop-shadow-2xl"
              />
            </div>
          </div>

          {/* Tagline */}
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 mb-12">
            {["Mercedes-Benz", "Porsche", "BMW", "Audi"].map((brand, i, arr) => (
              <span key={brand} className="flex items-center gap-3">
                <span className="text-white/40 text-xs sm:text-sm tracking-widest uppercase font-light">{brand}</span>
                {i < arr.length - 1 && <span className="text-[#c9a84c]/30 text-xs">·</span>}
              </span>
            ))}
          </div>

          {/* Credentials badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            {["C.A.L.E Certified", "Red Seal 310S"].map((cred) => (
              <span
                key={cred}
                className="inline-flex items-center gap-2 px-4 py-1.5 border border-[#c9a84c]/25 text-[#c9a84c]/70 text-xs tracking-[0.15em] uppercase rounded-sm"
              >
                <span className="w-1 h-1 rounded-full bg-[#c9a84c]/60" />
                {cred}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#contact"
              className="px-10 py-4 bg-[#c9a84c] text-black text-xs tracking-[0.2em] uppercase font-semibold hover:bg-[#d4b56a] transition-all duration-300 rounded-sm shadow-[0_0_30px_rgba(201,168,76,0.3)]"
            >
              Request a Consultation
            </a>
            <a
              href="#services"
              className="px-10 py-4 border border-white/15 text-white/60 text-xs tracking-[0.2em] uppercase font-light hover:border-white/40 hover:text-white transition-all duration-300 rounded-sm"
            >
              Our Services
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-30">
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-white to-transparent" />
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section id="philosophy" className="py-0 relative overflow-hidden">
        {/* Full-width image strip */}
        <div className="relative h-72 sm:h-96 overflow-hidden">
          <img
            src="/engine.png"
            alt="European luxury engine"
            className="w-full h-full object-cover object-center"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/70 via-transparent to-[#0a0a0a]/70" />
        </div>

        <div className="py-24 px-6 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0d0d0d] to-[#0a0a0a]" />
          <div className="relative max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-start">

              {/* Left — image + headline */}
              <div>
                <p className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase mb-5 font-light">Our Philosophy</p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-light leading-tight mb-8">
                  White-Glove Care.<br />
                  <span className="text-white/40">No Compromises.</span>
                </h2>

                {/* TEK15 PNG logo displayed in philosophy section */}
                <div className="relative overflow-hidden rounded-sm border border-white/6">
                  <img
                    src={wideLogo}
                    alt="TEK15"
                    className="w-full object-contain bg-black p-10 sm:p-14"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
                </div>

                {/* Credentials */}
                <div className="mt-8 flex flex-wrap gap-3">
                  {[
                    { label: "C.A.L.E Certified", desc: "Canadian Automotive & Licensing Expert" },
                    { label: "Red Seal 310S", desc: "Interprovincial Standards Program" },
                  ].map(({ label, desc }) => (
                    <div key={label} className="flex items-start gap-3 border border-[#c9a84c]/20 rounded-sm px-4 py-3 bg-[#c9a84c]/3">
                      <div className="mt-0.5 w-5 h-5 rounded-full border border-[#c9a84c]/40 flex items-center justify-center flex-shrink-0">
                        <svg className="w-2.5 h-2.5 text-[#c9a84c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-[#c9a84c] text-xs tracking-widest uppercase font-medium">{label}</p>
                        <p className="text-white/30 text-xs mt-0.5">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right — text */}
              <div className="space-y-6 text-white/50 text-sm sm:text-base leading-relaxed font-light md:pt-16">
                <p>
                  TEK15 was built on a single belief: owners of exceptional vehicles deserve an equally exceptional level of care. We reject the one-size-fits-all model of traditional automotive service.
                </p>
                <p>
                  Our approach prioritizes <span className="text-white/80">deep technical mastery</span> — years of hands-on experience with European engineering — paired with radical transparency. You'll always understand exactly what's happening with your vehicle, and why.
                </p>
                <p>
                  From routine maintenance to complex diagnostics, every interaction is handled with the precision and discretion that your investment demands.
                </p>

                {/* Interior image */}
                <div className="relative overflow-hidden rounded-sm border border-white/6 mt-2">
                  <img
                    src="/interior.png"
                    alt="Luxury vehicle interior"
                    className="w-full h-52 object-cover object-center"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                </div>

                <div className="grid grid-cols-3 gap-6 pt-4">
                  {[
                    { value: "100%", label: "Transparent Reporting" },
                    { value: "OEM", label: "Grade Standards" },
                    { value: "1-on-1", label: "Dedicated Attention" },
                  ].map(({ value, label }) => (
                    <div key={label} className="border-t border-[#c9a84c]/20 pt-4">
                      <p className="text-[#c9a84c] text-xl font-semibold mb-1">{value}</p>
                      <p className="text-white/30 text-xs tracking-wider uppercase">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DIVIDER */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      {/* SERVICES */}
      <section id="services" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase mb-4 font-light">What We Offer</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light">Our Services</h2>
          </div>

          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {[
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: "Concierge Maintenance",
                subtitle: "End-to-end service management",
                description:
                  "We handle every aspect of your vehicle's maintenance schedule — from booking and coordination to quality verification and post-service reporting. You stay informed; we handle the details.",
                highlights: ["Scheduling & coordination", "Service oversight", "Post-service documentation"],
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
                title: "On-Site Care",
                subtitle: "Maintenance, diagnostics & repair",
                description:
                  "We come to you. Routine maintenance, diagnostic scanning, and general repair carried out at your location — minimal disruption, maximum convenience for your schedule.",
                highlights: ["Routine maintenance", "Diagnostic scanning", "General repair"],
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                ),
                title: "Premium Inspections",
                subtitle: "Deep-dive technical reports",
                description:
                  "Comprehensive pre-purchase or annual inspections delivered as detailed technical reports. Know exactly what you're working with — mechanically, cosmetically, and financially.",
                highlights: ["200+ point inspection", "Photo documentation", "Cost projection report"],
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                ),
                title: "Consulting & Sourcing",
                subtitle: "Professional vehicle acquisition",
                description:
                  "Looking to acquire your next European luxury vehicle? We source, evaluate, and negotiate on your behalf — ensuring you acquire the right car at the right price, with full confidence.",
                highlights: ["Market analysis", "Expert negotiation", "Private & dealer sourcing"],
              },
            ].map(({ icon, title, subtitle, description, highlights }) => (
              <div
                key={title}
                className="group relative border border-white/6 bg-white/[0.02] hover:bg-white/[0.04] hover:border-[#c9a84c]/25 transition-all duration-500 rounded-sm p-8"
              >
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="text-[#c9a84c]/70 group-hover:text-[#c9a84c] transition-colors duration-300 mb-6">
                  {icon}
                </div>
                <h3 className="text-white text-lg font-light tracking-wide mb-1">{title}</h3>
                <p className="text-[#c9a84c]/60 text-xs tracking-widest uppercase mb-5">{subtitle}</p>
                <p className="text-white/40 text-sm leading-relaxed font-light mb-7">{description}</p>
                <ul className="space-y-2">
                  {highlights.map((h) => (
                    <li key={h} className="flex items-center gap-3 text-white/35 text-xs">
                      <span className="w-1 h-1 rounded-full bg-[#c9a84c]/50 flex-shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Services banner */}
          <div className="mt-16 relative overflow-hidden rounded-sm border border-white/5 h-64 sm:h-80">
            <img
              src="/detail.jpg"
              alt="Luxury automotive detail"
              className="w-full h-full object-cover object-center opacity-30"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
            {/* Heavy dark overlay so logo is always legible */}
            <div className="absolute inset-0 bg-[#0a0a0a]/70" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_50%,rgba(201,168,76,0.05),transparent)]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-[#c9a84c]/60 text-xs tracking-[0.4em] uppercase mb-5 font-light">Precision in every detail</p>
                <img src={wideLogo} alt="TEK15" className="h-14 sm:h-16 object-contain mx-auto drop-shadow-2xl" />
                <div className="mt-5 flex items-center justify-center gap-4">
                  <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#c9a84c]/30" />
                  <span className="text-white/20 text-xs tracking-[0.2em] uppercase font-light">TEK15.CA</span>
                  <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#c9a84c]/30" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DIVIDER */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      {/* CONTACT */}
      <section id="contact" className="py-32 px-6 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(201,168,76,0.04),transparent)]" />
        <div className="relative max-w-2xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase mb-4 font-light">Get in Touch</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-4">Request a Consultation</h2>
            <p className="text-white/35 text-sm font-light leading-relaxed">
              Complete the form below and a TEK15 specialist will be in touch within 24 hours.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-white/40 text-xs tracking-[0.15em] uppercase">Full Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="William Reeves"
                  className="bg-white/[0.03] border border-white/10 focus:border-[#c9a84c]/50 text-white placeholder-white/20 rounded-sm px-4 py-3 text-sm outline-none transition-colors duration-300"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-white/40 text-xs tracking-[0.15em] uppercase">Email Address</label>
                <input
                  type="email"
                  name="_replyto"
                  required
                  placeholder="you@example.com"
                  className="bg-white/[0.03] border border-white/10 focus:border-[#c9a84c]/50 text-white placeholder-white/20 rounded-sm px-4 py-3 text-sm outline-none transition-colors duration-300"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-white/40 text-xs tracking-[0.15em] uppercase">Vehicle</label>
              <input
                type="text"
                name="vehicle"
                required
                placeholder="e.g. 2022 Mercedes-Benz GLE 450"
                className="bg-white/[0.03] border border-white/10 focus:border-[#c9a84c]/50 text-white placeholder-white/20 rounded-sm px-4 py-3 text-sm outline-none transition-colors duration-300"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-white/40 text-xs tracking-[0.15em] uppercase">Message</label>
              <textarea
                name="message"
                required
                rows={5}
                placeholder="Tell us about your vehicle and what you're looking for..."
                className="bg-white/[0.03] border border-white/10 focus:border-[#c9a84c]/50 text-white placeholder-white/20 rounded-sm px-4 py-3 text-sm outline-none transition-colors duration-300 resize-none"
              />
            </div>

            {/* Hidden Formspree subject */}
            <input type="hidden" name="_subject" value="New Consultation Request — TEK15.CA" />

            {formStatus === "success" && (
              <div className="border border-[#c9a84c]/30 bg-[#c9a84c]/5 rounded-sm px-5 py-4 text-[#c9a84c] text-sm tracking-wide">
                Thank you — your request has been received. We'll be in touch shortly.
              </div>
            )}

            {formStatus === "error" && (
              <div className="border border-red-500/30 bg-red-500/5 rounded-sm px-5 py-4 text-red-400 text-sm">
                Something went wrong. Please try again or email william@tek15.ca directly.
              </div>
            )}

            <button
              type="submit"
              disabled={formStatus === "sending"}
              className="w-full py-4 bg-[#c9a84c] text-black text-xs tracking-[0.25em] uppercase font-semibold hover:bg-[#d4b56a] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 rounded-sm shadow-[0_0_30px_rgba(201,168,76,0.2)]"
            >
              {formStatus === "sending" ? "Sending…" : "Submit Consultation Request"}
            </button>

            <p className="text-center text-white/20 text-xs font-light tracking-wide">
              Your information is kept strictly confidential.
            </p>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/6 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Top row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-4">
              <img src={squareLogoSrc} alt="TEK15" className="h-8 w-8 object-contain rounded-sm opacity-60" />
              <img src={wideLogo} alt="TEK15" className="h-6 object-contain opacity-50" />
            </div>
            <div className="flex items-center gap-6">
              {["Philosophy", "Services", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-white/25 hover:text-white/60 text-xs tracking-[0.15em] uppercase transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Credentials + copyright */}
          <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              {["C.A.L.E Certified", "Red Seal 310S"].map((cred) => (
                <span key={cred} className="text-[#c9a84c]/40 text-xs tracking-widest uppercase flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#c9a84c]/40" />
                  {cred}
                </span>
              ))}
            </div>
            <p className="text-white/20 text-xs tracking-wide">
              © {new Date().getFullYear()} TEK15 Automotive Concierge. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
