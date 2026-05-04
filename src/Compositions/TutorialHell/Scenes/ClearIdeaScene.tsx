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

const PURPLE = "#BC13FE";
const CYAN = "#00FBFF";

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };

const AbstractAnimationElement: React.FC<{ s: number; index: number }> = ({ s, index }) => {
  const frame = useCurrentFrame();
  
  // Random orbits
  const radius = (250 + (index % 8) * 120) * s;
  const speed = 0.01 + (index % 6) * 0.005;
  const angle = frame * speed + index * 4;
  
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;
  
  // Opacity pulses (more visible)
  const opacity = 0.3 + Math.abs(Math.sin(frame / 40 + index)) * 0.4;
  
  const type = index % 5;

  return (
    <div style={{
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: `translate(${x}px, ${y}px) rotate(${angle * 20}deg)`,
      opacity,
      pointerEvents: "none",
    }}>
      {type === 0 && (
        /* Website Silhouette */
        <svg width={100 * s} height={60 * s} viewBox="0 0 80 50">
          <rect x="0" y="0" width="80" height="50" rx="4" fill="none" stroke={CYAN} strokeWidth="3" style={{ filter: `drop-shadow(0 0 ${8 * s}px ${CYAN})` }} />
          <line x1="0" y1="12" x2="80" y2="12" stroke={CYAN} strokeWidth="2" />
          <rect x="8" y="20" width="20" height="20" rx="2" fill={CYAN} opacity="0.4" />
          <line x1="36" y1="20" x2="72" y2="20" stroke={CYAN} strokeWidth="3" />
          <line x1="36" y1="32" x2="60" y2="32" stroke={CYAN} strokeWidth="3" />
        </svg>
      )}
      {type === 1 && (
        /* Video Player Silhouette */
        <svg width={90 * s} height={55 * s} viewBox="0 0 70 40">
          <rect x="0" y="0" width="70" height="40" rx="4" fill="none" stroke={PURPLE} strokeWidth="3" style={{ filter: `drop-shadow(0 0 ${8 * s}px ${PURPLE})` }} />
          <path d="M 30 12 L 48 20 L 30 28 Z" fill={PURPLE} />
          <rect x="5" y="32" width="60" height="4" rx="2" fill={PURPLE} opacity="0.3" />
          <rect x="5" y="32" width="35" height="4" rx="2" fill={PURPLE} />
        </svg>
      )}
      {type === 2 && (
        /* Infographic Silhouette */
        <svg width={70 * s} height={70 * s} viewBox="0 0 60 60">
          <line x1="5" y1="55" x2="55" y2="55" stroke={CYAN} strokeWidth="3" style={{ filter: `drop-shadow(0 0 ${8 * s}px ${CYAN})` }} />
          <line x1="5" y1="5" x2="5" y2="55" stroke={CYAN} strokeWidth="3" />
          <rect x="12" y="25" width="10" height="30" fill={CYAN} opacity="0.5" />
          <rect x="28" y="10" width="10" height="45" fill={CYAN} opacity="0.7" />
          <rect x="44" y="35" width="10" height="20" fill={CYAN} opacity="0.9" />
        </svg>
      )}
      {type === 3 && (
        /* Presentation Silhouette */
        <svg width={90 * s} height={65 * s} viewBox="0 0 70 50">
          <rect x="0" y="0" width="70" height="50" rx="2" fill="none" stroke={PURPLE} strokeWidth="3" style={{ filter: `drop-shadow(0 0 ${8 * s}px ${PURPLE})` }} />
          <circle cx="15" cy="15" r="6" fill={PURPLE} opacity="0.6" />
          <rect x="30" y="12" width="35" height="4" rx="2" fill={PURPLE} />
          <rect x="30" y="20" width="25" height="4" rx="2" fill={PURPLE} />
          <rect x="10" y="32" width="50" height="10" rx="2" fill={PURPLE} opacity="0.2" />
        </svg>
      )}
      {type === 4 && (
        /* Motion Path / Abstract Line */
        <svg width={80 * s} height={40 * s} viewBox="0 0 60 30">
          <path 
            d="M 5 25 Q 30 5 55 25" 
            fill="none" 
            stroke={CYAN} 
            strokeWidth="4" 
            strokeLinecap="round"
            style={{ filter: `drop-shadow(0 0 ${12 * s}px ${CYAN})` }}
          />
        </svg>
      )}
    </div>
  );
};

export const ClearIdeaScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();
  const s = width / 1280;

  const entrance = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const float = Math.sin(frame / 20) * 20 * s;
  const scale = interpolate(entrance, [0, 1], [0.8, 1], clamp);
  const opacity = interpolate(entrance, [0, 1], [0, 1], clamp);

  return (
    <AbsoluteFill style={{ 
      backgroundColor: "#020202",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden"
    }}>
      {/* Background Glow */}
      <div style={{
        position: "absolute",
        width: 1000 * s,
        height: 1000 * s,
        background: `radial-gradient(circle, ${PURPLE}18 0%, transparent 70%)`,
        filter: `blur(${60 * s}px)`,
        transform: `translate3d(-50%, -50%, 0) translateY(${float * 0.5}px)`,
        left: "50%",
        top: "50%",
        willChange: "transform, filter",
      }} />

      {/* Abstract Animation Ideas Floating Around */}
      {opacity > 0.1 && [...Array(30)].map((_, i) => (
        <AbstractAnimationElement key={i} index={i} s={s} />
      ))}

      {/* Main Idea Element */}
      <div style={{
        position: "relative",
        width: 500 * s,
        height: 500 * s,
        opacity,
        transform: `scale(${scale}) translateY(${float}px)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        {/* Glassmorphic Ring */}
        <div style={{
          position: "absolute",
          inset: -40 * s,
          borderRadius: "50%",
          border: `${2 * s}px solid rgba(255, 255, 255, 0.1)`,
          background: "rgba(255, 255, 255, 0.03)",
          backdropFilter: `blur(${10 * s}px)`,
          boxShadow: `0 0 ${40 * s}px rgba(0, 0, 0, 0.5)`,
          willChange: "backdrop-filter",
          transform: "translate3d(0,0,0)",
        }} />

        <Img 
          src={staticFile("/tutorial_hell/idea.png")} 
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            filter: `drop-shadow(0 0 ${30 * s}px ${PURPLE}44)`,
          }}
        />

        {/* Floating Particles/Glows */}
        {[...Array(3)].map((_, i) => (
          <div key={i} style={{
            position: "absolute",
            width: 10 * s,
            height: 10 * s,
            borderRadius: "50%",
            backgroundColor: i % 2 === 0 ? CYAN : PURPLE,
            boxShadow: `0 0 ${15 * s}px ${i % 2 === 0 ? CYAN : PURPLE}`,
            transform: `translate(${(Math.sin(frame / 30 + i) * 300) * s}px, ${(Math.cos(frame / 20 + i) * 300) * s}px)`,
            opacity: 0.6,
          }} />
        ))}
      </div>

    </AbsoluteFill>
  );
};
