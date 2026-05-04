import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";

interface Props {
  title: string;
}

export const FeatureTitle: React.FC<Props> = ({ title }) => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const s = width / 1280;

  const entrance = spring({
    frame,
    fps,
    config: { damping: 12 },
  });

  const glow = interpolate(frame % 60, [0, 30, 60], [0.4, 0.8, 0.4]);

  return (
    <div style={{
      padding: `${20 * s}px ${60 * s}px`,
      background: "rgba(255, 255, 255, 0.05)",
      backdropFilter: "blur(20px)",
      border: `${2 * s}px solid rgba(0, 251, 255, 0.3)`,
      borderRadius: 100 * s,
      display: "inline-block",
      transform: `translateY(${interpolate(entrance, [0, 1], [50 * s, 0])}px)`,
      opacity: entrance,
      boxShadow: `0 0 ${40 * s}px rgba(0, 251, 255, ${glow * 0.3})`,
    }}>
      <h2 style={{
        margin: 0,
        color: "white",
        fontSize: 48 * s,
        fontWeight: 800,
        letterSpacing: 2 * s,
        textTransform: "uppercase",
        textShadow: `0 0 ${20 * s}px rgba(0, 251, 255, ${glow})`,
        fontFamily: "Inter, system-ui, sans-serif",
      }}>
        {title}
      </h2>
    </div>
  );
};
