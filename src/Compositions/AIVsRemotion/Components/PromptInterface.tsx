import React from "react";
import { useCurrentFrame, interpolate, useVideoConfig } from "remotion";

export const PromptInterface: React.FC<{
  text: string;
  typingDuration?: number;
  typingDelay?: number;
}> = ({ text, typingDuration = 35, typingDelay = 8 }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const s = Math.min(width, height) / 1280;

  // Box is visible immediately; text starts typing after typingDelay frames
  const charsToShow = Math.floor(
    interpolate(frame, [typingDelay, typingDelay + typingDuration], [0, text.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  const displayText = text.slice(0, charsToShow);
  const cursor = frame % 20 < 10 ? "|" : " ";

  // Frame-based glow (no CSS transition — forbidden in Remotion)
  const glowOpacity = interpolate(
    frame,
    [typingDelay + typingDuration, typingDelay + typingDuration + 10],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        width: "80%",
        backgroundColor: "rgba(255, 255, 255, 0.08)",
        border: `${2 * s}px solid rgba(255, 255, 255, 0.18)`,
        borderRadius: 20 * s,
        padding: `${30 * s}px ${40 * s}px`,
        backdropFilter: "blur(20px)",
        boxShadow: `0 ${20 * s}px ${50 * s}px rgba(0,0,0,0.35)`,
        fontFamily: "monospace",
        color: "white",
        fontSize: 28 * s,
        position: "relative",
      }}
    >
      <div
        style={{
          color: "rgba(255,255,255,0.4)",
          fontSize: 14 * s,
          marginBottom: 10 * s,
          textTransform: "uppercase",
          letterSpacing: 2 * s,
        }}
      >
        AI_GENERATOR_PROMPT
      </div>
      <div style={{ display: "flex" }}>
        <span style={{ color: "#00FBFF", marginRight: 15 * s }}>{">"}</span>
        <span>{displayText}{cursor}</span>
      </div>

      {/* Cyan glow fades in once typing is done (frame-based, not CSS transition) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 20 * s,
          boxShadow: `0 0 ${40 * s}px rgba(0, 251, 255, 0.25)`,
          opacity: glowOpacity,
          pointerEvents: "none",
        }}
      />
    </div>
  );
};
