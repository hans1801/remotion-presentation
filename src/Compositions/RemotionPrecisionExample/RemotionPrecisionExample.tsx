import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { DarkTechBackground } from "../../Components/DarkTechBackground";
import { PrecisionCube } from "./Components/PrecisionCube";
import { FloatingElements } from "./Components/FloatingElements";
import { BackgroundCodeStream } from "./Components/BackgroundCodeStream";
import { MathematicalBackground } from "./Components/MathematicalBackground";
import { SideMetrics } from "./Components/SideMetrics";
import { CoordinateMarkers } from "./Components/CoordinateMarkers";
import { BottomDataPanel } from "./Components/BottomDataPanel";
import { DataOverlay } from "./Components/DataOverlay";

export const RemotionPrecisionExample: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();
  const s = width / 1280;
  const isLandscape = width > height;

  const entrance = spring({
    frame,
    fps,
    config: { damping: 12 },
  });

  return (
    <DarkTechBackground>
      <AbsoluteFill style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>

        {/* Background Logic Streams */}
        <BackgroundCodeStream />
        <MathematicalBackground />

        {/* Side Technical Metrics */}
        <SideMetrics />
        <CoordinateMarkers />

        {/* HUD Vertical Lines */}
        <div style={{ position: "absolute", left: 100 * s, top: 0, bottom: 0, width: s, background: "linear-gradient(to bottom, transparent, rgba(0,251,255,0.1), transparent)" }} />
        <div style={{ position: "absolute", right: 100 * s, top: 0, bottom: 0, width: s, background: "linear-gradient(to bottom, transparent, rgba(0,251,255,0.1), transparent)" }} />

        {/* Bottom Data Panel */}
        <BottomDataPanel />

        {/* Floating Code Elements */}
        <FloatingElements />

        {/* Central 3D Cube with Text */}
        <div style={{
          transform: `scale(${entrance}) rotateY(${(1 - entrance) * 90}deg)`,
          opacity: entrance
        }}>
          <PrecisionCube />
        </div>

        {/* HUD Data */}
        <DataOverlay />

        {/* Dynamic Label at Bottom */}
        <div
          style={{
            position: "absolute",
            bottom: (isLandscape ? 250 : 600) * s,
            textAlign: "center",
            width: "100%",
            opacity: interpolate(frame, [20, 40], [0, 1], { extrapolateLeft: "clamp" }),
          }}
        >
          <div style={{
            display: "inline-block",
            padding: `${10 * s}px ${30 * s}px`,
            border: `${s}px solid rgba(0, 251, 255, 0.3)`,
            background: "rgba(0, 251, 255, 0.1)",
            color: "#00FBFF",
            borderRadius: 30 * s,
            fontSize: 40 * s,
            fontWeight: "bold",
            letterSpacing: 2 * s,
            backdropFilter: "blur(5px)"
          }}>
            SYSTEM.PRECISION = 100%
          </div>
        </div>
      </AbsoluteFill>
    </DarkTechBackground>
  );
};
