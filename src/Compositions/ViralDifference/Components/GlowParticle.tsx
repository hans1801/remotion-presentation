import React, { useMemo } from "react";
import { useCurrentFrame, interpolate, useVideoConfig } from "remotion";

interface GlowParticleProps {
  color: string;
  delay?: number;
  index: number;
}

export const GlowParticle: React.FC<GlowParticleProps> = ({ color, delay = 0, index }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const s = width / 1280;

  const randoms = useMemo(() => ({
    x: Math.random() * width,
    y: Math.random() * height,
    size: (Math.random() * 8 + 4) * s,
    speedX: (Math.random() - 0.5) * 4 * s,
    speedY: (Math.random() - 1.5) * 6 * s, // Upwards focus
    drift: Math.random() * 2 * Math.PI,
  }), [width, height, s]);

  const f = frame - delay;
  if (f < 0) return null;

  const currentX = randoms.x + randoms.speedX * f + Math.sin(f / 20 + randoms.drift) * 20 * s;
  const currentY = randoms.y + randoms.speedY * f;
  
  const opacity = interpolate(f, [0, 20, 60], [0, 0.8, 0], { extrapolateRight: "clamp" });
  const scale = interpolate(f, [0, 60], [1, 0.5]);

  return (
    <div style={{
      position: "absolute",
      left: currentX,
      top: currentY,
      width: randoms.size,
      height: randoms.size,
      borderRadius: "50%",
      backgroundColor: color,
      boxShadow: `0 0 ${randoms.size * 2}px ${color}`,
      opacity,
      transform: `scale(${scale})`,
      pointerEvents: "none",
    }} />
  );
};
