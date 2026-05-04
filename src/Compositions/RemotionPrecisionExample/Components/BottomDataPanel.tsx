import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";

export const BottomDataPanel: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const s = width / 1280;
  const isLandscape = width > height;

  const hash = Math.floor(Math.random() * 1000000).toString(16).toUpperCase();

  return (
    <div style={{
      position: "absolute",
      bottom: (isLandscape ? 80 : 300) * s,
      width: "80%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-end",
      fontFamily: "monospace",
      color: "rgba(0, 251, 255, 0.6)",
      fontSize: 24 * s,
      borderTop: `${2 * s}px solid rgba(0, 251, 255, 0.2)`,
      paddingTop: 40 * s,
    }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 * s }}>
        <div>BUILD_HASH: {hash}</div>
        <div>ENGINE_VERSION: 4.0.124</div>
        <div>RENDER_MODE: DETERMINISTIC</div>
      </div>

      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 18 * s, opacity: 0.5, marginBottom: 10 * s }}>CACHE_STATUS</div>
        <div style={{ display: "flex", gap: 5 * s }}>
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} style={{
              width: 15 * s,
              height: 30 * s,
              background: i < (frame % 20) ? "#39FF14" : "#222"
            }} />
          ))}
        </div>
      </div>

      <div style={{ textAlign: "right", display: "flex", flexDirection: "column", gap: 10 * s }}>
        <div>STABLE_FPS: 30.00</div>
        <div>BIT_DEPTH: 10-BIT</div>
        <div>OUTPUT: 4K_VERTICAL</div>
      </div>
    </div>
  );
};
