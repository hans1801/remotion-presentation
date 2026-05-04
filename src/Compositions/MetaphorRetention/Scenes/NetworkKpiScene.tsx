import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

const CYAN = "#00FBFF";
const GREEN = "#39FF14";

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

const BACKGROUND_PARTICLES = [
  { x: "20%", y: "25%", size: 6,   delay: 0,   color: CYAN },
  { x: "80%", y: "15%", size: 8,   delay: 20,  color: GREEN },
  { x: "15%", y: "75%", size: 5,   delay: 40,  color: CYAN },
  { x: "75%", y: "85%", size: 9,   delay: 60,  color: GREEN },
  { x: "50%", y: "10%", size: 7,   delay: 80,  color: CYAN },
  { x: "40%", y: "90%", size: 6,   delay: 100, color: GREEN },
  { x: "85%", y: "60%", size: 5,   delay: 30,  color: CYAN },
  { x: "10%", y: "40%", size: 7,   delay: 50,  color: GREEN },
] as const;

/** Subtle background pulse particle */
const FloatingParticle: React.FC<{ x: string; y: string; size: number; delay: number; color: string; s: number }> = ({ x, y, size, delay, color, s }) => {
  const frame = useCurrentFrame();
  const pulse = Math.sin((frame - delay) / 35);
  const opacity = interpolate(pulse, [-1, 1], [0.05, 0.45], clamp);
  const driftY = Math.sin(frame / 50 + delay) * 25 * s;
  const driftX = Math.cos(frame / 60 + delay) * 15 * s;
  
  return (
    <div style={{
      position: "absolute",
      left: x,
      top: y,
      width: size * s,
      height: size * s,
      borderRadius: "50%",
      background: color,
      boxShadow: `0 0 ${15 * s}px ${color}`,
      opacity,
      transform: `translate(${driftX}px, ${driftY}px) scale(${interpolate(opacity, [0.05, 0.45], [0.8, 1.2])})`,
    }} />
  );
};

/** Orbiting video silhouettes to fill the center */
const OrbitingSilhouette: React.FC<{ frame: number; index: number; s: number; opacity: number }> = ({ frame, index, s, opacity: sceneOpacity }) => {
  const angle = (frame / 80) + (index * Math.PI * 2) / 4;
  const radius = (320 + Math.sin(frame / 45 + index) * 30) * s;
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;
  
  const pulse = Math.sin(frame / 30 + index);
  const internalOpacity = interpolate(pulse, [-1, 1], [0.1, 0.4], clamp);
  
  return (
    <div style={{
      position: "absolute",
      left: "50%",
      top: "50%",
      width: 80 * s,
      height: 50 * s,
      background: "rgba(0, 251, 255, 0.05)",
      border: `${s}px solid rgba(0, 251, 255, 0.25)`,
      borderRadius: 10 * s,
      transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${angle * 20}deg) scale(${interpolate(internalOpacity, [0.1, 0.4], [0.9, 1.1])})`,
      opacity: internalOpacity * sceneOpacity,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backdropFilter: "blur(4px)",
    }}>
       <div style={{ width: 20 * s, height: 20 * s, borderRadius: "50%", border: `${s}px solid ${CYAN}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8 * s, color: CYAN }}>▶</div>
    </div>
  );
};

/** Dotted connection line */
const ConnectionLine: React.FC<{
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  progress: number;
  color: string;
  s: number;
}> = ({ x1, y1, x2, y2, progress, color, s }) => {
  const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);
  return (
    <div style={{
      position: "absolute",
      left: x1,
      top: y1,
      width: length,
      height: 1 * s,
      background: `repeating-linear-gradient(90deg, ${color} 0, ${color} ${4 * s}px, transparent ${4 * s}px, transparent ${8 * s}px)`,
      transformOrigin: "left center",
      transform: `rotate(${angle}deg)`,
      opacity: progress * 0.4,
      maskImage: `linear-gradient(to right, black ${progress * 100}%, transparent ${progress * 100}%)`,
    }} />
  );
};

/** Glassmorphic card base */
const DiagramCard: React.FC<{
  children: React.ReactNode;
  frame: number;
  opacity: number;
  x: number;
  y: number;
  label: string;
  s: number;
  driftX?: number;
  driftY?: number;
}> = ({ children, opacity, x, y, label, s, driftX = 0, driftY = 0 }) => {
  return (
    <div style={{
      position: "absolute",
      left: x,
      top: y,
      opacity,
      transform: `translate(${driftX}px, ${driftY}px) scale(${interpolate(opacity, [0, 1], [0.8, 1])})`,
      background: "rgba(255,255,255,0.02)",
      backdropFilter: "blur(12px)",
      border: `${s}px solid rgba(255,255,255,0.08)`,
      borderRadius: 24 * s,
      padding: `${24 * s}px ${20 * s}px ${15 * s}px`,
      display: "flex",
      flexDirection: "column",
      gap: 10 * s,
      boxShadow: `0 ${15 * s}px ${45 * s}px rgba(0,0,0,0.3)`,
      zIndex: 10,
    }}>
      <div style={{ fontSize: 10 * s, color: "rgba(255,255,255,0.4)", letterSpacing: "0.18em", fontWeight: 700 }}>{label.toUpperCase()}</div>
      {children}
    </div>
  );
};

