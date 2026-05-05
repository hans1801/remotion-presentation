import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  staticFile,
} from "remotion";

const CYAN = "#00FBFF";
const RED = "#FF3B3B";
const GREEN = "#39FF14";

const CLAUDE_LOGO = staticFile("ai_asistatns/claude_code_logo.png");
const ANTIGRAVITY_LOGO = staticFile("ai_asistatns/antigravity_logo.png");
const GLITCH_CHARS = "!@#$%^&*()_+-=[]{}|;:,.<>?/0123456789";

export const MasteryHUD: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, fps, height } = useVideoConfig();
  const s = width / 1280;

  // Transformation starts immediately
  const progress = interpolate(frame, [0, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const logoEntry = spring({
      frame: frame,
      fps,
      config: { damping: 12, stiffness: 80 },
  });

  // MUST match exactly the string in CodeObstacle.tsx for continuity
  const messyCode = `function x(a,b,c){
  var d=0;for(var i=0;i<a.length;i++){
  d+=a[i]*b;if(c){d=Math.sqrt(d)}}
  return d/a.length-b*Math.PI;
}

// TODO: Fix this mess
// 0x4f 0x62 0x73 0x74 0x61 0x63 0x6c 0x65`;

  const cleanCode = `// AI ASSISTED REFACTOR
export const calculateMetrics = (
  data: number[], 
  multiplier: number
) => {
  const sum = data.reduce((a, b) => a + b, 0);
  return normalize(sum * multiplier);
};`;

  // Glitch function that "settles" as progress increases
  const glitchText = (text: string, p: number) => {
    const seed = Math.floor(frame / 3);
    const glitchThreshold = 0.85 + (p * 0.15); // Becomes 1.0 at progress=1 (no glitch)
    
    return text.split("").map((char, i) => {
      if (char === " " || char === "\n") return char;
      const r = (Math.sin(seed * 123.45 + i * 67.89) + 1) / 2;
      if (r > glitchThreshold) {
        return GLITCH_CHARS[Math.floor(r * GLITCH_CHARS.length) % GLITCH_CHARS.length];
      }
      return char;
    }).join("");
  };

  return (
    <AbsoluteFill style={{ overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
      
      {/* Data Streams from Logos to Code */}
      <div style={{ position: "absolute", inset: 0, opacity: logoEntry * (1 - progress * 0.7) }}>
        <svg style={{ position: "absolute", width: "100%", height: "100%", pointerEvents: "none" }}>
          <line
            x1={width / 2 - 450 * s} y1={height / 2 - 50 * s}
            x2={width / 2 - 120 * s} y2={height / 2}
            stroke={CYAN} strokeWidth={2 * s} strokeDasharray={`${10 * s} ${10 * s}`}
            style={{ opacity: 0.3 }}
          />
          <circle r={4 * s} fill="white" style={{
            offsetPath: `path('M ${width / 2 - 450 * s} ${height / 2 - 100 * s} L ${width / 2 - 150 * s} ${height / 2}')`,
            animation: "move 1.5s linear infinite"
          }} />
        </svg>

        <svg style={{ position: "absolute", width: "100%", height: "100%", pointerEvents: "none" }}>
          <line
            x1={width / 2 + 450 * s} y1={height / 2 - 50 * s}
            x2={width / 2 + 120 * s} y2={height / 2}
            stroke={CYAN} strokeWidth={2 * s} strokeDasharray={`${10 * s} ${10 * s}`}
            style={{ opacity: 0.3 }}
          />
          <circle r={4 * s} fill="white" style={{
            offsetPath: `path('M ${width / 2 + 450 * s} ${height / 2 - 100 * s} L ${width / 2 + 150 * s} ${height / 2}')`,
            animation: "move 1.5s linear infinite",
            animationDelay: "0.7s"
          }} />
        </svg>
      </div>

      <div style={{ position: "relative", width: 600 * s, height: 450 * s }}>
        
        {/* MESSY CODE (Settling from Glitch to Still) */}
        <div style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: `rgba(${interpolate(progress, [0, 1], [255, 0])}, ${interpolate(progress, [0, 1], [59, 251])}, ${interpolate(progress, [0, 1], [59, 255])}, 0.05)`,
          border: `${2 * s}px solid ${progress > 0.5 ? CYAN : RED}44`,
          borderRadius: 16 * s,
          padding: 40 * s,
          fontFamily: "'Fira Code', monospace",
          color: progress > 0.5 ? CYAN : RED,
          fontSize: 20 * s,
          opacity: 1 - progress,
          filter: `blur(${progress * 10}px)`,
          whiteSpace: "pre",
          boxShadow: `0 0 30px ${progress > 0.5 ? CYAN : RED}22`,
        }}>
          <div style={{ marginBottom: 20 * s, opacity: 0.6, fontSize: 16 * s }}>[ ILLEGIBLE_LEGACY_CODE ]</div>
          {glitchText(messyCode, progress)}
        </div>

        {/* CLEAN CODE (Revealed Static) */}
        <div style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: "rgba(0, 251, 255, 0.15)",
          backdropFilter: "blur(20px)",
          border: `${2 * s}px solid ${CYAN}`,
          borderRadius: 16 * s,
          padding: 40 * s,
          fontFamily: "'Fira Code', monospace",
          color: CYAN,
          fontSize: 20 * s,
          opacity: progress,
          whiteSpace: "pre",
          boxShadow: `0 0 60px ${CYAN}44`,
          display: "flex",
          flexDirection: "column",
        }}>
          <div style={{ color: GREEN, fontWeight: "bold", fontSize: 16 * s, marginBottom: 20 * s }}>✨ PERFECTED BY CLAUDE & ANTIGRAVITY</div>
          {cleanCode}
        </div>
      </div>

      {/* CLAUDE LOGO */}
      <div style={{
        position: "absolute",
        top: height / 2 - 150 * s,
        left: width / 2 - 550 * s,
        opacity: logoEntry,
        transform: `translateY(${Math.sin(frame / 20) * 15 * s}px)`,
      }}>
        <div style={{
          background: "rgba(255,255,255,0.03)",
          padding: 25 * s,
          borderRadius: 25 * s,
          border: `${1 * s}px solid ${CYAN}44`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 15 * s,
          boxShadow: `0 0 40px ${CYAN}22`,
        }}>
          <img src={CLAUDE_LOGO} style={{ width: 110 * s, height: 110 * s }} />
          <span style={{ color: "white", fontSize: 18 * s, fontWeight: "bold", letterSpacing: 2 * s }}>CLAUDE</span>
        </div>
      </div>

      {/* ANTIGRAVITY LOGO */}
      <div style={{
        position: "absolute",
        top: height / 2 - 150 * s,
        right: width / 2 - 550 * s,
        opacity: logoEntry,
        transform: `translateY(${Math.sin(frame / 25 + 2) * 15 * s}px)`,
      }}>
        <div style={{
          background: "rgba(255,255,255,0.03)",
          padding: 25 * s,
          borderRadius: 25 * s,
          border: `${1 * s}px solid ${CYAN}44`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 15 * s,
          boxShadow: `0 0 40px ${CYAN}22`,
        }}>
          <img src={ANTIGRAVITY_LOGO} style={{ width: 110 * s, height: 110 * s }} />
          <span style={{ color: "white", fontSize: 18 * s, fontWeight: "bold", letterSpacing: 2 * s }}>ANTIGRAVITY</span>
        </div>
      </div>

      <style>{`
        @keyframes move {
          from { offset-distance: 0%; }
          to { offset-distance: 100%; }
        }
      `}</style>

    </AbsoluteFill>
  );
};
