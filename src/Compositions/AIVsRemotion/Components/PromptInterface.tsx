import React from "react";
import { useCurrentFrame, interpolate, useVideoConfig } from "remotion";

export const PromptInterface: React.FC<{ text: string; typingDuration?: number }> = ({ 
  text, 
  typingDuration = 40 
}) => {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();
  const s = width / 1280;

  const charsToShow = Math.floor(interpolate(frame, [0, typingDuration], [0, text.length], {
    extrapolateRight: "clamp"
  }));

  const displayText = text.slice(0, charsToShow);
  const cursor = frame % 20 < 10 ? "|" : " ";

  return (
    <div style={{
      width: "80%",
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      border: `${2 * s}px solid rgba(255, 255, 255, 0.1)`,
      borderRadius: 20 * s,
      padding: `${30 * s}px ${40 * s}px`,
      backdropFilter: "blur(20px)",
      boxShadow: `0 20 * s ${50 * s}px rgba(0,0,0,0.3)`,
      fontFamily: "monospace",
      color: "white",
      fontSize: 28 * s,
      position: "relative",
    }}>
      <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 14 * s, marginBottom: 10 * s, textTransform: "uppercase", letterSpacing: 2 * s }}>
        AI_GENERATOR_PROMPT
      </div>
      <div style={{ display: "flex" }}>
        <span style={{ color: "#00FBFF", marginRight: 15 * s }}>{">"}</span>
        <span>{displayText}{cursor}</span>
      </div>
      
      {/* Glow effect when generating */}
      <div style={{
        position: "absolute",
        inset: 0,
        borderRadius: 20 * s,
        boxShadow: frame > typingDuration ? `0 0 ${40 * s}px rgba(0, 251, 255, 0.2)` : "none",
        transition: "box-shadow 0.3s ease",
      }} />
    </div>
  );
};
