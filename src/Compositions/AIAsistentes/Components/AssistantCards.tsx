import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  staticFile,
} from "remotion";

const CLAUDE_LOGO = staticFile("ai_asistatns/claude_code_logo.png");
const ANTIGRAVITY_LOGO = staticFile("ai_asistatns/antigravity_logo.png");

const CYAN = "#00FBFF";

export const AssistantCards: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const s = width / 1280;

  const renderCard = (logo: string, name: string, delay: number, side: "left" | "right") => {
    const entry = spring({
      frame: frame - delay,
      fps,
      config: { damping: 12, stiffness: 100 },
    });

    const opacity = interpolate(entry, [0, 1], [0, 1]);
    const scale = interpolate(entry, [0, 1], [0.8, 1]);
    const y = interpolate(entry, [0, 1], [50 * s, 0]);
    const rotate = interpolate(entry, [0, 1], [side === "left" ? -5 : 5, 0]);

    return (
      <div
        style={{
          width: 300 * s,
          height: 400 * s,
          background: "rgba(255, 255, 255, 0.03)",
          backdropFilter: "blur(20px)",
          border: `${1 * s}px solid rgba(255, 255, 255, 0.1)`,
          borderRadius: 24 * s,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 20 * s,
          opacity,
          transform: `translateY(${y}px) scale(${scale}) rotate(${rotate}deg)`,
          boxShadow: `0 20px 50px rgba(0, 0, 0, 0.3), 0 0 20px ${CYAN}22`,
        }}
      >
        <div style={{
            width: 180 * s,
            height: 180 * s,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }}>
            <img
            src={logo}
            style={{
                maxWidth: "100%",
                maxHeight: "100%",
                filter: `drop-shadow(0 0 10px ${CYAN}44)`,
            }}
            alt={name}
            />
        </div>
        <span style={{
          color: "white",
          fontSize: 28 * s,
          fontWeight: 600,
          fontFamily: "system-ui",
          letterSpacing: 1 * s,
          opacity: 0.8,
        }}>
          {name}
        </span>
        
        {/* Decorative corner glow */}
        <div style={{
            position: "absolute",
            top: -2 * s,
            left: -2 * s,
            width: 40 * s,
            height: 40 * s,
            borderTop: `${2 * s}px solid ${CYAN}`,
            borderLeft: `${2 * s}px solid ${CYAN}`,
            borderRadius: "24px 0 0 0",
            opacity: 0.5,
        }} />
      </div>
    );
  };

  return (
    <AbsoluteFill style={{
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 60 * s,
    }}>
      {renderCard(CLAUDE_LOGO, "Claude Code", 10, "left")}
      {renderCard(ANTIGRAVITY_LOGO, "Antigravity", 25, "right")}
    </AbsoluteFill>
  );
};
