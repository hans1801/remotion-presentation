import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";
import { DarkTechBackground } from "../../Components/DarkTechBackground";

const CYAN = "#00FBFF";

export const InstallRemotion: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const s = width / 1280;

  const entrance = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const opacity = interpolate(entrance, [0, 1], [0, 1]);
  const scale = interpolate(entrance, [0, 1], [0.9, 1]);
  const letterSpacing = interpolate(entrance, [0, 1], [10 * s, 2 * s]);

  return (
    <DarkTechBackground>
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity,
        }}
      >
        <h1
          style={{
            color: "white",
            fontSize: 80 * s,
            fontFamily: "Inter, sans-serif",
            fontWeight: 900,
            textAlign: "center",
            textTransform: "uppercase",
            letterSpacing: `${letterSpacing}px`,
            transform: `scale(${scale})`,
            textShadow: `0 0 30px ${CYAN}88, 0 0 60px ${CYAN}44`,
          }}
        >
          Instalar Remotion
        </h1>
        
        <div style={{
          position: "absolute",
          width: interpolate(entrance, [0.5, 1], [0, 500 * s], { extrapolateLeft: "clamp" }),
          height: 2 * s,
          background: `linear-gradient(90deg, transparent, ${CYAN}, transparent)`,
          marginTop: 120 * s,
          opacity: interpolate(entrance, [0.7, 1], [0, 1]),
        }} />
      </AbsoluteFill>
    </DarkTechBackground>
  );
};
