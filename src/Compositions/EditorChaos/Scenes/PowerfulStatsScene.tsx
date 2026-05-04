import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";

const CYAN = "#00FBFF";
const GREEN = "#39FF14";
const PURPLE = "#BC13FE";

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };

/** 1. Bar Chart */
const DynamicBarChart: React.FC<{ s: number; count: number; height: number }> = ({ s, count, height }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 12 * s, height: height * s }}>
      {Array.from({ length: count }).map((_, i) => {
        const reveal = spring({
          frame: frame - i * 2,
          fps,
          config: { damping: 12, stiffness: 100 },
        });
        const baseH = 40 + Math.sin(frame / 15 + i) * 20 + (i % 5) * 30;
        const h = baseH * s * reveal * (height / 250);
        return (
          <div key={i} style={{
            width: 25 * s,
            height: h,
            background: `linear-gradient(to top, ${PURPLE}33, ${CYAN})`,
            borderRadius: 6 * s,
            boxShadow: `0 0 ${20 * s}px ${CYAN}44`,
            border: `${s}px solid ${CYAN}66`,
            position: "relative",
            overflow: "hidden",
          }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2 * s, background: "white", boxShadow: `0 0 ${10 * s}px white` }} />
          </div>
        );
      })}
    </div>
  );
};

/** 2. Waveform Graphic */
const WaveformGraphic: React.FC<{ s: number; height: number }> = ({ s, height }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 * s, height: height * s }}>
      {Array.from({ length: 30 }).map((_, i) => {
        const h = (20 + Math.abs(Math.sin(frame / 6 + i * 0.4)) * height * 0.8) * s;
        return (
          <div key={i} style={{
            width: 6 * s,
            height: h,
            background: i % 2 === 0 ? CYAN : GREEN,
            borderRadius: 3 * s,
            boxShadow: `0 0 ${15 * s}px ${i % 2 === 0 ? CYAN : GREEN}44`,
          }} />
        );
      })}
    </div>
  );
};

/** 3. Circular HUD Data */
const CircularGraphic: React.FC<{ s: number; height: number }> = ({ s, height }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ width: height * s, height: height * s, position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} style={{
          position: "absolute",
          width: (height - i * 80) * s,
          height: (height - i * 80) * s,
          border: `${2 * s}px solid ${i === 0 ? CYAN : i === 1 ? GREEN : PURPLE}`,
          borderRadius: "50%",
          opacity: 0.3,
          borderTopColor: "transparent",
          transform: `rotate(${frame * (i + 1) * 2}deg)`,
        }} />
      ))}
      <div style={{ fontSize: 40 * s, fontWeight: 900, color: CYAN }}>{Math.floor(interpolate(frame % 30, [0, 30], [80, 99]))}%</div>
    </div>
  );
};

/** Sequencer for central graphics */
const ChangingGraphic: React.FC<{ s: number; height: number }> = ({ s, height }) => {
  const frame = useCurrentFrame();
  
  // Switch every 38 frames (3.75s = 113 frames total / 3 = ~38 frames)
  const cycle = 37;
  const index = Math.floor(frame / cycle) % 3;
  const localFrame = frame % cycle;
  
  const opacity = interpolate(localFrame, [0, 5, cycle - 5, cycle], [0, 1, 1, 0], clamp);
  const scale = interpolate(localFrame, [0, 5], [0.95, 1], clamp);

  return (
    <div style={{ opacity, transform: `scale(${scale})`, flex: 1, display: "flex", justifyContent: "center" }}>
      {index === 0 && <DynamicBarChart s={s} count={18} height={height} />}
      {index === 1 && <WaveformGraphic s={s} height={height} />}
      {index === 2 && <CircularGraphic s={s} height={height} />}
    </div>
  );
};

