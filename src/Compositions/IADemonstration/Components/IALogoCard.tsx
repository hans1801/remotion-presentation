import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig, Img, staticFile } from "remotion";

interface IALogoCardProps {
  logoUrl: string;
  name: string;
  delay: number;
  logoScale?: number;
}

export const IALogoCard: React.FC<IALogoCardProps> = ({ logoUrl, name, delay, logoScale = 1 }) => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const s = width / 1280;

  const entrance = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const opacity = interpolate(entrance, [0, 1], [0, 1]);
  const scale = interpolate(entrance, [0, 1], [0.5, 1]);
  const translateY = interpolate(entrance, [0, 1], [40 * s, 0]);

  return (
    <div style={{
      opacity,
      transform: `scale(${scale}) translateY(${translateY}px)`,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 40 * s,
      padding: `${50 * s}px`,
      background: "rgba(255, 255, 255, 0.03)",
      backdropFilter: `blur(${20 * s}px)`,
      border: `${1.5 * s}px solid rgba(255, 255, 255, 0.1)`,
      borderBottom: `${3 * s}px solid rgba(255, 255, 255, 0.15)`,
      borderRadius: 40 * s,
      width: 350 * s,
      boxShadow: "0 30px 60px rgba(0, 0, 0, 0.4)",
    }}>
      <div style={{
        width: 250 * s,
        height: 250 * s,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(255, 255, 255, 0.05)",
        borderRadius: "50%",
        padding: 10 * s,
        boxShadow: "inset 0 0 30px rgba(255, 255, 255, 0.05)",
      }}>
        <Img 
          src={staticFile(logoUrl)} 
          style={{ 
            maxWidth: "100%", 
            maxHeight: "100%",
            transform: `scale(${logoScale})`,
            filter: "drop-shadow(0 0 20px rgba(255, 255, 255, 0.3))"
          }} 
        />
      </div>
      <span style={{
        fontSize: 54 * s,
        color: "white",
        fontWeight: 900,
        fontFamily: "Inter, sans-serif",
        letterSpacing: 1.5 * s,
        textAlign: "center",
        textShadow: "0 0 15px rgba(255, 255, 255, 0.4)",
      }}>
        {name}
      </span>
    </div>
  );
};
