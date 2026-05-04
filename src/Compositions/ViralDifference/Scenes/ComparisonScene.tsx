import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Img,
  staticFile,
} from "remotion";
import { MetricCard } from "../Components/MetricCard";
import { GlowParticle } from "../Components/GlowParticle";

const PURPLE = "#BC13FE";
const CYAN = "#00FBFF";

export const ComparisonScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();
  const s = width / 1280;

  const entrance = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 60 },
  });

  // Entrance Transition (Frames 0-10)
  const fadeIn = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });

  // Split reveal animation
  const splitPos = interpolate(entrance, [0, 1], [50, 50]);
  
  // Stagnant side effects (jitter/flicker)
  const flicker = Math.sin(frame * 0.5) > 0.8 ? 0.7 : 1;
  const stagnantShift = Math.sin(frame * 2) * 2 * s;

  // Viral side effects (float/glow)
  const float = Math.sin(frame / 15) * 15 * s;
  const viralGlow = interpolate(Math.sin(frame / 10), [-1, 1], [20, 50]) * s;

  return (
    <AbsoluteFill style={{ 
      backgroundColor: "#020202", 
      overflow: "hidden",
      opacity: fadeIn,
    }}>
      
      {/* LEFT SIDE: STAGNANT */}
      <div style={{
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        width: `${splitPos}%`,
        borderRight: `${2 * s}px solid rgba(255, 255, 255, 0.05)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#050505",
      }}>
        <div style={{
          position: "relative",
          width: 500 * s,
          height: 280 * s,
          opacity: flicker,
          transform: `translateX(${stagnantShift}px)`,
        }}>
          <Img 
            src={staticFile("/viral_difference/stagnant_thumb.png")} 
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 12 * s,
              objectFit: "cover",
              filter: "grayscale(0.6) brightness(0.6) contrast(0.9)",
            }}
          />
          <div style={{
            position: "absolute",
            inset: 0,
            boxShadow: `inset 0 0 ${40 * s}px #000`,
            borderRadius: 12 * s,
          }} />
        </div>

        <div style={{ marginTop: 60 * s, display: "flex", flexDirection: "column", gap: 24 * s }}>
          <MetricCard label="VIEWS" value="12" color="#777" icon="📉" delay={20} />
          <MetricCard label="RETENTION" value="0.02s" color="#777" icon="⌛" delay={30} />
        </div>
      </div>

      {/* RIGHT SIDE: VIRAL */}
      <div style={{
        position: "absolute",
        right: 0,
        top: 0,
        bottom: 0,
        width: `${100 - splitPos}%`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: `linear-gradient(135deg, #0a0a0a 0%, ${PURPLE}11 100%)`,
      }}>
        {/* Viral Particles */}
        {[...Array(20)].map((_, i) => (
          <GlowParticle key={i} index={i} color={i % 2 === 0 ? CYAN : PURPLE} delay={0} />
        ))}

        <div style={{
          position: "relative",
          width: 500 * s,
          height: 280 * s,
          transform: `translateY(${float}px)`,
          filter: `drop-shadow(0 0 ${viralGlow}px ${PURPLE}44)`,
        }}>
          <Img 
            src={staticFile("/viral_difference/viral_thumb.png")} 
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 12 * s,
              objectFit: "cover",
              border: `${2 * s}px solid ${PURPLE}44`,
            }}
          />
          {/* Growth Curve Overlay (Simplified SVG) */}
          <svg 
            width="100%" 
            height="100%" 
            viewBox="0 0 500 280" 
            style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
          >
            <path 
              d="M 50 250 Q 250 240 450 50" 
              fill="none" 
              stroke={CYAN} 
              strokeWidth="6" 
              strokeLinecap="round"
              style={{ filter: `drop-shadow(0 0 ${15 * s}px ${CYAN})` }}
            />
          </svg>
        </div>

        <div style={{ marginTop: 60 * s, display: "flex", flexDirection: "column", gap: 24 * s }}>
          <MetricCard label="VIEWS" value="1.2M+" color={CYAN} icon="🚀" isViral delay={40} />
          <MetricCard label="ENGAGEMENT" value="45K" color={PURPLE} icon="🔥" isViral delay={55} />
        </div>
      </div>

      {/* Center Divider Glitch Effect */}
      <div style={{
        position: "absolute",
        left: `${splitPos}%`,
        top: 0,
        bottom: 0,
        width: 4 * s,
        transform: "translateX(-50%)",
        background: `linear-gradient(to bottom, transparent, ${CYAN}, ${PURPLE}, transparent)`,
        boxShadow: `0 0 ${20 * s}px ${PURPLE}`,
        zIndex: 20,
      }} />

    </AbsoluteFill>
  );
};
