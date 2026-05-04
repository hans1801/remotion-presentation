import React from "react";
import { AbsoluteFill, useVideoConfig, Video, staticFile, interpolate, useCurrentFrame } from "remotion";

interface Props {
  videoPaths: string[];
  columns?: number;
  opacity?: number;
}

export const VideoGrid: React.FC<Props> = ({ videoPaths, columns = 3, opacity = 1 }) => {
  const { width, height } = useVideoConfig();
  const frame = useCurrentFrame();
  const s = width / 1280;

  const gap = 40 * s;
  const gridWidth = width * 0.8;
  const itemWidth = (gridWidth - (columns - 1) * gap) / columns;
  const itemHeight = itemWidth * (9 / 16);

  return (
    <div style={{
      display: "flex",
      gap: `${gap}px`,
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      opacity,
      transform: `scale(${interpolate(opacity, [0, 1], [0.9, 1])})`,
    }}>
      {videoPaths.map((path, i) => (
        <div key={i} style={{
          width: itemWidth,
          height: itemHeight,
          borderRadius: 20 * s,
          overflow: "hidden",
          border: `${2 * s}px solid rgba(0, 251, 255, 0.3)`,
          boxShadow: `0 0 ${30 * s}px rgba(0, 251, 255, 0.1)`,
          position: "relative",
          backgroundColor: "#111",
        }}>
          <Video
            src={staticFile(path)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            muted
            loop
          />
          <div style={{
            position: "absolute",
            bottom: 20 * s,
            left: 20 * s,
            backgroundColor: "rgba(0,0,0,0.6)",
            padding: `${5 * s}px ${15 * s}px`,
            borderRadius: 10 * s,
            color: "#00FBFF",
            fontSize: 16 * s,
            fontFamily: "monospace",
            backdropFilter: "blur(5px)",
            border: `${s}px solid rgba(0,251,255,0.2)`,
          }}>
            ITERACIÓN_0{i + 1}
          </div>
        </div>
      ))}
    </div>
  );
};
