import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  staticFile,
  Img,
  OffthreadVideo,
} from "remotion";
import { DarkTechBackground } from "../../Components/DarkTechBackground";

const CYAN = "#00FBFF";

const LogoCard: React.FC<{ logoUrl: string; name: string; delay: number }> = ({ logoUrl, name, delay }) => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const s = width / 1280;

  const entrance = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const opacity = interpolate(entrance, [0, 1], [0, 1]);
  const scale = interpolate(entrance, [0, 1], [0.8, 1]);
  const floatY = Math.sin(frame / 30 + delay) * 12 * s;

  return (
    <div style={{
      opacity,
      transform: `scale(${scale}) translateY(${floatY}px)`,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 25 * s,
      padding: 50 * s,
      background: "rgba(20, 20, 20, 0.4)", // More opaque and darker
      backdropFilter: "blur(50px)", // More blur
      border: `${2.5 * s}px solid rgba(0, 251, 255, 0.2)`, // Cyan tint in border
      borderRadius: 45 * s,
      width: 400 * s,
      boxShadow: `0 40px 80px rgba(0,0,0,0.8), 0 0 20px ${CYAN}11`,
    }}>
      <div style={{
        width: 180 * s,
        height: 180 * s,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(255, 255, 255, 0.05)",
        borderRadius: "50%",
        padding: 25 * s,
      }}>
        <Img 
          src={staticFile(logoUrl)} 
          style={{ 
            maxWidth: "100%", 
            maxHeight: "100%",
            filter: `drop-shadow(0 0 10px ${CYAN}66) contrast(1.1) brightness(1.1)`,
          }} 
        />
      </div>
      <span style={{
        color: "white",
        fontSize: 36 * s,
        fontWeight: "bold",
        fontFamily: "Inter, sans-serif",
        textShadow: `0 0 15px ${CYAN}cc`,
      }}>
        {name}
      </span>
    </div>
  );
};

export const RemotionClaude: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();
  const s = width / 1280;

  const entrance = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  const windowScale = interpolate(entrance, [0, 1], [0.9, 1]);
  const windowRotateX = Math.sin(frame / 60) * 1.5;
  const windowRotateY = Math.cos(frame / 70) * 2;

  return (
    <DarkTechBackground>
      <AbsoluteFill style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        perspective: "1500px",
      }}>
        {/* Main Blurred Video Window */}
        <div style={{
          width: 900 * s,
          height: 550 * s,
          background: "rgba(18, 18, 18, 0.85)", // More opaque
          backdropFilter: "blur(30px)", // Added blur to the window itself
          borderRadius: 30 * s,
          border: `2px solid ${CYAN}44`,
          boxShadow: `0 50px 100px rgba(0,0,0,0.9), 0 0 50px ${CYAN}22`,
          overflow: "hidden",
          transform: `scale(${windowScale}) rotateX(${windowRotateX}deg) rotateY(${windowRotateY}deg)`,
          position: "relative",
          zIndex: 2,
        }}>
          {/* macOS Header */}
          <div style={{
            height: 40 * s,
            background: "rgba(18, 18, 18, 0.95)",
            borderBottom: "1px solid rgba(0, 251, 255, 0.2)",
            display: "flex",
            alignItems: "center",
            padding: `0 ${15 * s}px`,
            gap: 8 * s,
          }}>
            <div style={{ width: 10 * s, height: 10 * s, borderRadius: "50%", background: "#FF5F56" }} />
            <div style={{ width: 10 * s, height: 10 * s, borderRadius: "50%", background: "#FFBD2E" }} />
            <div style={{ width: 10 * s, height: 10 * s, borderRadius: "50%", background: "#27C93F" }} />
          </div>
          
          <div style={{ flex: 1, position: "relative", filter: "blur(20px) brightness(0.5)" }}>
            <OffthreadVideo
              src={staticFile("samples/infografia.mp4")}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              muted
            />
          </div>
        </div>

        {/* Side Logos - Positioned closer to center */}
        <div style={{
          position: "absolute",
          left: 220 * s,
          zIndex: 3,
        }}>
          <LogoCard logoUrl="config_logos/claude_code_logo.png" name="Claude Code" delay={75} />
        </div>

        <div style={{
          position: "absolute",
          right: 220 * s,
          zIndex: 3,
        }}>
          <LogoCard logoUrl="overlay_assets/remotion_logo.png" name="Remotion" delay={112} />
        </div>

      </AbsoluteFill>
    </DarkTechBackground>
  );
};
