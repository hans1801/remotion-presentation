import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Video,
} from "remotion";
import videoSrc from "../assets/hypnoz.mp4";

export const HypnozScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const s = width / 1280;

  const entrance = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  // Quick Fade In (Frames 0-15)
  const fadeInOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const windowScale = interpolate(entrance, [0, 1], [0.9, 1]);
  
  // Floating Motion & 3D Tilt (Subtle)
  const float = Math.sin(frame / 30) * 12 * s;
  const rotX = Math.sin(frame / 60) * 2.5; 
  const rotY = Math.cos(frame / 70) * 3.5; 

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#020202",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        opacity: fadeInOpacity,
        perspective: "1500px",
      }}
    >
      {/* Background Depth - Deep Purple / Magenta accent for Hypnoz */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at 50% 50%, #BC13FE12 0%, transparent 70%)",
        }}
      />

      {/* Floating Browser Window */}
      <div
        style={{
          width: 1000 * s,
          height: 600 * s,
          background: "#121212",
          borderRadius: 20 * s,
          border: "1px solid rgba(188, 19, 254, 0.2)",
          boxShadow: "0 50px 100px rgba(0,0,0,0.8), 0 0 30px rgba(188, 19, 254, 0.15)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          transform: `scale(${windowScale}) translateY(${interpolate(entrance, [0, 1], [60 * s, 0]) + float}px) rotateX(${rotX}deg) rotateY(${rotY}deg)`,
          position: "relative",
        }}
      >
        {/* Browser Header (macOS style) */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 44 * s,
            background: "rgba(18, 18, 18, 0.9)",
            backdropFilter: "blur(12px)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
            display: "flex",
            alignItems: "center",
            padding: `0 ${20 * s}px`,
            gap: 10 * s,
            zIndex: 10,
          }}
        >
          <div style={{ width: 12 * s, height: 12 * s, borderRadius: "50%", background: "#FF5F56", border: "0.5px solid rgba(0,0,0,0.1)" }} />
          <div style={{ width: 12 * s, height: 12 * s, borderRadius: "50%", background: "#FFBD2E", border: "0.5px solid rgba(0,0,0,0.1)" }} />
          <div style={{ width: 12 * s, height: 12 * s, borderRadius: "50%", background: "#27C93F", border: "0.5px solid rgba(0,0,0,0.1)" }} />
          <div
            style={{
              flex: 1,
              textAlign: "center",
              fontSize: 14 * s,
              color: "rgba(255, 255, 255, 0.4)",
              letterSpacing: 1 * s,
              fontWeight: 500,
              fontFamily: "Inter, sans-serif",
            }}
          >
            hypnoz.ai
          </div>
        </div>

        {/* Video Content */}
        <div style={{ flex: 1, background: "#000", position: "relative", marginTop: 44 * s }}>
          <Video
            src={videoSrc}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};
