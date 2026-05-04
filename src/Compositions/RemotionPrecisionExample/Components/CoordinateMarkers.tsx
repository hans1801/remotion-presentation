import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";

export const CoordinateMarkers: React.FC = () => {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();
  const s = width / 1280;

  const markers = [
    { label: "X_AXIS", value: (Math.sin(frame / 20) * 100).toFixed(2), pos: { top: "45%", left: "15%" } },
    { label: "Y_AXIS", value: (Math.cos(frame / 20) * 100).toFixed(2), pos: { top: "55%", right: "15%" } },
    { label: "Z_DEPTH", value: "4096.00", pos: { top: "35%", right: "20%" } },
    { label: "V_SYNC", value: "60Hz", pos: { bottom: "35%", left: "20%" } },
  ];

  return (
    <>
      {markers.map((m, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            ...m.pos,
            color: "rgba(0, 251, 255, 0.6)",
            fontFamily: "monospace",
            fontSize: 16 * s,
            borderLeft: `${2 * s}px solid #00FBFF`,
            paddingLeft: 10 * s,
          }}
        >
          <div style={{ fontSize: 10 * s, opacity: 0.5 }}>{m.label}</div>
          <div>{m.value}</div>
        </div>
      ))}
    </>
  );
};