/** Side Widget */
const SideWidget: React.FC<{ s: number; label: string; value: string; color: string; align: "left" | "right" }> = ({ s, label, value, color, align }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [10, 25], [0, 1], clamp);
  
  return (
    <div style={{
      textAlign: align,
      opacity,
      transform: `translateX(${align === "left" ? interpolate(opacity, [0, 1], [-40, 0]) : interpolate(opacity, [0, 1], [40, 0])}px)`,
    }}>
      <div style={{ fontSize: 16 * s, color: "rgba(255,255,255,0.7)", letterSpacing: "0.3em", marginBottom: 8 * s }}>{label}</div>
      <div style={{ fontSize: 64 * s, fontWeight: 900, color, textShadow: `0 0 ${30 * s}px ${color}66`, lineHeight: 1 }}>{value}</div>
    </div>
  );
};

/** Floating haz de luz (Light Beam) */
const LightBeam: React.FC<{ s: number }> = ({ s }) => {
  const frame = useCurrentFrame();
  const angle = interpolate(frame, [0, 113], [-15, 15]);
  return (
    <div style={{
      position: "absolute",
      top: "-20%",
      left: "50%",
      width: 500 * s,
      height: "140%",
      background: `linear-gradient(to bottom, transparent, ${CYAN}08, transparent)`,
      transform: `translateX(-50%) rotate(${angle}deg)`,
      filter: `blur(${100 * s}px)`,
      pointerEvents: "none",
    }} />
  );
};

export const PowerfulStatsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const s = width / 1280;
  
  const sceneOp = interpolate(frame, [0, 10, 103, 113], [0, 1, 1, 0], clamp);
  
  return (
    <AbsoluteFill style={{ opacity: sceneOp, backgroundColor: "#050505", overflow: "hidden" }}>
      <LightBeam s={s} />
      
      {/* Background Decorative HUD */}
      <div style={{ position: "absolute", inset: 60 * s, border: `${s}px solid rgba(255,255,255,0.03)`, pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: 30 * s, left: 30 * s, color: "rgba(255,255,255,0.15)", fontSize: 16 * s, fontFamily: "monospace" }}>ENGINE_STABILITY_LOCK // 99.2%</div>
        <div style={{ position: "absolute", top: 30 * s, right: 30 * s, color: "rgba(255,255,255,0.15)", fontSize: 16 * s, fontFamily: "monospace" }}>SECURE_ENCRYPTION_ACTIVE</div>
      </div>

      <div style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: `0 ${80 * s}px`,
      }}>
        <div style={{
          fontSize: 28 * s,
          fontWeight: 900,
          color: "rgba(255,255,255,0.85)",
          letterSpacing: "0.8em",
          textTransform: "uppercase",
          marginBottom: 60 * s,
          textShadow: "0 0 20px rgba(255,255,255,0.3)",
        }}>High Performance Rendering</div>

        <div style={{ 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "space-between", 
          width: "100%", 
          gap: 40 * s 
        }}>
          {/* Left Column */}
          <div style={{ display: "flex", flexDirection: "column", gap: 80 * s }}>
            <SideWidget s={s} label="LATENCY" value="0.8ms" color={CYAN} align="left" />
            <SideWidget s={s} label="CPU LOAD" value="12%" color={GREEN} align="left" />
          </div>

          {/* Center Component (Changing Graphics) */}
          <ChangingGraphic s={s} height={400} />

          {/* Right Column */}
          <div style={{ display: "flex", flexDirection: "column", gap: 80 * s }}>
            <SideWidget s={s} label="FPS RATE" value="120+" color={CYAN} align="right" />
            <SideWidget s={s} label="MEMORY" value="2.4GB" color={PURPLE} align="right" />
          </div>
        </div>

        <div style={{ 
          marginTop: 80 * s, 
          fontSize: 18 * s, 
          color: "rgba(255,255,255,0.45)", 
          fontFamily: "monospace",
          letterSpacing: "0.2em",
        }}>
          OPTIMIZING ASSET PIPELINE... [OK]
        </div>
      </div>
    </AbsoluteFill>
  );
};
