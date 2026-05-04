import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Img,
  staticFile,
} from "remotion";

export const LogoScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const s = width / 1280;

  const entrance = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const logoScale = interpolate(entrance, [0, 1], [0.5, 1]);
  const logoOpacity = interpolate(entrance, [0, 1], [0, 1]);
  
  const textOpacity = spring({
    frame: frame - 15,
    fps,
    config: { damping: 12 },
  });

  // Quick Fade Out (Frames 39-49)
  const exitOpacity = interpolate(frame, [39, 49], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#020202",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 40 * s,
        opacity: exitOpacity,
      }}
    >
      {/* Background Glow */}
      <div
        style={{
          position: "absolute",
          width: 600 * s,
          height: 600 * s,
          background: "radial-gradient(circle, #00FBFF22 0%, transparent 70%)",
          opacity: logoOpacity,
        }}
      />

      {/* Remotion Logo Image */}
      <div
        style={{
          transform: `scale(${logoScale})`,
          opacity: logoOpacity,
          filter: `drop-shadow(0 0 ${20 * s}px #00FBFF44)`,
        }}
      >
        <Img
          src={staticFile("remotion/remotion_logo.png")}
          style={{
            width: 180 * s,
            height: "auto",
          }}
        />
      </div>

      {/* Text */}
      <div
        style={{
          opacity: textOpacity,
          transform: `translateY(${interpolate(textOpacity, [0, 1], [20 * s, 0])}px)`,
          fontSize: 80 * s,
          fontWeight: 900,
          color: "white",
          fontFamily: "Inter, sans-serif",
          letterSpacing: -2 * s,
        }}
      >
        Remotion
      </div>
    </AbsoluteFill>
  );
};
