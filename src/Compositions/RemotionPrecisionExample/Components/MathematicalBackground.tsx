import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";

export const MathematicalBackground: React.FC = () => {
  const { width } = useVideoConfig();
  const s = width / 1280;

  const formulas = [
    "f(x) = sin(x) * interpolate(f, [0, 1], [0, 1])",
    "spring({ frame, fps, config: { damping: 10 } })",
    "transform: rotateX(deg) rotateY(deg) translateZ(px)",
    "const s = width / 1280; // responsive scaling",
    "Math.sqrt(Math.pow(x2-x1, 2) + Math.pow(y2-y1, 2))",
  ];

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.15 }}>
      {formulas.map((f, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${(i * 15 + 10) % 80}%`,
            top: `${(i * 20 + 20) % 80}%`,
            color: "#00FBFF",
            fontFamily: "monospace",
            fontSize: 20 * s,
            whiteSpace: "nowrap",
            transform: `rotate(${(i - 2) * 5}deg)`,
          }}
        >
          {f}
        </div>
      ))}
    </div>
  );
};
