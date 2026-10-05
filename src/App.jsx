import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  CalendarDays,
  ChevronDown,
  Flower2,
  Heart,
  HeartHandshake,
  MapPin,
  Menu,
  Music2,
  Pause,
  Play,
  Sparkles,
  Volume2,
  X
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { events, invitationImage, palaceImage } from "./data/events.js";

gsap.registerPlugin(ScrollTrigger);

const eventIcons = {
  tilak: Sparkles,
  haldi: Flower2,
  mehandi: Heart,
  barat: Music2,
  vidai: HeartHandshake
};

function ScrollCue({ href, label = "Scroll to continue" }) {
  return (
    <a className="scroll-cue" href={href} aria-label={label}>
      <span className="scroll-cue-label">SCROLL TO DISCOVER</span>
      <span className="scroll-cue-icon"><ArrowDown size={16} strokeWidth={1.4} /></span>
    </a>
  );
}

function FloatingPetals() {
  return (
    <div className="petal-field" aria-hidden="true">
      {Array.from({ length: 13 }, (_, index) => (
        <span className="petal" key={index} style={{
          "--petal-index": index,
          "--petal-left": `${index * 8.2}%`,
          "--petal-delta": `${45 - index * 5}px`,
          "--petal-duration": `${12 + index * 0.8}s`,
          "--petal-delay": `${index * -1.2}s`
        }} />
      ))}
    </div>
  );
}

function OpeningLetter() {
  return (
    <section className="opening-screen" id="home" aria-labelledby="letter-title">
      <div className="opening-backdrop" style={{ backgroundImage: `url(${invitationImage})` }} />
      <div className="opening-vignette" />
      <div className="candle candle-left" aria-hidden="true" />
      <div className="candle candle-right" aria-hidden="true" />
      <FloatingPetals />
      <article className="parchment letter-reveal">
        <div className="parchment-corner corner-top-left" />
        <div className="parchment-corner corner-top-right" />
        <div className="parchment-corner corner-bottom-left" />
        <div className="parchment-corner corner-bottom-right" />
        <span className="letter-seal" aria-label="A seal of invitation">R<span>&amp;</span>S</span>
        <p className="letter-eyebrow letter-line">TO THE WEDDING CELEBRATIONS OF</p>
        <h1 id="letter-title" className="letter-names letter-line">You're Invited</h1>
        <p className="couple-names letter-line">Riya <span aria-hidden="true">♡</span> Saurabh</p>
        <div className="ornament-rule" aria-hidden="true"><i />✦<i /></div>
        <p className="letter-tagline letter-line">Two families... One beautiful journey...</p>
        <p className="letter-copy letter-line">Join us as we celebrate love, tradition and togetherness.</p>
        <a className="gold-outline-button letter-cta" href="#palace">EXPLORE OUR STORY <ArrowDown size={14} /></a>
        <span className="letter-tassel" aria-hidden="true" />
      </article>
      <ScrollCue href="#palace" label="Explore the wedding story" />
    </section>
  );
}

function PalaceEntrance() {
  return (
    <section className="palace-screen" id="palace" aria-labelledby="palace-title">
      <div className="palace-image scene-media" style={{ backgroundImage: `url(${palaceImage})` }} />
      <div className="palace-overlay" />
      <div className="palace-lights" aria-hidden="true">
        {[[14, 34], [21, 67], [31, 47], [72, 39], [82, 61], [91, 32]].map(([left, top], index) => (
          <span className="palace-glow" key={index} style={{ left: `${left}%`, top: `${top}%`, "--light-delay": `${index * 0.45}s` }} />
        ))}
      </div>
      <div className="palace-copy scroll-reveal">
        <p className="eyebrow gold-eyebrow">RIYA &amp; SAURABH · 15—19 FEBRUARY 2026</p>
        <p className="palace-welcome-script">Welcome</p>
        <p className="palace-to-our">TO OUR</p>
        <h2 id="palace-title">Wedding Celebration</h2>
        <span className="palace-divider" aria-hidden="true">✦</span>
        <p className="palace-message">A celebration of two hearts, two families, and a lifetime of love.</p>
      </div>
      <ScrollCue href="#wedding-events" label="Continue to the wedding events" />
    </section>
  );
}

