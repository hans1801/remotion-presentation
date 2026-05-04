import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

const CYAN = "#00FBFF";

interface TextSceneProps {
  text: string;
  duration: number;
}

export const TextScene: React.FC<TextSceneProps> = ({ text, duration }) => {
  const frame = useCurrentFrame();
  const { width, fps } = useVideoConfig();
  const s = width / 1280;

  const entrance = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  const opacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });
  
  const exitFrame = 10; 
  const exit = interpolate(frame, [duration - exitFrame, duration], [1, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const scale = interpolate(entrance, [0, 1], [0.95, 1]);
  
  // Static glow to avoid jumps between sequences
  const glow = 20 * s;

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        opacity: opacity * exit,
      }}
    >
      <div
        style={{
          transform: `scale(${scale})`,
          textAlign: "center",
          width: "90%",
        }}
      >
        <h1
          style={{
            color: "white",
            fontSize: 80 * s,
            fontFamily: "Inter, system-ui, sans-serif",
            fontWeight: 800,
            margin: 0,
            textShadow: `0 0 ${glow}px rgba(255, 255, 255, 0.4)`,
            letterSpacing: -2 * s,
            lineHeight: 1.1,
          }}
        >
          {text}
        </h1>
        
        {/* Subtle decorative line */}
        <div style={{
          width: interpolate(entrance, [0.5, 1], [0, 120 * s], { extrapolateLeft: "clamp" }),
          height: 6 * s,
          background: `linear-gradient(90deg, transparent, ${CYAN}, transparent)`,
          marginTop: 30 * s,
          marginInline: "auto",
          borderRadius: 3 * s,
          boxShadow: `0 0 ${15 * s}px ${CYAN}`,
        }} />
      </div>
    </AbsoluteFill>
  );
};