/** Cycling graphics for the central player */
const PlayerGraphicCycle: React.FC<{ frame: number; s: number }> = ({ frame, s }) => {
  const cycleIndex = Math.floor(frame / 45) % 3;
  const cycleFrame = frame % 45;
  const opacity = interpolate(cycleFrame, [0, 8, 37, 45], [0, 1, 1, 0], clamp);
  
  return (
    <div style={{ 
      position: "absolute", 
      inset: 0, 
      opacity: opacity * 0.3, 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center",
      filter: "blur(1px)",
    }}>
      {cycleIndex === 0 && <div style={{ transform: "scale(2.2)" }}><MiniWaveform frame={frame} s={s} /></div>}
      {cycleIndex === 1 && <div style={{ transform: "scale(1.8)" }}><NodeNetwork frame={frame} s={s} /></div>}
      {cycleIndex === 2 && <div style={{ transform: "scale(2.0)" }}><MiniLineChart frame={frame} fps={30} s={s} /></div>}
    </div>
  );
};

/** Central Video Player Silhouette */
const VideoPlayerSilhouette: React.FC<{ frame: number; opacity: number; s: number }> = ({ frame, opacity, s }) => {
  return (
    <div style={{
      position: "absolute",
      left: "50%",
      top: "50%",
      width: 440 * s,
      height: 250 * s,
      transform: `translate(-50%, -50%) scale(${interpolate(opacity, [0, 1], [0.9, 1])})`,
      opacity,
      background: "linear-gradient(135deg, rgba(0,251,255,0.05) 0%, rgba(0,0,0,0.8) 100%)",
      borderRadius: 12 * s,
      border: `${s}px solid rgba(0,251,255,0.3)`,
      boxShadow: `0 0 ${40 * s}px rgba(0,251,255,0.15)`,
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.3 }}>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} style={{
            position: "absolute",
            inset: (20 + i * 15) * s,
            border: `${s}px solid rgba(0,251,255,${0.2 - i * 0.05})`,
            borderRadius: 8 * s,
            transform: `scale(${1 + Math.sin(frame / 20 + i) * 0.05})`,
          }} />
        ))}
      </div>
      
      <PlayerGraphicCycle frame={frame} s={s} />

      <div style={{
        width: 70 * s,
        height: 70 * s,
        background: `rgba(0,251,255,0.15)`,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: `${s}px solid ${CYAN}`,
        boxShadow: `0 0 ${20 * s}px ${CYAN}`,
        zIndex: 2,
      }}>
        <span style={{ fontSize: 24 * s, color: CYAN, marginLeft: 4 * s }}>▶</span>
      </div>
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 4 * s, background: "rgba(255,255,255,0.1)" }}>
        <div style={{ width: `${(frame % 150) / 1.5}%`, height: "100%", background: CYAN, boxShadow: `0 0 ${10 * s}px ${CYAN}` }} />
      </div>
    </div>
  );
};

/** Line Chart Component */
const MiniLineChart: React.FC<{ frame: number; fps: number; s: number }> = ({ frame, fps, s }) => {
  const points = [20, 45, 30, 60, 40, 75, 55];
  return (
    <div style={{ width: 150 * s, height: 75 * s, display: "flex", alignItems: "flex-end", gap: 3 * s, paddingBottom: 5 * s }}>
      <svg width={150 * s} height={75 * s} viewBox="0 0 150 75">
        <polyline
          fill="none"
          stroke={CYAN}
          strokeWidth="2"
          points={points.map((p, i) => {
            const spr = spring({ frame: frame - 10 - i * 3, fps, config: { damping: 10 } });
            return `${i * 25},${75 - (p * spr)}`;
          }).join(" ")}
          strokeDasharray="200"
          strokeDashoffset={interpolate(frame, [10, 40], [200, 0], clamp)}
        />
      </svg>
    </div>
  );
};