function EventNavigation() {
  return (
    <section className="event-navigation" id="wedding-events" aria-labelledby="event-navigation-title">
      <div className="nav-ornament nav-ornament-top" aria-hidden="true">✦ &nbsp; ✧ &nbsp; ✦</div>
      <p className="eyebrow gold-eyebrow reveal-heading">RIYA &amp; SAURABH INVITE YOU</p>
      <h2 id="event-navigation-title" className="event-navigation-title reveal-heading">CELEBRATE EVERY MOMENT</h2>
      <div className="event-navigation-rule" aria-hidden="true"><span /></div>
      <div className="event-choices">
        {events.map((event) => {
          const Icon = eventIcons[event.id];
          return (
            <a className={`event-choice choice-${event.id}`} href={`#${event.id}`} key={event.id} style={{ "--choice-image": `url(${event.thumbnail})` }}>
              <span className="choice-shade" />
              <span className="choice-content">
                <Icon className="choice-icon" size={22} strokeWidth={1.35} aria-hidden="true" />
                <span className="choice-title">{event.title}</span>
                <span className="choice-subtitle">{event.subtitle}</span>
                <span className="choice-link">VIEW DETAILS <ArrowRight size={13} /></span>
              </span>
            </a>
          );
        })}
      </div>
      <div className="nav-ornament nav-ornament-bottom" aria-hidden="true">❧</div>
      <ScrollCue href="#tilak" label="Scroll to the Tilak ceremony" />
    </section>
  );
}

function SceneMedia({ event }) {
  return (
    <div className="scene-media-wrap" aria-hidden="true">
      <img className="scene-media scene-still" src={event.image} alt="" loading="lazy" />
      <video className={`scene-media scene-video ${event.video ? "has-video" : ""}`} autoPlay muted loop playsInline poster={event.image}>
        {event.video && <source src={event.video} type="video/mp4" />}
      </video>
      <div className={`scene-overlay overlay-${event.id}`} />
    </div>
  );
}

function EventSection({ event, onWatch }) {
  const Icon = eventIcons[event.id];
  const nextId = events[events.findIndex((item) => item.id === event.id) + 1]?.id ?? "footer";

  return (
    <section className={`event-scene scene-${event.id}`} id={event.id} aria-labelledby={`${event.id}-title`}>
      <SceneMedia event={event} />
      <div className="scene-content scroll-reveal">
        <p className="eyebrow scene-eyebrow"><span /> THE WEDDING CELEBRATIONS <span /></p>
        <Icon className="scene-icon" size={31} strokeWidth={1.2} aria-hidden="true" />
        <p className="scene-title-kicker">{event.title}</p>
        <h2 id={`${event.id}-title`} className="scene-title">{event.subtitle}</h2>
        <div className="scene-ornament" aria-hidden="true"><i />✦<i /></div>
        <p className="scene-description">{event.description}</p>
        <div className="event-facts">
          <div className="event-fact"><CalendarDays size={17} strokeWidth={1.4} /><span><small>DATE &amp; TIME</small>{event.date} <b>·</b> {event.time}</span></div>
          <div className="event-fact"><MapPin size={17} strokeWidth={1.4} /><span><small>CELEBRATION VENUE</small>{event.location}</span></div>
        </div>
        {event.closingLine && <p className="vidai-line">{event.closingLine}</p>}
        <button className="gold-outline-button moments-button" type="button" onClick={() => onWatch(event)}><Play size={13} fill="currentColor" /> WATCH MOMENTS</button>
      </div>
      <span className="scene-index" aria-hidden="true">0{events.indexOf(event) + 1} <i /> 05</span>
      <a className="scene-next" href={`#${nextId}`} aria-label={`Continue to ${nextId === "footer" ? "the closing note" : events.find((item) => item.id === nextId)?.title}`}><ChevronDown size={19} strokeWidth={1.2} /></a>
      <span className="scene-frame" aria-hidden="true" />
    </section>
  );
}

