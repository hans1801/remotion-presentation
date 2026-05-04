import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, useVideoConfig } from "remotion";

const CYAN = "#00FBFF";
const GREEN = "#39FF14";

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

/** Subtle background grid */
const BackgroundGrid: React.FC<{ frame: number; opacity: number; s: number }> = ({ frame, opacity, s }) => {
  return (
    <div style={{
      position: "absolute",
      inset: -100 * s,
      opacity: opacity * 0.4,
      backgroundImage: `
        linear-gradient(to right, rgba(255,255,255,0.05) ${1 * s}px, transparent ${1 * s}px),
        linear-gradient(to bottom, rgba(255,255,255,0.05) ${1 * s}px, transparent ${1 * s}px)
      `,
      backgroundSize: `${60 * s}px ${60 * s}px`,
      transform: `perspective(${1000 * s}px) rotateX(10deg) translateY(${frame * 0.5 * s}px)`,
      maskImage: "radial-gradient(circle, black 40%, transparent 90%)",
    }} />
  );
};

/** Large soft ambient light orbs */
const AmbientOrbs: React.FC<{ frame: number; s: number }> = ({ frame, s }) => {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      <div style={{
        position: "absolute",
        width: 600 * s,
        height: 600 * s,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${CYAN}22 0%, transparent 70%)`,
        left: "-10%",
        top: "10%",
        transform: `translate(${Math.sin(frame / 60) * 50 * s}px, ${Math.cos(frame / 50) * 30 * s}px)`,
        filter: `blur(${60 * s}px)`,
      }} />
      <div style={{
        position: "absolute",
        width: 700 * s,
        height: 700 * s,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${GREEN}11 0%, transparent 70%)`,
        right: "-15%",
        bottom: "5%",
        transform: `translate(${Math.cos(frame / 70) * 60 * s}px, ${Math.sin(frame / 40) * 40 * s}px)`,
        filter: `blur(${80 * s}px)`,
      }} />
    </div>
  );
};

/** Floating particles */
const ParticleSystem: React.FC<{ frame: number; s: number; count?: number }> = ({ frame, s, count = 20 }) => {
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      {Array.from({ length: count }).map((_, i) => {
        const seed = i * 137.5; // Golden angle
        const x = (seed % 100);
        const y = ((seed * 1.3) % 100);
        const size = ((seed % 3) + 1) * s;
        const speed = (seed % 0.5) + 0.2;
        const drift = Math.sin((frame * speed + seed) / 20) * 20 * s;
        return (
          <div key={i} style={{
            position: "absolute",
            left: `${x}%`,
            top: `${y}%`,
            width: size,
            height: size,
            borderRadius: "50%",
            background: i % 2 === 0 ? CYAN : "white",
            opacity: 0.15 + Math.sin((frame + seed) / 30) * 0.1,
            transform: `translateY(${-frame * speed * s}px) translateX(${drift}px)`,
            boxShadow: size > 2 * s ? `0 0 ${6 * s}px ${CYAN}` : "none",
          }} />
        );
      })}
    </div>
  );
};

export const DarkTechBackground: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();
  const s = width / 1280;
  const bgGridOpacity = interpolate(frame, [0, 6], [0, 1], clamp);

  return (
    <AbsoluteFill style={{ backgroundColor: "#050505", overflow: "hidden", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <AmbientOrbs frame={frame} s={s} />
      <BackgroundGrid frame={frame} opacity={bgGridOpacity} s={s} />
      <ParticleSystem frame={frame} s={s} />
      
      {/* Screen corners HUD */}
      <div style={{ position: "absolute", inset: 40 * s, border: `${s}px solid rgba(255,255,255,0.03)`, pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: 0, left: 0, width: 20 * s, height: 20 * s, borderTop: `${s}px solid rgba(255,255,255,0.2)`, borderLeft: `${s}px solid rgba(255,255,255,0.2)` }} />
        <div style={{ position: "absolute", top: 0, right: 0, width: 20 * s, height: 20 * s, borderTop: `${s}px solid rgba(255,255,255,0.2)`, borderRight: `${s}px solid rgba(255,255,255,0.2)` }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, width: 20 * s, height: 20 * s, borderBottom: `${s}px solid rgba(255,255,255,0.2)`, borderLeft: `${s}px solid rgba(255,255,255,0.2)` }} />
        <div style={{ position: "absolute", bottom: 0, right: 0, width: 20 * s, height: 20 * s, borderBottom: `${s}px solid rgba(255,255,255,0.2)`, borderRight: `${s}px solid rgba(255,255,255,0.2)` }} />
      </div>

      {/* Scanline overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent ${3 * s}px, rgba(0,0,0,0.12) ${3 * s}px, rgba(0,0,0,0.12) ${4 * s}px)`,
          pointerEvents: "none",
          zIndex: 100,
        }}
      />

      {children}
    </AbsoluteFill>
  );
};
