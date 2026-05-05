import React from "react";
import { AbsoluteFill, Series, useVideoConfig, useCurrentFrame, interpolate, spring, staticFile, Img } from "remotion";
import { DarkTechBackground } from "../../Components/DarkTechBackground";
import { TerminalMockup, CodeGenerationMockup, IDEMockup } from "./Components/Mockups";

const CYAN = "#00FBFF";

const ConfigScene: React.FC<{ 
  logoUrl: string; 
  name: string; 
  children: React.ReactNode;
}> = ({ logoUrl, name, children }) => {
  const frame = useCurrentFrame();
  const { width, fps, height } = useVideoConfig();
  const s = width / 1280;

  // Entrance of the logo
  const entrance = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  // Movement from center to left
  const moveProgress = spring({
    frame: frame - 30,
    fps,
    config: { damping: 15, stiffness: 80 },
  });

  const logoX = interpolate(moveProgress, [0, 1], [0, -320 * s]);
  const logoScale = interpolate(entrance, [0, 1], [0.5, 1]);
  const contentOpacity = moveProgress;
  const contentX = interpolate(moveProgress, [0, 1], [100 * s, 0]);

  return (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      {/* Logo Card */}
      <div style={{
        transform: `translateX(${logoX}px) scale(${logoScale})`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 30 * s,
        padding: 40 * s,
        background: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(20px)",
        border: `${2 * s}px solid ${CYAN}44`,
        borderRadius: 40 * s,
        width: 320 * s,
        boxShadow: `0 0 50px ${CYAN}22`,
        zIndex: 2,
      }}>
        <div style={{
          width: 180 * s,
          height: 180 * s,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(255, 255, 255, 0.05)",
          borderRadius: "50%",
        }}>
          <Img 
            src={staticFile(logoUrl)} 
            style={{ 
              maxWidth: "100%", 
              maxHeight: "100%",
              filter: `drop-shadow(0 0 20px ${CYAN})`,
            }} 
          />
        </div>
        <span style={{
          fontSize: 32 * s,
          color: "white",
          fontWeight: 800,
          fontFamily: "Inter, system-ui",
          textAlign: "center",
        }}>
          {name}
        </span>
      </div>

      {/* Side Content */}
      <div style={{
        position: "absolute",
        right: width / 2 - 450 * s,
        width: 600 * s,
        height: 400 * s,
        opacity: contentOpacity,
        transform: `translateX(${contentX}px)`,
      }}>
        {children}
      </div>
    </AbsoluteFill>
  );
};

export const StackConfig: React.FC = () => {
  return (
    <DarkTechBackground>
      <Series>
        <Series.Sequence durationInFrames={77}>
          <ConfigScene logoUrl="config_logos/node_logo.png" name="Node.js">
            <TerminalMockup />
          </ConfigScene>
        </Series.Sequence>
        
        <Series.Sequence durationInFrames={79}>
          <ConfigScene logoUrl="config_logos/claude_code_logo.png" name="Claude Code">
            <CodeGenerationMockup />
          </ConfigScene>
        </Series.Sequence>
        
        <Series.Sequence durationInFrames={185}>
          <ConfigScene logoUrl="config_logos/antigravity_logo.png" name="Antigravity">
            <IDEMockup />
          </ConfigScene>
        </Series.Sequence>
      </Series>
    </DarkTechBackground>
  );
};