function WeddingNav({ musicOn, onMusicToggle }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    ["Home", "#home"],
    ["Our Story", "#palace"],
    ["Wedding Events", "#wedding-events"],
    ["Gallery", "#mehandi"],
    ["Venue", "#barat"],
    ["RSVP", "mailto:celebrate@example.com"]
  ];

  return (
    <header className={`wedding-nav ${scrolled ? "is-scrolled" : ""}`}>
      <a className="nav-monogram" href="#home" aria-label="Riya and Saurabh home">R <span>&amp;</span> S</a>
      <nav className={menuOpen ? "nav-links is-open" : "nav-links"} aria-label="Wedding navigation">
        {links.map(([label, href]) => <a key={label} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
      </nav>
      <div className="nav-actions">
        <button className={`nav-icon-button music-button ${musicOn ? "is-playing" : ""}`} onClick={onMusicToggle} type="button" aria-label={musicOn ? "Pause wedding music" : "Play wedding music"} title={musicOn ? "Pause music" : "Play music"}>
          {musicOn ? <Volume2 size={17} /> : <Music2 size={17} />}
          <span className="music-label">{musicOn ? "MUSIC ON" : "MUSIC"}</span>
        </button>
        <button className="nav-icon-button menu-button" onClick={() => setMenuOpen((open) => !open)} type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>
          {menuOpen ? <X size={19} /> : <Menu size={19} />}
        </button>
      </div>
    </header>
  );
}

function MomentDialog({ event, onClose }) {
  const dialogRef = useRef(null);
  useEffect(() => {
    const dialog = dialogRef.current;
    if (event && !dialog.open) dialog.showModal();
    if (!event && dialog.open) dialog.close();
  }, [event]);

  return (
    <dialog className="moments-dialog" ref={dialogRef} onClose={onClose} onClick={(e) => { if (e.target === dialogRef.current) onClose(); }}>
      {event && <>
        <div className="moments-media">
          {event.video ? <video src={event.video} poster={event.image} controls autoPlay playsInline /> : <img src={event.image} alt={event.imageAlt} />}
          <button type="button" className="moments-close" onClick={onClose} aria-label="Close moments"><X size={20} /></button>
        </div>
        <div className="moments-copy"><span>{event.date}</span><h2>{event.title}</h2><p>{event.moments}</p></div>
      </>}
    </dialog>
  );
}

function WeddingFooter() {
  return (
    <footer className="wedding-footer" id="footer">
      <span className="footer-flourish" aria-hidden="true">✦</span>
      <p className="eyebrow gold-eyebrow">WITH LOVE, RIYA &amp; SAURABH</p>
      <p className="footer-script">Until we celebrate together</p>
      <p className="footer-small">15 — 19 FEBRUARY 2026 <span>·</span> JAIPUR, INDIA</p>
      <a className="footer-home" href="#home"><ArrowDownRight size={16} /> BACK TO THE BEGINNING</a>
    </footer>
  );
}

function createAmbientMusic() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  const context = new AudioContextClass();
  const master = context.createGain();
  master.gain.value = 0;
  master.connect(context.destination);
  const drones = [130.81, 196].map((frequency, index) => {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = index ? "sine" : "triangle";
    oscillator.frequency.value = frequency;
    gain.gain.value = index ? 0.1 : 0.16;
    oscillator.connect(gain).connect(master);
    oscillator.start();
    return oscillator;
  });
  const notes = [261.63, 293.66, 329.63, 392, 440, 392, 329.63];
  let noteIndex = 0;
  const interval = window.setInterval(() => {
    if (context.state !== "running") return;
    const tone = context.createOscillator();
    const envelope = context.createGain();
    const now = context.currentTime;
    tone.type = "sine";
    tone.frequency.value = notes[noteIndex++ % notes.length];
    envelope.gain.setValueAtTime(0.0001, now);
    envelope.gain.exponentialRampToValueAtTime(0.055, now + 0.08);
    envelope.gain.exponentialRampToValueAtTime(0.0001, now + 2.1);
    tone.connect(envelope).connect(master);
    tone.start(now);
    tone.stop(now + 2.2);
  }, 2300);
  return { context, master, interval, drones };
}

