import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Sparkles } from "lucide-react";

import paper1 from "@/assets/about-page/paper-1-clean.png";
import paper2 from "@/assets/about-page/paper-2-clean.png";
import { WetPaintButton } from "@/components/ui/wet-paint-button";
import { cn } from "@/lib/utils";
import {
  PencilAtom,
  PencilBrainAI,
  PencilBulb,
  PencilCodeTerminal,
  PencilDefs,
  PencilGraduationCap,
  PencilNeuralNet,
  PencilPaperPlane,
  PencilRocket,
  PencilSparkles,
  PushPin,
} from "./pencil-art";

gsap.registerPlugin(ScrollTrigger);

/**
 * Scissor-cut hand-drawn frame polygons matching Jackie Zhang's quirky aesthetic.
 */
const QuirkyClipPaths = [
  "polygon(1.2% 1.8%, 34% 0.5%, 68% 2.1%, 98.8% 0.2%, 98.2% 34%, 99.8% 67%, 98% 98.5%, 65% 99.5%, 32% 98%, 1.5% 99.8%, 0.2% 66%, 1.8% 33%)",
  "polygon(0.8% 1.2%, 33% 2.6%, 67% 0.8%, 98.5% 1.9%, 99.8% 33%, 98% 66%, 99.2% 98.8%, 66% 97.4%, 34% 99.2%, 1.8% 97.8%, 0.2% 65%, 1.6% 34%)",
  "polygon(2.1% 0.9%, 35% 2.8%, 66% 0.6%, 99.2% 2.1%, 97.6% 36%, 99.5% 68%, 98.2% 99%, 65% 97.6%, 32% 99.4%, 0.8% 97.6%, 2.4% 64%, 0.5% 33%)",
  "polygon(1.5% 2.4%, 32% 0.8%, 69% 2.6%, 98.4% 1.2%, 99.8% 31%, 97.8% 68%, 99.2% 98.2%, 67% 99.6%, 31% 97.8%, 1.2% 99.2%, 0.5% 67%, 2.2% 32%)",
];

/**
 * True once the element has reached the viewport for scroll reveals.
 * Defaults to true so top section elements never get stuck at opacity 0 on reload.
 */
function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}

/**
 * Empty Quirky Photo Frame Component with Scissor Edge, Tape / Pins, and inline comments for images.
 */
