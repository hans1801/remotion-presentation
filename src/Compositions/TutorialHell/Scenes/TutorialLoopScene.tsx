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

const CYAN = "#00FBFF";
const PURPLE = "#BC13FE";

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };

const AbstractAnimationElement: React.FC<{ s: number; index: number }> = ({ s, index }) => {
  const frame = useCurrentFrame();
  
  // Continue motion from Scene 1 (+75 frames offset)
  const radius = (250 + (index % 8) * 120) * s;
  const speed = 0.01 + (index % 6) * 0.005;
  const angle = (frame + 75) * speed + index * 4;
  
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;
  
  // Fade out over the first 45 frames of Scene 2
  const fadeOut = interpolate(frame, [0, 45], [1, 0], clamp);
  const pulseOpacity = 0.3 + Math.abs(Math.sin((frame + 75) / 40 + index)) * 0.4;
  
  if (fadeOut <= 0) return null;

  const type = index % 5;

  return (
    <div style={{
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: `translate(${x}px, ${y}px) rotate(${angle * 20}deg)`,
      opacity: pulseOpacity * fadeOut,
      pointerEvents: "none",
    }}>
      {type === 0 && (
        <svg width={100 * s} height={60 * s} viewBox="0 0 80 50">
          <rect x="0" y="0" width="80" height="50" rx="4" fill="none" stroke={CYAN} strokeWidth="3" style={{ filter: `drop-shadow(0 0 ${8 * s}px ${CYAN})` }} />
          <line x1="0" y1="12" x2="80" y2="12" stroke={CYAN} strokeWidth="2" />
          <rect x="8" y="20" width="20" height="20" rx="2" fill={CYAN} opacity="0.4" />
          <line x1="36" y1="20" x2="72" y2="20" stroke={CYAN} strokeWidth="3" />
          <line x1="36" y1="32" x2="60" y2="32" stroke={CYAN} strokeWidth="3" />
        </svg>
      )}
      {type === 1 && (
        <svg width={90 * s} height={55 * s} viewBox="0 0 70 40">
          <rect x="0" y="0" width="70" height="40" rx="4" fill="none" stroke={PURPLE} strokeWidth="3" style={{ filter: `drop-shadow(0 0 ${8 * s}px ${PURPLE})` }} />
          <path d="M 30 12 L 48 20 L 30 28 Z" fill={PURPLE} />
          <rect x="5" y="32" width="60" height="4" rx="2" fill={PURPLE} opacity="0.3" />
          <rect x="5" y="32" width="35" height="4" rx="2" fill={PURPLE} />
        </svg>
      )}
      {type === 2 && (
        <svg width={70 * s} height={70 * s} viewBox="0 0 60 60">
          <line x1="5" y1="55" x2="55" y2="55" stroke={CYAN} strokeWidth="3" style={{ filter: `drop-shadow(0 0 ${8 * s}px ${CYAN})` }} />
          <line x1="5" y1="5" x2="5" y2="55" stroke={CYAN} strokeWidth="3" />
          <rect x="12" y="25" width="10" height="30" fill={CYAN} opacity="0.5" />
          <rect x="28" y="10" width="10" height="45" fill={CYAN} opacity="0.7" />
          <rect x="44" y="35" width="10" height="20" fill={CYAN} opacity="0.9" />
        </svg>
      )}
      {type === 3 && (
        <svg width={90 * s} height={65 * s} viewBox="0 0 70 50">
          <rect x="0" y="0" width="70" height="50" rx="2" fill="none" stroke={PURPLE} strokeWidth="3" style={{ filter: `drop-shadow(0 0 ${8 * s}px ${PURPLE})` }} />
          <circle cx="15" cy="15" r="6" fill={PURPLE} opacity="0.6" />
          <rect x="30" y="12" width="35" height="4" rx="2" fill={PURPLE} />
          <rect x="30" y="20" width="25" height="4" rx="2" fill={PURPLE} />
          <rect x="10" y="32" width="50" height="10" rx="2" fill={PURPLE} opacity="0.2" />
        </svg>
      )}
      {type === 4 && (
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

const TutorialCard: React.FC<{ s: number; index: number; total: number }> = ({ s, index, total }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Staggered entrance
  const entrance = spring({
    frame: frame - index * 5,
    fps,
    config: { damping: 15, stiffness: 120 },
  });

  const isTop = index < 3;
  const isLeftToRight = isTop;
  
  // 30% of screen width
  const cardWidth = 384 * s; // 0.3 * 1280
  const cardHeight = (cardWidth / 1.777);
  
  // Horizontal distribution (3 cards per row)
  const xOffset = ((index % 3) - 1) * 420 * s; 
  
  const initialX = isLeftToRight ? -1000 * s : 1000 * s;
  const targetX = xOffset;
  
  const currentX = interpolate(entrance, [0, 1], [initialX, targetX]);
  
  // Vertical position (Top vs Bottom) - Brought closer together
  const targetY = isTop ? -150 * s : 150 * s;
  const currentY = interpolate(entrance, [0, 1], [targetY, targetY]) + Math.sin(frame / 20 + index) * 15 * s;
  
  const rotate = interpolate(entrance, [0, 1], [isLeftToRight ? -10 : 10, (index % 2 === 0 ? 2 : -2)]);
  const scale = 1.0; // 30% fixed size as requested

  const progress = interpolate(frame - index * 5, [0, 60], [0, 100], clamp);

  return (
    <div style={{
      position: "absolute",
      width: cardWidth,
      height: cardHeight,
      left: "50%",
      top: "50%",
      marginLeft: -cardWidth / 2,
      marginTop: -cardHeight / 2,
      transform: `translate(${currentX}px, ${currentY}px) scale(${scale}) rotate(${rotate}deg)`,
      opacity: entrance,
      background: "#000",
      borderRadius: 12 * s,
      boxShadow: `0 ${20 * s}px ${60 * s}px rgba(0,0,0,0.8)`,
      overflow: "hidden",
      border: `${2 * s}px solid rgba(255, 255, 255, 0.1)`,
    }}>
      {/* Full-bleed Thumbnail */}
      <Img 
        src={staticFile(`/tutorial_hell/tutorial_${(index % 6) + 1}.png`)} 
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
      
      {/* Subtle Progress Overlay */}
      <div style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 6 * s,
        background: "rgba(255, 255, 255, 0.1)",
      }}>
        <div style={{
          height: "100%",
          width: `${progress}%`,
          background: CYAN,
          boxShadow: `0 0 ${15 * s}px ${CYAN}`,
        }} />
      </div>
    </div>
  );
};

export const TutorialLoopScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const s = width / 1280;

  // Background transition from Scene 1
  const bgOpacity = interpolate(frame, [0, 20], [0, 1], clamp);

  return (
    <AbsoluteFill style={{ backgroundColor: "#020202", overflow: "hidden" }}>
      {/* Background Grid */}
      <div style={{
        position: "absolute",
        inset: 0,
        opacity: bgOpacity * 0.1,
        backgroundImage: `linear-gradient(${CYAN}33 ${s}px, transparent ${s}px), linear-gradient(90deg, ${CYAN}33 ${s}px, transparent ${s}px)`,
        backgroundSize: `${60 * s}px ${60 * s}px`,
      }} />

      {/* Floating Elements from Scene 1 fading out */}
      {[...Array(30)].map((_, i) => (
        <AbstractAnimationElement key={i} index={i} s={s} />
      ))}

      {/* Persistent Idea (Fading out and getting covered) */}
      <div style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: `translate(-50%, -50%) scale(${interpolate(frame, [0, 75], [1, 0.7])}) translateY(${Math.sin((75 + frame) / 20) * 20 * s}px)`,
        opacity: interpolate(frame, [30, 75], [1, 0.2], clamp),
      }}>
        <Img 
          src={staticFile("/tutorial_hell/idea.png")} 
          style={{ width: 500 * s, filter: `blur(${interpolate(frame, [20, 75], [0, 10])}px)` }}
        />
      </div>

      {/* 6 Tutorial Cards - 3 Top (L to R), 3 Bottom (R to L) */}
      {[...Array(6)].map((_, i) => (
        <TutorialCard key={i} index={i} s={s} total={6} />
      ))}

    </AbsoluteFill>
  );
};