export default function App() {
  const rootRef = useRef(null);
  const musicRef = useRef(null);
  const [musicOn, setMusicOn] = useState(false);
  const [activeMoment, setActiveMoment] = useState(null);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const context = gsap.context(() => {
      gsap.from(".letter-reveal", { opacity: 0, scale: 0.94, y: 28, duration: 1.4, ease: "power2.out", delay: 0.15 });
      gsap.from(".letter-line", { opacity: 0, y: 14, duration: 0.8, stagger: 0.16, ease: "power2.out", delay: 0.55 });
      gsap.from(".scroll-reveal", { opacity: 0, y: 38, duration: 1.1, ease: "power2.out", scrollTrigger: { trigger: ".palace-screen", start: "top 72%" } });
      gsap.utils.toArray(".reveal-heading").forEach((element) => gsap.from(element, { opacity: 0, y: 24, duration: 1, ease: "power2.out", scrollTrigger: { trigger: element, start: "top 88%" } }));
      gsap.from(".event-choice", { opacity: 0, y: 34, duration: 0.8, stagger: 0.12, ease: "power2.out", scrollTrigger: { trigger: ".event-choices", start: "top 78%" } });
      gsap.utils.toArray(".event-scene").forEach((scene) => {
        gsap.fromTo(scene.querySelector(".scene-media-wrap"), { scale: 1.13 }, {
          scale: 1,
          ease: "none",
          scrollTrigger: { trigger: scene, start: "top bottom", end: "bottom top", scrub: 1 }
        });
        gsap.from(scene.querySelectorAll(".scene-content > *"), {
          opacity: 0,
          y: 20,
          duration: 0.75,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: scene, start: "top 58%", once: true }
        });
      });
      gsap.to(".palace-glow", { opacity: 0.88, duration: 2.6, yoyo: true, repeat: -1, stagger: 0.7, ease: "sine.inOut" });
    }, rootRef);
    return () => context.revert();
  }, []);

  useEffect(() => () => {
    const music = musicRef.current;
    if (music) {
      window.clearInterval(music.interval);
      music.drones.forEach((oscillator) => { try { oscillator.stop(); } catch { /* already stopped */ } });
      music.context.close();
    }
  }, []);

  async function toggleMusic() {
    if (!musicRef.current) musicRef.current = createAmbientMusic();
    const music = musicRef.current;
    if (musicOn) {
      music.master.gain.setTargetAtTime(0, music.context.currentTime, 0.7);
      setMusicOn(false);
      return;
    }
    await music.context.resume();
    music.master.gain.setTargetAtTime(0.16, music.context.currentTime, 1.2);
    setMusicOn(true);
  }

  return (
    <div className="wedding-site" ref={rootRef}>
      <WeddingNav musicOn={musicOn} onMusicToggle={toggleMusic} />
      <main>
        <OpeningLetter />
        <PalaceEntrance />
        <EventNavigation />
        {events.map((event) => <EventSection key={event.id} event={event} onWatch={setActiveMoment} />)}
      </main>
      <WeddingFooter />
      <MomentDialog event={activeMoment} onClose={() => setActiveMoment(null)} />
    </div>
  );
}