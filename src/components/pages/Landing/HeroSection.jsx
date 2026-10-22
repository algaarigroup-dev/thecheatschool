import React, { useState, useEffect, useRef } from "react";
import CadCursor from "./CadCursor";
import {
  ChevronDown,
  Instagram,
  ArrowRight,
  Linkedin,
  MessageCircle } from
"lucide-react";
import { CONTACT, whatsappLink } from "@/config/site";

// Parallax offset for a decorative layer: depth in px at the hero's edges.
const drift = (depth) => ({
  transform: `translate3d(calc(var(--mx, 0) * ${depth}px), calc(var(--my, 0) * ${depth}px), 0)`,
  transition: "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)"
});

const HeroSection = () => {
  const heroRef = useRef(null);
  const [currentWord, setCurrentWord] = useState(0);
  const words = ["Theory", "Classroom", "Concepts", "Learning"];
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const phrases = [
  "Real Projects",
  "Site Experience",
  "Industry Skills",
  "Practical Work"];


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
      setCurrentPhrase((prev) => (prev + 1) % phrases.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={heroRef} className="relative min-h-[85vh] md:h-screen mt-26 w-full overflow-visible">
      {}
      <div className="absolute inset-0 bg-background dark:bg-background">
        {}
        <div
          className="absolute inset-0 opacity-100 dark:opacity-50"
          style={{
            backgroundImage:
            "linear-gradient(var(--light-grey) 1px, transparent 1px), linear-gradient(90deg, var(--light-grey) 1px, transparent 1px)",
            backgroundSize: "60px 60px"
          }}>
        </div>

        {}
        <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-dark-grey dark:bg-dark-grey"></div>
        <div className="absolute bottom-0 left-0 w-2/5 h-2/5 bg-dark-grey dark:bg-dark-grey"></div>

        {}
        <div
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary"
          style={{ opacity: 0.15, ...drift(-18) }}>
        </div>
        <div
          className="absolute top-1/3 right-1/3 w-48 h-48 bg-primary"
          style={{ opacity: 0.08, ...drift(10) }}>
        </div>
        <div
          className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-primary"
          style={{ opacity: 0.2, ...drift(-28) }}>
        </div>

        {}
        <div
          className="absolute top-1/3 left-0 w-full h-3 bg-primary"
          style={{ opacity: 0.15 }}>
        </div>
        <div
          className="absolute top-0 left-1/2 w-3 h-full bg-primary"
          style={{ opacity: 0.1 }}>
        </div>

        {}
        <div className="absolute top-1/2 left-1/3 w-4 h-4 bg-primary" style={drift(-40)}></div>
        <div className="absolute bottom-1/3 right-1/3" style={drift(34)}>
          <div className="w-5 h-5 rotate-45 bg-primary"></div>
        </div>
      </div>

      <CadCursor hostRef={heroRef} />

      {}
      <div className="absolute right-8 top-1/3 sm:top-1/2 -translate-y-1/2 flex flex-col gap-6 z-20">
        <a
          href={CONTACT.instagram}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="text-foreground hover:text-primary transition-colors">
          
          <Instagram size={24} />
        </a>

        <a
          href={CONTACT.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="text-foreground hover:text-primary transition-colors">
          
          <Linkedin size={24} />
        </a>

        <a
          href={whatsappLink("Hi The Cheat School, I have a question about the bootcamp.")}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          className="text-foreground hover:text-primary transition-colors">
          
          <MessageCircle size={24} />
        </a>
      </div>

      {}
      <div className="absolute right-8 bottom-12 flex flex-col items-center gap-2 z-20">
        <div className="w-px h-20 bg-foreground/30" />
        <ChevronDown className="text-foreground animate-bounce" size={24} />
      </div>

      {}
      <div className="relative z-10 h-full flex flex-col items-center justify-start md:justify-center px-4 py-12 sm:py-16 md:py-20 lg:py-24">
        {}
        <div className="mt-6 md:mt-28 lg:mt-32">
          <p className="text-foreground/70 text-sm md:text-base tracking-[0.3em] uppercase font-secondary">
            NOT ANOTHER ONLINE COURSE
          </p>
        </div>

        {}
        <div className="mb-16 text-center">
          <h1 className="text-foreground text-5xl md:text-7xl lg:text-8xl font-bold font-primary tracking-tight">
            <span className="block md:inline">From </span>
            <span
              key={currentWord}
              className="inline-block animate-[fadeIn_0.5s_ease-in-out] text-primary min-w-[280px] md:min-w-[320px]">
              
              {words[currentWord]}
            </span>
          </h1>
          <h1 className="text-foreground text-5xl md:text-7xl lg:text-8xl font-bold font-primary tracking-tight mt-4">
            <span className="block md:inline">to </span>
            <span
              key={currentPhrase}
              className="inline-block animate-[fadeIn_0.5s_ease-in-out] text-primary min-w-[320px] md:min-w-[400px]">
              
              {phrases[currentPhrase]}
            </span>
          </h1>
        </div>

        {}
        <p className="text-foreground/80 text-lg md:text-xl lg:text-2xl font-secondary mb-12 max-w-3xl text-center px-4">
          Most courses end with a certificate. Ours end with real project work,
          a public track record and the confidence to talk about it in an interview.
        </p>

        {}
        <div className="flex sm:flex-row gap-4 mb-16">
          <button
            type="button"
            onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth", block: "start" })}
            className="px-8 py-4 bg-[#e83f25] cursor-pointer text-white font-semibold font-secondary rounded-lg hover:bg-[#d63820] transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2">
            See How We're Different <ArrowRight className="inline-block" />
          </button>
        </div>

        {}
        <div className="flex flex-row gap-8 md:gap-16 sm:mb-30 mt-6 md:mt-0 text-center">
          <div>
            <p className="text-foreground text-3xl md:text-4xl font-bold font-primary mb-1">
              90 Days
            </p>
            <p className="text-foreground/70 text-sm md:text-base font-secondary tracking-wide">
              Classroom to Job Ready
            </p>
          </div>
          <div className="hidden sm:block w-px bg-foreground/20"></div>
          <div>
            <p className="text-foreground text-3xl md:text-4xl font-bold font-primary mb-1">
              Live
            </p>
            <p className="text-foreground/70 text-sm md:text-base font-secondary tracking-wide">
              Projects, Not Lectures
            </p>
          </div>
          <div className="hidden sm:block w-px bg-foreground/20"></div>
          <div>
            <p className="text-foreground text-3xl md:text-4xl font-bold font-primary mb-1">
              1:1
            </p>
            <p className="text-foreground/70 text-sm md:text-base font-secondary tracking-wide">
              Personality Coaching
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>);

};

export default HeroSection;