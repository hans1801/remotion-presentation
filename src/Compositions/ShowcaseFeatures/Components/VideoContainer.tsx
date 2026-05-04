import React from "react";
import { Video, staticFile, useVideoConfig, interpolate, useCurrentFrame, spring } from "remotion";

interface Props {
  src: string;
  widthPercent?: number;
  aspectRatio?: number;
}

export const VideoContainer: React.FC<Props> = ({ 
  src, 
  widthPercent = 80,
  aspectRatio = 16 / 9 
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
      border: `${3 * s}px solid rgba(255, 255, 255, 0.1)`,
      background: "#000",
      boxShadow: `0 40 * s ${100 * s}px rgba(0,0,0,0.5), 0 0 ${50 * s}px rgba(0, 251, 255, 0.1)`,
      transform: `scale(${interpolate(reveal, [0, 1], [0.9, 1])}) translateY(${interpolate(reveal, [0, 1], [30 * s, 0])}px)`,
      opacity: reveal,
      position: "relative",
    }}>
      <Video
        src={staticFile(src)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
        muted
        loop
      />
      
      {/* Decorative corners */}
      <div style={{
        position: "absolute",
        top: 20 * s,
        right: 20 * s,
        width: 100 * s,
        height: 40 * s,
        background: "rgba(0, 251, 255, 0.2)",
        backdropFilter: "blur(5px)",
        borderRadius: 5 * s,
        border: `${s}px solid rgba(0, 251, 255, 0.4)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#00FBFF",
        fontSize: 14 * s,
        fontFamily: "monospace",
        fontWeight: "bold",
      }}>
        LIVE_PREVIEW
      </div>
    </div>
  );
};
