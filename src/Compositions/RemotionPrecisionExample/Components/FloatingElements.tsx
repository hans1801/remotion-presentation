import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";

export const FloatingElements: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const s = width / 1280;

  const elements = [
    { text: "{ }", color: "#00FBFF" },
    { text: "< />", color: "#39FF14" },
    { text: "()", color: "#FFF" },
    { text: "[ ]", color: "#00FBFF" },
    { text: "=>", color: "#39FF14" },
    { text: ";", color: "#FFF" },
    { text: "const", color: "#00FBFF" },
    { text: "interpolate", color: "#39FF14" },
    { text: "spring", color: "#FFF" },
    { text: "frame", color: "#00FBFF" },
    { text: "fps", color: "#39FF14" },
    { text: "video", color: "#FFF" },
  ];

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      {elements.map((el, i) => {
        const seed = i * 145.5;
        const x = (seed % 80) + 10;
        const y = ((seed * 1.3) % 80) + 10;
        
        // Circular motion
        const offsetX = Math.sin((frame + seed) / 40) * 50 * s;
        const offsetY = Math.cos((frame + seed) / 30) * 30 * s;
        const opacity = interpolate(Math.sin((frame + seed) / 20), [-1, 1], [0.2, 0.6]);

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${x}%`,
              top: `${y}%`,
              color: el.color,
              fontSize: 32 * s,
              fontFamily: "monospace",
              fontWeight: "bold",
              opacity,
              transform: `translate(${offsetX}px, ${offsetY}px) rotate(${frame * 0.5}deg)`,
              textShadow: `0 0 ${15 * s}px ${el.color}44`,
            }}
          >
            {el.text}
          </div>
        );
      })}
    </div>
  );
};
