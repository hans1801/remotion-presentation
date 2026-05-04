import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";

export const SideMetrics: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const s = width / 1280;

  const metricStyle: React.CSSProperties = {
    position: "absolute",
    color: "rgba(0, 251, 255, 0.4)",
    fontFamily: "monospace",
    fontSize: 12 * s,
    display: "flex",
    flexDirection: "column",
    gap: 10 * s,
  };

  return (
    <>
      {/* Left side metrics */}
      <div style={{ ...metricStyle, left: 40 * s, top: "30%" }}>
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 * s }}>
            <div style={{ 
              width: interpolate(Math.sin((frame + i * 20) / 10), [-1, 1], [20, 100]) * s, 
              height: 4 * s, 
              background: "#00FBFF22" 
            }} />
            <span>0x{((frame + i) % 255).toString(16).toUpperCase()}</span>
          </div>
        ))}
      </div>

      {/* Right side metrics */}
      <div style={{ ...metricStyle, right: 40 * s, top: "40%", textAlign: "right" }}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i}>
            SYS_LOG_{i}: {Math.sin((frame + i * 50) / 20).toFixed(4)}
          </div>
        ))}
      </div>
    </>
  );
};
