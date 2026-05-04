import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";

export const DataOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();
  const s = width / 1280;
  const isLandscape = width > height;

  const time = (frame / fps).toFixed(2);
  const rotation = (frame * 2).toFixed(1);

  const containerStyle: React.CSSProperties = {
    position: "absolute",
    top: (isLandscape ? 80 : 300) * s,
    left: "50%",
    transform: "translateX(-50%)",
    color: "#00FBFF",
    fontFamily: "monospace",
    fontSize: 32 * s,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: `${15 * s}px ${25 * s}px`,
    borderRadius: 8 * s,
    border: `${s}px solid rgba(0, 251, 255, 0.3)`,
    backdropFilter: "blur(10px)",
    display: "flex",
    flexDirection: "column",
    gap: 8 * s,
    zIndex: 10,
  };

  return (
    <div style={containerStyle}>
      <div style={{ opacity: 0.6, fontSize: 20 * s, textTransform: "uppercase", letterSpacing: 2 * s }}>
        Deterministic Engine State
      </div>
      <div>FRAME: {frame.toString().padStart(4, "0")}</div>
      <div>TIME: {time}s</div>
      <div>ENGINE_SYNC: OK</div>
      <div>MATH_PRECISION: 100%</div>
      <div style={{ height: 2 * s, background: "rgba(0, 251, 255, 0.2)", margin: `${5 * s}px 0` }} />
      <div style={{ color: "#39FF14" }}>ROTATION_MATRIX: {rotation}°</div>
    </div>
  );
};