function QuirkyImageFrame({
  placeholderText,
  commentTag,
  rotate = 0,
  className,
  clipIndex = 0,
  hasTape = true,
  tapePosition = "top-left",
}: {
  placeholderText: string;
  commentTag: string;
  rotate?: number;
  className?: string;
  clipIndex?: number;
  hasTape?: boolean;
  tapePosition?: "top-left" | "top-right" | "both";
}) {
  return (
    <div
      data-comment={commentTag}
      className={cn(
        "relative m-0 inline-block bg-paper p-2 sm:p-2.5 shadow-xl transition-transform hover:scale-105 overflow-visible",
        className,
      )}
      style={{
        transform: `rotate(${rotate}deg)`,
        clipPath: QuirkyClipPaths[clipIndex % QuirkyClipPaths.length],
      }}
    >
      {/* Tape embellishments */}
      {hasTape && (tapePosition === "top-left" || tapePosition === "both") && (
        <span
          aria-hidden="true"
          className="absolute -top-2.5 -left-2.5 z-20 h-4 sm:h-5 w-10 sm:w-14 -rotate-12 bg-[#e8e0cc]/85 backdrop-blur-[1px] shadow-sm border-t border-b border-black/10"
        />
      )}
      {hasTape && (tapePosition === "top-right" || tapePosition === "both") && (
        <span
          aria-hidden="true"
          className="absolute -top-2.5 -right-2.5 z-20 h-4 sm:h-5 w-10 sm:w-14 rotate-12 bg-[#e8e0cc]/85 backdrop-blur-[1px] shadow-sm border-t border-b border-black/10"
        />
      )}

      {/*
        ========================================================================
        ${commentTag}
        Paste user image tag <img src="..." alt="..." /> inside this container.
        ========================================================================
      */}
      <div className="group relative flex aspect-[4/3] w-full min-w-[90px] sm:min-w-[110px] items-center justify-center rounded-[2px] border border-dashed border-graphite/30 bg-graphite/[0.04] p-1.5 sm:p-2.5 text-center transition-colors hover:border-signal/50">
        <div className="flex flex-col items-center gap-1">
          <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-graphite/40 transition-colors group-hover:text-signal" />
          <p className="font-body text-[8px] sm:text-[9px] leading-tight tracking-[0.12em] text-graphite/60 uppercase group-hover:text-ink">
            {placeholderText}
          </p>
          <span className="font-mono text-[7px] sm:text-[8px] text-graphite/40">
            [Drop Image]
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * About Us Page Landing Section featuring Jackie Zhang inspired 3D physics book,
 * fully responsive across mobile, tablet, and desktop devices with smooth scroll reveals.
 */
export function AboutBookHero() {
  const { ref: sectionRef, inView } = useInView<HTMLElement>();
  const bookRef = useRef<HTMLDivElement>(null);
  const topCoverRef = useRef<HTMLDivElement>(null);
  const bottomSpreadWrapperRef = useRef<HTMLDivElement>(null);
  const bottomPageRef = useRef<HTMLDivElement>(null);
  const contentsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const book = bookRef.current;
      const bottomPage = bottomPageRef.current;
      const bottomWrapper = bottomSpreadWrapperRef.current;
      if (!book || !bottomPage || !bottomWrapper) return;

      const isMobile = window.matchMedia("(max-width: 767px)").matches;

      // Smooth initial mount animation for book
      gsap.fromTo(
        book,
        { rotateX: isMobile ? 4 : 10, scale: 0.98, opacity: 0.9 },
        {
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
        },
      );

      // Unfold lower page spread smoothly as user scrolls down to Mission & Vision
      gsap.set(bottomPage, {
        rotateX: isMobile ? -12 : -24,
        translateY: isMobile ? -8 : -15,
        opacity: 0.7,
        transformOrigin: "top center",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: bottomWrapper,
          start: "top 85%",
          end: "top 45%",
          scrub: 0.4,
        },
      });

      tl.to(bottomPage, {
        rotateX: 0,
        translateY: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
      });

      // Pop-in for cutouts & frames inside the bottom page
      if (contentsRef.current) {
        const elements = contentsRef.current.querySelectorAll(".book-pop-item");
        tl.fromTo(
          elements,
          { opacity: 0, y: 15, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.06,
            duration: 0.6,
            ease: "power3.out",
          },
          0.2,
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={cn(
        "relative w-full text-cream font-body pt-16 sm:pt-20 md:pt-24 lg:pt-28 pb-8 md:pb-12 overflow-hidden",
        inView && "is-visible",
      )}
    >
      <PencilDefs />

      {/* Loose Pencil Doodles in Section Ground */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 text-steel/30"
      >
        <div
          className="paper-pop absolute top-[4%] left-[2%] w-[10vw] max-w-28"
          style={
            { "--pop-delay": "100ms", "--pop-rot": "-12deg" } as CSSProperties
          }
        >
          <PencilBulb className="w-full" />
        </div>
        <div
          className="paper-pop absolute top-[6%] right-[3%] w-[12vw] max-w-32"
          style={
            { "--pop-delay": "200ms", "--pop-rot": "10deg" } as CSSProperties
          }
        >
          <PencilNeuralNet className="w-full" />
        </div>
        <div
          className="paper-pop absolute top-[40%] left-[2%] w-[11vw] max-w-28"
          style={
            { "--pop-delay": "300ms", "--pop-rot": "6deg" } as CSSProperties
          }
        >
          <PencilBrainAI className="w-full" />
        </div>
        <div
          className="paper-pop absolute top-[45%] right-[2%] w-[13vw] max-w-36"
          style={
            { "--pop-delay": "400ms", "--pop-rot": "-8deg" } as CSSProperties
          }
        >
          <PencilCodeTerminal className="w-full" />
        </div>
        <div
          className="paper-pop absolute bottom-[4%] left-[3%] w-[12vw] max-w-32"
          style={
            { "--pop-delay": "500ms", "--pop-rot": "-14deg" } as CSSProperties
          }
        >
          <PencilGraduationCap className="w-full" />
        </div>
        <div
          className="paper-pop absolute bottom-[8%] right-[4%] w-[10vw] max-w-28"
          style={
            { "--pop-delay": "600ms", "--pop-rot": "15deg" } as CSSProperties
          }
        >
          <PencilSparkles className="w-full" />
        </div>
      </div>

      {/*
        ========================================================================
        RESPONSIVE 3D LEATHER BOOK FOR MOBILE, TABLET & DESKTOP
        ========================================================================
      */}
      <div className="relative z-10 flex w-full items-start justify-center px-2.5 sm:px-4 md:px-6 pt-3 md:pt-6">
        {/* 
          REALISTIC REDDISH LEATHER COVER CASING
        */}
        <div
          ref={bookRef}
          className="relative mx-auto w-full max-w-[1240px] rounded-[1.8rem] sm:rounded-[2.5rem] md:rounded-[3.5rem] pt-7 sm:pt-9 md:pt-11 pb-4 sm:pb-6 md:pb-9 px-3 sm:px-5 md:px-8 lg:px-10 transition-transform duration-300 ease-out will-change-transform"
          style={{
            backgroundColor: "#ba3726",
            backgroundImage: `
              radial-gradient(ellipse 100% 100% at 50% 50%, rgba(225, 70, 50, 0.45) 0%, rgba(130, 22, 14, 0.95) 100%),
              url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='%23000000' fill-opacity='0.09'%3E%3Cpath d='M0 0h40v40H0zM40 40h40v40H0z'/%3E%3Cpath d='M0 40h40v40H0zM40 0h40v40H40z' fill-opacity='0.05'/%3E%3C/g%3E%3C/svg%3E"),
              url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='0.14'/%3E%3C/svg%3E")
            `,
            boxShadow: `
              0 30px 80px rgba(0, 0, 0, 0.85),
              inset 0 0 0 2px rgba(255, 255, 255, 0.25),
              inset 0 0 40px rgba(0, 0, 0, 0.6)
            `,
            perspective: "1600px",
            transform: "rotateX(0deg) rotateY(0deg) scale(1)",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Cover Outer Highlight & Stitch Rim */}
          <div className="pointer-events-none absolute inset-0 rounded-[1.8rem] sm:rounded-[2.5rem] md:rounded-[3.5rem] border border-white/25 shadow-[inset_0_2px_8px_rgba(255,255,255,0.35)]" />

          {/* INSIDE PAGES WRAPPER */}
          <div
            ref={contentsRef}
            className="relative flex flex-col gap-3 md:gap-4"
          >
            {/*
              ------------------------------------------------------------------
              PAGE SHEET 1: LANDING TOP SPREAD ("The Story Begins...")
              ------------------------------------------------------------------
            */}
            <div className="relative w-full">
              {/* Stacked Underneath Paper Layers on TOP EDGE */}
              <div
                aria-hidden="true"
                className="absolute inset-x-2 sm:inset-x-3 -top-1.5 sm:-top-2.5 h-full rounded-[1.4rem] sm:rounded-[2rem] bg-[#d6c7ae] shadow-sm border border-black/10"
              />
              <div
                aria-hidden="true"
                className="absolute inset-x-1 sm:inset-x-1.5 -top-1 sm:-top-1.5 h-full rounded-[1.4rem] sm:rounded-[2rem] bg-[#e8dbbf] shadow-sm border border-black/10"
              />

              {/* Main Top Page Sheet */}
              <div
                ref={topCoverRef}
                className="relative overflow-hidden rounded-[1.4rem] sm:rounded-[2rem] bg-paper text-ink p-5 sm:p-8 md:p-10 lg:p-14 border border-black/12 min-h-auto md:min-h-[580px] lg:min-h-[620px] flex flex-col justify-between"
                style={{
                  backgroundImage: `
                    radial-gradient(circle, rgba(51, 55, 60, 0.08) 1px, transparent 1px),
                    linear-gradient(to right, transparent, rgba(51, 55, 60, 0.03) 50%, transparent 100%)
                  `,
                  backgroundSize: "24px 24px, 100% 100%",
                  boxShadow: `
                    0 16px 35px rgba(0, 0, 0, 0.35),
                    inset 0 0 90px rgba(120, 104, 74, 0.06)
                  `,
                }}
              >
                {/* Paper Texture Overlay */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-[0.035]"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E")`,
                  }}
                />

                {/* Main Headline & Subtitle */}
                <div className="grid gap-6 sm:gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-center my-auto">
                  <div className="space-y-4 md:space-y-5">
                    <div
                      className="paper-rise flex items-center justify-center md:justify-start gap-2 font-display text-xs md:text-sm font-extrabold text-graphite/70"
                      style={{ "--rise-i": 1 } as CSSProperties}
                    >
                      <MapPin className="h-4 w-4 text-signal" />
                      <span>Thane • GMT +5:30</span>
                    </div>

                    <h1
                      className="paper-rise text-center md:text-left font-display text-[clamp(2rem,5.5vw,4.8rem)] font-extrabold leading-[1.03] tracking-tight text-ink"
                      style={{ "--rise-i": 2 } as CSSProperties}
                    >
                      The Story Begins<span className="text-signal">...</span>
                    </h1>

                    <p
                      className="paper-rise text-center md:text-left mx-auto md:mx-0 max-w-[46ch] font-body text-xs sm:text-base md:text-xl leading-relaxed text-graphite/85"
                      style={{ "--rise-i": 3 } as CSSProperties}
                    >
                      Software should feel like magic. Building a startup should
                      feel like a bold adventure. Welcome to E-Cell KC—where
                      Thane’s most fearless student coders, creators, and
                      disruptors turn late-night &ldquo;what ifs&rdquo; into
                      real-world ventures.
                    </p>

                    {/* Wet Paint Button: MEET THE LARPERS (Centered on mobile, left on desktop) */}
                    <div
                      className="pt-2 sm:pt-3 book-pop-item paper-rise flex justify-center md:justify-start"
                      style={{ "--rise-i": 4 } as CSSProperties}
                    >
                      <WetPaintButton
                        href="#team"
                        className="inline-flex text-xs sm:text-sm px-6 py-2.5 md:px-8 md:py-3"
                      >
                        Meet the Larpers
                      </WetPaintButton>
                    </div>
                  </div>

                  {/* Photo Frame Scatter on Top Page */}
                  <div className="relative flex min-h-[160px] sm:min-h-[220px] items-center justify-center lg:justify-end gap-3 md:gap-4 flex-wrap pt-2 lg:pt-0">
                    <div
                      className="paper-pop absolute -top-6 sm:-top-8 left-2 sm:left-4 w-14 sm:w-16 md:w-20 text-graphite/30"
                      style={
                        {
                          "--pop-delay": "150ms",
                          "--pop-rot": "-12deg",
                        } as CSSProperties
                      }
                    >
                      <PencilRocket className="w-full" />
                    </div>

                    {/* IMAGE PLACEHOLDER 1 */}
                    <QuirkyImageFrame
                      placeholderText="E-Cell Workspace"
                      commentTag="IMAGE PLACEHOLDER 1: E-Cell Founding Workspace & Team"
                      rotate={-4}
                      clipIndex={0}
                      className="w-full max-w-[130px] sm:max-w-[180px] md:max-w-[220px] book-pop-item paper-rise"
                    />

                    {/* IMAGE PLACEHOLDER 2 */}
                    <QuirkyImageFrame
                      placeholderText="Late Night Ideation"
                      commentTag="IMAGE PLACEHOLDER 2: Late Night Hackathon Session"
                      rotate={5}
                      clipIndex={1}
                      className="w-full max-w-[120px] sm:max-w-[160px] md:max-w-[200px] book-pop-item paper-rise"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/*
              ------------------------------------------------------------------
              PAGE SHEET 2: MISSION & VISION UNFOLDED SPREAD
              ------------------------------------------------------------------
            */}
            <div ref={bottomSpreadWrapperRef} className="relative w-full">
              {/* Main Bottom Page Sheet */}
              <div
                ref={bottomPageRef}
                id="mission-vision"
                className="relative overflow-hidden rounded-[1.4rem] sm:rounded-[2rem] bg-paper text-ink p-4 sm:p-8 md:p-10 lg:p-14 border border-black/12 min-h-auto md:min-h-[580px] lg:min-h-[620px] flex flex-col justify-between"
                style={{
                  backgroundImage: `
                    radial-gradient(circle, rgba(51, 55, 60, 0.08) 1px, transparent 1px),
                    linear-gradient(to right, transparent, rgba(51, 55, 60, 0.03) 50%, transparent 100%)
                  `,
                  backgroundSize: "24px 24px, 100% 100%",
                  boxShadow: `
                    0 26px 55px -4px rgba(0, 0, 0, 0.65),
                    0 8px 22px rgba(0, 0, 0, 0.3),
                    inset 0 0 90px rgba(120, 104, 74, 0.06)
                  `,
                }}
              >
                {/* Paper Texture Overlay */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-[0.035]"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E")`,
                  }}
                />

                {/* Section Header Tag */}
                <div className="mb-4 md:mb-6 flex items-center justify-between">
                  <div>
                    <span className="font-display text-[10px] sm:text-xs font-bold tracking-[0.2em] text-signal uppercase">
                      Core Philosophy
                    </span>
                    <h2 className="font-display text-xl sm:text-2xl md:text-4xl font-extrabold text-ink">
                      Mission & Vision
                    </h2>
                  </div>
                  <PencilAtom className="h-7 w-7 sm:h-9 sm:w-9 md:h-10 md:w-10 text-graphite/30" />
                </div>

                {/* Jackie Zhang Style Cutout Cards Grid for Mission & Vision with Clean Transparent Paper-1 and Paper-2 */}
                <div className="grid gap-6 md:grid-cols-2 lg:gap-8 my-auto">
                  {/* 
                    PAPER CUTOUT 1: OUR MISSION
                    Using clean transparent paper-1-clean.png as physical paper card
                  */}
                  <div className="book-pop-item paper-rise relative flex flex-col justify-between p-6 sm:p-8 md:p-10 lg:p-12 min-h-[500px] sm:min-h-[520px] md:min-h-[550px] lg:min-h-[580px] transition-transform hover:-translate-y-1">
                    {/* Background Paper Asset: paper-1-clean.png */}
                    <img
                      src={paper1}
                      alt=""
                      className="pointer-events-none absolute inset-0 h-full w-full object-fill drop-shadow-xl z-0"
                    />

                    {/* Content Overlaid securely inside printable paper boundaries */}
                    <div className="relative z-10 flex flex-col justify-between h-full pt-8 sm:pt-10 md:pt-12 px-3 sm:px-5 md:px-6 pb-4 space-y-4">
                      <div>
                        {/* Tape top */}
                        <span
                          aria-hidden="true"
                          className="absolute top-1 left-8 sm:left-12 h-4 sm:h-5 w-16 sm:w-20 rotate-[-4deg] bg-[#e8e0cc]/90 backdrop-blur-[1px] shadow-sm border-t border-b border-black/10 z-20"
                        />
                        {/* Centered Heading */}
                        <div className="mb-3 sm:mb-4 flex items-center justify-center gap-2.5 border-b border-graphite/20 pb-2.5 sm:pb-3">
                          <PencilPaperPlane className="h-5 w-5 sm:h-6 sm:w-6 text-signal" />
                          <h3 className="font-display text-lg sm:text-xl md:text-2xl font-extrabold tracking-tight text-ink text-center">
                            OUR MISSION
                          </h3>
                        </div>
                        <p className="font-body text-xs sm:text-[13px] md:text-sm lg:text-[14.5px] leading-relaxed text-ink font-semibold text-center sm:text-left max-w-[42ch] mx-auto">
                          The Entrepreneurship Cell at KCCEMSR is dedicated to
                          fostering an entrepreneurial mindset among students. We
                          provide a comprehensive platform that nurtures innovative
                          ideas, facilitates startup development, and connects
                          aspiring entrepreneurs with industry experts and resources.
                          Through workshops, seminars, competitions, and mentorship
                          programs, we aim to create a vibrant ecosystem where
                          creativity meets opportunity, and ideas transform into
                          impactful ventures.
                        </p>
                      </div>

                      {/* 
                        IMAGE PLACEHOLDER 3 & 4: Mission Photo Frames
                      */}
                      <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2 overflow-visible">
                        <QuirkyImageFrame
                          placeholderText="Mission Action"
                          commentTag="IMAGE PLACEHOLDER 3: Mission Action Shot / Hackathon Crowd"
                          rotate={-3}
                          clipIndex={2}
                          className="w-full max-w-[110px] sm:max-w-[130px] md:max-w-[145px]"
                          hasTape={false}
                        />

                        <QuirkyImageFrame
                          placeholderText="Mentorship"
                          commentTag="IMAGE PLACEHOLDER 4: Community Mentorship Session"
                          rotate={3}
                          clipIndex={3}
                          className="w-full max-w-[105px] sm:max-w-[120px] md:max-w-[135px]"
                          hasTape={false}
                        />
                      </div>
                    </div>
                  </div>

                  {/* 
                    PAPER CUTOUT 2: OUR VISION
                    Using clean transparent paper-2-clean.png as physical paper card
                  */}
                  <div className="book-pop-item paper-rise relative flex flex-col justify-between p-6 sm:p-8 md:p-10 lg:p-12 min-h-[500px] sm:min-h-[520px] md:min-h-[550px] lg:min-h-[580px] transition-transform hover:-translate-y-1">
                    {/* Background Paper Asset: paper-2-clean.png */}
                    <img
                      src={paper2}
                      alt=""
                      className="pointer-events-none absolute inset-0 h-full w-full object-fill drop-shadow-xl z-0"
                    />

                    {/* Content Overlaid securely inside printable paper boundaries */}
                    <div className="relative z-10 flex flex-col justify-between h-full pt-8 sm:pt-10 md:pt-12 px-3 sm:px-5 md:px-6 pb-4 space-y-4">
                      <div>
                        {/* Push Pin */}
                        <div className="absolute top-1 right-8 sm:right-12 z-20">
                          <PushPin className="h-6 w-6 sm:h-8 sm:w-8 text-signal" />
                        </div>

                        {/* Centered Heading */}
                        <div className="mb-3 sm:mb-4 flex items-center justify-center gap-2.5 border-b border-graphite/20 pb-2.5 sm:pb-3">
                          <PencilBrainAI className="h-5 w-5 sm:h-6 sm:w-6 text-signal" />
                          <h3 className="font-display text-lg sm:text-xl md:text-2xl font-extrabold tracking-tight text-ink text-center">
                            OUR VISION
                          </h3>
                        </div>
                        <p className="font-body text-xs sm:text-[13px] md:text-sm lg:text-[14.5px] leading-relaxed text-ink font-semibold text-center sm:text-left max-w-[42ch] mx-auto">
                          To be recognized as a leading entrepreneurship cell that
                          shapes the future of business innovation in India. We
                          envision a community where every student has the confidence,
                          skills, and resources to turn their entrepreneurial dreams
                          into reality. We strive to build a culture where failure is
                          seen as a stepping stone to success, and where innovation is
                          celebrated and supported at every level.
                        </p>
                      </div>

                      {/* 
                        IMAGE PLACEHOLDER 5 & 6: Vision Photo Frames
                      */}
                      <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2 overflow-visible">
                        <QuirkyImageFrame
                          placeholderText="Vision Pitch"
                          commentTag="IMAGE PLACEHOLDER 5: Vision Pitch Presentation Stage"
                          rotate={4}
                          clipIndex={0}
                          className="w-full max-w-[110px] sm:max-w-[130px] md:max-w-[145px]"
                          hasTape={false}
                        />

                        <QuirkyImageFrame
                          placeholderText="Prototype Demo"
                          commentTag="IMAGE PLACEHOLDER 6: Prototype Demo & Testing"
                          rotate={-2}
                          clipIndex={1}
                          className="w-full max-w-[105px] sm:max-w-[120px] md:max-w-[135px]"
                          hasTape={false}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

