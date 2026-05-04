import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Video,
} from "remotion";
import videoSrc from "../assets/remotion-yt.webm";

export const BrowserScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const s = width / 1280;

  const entrance = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  // Quick Fade In (Frames 0-10)
  const fadeInOpacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const windowScale = interpolate(entrance, [0, 1], [0.95, 1]);
  
  // Floating Motion & 3D Tilt (Subtle)
  const float = Math.sin(frame / 25) * 8 * s;
  const rotX = Math.sin(frame / 50) * 2; 
  const rotY = Math.cos(frame / 60) * 3; 

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#020202",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        opacity: fadeInOpacity,
        perspective: "1200px",
      }}
    >
      {/* Background Depth */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at 50% 50%, #BC13FE08 0%, transparent 70%)",
        }}
      />

      {/* Floating Browser Window */}
      <div
        style={{
          width: 1000 * s,
          height: 600 * s,
          background: "#1e1e1e",
          borderRadius: 16 * s,
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 40px 80px rgba(0,0,0,0.6), 0 0 20px rgba(0, 251, 255, 0.1)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          transform: `scale(${windowScale}) translateY(${interpolate(entrance, [0, 1], [50 * s, 0]) + float}px) rotateX(${rotX}deg) rotateY(${rotY}deg)`,
          position: "relative",
        }}
      >
        {/* Video Content - Placed first to be behind the header */}
        <div style={{ flex: 1, background: "#000", position: "relative" }}>
          <Video
            src={videoSrc}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>

        {/* Browser Header (macOS style) - OVERLAY */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 40 * s,
            background: "rgba(30, 30, 30, 0.95)",
            backdropFilter: "blur(10px)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
            display: "flex",
            alignItems: "center",
            padding: `0 ${16 * s}px`,
            gap: 8 * s,
            zIndex: 10,
          }}
        >
          <div style={{ width: 12 * s, height: 12 * s, borderRadius: "50%", background: "#ff5f56" }} />
          <div style={{ width: 12 * s, height: 12 * s, borderRadius: "50%", background: "#ffbd2e" }} />
          <div style={{ width: 12 * s, height: 12 * s, borderRadius: "50%", background: "#27c93f" }} />
          <div
            style={{
              flex: 1,
              textAlign: "center",
              fontSize: 12 * s,
              color: "rgba(255, 255, 255, 0.5)",
              letterSpacing: 1 * s,
              fontWeight: 500,
            }}
          >
            remotion.dev
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
