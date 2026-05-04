import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";

export const BackgroundCodeStream: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const s = width / 1280;

  const columns = 8;
  const columnWidth = width / columns;

  return (
    <div style={{ position: "absolute", inset: 0, opacity: 0.1, pointerEvents: "none" }}>
      {Array.from({ length: columns }).map((_, i) => {
        const speed = 2 + (i % 3);
        const yOffset = (frame * speed) % height;
        
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: i * columnWidth,
              top: -height + yOffset,
              width: columnWidth,
              color: "#00FBFF",
              fontFamily: "monospace",
              fontSize: 14 * s,
              writingMode: "vertical-rl",
              textOrientation: "monospace",
              whiteSpace: "nowrap",
              overflow: "hidden",
            }}
          >
            {`const animation = interpolate(frame, [0, 100], [0, 1]); // deterministic logic export const Component = () => { return <Video src={asset} /> }; precision: 1.0, sync: true, engine: 'remotion' `.repeat(5)}
          </div>
        );
      })}
    </div>
  );
};
