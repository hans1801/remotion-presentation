import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  OffthreadVideo,
  Series,
  staticFile,
} from "remotion";
import { DarkTechBackground } from "../../Components/DarkTechBackground";

const CYAN = "#00FBFF";

const InstallScene: React.FC<{
  videoSrc: string;
  title: string;
}> = ({ videoSrc, title }) => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const s = width / 1280;

  const entrance = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  const fadeInOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const windowScale = interpolate(entrance, [0, 1], [0.95, 1]);
  
  const float = Math.sin(frame / 30) * 6 * s;
  const rotX = Math.sin(frame / 60) * 0.8; 
  const rotY = Math.cos(frame / 70) * 1.2; 

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        perspective: "1500px",
        opacity: fadeInOpacity,
      }}
    >
      <div
        style={{
          width: 1050 * s,
          height: 630 * s,
          background: "#121212",
          borderRadius: 20 * s,
          border: `1px solid ${CYAN}33`,
          boxShadow: `0 50px 100px rgba(0,0,0,0.8), 0 0 30px ${CYAN}11`,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          transform: `scale(${windowScale}) translateY(${interpolate(entrance, [0, 1], [40 * s, 0]) + float}px) rotateX(${rotX}deg) rotateY(${rotY}deg)`,
          position: "relative",
        }}
      >
        {/* Browser Header */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 44 * s,
            background: "rgba(18, 18, 18, 0.95)",
            backdropFilter: "blur(12px)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
            display: "flex",
            alignItems: "center",
            padding: `0 ${20 * s}px`,
            gap: 10 * s,
            zIndex: 10,
          }}
        >
          <div style={{ width: 12 * s, height: 12 * s, borderRadius: "50%", background: "#FF5F56" }} />
          <div style={{ width: 12 * s, height: 12 * s, borderRadius: "50%", background: "#FFBD2E" }} />
          <div style={{ width: 12 * s, height: 12 * s, borderRadius: "50%", background: "#27C93F" }} />
          <div
            style={{
              flex: 1,
              textAlign: "center",
              fontSize: 14 * s,
              color: "rgba(255, 255, 255, 0.5)",
              letterSpacing: 2 * s,
              fontWeight: 600,
              fontFamily: "Inter, sans-serif",
              textTransform: "uppercase",
            }}
          >
            {title}
          </div>
        </div>

        {/* Video Content */}
        <div style={{ flex: 1, background: "#000", position: "relative", marginTop: 44 * s }}>
          <OffthreadVideo
            src={staticFile(videoSrc)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const StackInstall: React.FC = () => {
  return (
    <DarkTechBackground>
      <Series>
        <Series.Sequence durationInFrames={407}>
          <InstallScene videoSrc="stack_install/node_jd_install_compat.mp4" title="Node.js Installation" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={210}>
          <InstallScene videoSrc="stack_install/claude_install_compat.mp4" title="Claude Code Setup" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={222}>
          <InstallScene videoSrc="stack_install/antigravity_install_compat.mp4" title="Antigravity IDE" />
        </Series.Sequence>
      </Series>
    </DarkTechBackground>
  );
};
