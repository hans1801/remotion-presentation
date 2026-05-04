import React from "react";
import { useCurrentFrame, interpolate, useVideoConfig } from "remotion";

export const PrecisionCube: React.FC = () => {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();
  const s = width / 1280;

  const rotation = frame * 1.5;
  const size = 350 * s;

  const faceStyle: React.CSSProperties = {
    position: "absolute",
    width: size,
    height: size,
    background: "rgba(0, 251, 255, 0.05)",
    border: `${2 * s}px solid #00FBFF`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    fontSize: 40 * s,
    fontWeight: "bold",
    backfaceVisibility: "visible",
    backdropFilter: "blur(5px)",
    boxShadow: `0 0 ${30 * s}px rgba(0, 251, 255, 0.2)`,
  };

  return (
    <div style={{
      perspective: "1000px",
      width: size,
      height: size,
    }}>
      <div style={{
        position: "relative",
        width: "100%",
        height: "100%",
        transformStyle: "preserve-3d",
        transform: `rotateX(${rotation * 0.5}deg) rotateY(${rotation}deg)`,
      }}>
        {/* Front */}
        <div style={{ ...faceStyle, transform: `translateZ(${size / 2}px)` }}>REMOTION</div>
        {/* Back */}
        <div style={{ ...faceStyle, transform: `rotateY(180deg) translateZ(${size / 2}px)` }}>PRECISION</div>
        {/* Right */}
        <div style={{ ...faceStyle, transform: `rotateY(90deg) translateZ(${size / 2}px)` }}>REACT</div>
        {/* Left */}
        <div style={{ ...faceStyle, transform: `rotateY(-90deg) translateZ(${size / 2}px)` }}>VIDEO</div>
        {/* Top */}
        <div style={{ ...faceStyle, transform: `rotateX(90deg) translateZ(${size / 2}px)` }}>CODE</div>
        {/* Bottom */}
        <div style={{ ...faceStyle, transform: `rotateX(-90deg) translateZ(${size / 2}px)` }}>FRAME</div>
      </div>
    </div>
  );
};
