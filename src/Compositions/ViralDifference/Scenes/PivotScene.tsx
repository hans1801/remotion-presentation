import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

const PURPLE = "#BC13FE";
const CYAN = "#00FBFF";
const DARK_BG = "#0f0f0f";
const CARD_BG = "#1e1e1e";
const BORDER = "rgba(255,255,255,0.1)";

const AreaGraph: React.FC<{ s: number; color: string; points: number[][]; delay: number; height: number }> = ({ s, color, points, delay, height }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 20, stiffness: 60 },
  });

  const pathD = points.reduce((acc, point, i) => {
    return acc + `${i === 0 ? "M" : "L"} ${point[0] * s} ${point[1] * s} `;
  }, "");

  const fillD = pathD + ` L ${points[points.length - 1][0] * s} ${height * s} L ${points[0][0] * s} ${height * s} Z`;

  return (
    <svg width="100%" height="100%" style={{ overflow: "visible", position: "absolute" }}>
      <defs>
        <linearGradient id={`grad-${color}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d={pathD}
        fill="none"
        stroke={color}
        strokeWidth={3 * s}
        strokeDasharray={2000 * s}
        strokeDashoffset={interpolate(progress, [0, 1], [2000 * s, 0])}
        style={{ filter: `drop-shadow(0 0 ${6 * s}px ${color}88)` }}
      />
      <path d={fillD} fill={`url(#grad-${color})`} opacity={progress * 0.4} />
    </svg>
  );
};

const DonutChart: React.FC<{ s: number; color: string; delay: number }> = ({ s, color, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({ frame: frame - delay, fps });
  
  const radius = 40 * s;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress * 0.7) * circumference;

  return (
    <svg width={100 * s} height={100 * s} viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="12" />
      <circle 
        cx="50" cy="50" r="40" fill="none" 
        stroke={color} strokeWidth="12" 
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform="rotate(-90 50 50)"
      />
    </svg>
  );
};

export const PivotScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();
  const s = width / 1280;

  const entrance = spring({ frame, fps, config: { damping: 18 } });
  const scannerPos = interpolate(frame, [10, 70], [-2, 102], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const exitProgress = interpolate(frame, [65, 75], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const exitScale = interpolate(exitProgress, [0, 1], [1, 1.1]);
  const exitOpacity = interpolate(exitProgress, [0, 1], [1, 0]);
  const exitBlur = interpolate(exitProgress, [0, 1], [0, 5]);

  const mainPoints = [[0, 150], [50, 140], [100, 160], [150, 130], [200, 145], [250, 40], [300, 80], [350, 60], [400, 20], [450, 50], [500, 10], [600, 40]];

  return (
    <AbsoluteFill style={{ 
      backgroundColor: DARK_BG, 
      color: "white", 
      fontFamily: "Inter, sans-serif", 
      overflow: "hidden", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center",
      opacity: exitOpacity,
      filter: `blur(${exitBlur * s}px)`,
    }}>
      
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 50% 50%, ${CYAN}08 0%, transparent 70%)` }} />

      <div style={{
        width: 1150 * s,
        height: 800 * s,
        background: DARK_BG,
        borderRadius: 16 * s,
        border: `1px solid ${BORDER}`,
        boxShadow: `0 40px 80px rgba(0,0,0,0.6), 0 0 20px ${CYAN}11`,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        transform: `scale(${entrance * exitScale}) rotateX(${interpolate(entrance, [0, 1], [5, 0])}deg)`,
      }}>
        
        <div style={{ height: 40 * s, background: "rgba(255,255,255,0.03)", borderBottom: `1px solid ${BORDER}`, display: "flex", alignItems: "center", padding: `0 ${16 * s}px`, gap: 8 * s }}>
          <div style={{ width: 12 * s, height: 12 * s, borderRadius: "50%", background: "#ff5f56" }} />
          <div style={{ width: 12 * s, height: 12 * s, borderRadius: "50%", background: "#ffbd2e" }} />
          <div style={{ width: 12 * s, height: 12 * s, borderRadius: "50%", background: "#27c93f" }} />
          <div style={{ flex: 1, textAlign: "center", fontSize: 12 * s, opacity: 0.4, letterSpacing: 1 * s }}>studio.content.com</div>
        </div>

        <div style={{ height: 60 * s, borderBottom: `1px solid ${BORDER}`, display: "flex", alignItems: "center", padding: `0 ${24 * s}px`, gap: 20 * s, background: "rgba(255,255,255,0.01)" }}>
          <div style={{ width: 32 * s, height: 32 * s, background: PURPLE, borderRadius: 4 * s }} />
          <div style={{ fontSize: 18 * s, fontWeight: 600, opacity: 0.9 }}>Content Studio</div>
          <div style={{ flex: 1, height: 36 * s, background: "rgba(255,255,255,0.05)", borderRadius: 8 * s, maxWidth: 400 * s }} />
          <div style={{ width: 32 * s, height: 32 * s, borderRadius: "50%", background: "rgba(255,255,255,0.1)" }} />
        </div>

        <div style={{ display: "flex", flex: 1 }}>
          <div style={{ width: 200 * s, borderRight: `1px solid ${BORDER}`, padding: 20 * s, display: "flex", flexDirection: "column", gap: 8 * s }}>
             <div style={{ width: 80 * s, height: 80 * s, borderRadius: "50%", background: "rgba(255,255,255,0.05)", alignSelf: "center", marginBottom: 20 * s }} />
             {["Dashboard", "Content", "Analytics", "Audience"].map((item, i) => (
               <div key={i} style={{ padding: `${8 * s}px ${16 * s}px`, borderRadius: 8 * s, background: item === "Analytics" ? "rgba(255,255,255,0.1)" : "transparent", color: item === "Analytics" ? CYAN : "rgba(255,255,255,0.6)", fontSize: 13 * s, fontWeight: item === "Analytics" ? 600 : 400 }}>{item}</div>
             ))}
          </div>

          <div style={{ flex: 1, padding: 24 * s, display: "flex", flexDirection: "column", gap: 20 * s, overflow: "hidden" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
               <h1 style={{ margin: 0, fontSize: 20 * s, fontWeight: 700 }}>Content Performance</h1>
               <div style={{ display: "flex", gap: 12 * s }}>
                  {[...Array(3)].map((_, i) => <div key={i} style={{ width: 40 * s, height: 24 * s, background: "rgba(255,255,255,0.05)", borderRadius: 4 * s }} />)}
               </div>
            </div>

            <div style={{ display: "flex", gap: 12 * s }}>
               {[
                 { label: "Reach", val: "1.2M", color: CYAN },
                 { label: "Engagement", val: "8.4%", color: PURPLE },
                 { label: "Growth", val: "+12K", color: CYAN }
               ].map((card, i) => (
                 <div key={i} style={{ flex: 1, padding: 16 * s, background: "rgba(255,255,255,0.02)", border: `1px solid ${BORDER}`, borderRadius: 8 * s }}>
                   <div style={{ fontSize: 11 * s, color: "rgba(255,255,255,0.4)" }}>{card.label}</div>
                   <div style={{ fontSize: 20 * s, fontWeight: 700, marginTop: 4 * s, color: card.color }}>{card.val}</div>
                 </div>
               ))}
            </div>

            <div style={{ display: "flex", gap: 20 * s, flex: 1 }}>
               <div style={{ flex: 2, border: `1px solid ${BORDER}`, borderRadius: 8 * s, padding: 20 * s, background: "rgba(255,255,255,0.01)", position: "relative" }}>
                  <div style={{ fontSize: 12 * s, color: "rgba(255,255,255,0.4)", marginBottom: 20 * s }}>Retention Trend</div>
                  <div style={{ position: "relative", width: "100%", height: 200 * s }}>
                    <AreaGraph s={s} color={CYAN} points={mainPoints} delay={20} height={200} />
                  </div>
               </div>
               
               <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 20 * s }}>
                  <div style={{ flex: 1, border: `1px solid ${BORDER}`, borderRadius: 8 * s, padding: 16 * s, display: "flex", alignItems: "center", gap: 16 * s }}>
                    <DonutChart s={s} color={PURPLE} delay={40} />
                    <div>
                       <div style={{ fontSize: 11 * s, color: "rgba(255,255,255,0.4)" }}>Traffic Mix</div>
                       <div style={{ fontSize: 16 * s, fontWeight: 600 }}>Organic 72%</div>
                    </div>
                  </div>
                  <div style={{ flex: 1, border: `1px solid ${BORDER}`, borderRadius: 8 * s, padding: 16 * s }}>
                     <div style={{ fontSize: 11 * s, color: "rgba(255,255,255,0.4)", marginBottom: 12 * s }}>User Base</div>
                     <div style={{ display: "flex", flexDirection: "column", gap: 8 * s }}>
                        {[60, 40, 85].map((w, i) => (
                          <div key={i} style={{ height: 6 * s, width: "100%", background: "rgba(255,255,255,0.05)", borderRadius: 3 * s }}>
                            <div style={{ height: "100%", width: `${w}%`, background: i === 2 ? CYAN : PURPLE, borderRadius: 3 * s }} />
                          </div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>

            <div style={{ height: 60 * s, border: `1px solid ${BORDER}`, borderRadius: 8 * s, padding: 12 * s, display: "flex", gap: 20 * s, alignItems: "center" }}>
               <div style={{ width: 100 * s, height: 12 * s, background: "rgba(255,255,255,0.05)", borderRadius: 6 * s }} />
               <div style={{ flex: 1, display: "flex", gap: 4 * s }}>
                  {[...Array(40)].map((_, i) => <div key={i} style={{ flex: 1, height: 20 * s, background: CYAN, opacity: 0.1 + Math.random() * 0.4, borderRadius: 1 * s }} />)}
               </div>
            </div>
          </div>
        </div>

        <div style={{ position: "absolute", top: 100 * s, bottom: 0, left: `${scannerPos}%`, width: 3 * s, background: `linear-gradient(to bottom, transparent, ${CYAN}, ${CYAN}, transparent)`, boxShadow: `0 0 ${15 * s}px ${CYAN}`, zIndex: 1000, opacity: scannerPos > 5 && scannerPos < 95 ? 1 : 0 }} />
      </div>

      {[
        { label: "CONTENT_VELOCITY", top: "55%", left: "45%", color: CYAN },
        { label: "ALGO_ENGAGEMENT", top: "25%", left: "70%", color: PURPLE }
      ].map((item, i) => {
        const p = spring({ frame: frame - 40 - i * 15, fps, config: { damping: 12 } });
        return (
          <div key={i} style={{ position: "absolute", top: item.top, left: item.left, padding: `${8 * s}px ${16 * s}px`, background: "rgba(0,0,0,0.9)", border: `1px solid ${item.color}`, borderRadius: 8 * s, color: item.color, fontSize: 14 * s, fontWeight: 700, opacity: p, transform: `scale(${p}) translateY(${interpolate(p, [0, 1], [20, 0])}px)`, boxShadow: `0 0 30px ${item.color}44`, zIndex: 1100 }}>{item.label}</div>
        );
      })}
    </AbsoluteFill>
  );
};
