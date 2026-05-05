import React from "react";
import { Video, staticFile, useVideoConfig, interpolate, useCurrentFrame, spring } from "remotion";

interface Props {
  src: string;
  widthPercent?: number;
  aspectRatio?: number;
  startFrom?: number;
}

export const VideoContainer: React.FC<Props> = ({ 
  src, 
  widthPercent = 80,
  aspectRatio = 16 / 9,
  startFrom = 0
}) => {
  const { width, fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const s = width / 1280;

  const reveal = spring({
    frame: frame - 10,
    fps,
    config: { damping: 15 },
  });

  return (
    <div style={{
      width: `${widthPercent}%`,
      aspectRatio: `${aspectRatio}`,
      borderRadius: 30 * s,
      overflow: "hidden",
      border: `${3 * s}px solid rgba(0, 251, 255, 0.3)`,
      background: "#000",
      boxShadow: `
        0 ${40 * s}px ${100 * s}px rgba(0,0,0,0.5), 
        0 0 ${50 * s}px rgba(0, 251, 255, 0.1),
        inset 0 0 ${30 * s}px rgba(0, 251, 255, 0.05)
      `,
      transform: `scale(${interpolate(reveal, [0, 1], [0.9, 1])}) translateY(${interpolate(reveal, [0, 1], [30 * s, 0])}px)`,
      opacity: reveal,
      position: "relative",
    }}>
      <Video
        src={staticFile(src)}
        startFrom={startFrom}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
        }}
        muted
        loop
      />
      
      {/* Scanning effect overlay */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.1) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.03), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.03))",
        backgroundSize: `100% ${4 * s}px, ${6 * s}px 100%`,
        pointerEvents: "none",
        opacity: 0.3,
      }} />
    </div>
  );
};
