import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";

interface MetricCardProps {
  label: string;
  value: string;
  color: string;
  delay?: number;
  icon?: string;
  isViral?: boolean;
}

export const MetricCard: React.FC<MetricCardProps> = ({ label, value, color, delay = 0, icon, isViral }) => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const s = width / 1280;

  const entrance = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const opacity = interpolate(entrance, [0, 1], [0, 1]);
  const scale = interpolate(entrance, [0, 1], [0.8, 1]);
  const translateY = interpolate(entrance, [0, 1], [20 * s, 0]);

  // Extract number for animation if it's a simple number
  const numericValue = parseFloat(value.replace(/[^0-9.]/g, '')) || 0;
  const unit = value.replace(/[0-9.]/g, '');
  const displayValue = isViral 
    ? (numericValue * interpolate(entrance, [0, 1], [0, 1])).toFixed(numericValue > 100 ? 0 : 1)
    : value;

  return (
    <div style={{
      opacity,
      transform: `scale(${scale}) translateY(${translateY}px)`,
      background: isViral ? "rgba(255, 255, 255, 0.08)" : "rgba(255, 255, 255, 0.03)",
      backdropFilter: `blur(${10 * s}px)`,
      border: `${1 * s}px solid ${isViral ? color + "44" : "rgba(255, 255, 255, 0.1)"}`,
      borderRadius: 20 * s,
      padding: `${16 * s}px ${24 * s}px`,
      display: "flex",
      alignItems: "center",
      gap: 20 * s,
      minWidth: 240 * s,
      boxShadow: isViral ? `0 10px 40px ${color}22` : "none",
    }}>
      {icon && <span style={{ fontSize: 32 * s }}>{icon}</span>}
      <div style={{ display: "flex", flexDirection: "column", gap: 2 * s }}>
        <span style={{
          fontSize: 12 * s,
          color: "rgba(255, 255, 255, 0.4)",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: 1.5 * s,
        }}>
          {label}
        </span>
        <span style={{
          fontSize: 36 * s,
          color: color,
          fontWeight: 900,
          fontFamily: "Inter, sans-serif",
          textShadow: isViral ? `0 0 ${15 * s}px ${color}44` : "none",
        }}>
          {isViral ? displayValue + unit : value}
        </span>
      </div>
    </div>
  );
};