/** Circular Progress Component */
const CircularProgress: React.FC<{ frame: number; s: number }> = ({ frame, s }) => {
  const progress = interpolate(frame, [15, 45], [0, 72], clamp);
  return (
    <div style={{ width: 150 * s, height: 100 * s, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
      <svg width={90 * s} height={90 * s} viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
        <circle
          cx="50" cy="50" r="40" fill="none" stroke={GREEN} strokeWidth="8"
          strokeDasharray="251.2"
          strokeDashoffset={251.2 * (1 - progress / 100)}
          strokeLinecap="round"
          transform="rotate(-90 50 50)"
          style={{ filter: `drop-shadow(0 0 ${10 * s}px ${GREEN})` }}
        />
      </svg>
      <div style={{ position: "absolute", color: GREEN, fontSize: 18 * s, fontWeight: "bold" }}>{Math.round(progress)}%</div>
    </div>
  );
};

/** Audio Waveform Component */
const MiniWaveform: React.FC<{ frame: number; s: number }> = ({ frame, s }) => {
  return (
    <div style={{ width: 150 * s, height: 80 * s, display: "flex", alignItems: "center", gap: 5 * s }}>
      {Array.from({ length: 15 }).map((_, i) => {
        const h = (15 + Math.abs(Math.sin(frame / 5 + i * 0.5)) * 50) * s;
        return (
          <div key={i} style={{ width: 5 * s, height: h, background: CYAN, borderRadius: 2 * s, opacity: 0.8 }} />
        );
      })}
    </div>
  );
};

/** Node Network Component */
const NodeNetwork: React.FC<{ frame: number; s: number }> = ({ frame, s }) => {
  return (
    <div style={{ width: 150 * s, height: 100 * s, position: "relative" }}>
      {[
        { x: 20, y: 30 }, { x: 50, y: 15 }, { x: 80, y: 35 }, { x: 45, y: 50 }, { x: 15, y: 55 }
      ].map((n, i) => (
        <React.Fragment key={i}>
          <div style={{
            position: "absolute",
            left: n.x * 1.5 * s, top: n.y * 1.5 * s,
            width: 4 * s, height: 4 * s,
            borderRadius: "50%",
            background: "white",
            boxShadow: `0 0 ${8 * s}px white`,
            transform: `scale(${1 + Math.sin(frame / 10 + i) * 0.3})`,
          }} />
          {i < 4 && (
            <div style={{
              position: "absolute",
              left: (n.x * 1.5 + 2) * s, top: (n.y * 1.5 + 2) * s,
              width: 45 * s, height: 1 * s,
              background: "rgba(255,255,255,0.1)",
              transformOrigin: "left center",
              transform: `rotate(${i * 45}deg)`,
            }} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export const NetworkKpiScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames, width, height } = useVideoConfig();
  const s = width / 1280;

  const phase2UiOpacity = interpolate(frame, [0, 5, durationInFrames - 8, durationInFrames - 3], [0, 1, 1, 0], clamp);

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {/* ── Background Detail ──────────────────────────────────────── */}
      {BACKGROUND_PARTICLES.map((p, i) => (
        <FloatingParticle key={i} {...p} s={s} />
      ))}

      {/* ── Orbiting Elements ─────────────────────────────────────── */}
      {Array.from({ length: 4 }).map((_, i) => (
        <OrbitingSilhouette key={i} frame={frame} index={i} s={s} opacity={phase2UiOpacity} />
      ))}

      <VideoPlayerSilhouette frame={frame} opacity={phase2UiOpacity} s={s} />
      {[
        { label: "Engagement", x: 140, y: 120, comp: <MiniWaveform frame={frame} s={s} />, drift: [12, 10] },
        { label: "Retention", x: 1000, y: 140, comp: <CircularProgress frame={frame} s={s} />, drift: [15, 12] },
        { label: "Growth", x: 120, y: 440, comp: <MiniLineChart frame={frame} fps={fps} s={s} />, drift: [14, 11] },
        { label: "Network", x: 1020, y: 460, comp: <NodeNetwork frame={frame} s={s} />, drift: [13, 15] },
        {
          label: "Performance", x: 420, y: 50, comp: (
            <div style={{ display: "flex", alignItems: "flex-end", gap: 5 * s, height: 60 * s }}>
              {[0.4, 0.8, 0.6, 0.9, 0.7].map((h, i) => <div key={i} style={{ width: 12 * s, height: h * 60 * s, background: CYAN, borderRadius: 3 * s }} />)}
            </div>
          ), drift: [10, 14]
        },
      ].map((d, i) => {
        const driftX = Math.sin(frame / d.drift[0]) * 15 * s;
        const driftY = Math.cos(frame / d.drift[1]) * 15 * s;
        return (
          <React.Fragment key={i}>
            <ConnectionLine
              x1={(d.x + 95) * s + driftX}
              y1={(d.y + 65) * s + driftY}
              x2={width / 2}
              y2={height / 2}
              progress={phase2UiOpacity}
              color={i % 2 === 0 ? CYAN : GREEN}
              s={s}
            />
            <DiagramCard
              frame={frame}
              opacity={phase2UiOpacity}
              x={d.x * s}
              y={d.y * s}
              label={d.label}
              s={s}
              driftX={driftX}
              driftY={driftY}
            >
              {d.comp}
            </DiagramCard>
          </React.Fragment>
        );
      })}
    </AbsoluteFill>
  );
};
