import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";

export const TechnicalGrid: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const s = width / 1280;

  const rows = 15;
  const cols = 25;
  const gap = 40 * s;

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: `${gap}px`,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        perspective: "1000px",
      }}
    >
      {Array.from({ length: rows * cols }).map((_, i) => {
        const x = i % cols;
        const y = Math.floor(i / cols);
        
        // Mathematical wave based on position and frame
        const distance = Math.sqrt(Math.pow(x - cols / 2, 2) + Math.pow(y - rows / 2, 2));
        const delay = distance * 2;
        const scale = interpolate(
          Math.sin((frame - delay) / 10),
          [-1, 1],
          [0.5, 1.2],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );
        
        const opacity = interpolate(scale, [0.5, 1.2], [0.1, 0.6]);

        return (
          <div
            key={i}
            style={{
              width: 8 * s,
              height: 8 * s,
              backgroundColor: "#00FBFF",
              borderRadius: "50%",
              transform: `scale(${scale}) translateZ(${scale * 20}px)`,
              opacity,
              boxShadow: scale > 1 ? `0 0 ${10 * s}px #00FBFF` : "none",
            }}
          />
        );
      })}
    </div>
  );
};
