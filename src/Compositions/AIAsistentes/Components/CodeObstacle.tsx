import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const RED = "#FF3B3B";

const GLITCH_CHARS = "!@#$%^&*()_+-=[]{}|;:,.<>?/0123456789";

export const CodeObstacle: React.FC = () => {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();
  const s = width / 1280;

  const messyCode = `function x(a,b,c){
  var d=0;for(var i=0;i<a.length;i++){
  d+=a[i]*b;if(c){d=Math.sqrt(d)}}
  return d/a.length-b*Math.PI;
}

// TODO: Fix this mess
// 0x4f 0x62 0x73 0x74 0x61 0x63 0x6c 0x65`;

  const opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  // Function to randomly glitch characters
  const glitchText = (text: string) => {
    const seed = Math.floor(frame / 3);
    return text.split("").map((char, i) => {
      if (char === " " || char === "\n") return char;
      
      // Pseudo-random based on seed and index
      const r = (Math.sin(seed * 123.45 + i * 67.89) + 1) / 2;
      if (r > 0.85) {
        return GLITCH_CHARS[Math.floor(r * GLITCH_CHARS.length) % GLITCH_CHARS.length];
      }
      return char;
    }).join("");
  };

  return (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{
          width: 600 * s,
          height: 450 * s,
          background: "rgba(255, 59, 59, 0.05)",
          border: `${2 * s}px solid ${RED}44`,
          borderRadius: 16 * s,
          padding: 40 * s,
          fontFamily: "'Fira Code', monospace",
          color: RED,
          fontSize: 20 * s,
          opacity,
          boxShadow: `0 0 30px ${RED}11`,
          whiteSpace: "pre",
      }}>
        <div style={{ marginBottom: 20 * s, opacity: 0.6, fontSize: 16 * s }}>[ ILLEGIBLE_LEGACY_CODE ]</div>
        {glitchText(messyCode)}
      </div>
    </AbsoluteFill>
  );
};
