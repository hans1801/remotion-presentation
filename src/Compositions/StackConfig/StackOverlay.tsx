import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, staticFile, Img } from "remotion";

const CYAN = "#00FBFF";

const OverlayLogo: React.FC<{ logoUrl: string; name: string; delay: number; index: number }> = ({ logoUrl, name, delay, index }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const s = width / 1280;

  const entrance = spring({
    frame: frame - delay,
    fps,
    config: { damping: 10, stiffness: 150 },
  });

  const opacity = interpolate(entrance, [0, 1], [0, 1]);
  const scale = interpolate(entrance, [0, 1], [0.5, 1]);
  const floatY = Math.sin(frame / 20 + index) * 10 * s;

  return (
    <div style={{
      opacity,
      transform: `scale(${scale}) translateY(${floatY}px)`,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 10 * s,
      padding: 15 * s,
      background: "white",
      border: `${1 * s}px solid rgba(0, 0, 0, 0.1)`,
      borderRadius: 20 * s,
      width: 180 * s,
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
    }}>
      <div style={{
        width: 140 * s,
        height: 140 * s,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f9f9f9",
        borderRadius: 16 * s,
        padding: 5 * s,
      }}>
        <Img 
          src={staticFile(logoUrl)} 
          style={{ 
            maxWidth: "100%", 
            maxHeight: "100%",
            filter: `drop-shadow(0 0 10px ${CYAN}88)`,
          }} 
        />
      </div>
      <span style={{
        color: "black",
        fontSize: 22 * s,
        fontWeight: "bold",
        fontFamily: "Inter, sans-serif",
        textAlign: "center",
      }}>
        {name}
      </span>
    </div>
  );
};

export const StackOverlay: React.FC = () => {
  const { width, height } = useVideoConfig();
  const s = width / 1280;

  return (
    <AbsoluteFill style={{ background: "#808080" }}>
      <div style={{
        position: "absolute",
        bottom: 100 * s,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        gap: 60 * s,
      }}>
        <OverlayLogo logoUrl="config_logos/node_logo.png" name="Node.js" delay={0} index={0} />
        <OverlayLogo logoUrl="config_logos/claude_code_logo.png" name="Claude Code" delay={2} index={1} />
        <OverlayLogo logoUrl="config_logos/antigravity_logo.png" name="Antigravity" delay={4} index={2} />
      </div>
    </AbsoluteFill>
  );
};
