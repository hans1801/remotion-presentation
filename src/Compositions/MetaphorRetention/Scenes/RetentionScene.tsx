import React, { useMemo } from "react";
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
const CROSSFADE = 6;

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

// ── Floating comment bubbles ───────────────────────────────────────
const COMMENT_BUBBLES = [
  { x: 120, y: 280, w: 125, h: 44, appearAt: 0.18, ph: 0.0, amp: 8,  rot: -3, avatar: "#FF4444" },
  { x: 240, y: 160, w: 145, h: 52, appearAt: 0.28, ph: 1.5, amp: 10, rot:  2, avatar: "#44FF44" },
  { x: 1040,y: 220, w: 135, h: 48, appearAt: 0.42, ph: 3.1, amp:  9, rot: -2, avatar: "#4444FF" },
  { x: 90,  y: 450, w: 115, h: 42, appearAt: 0.54, ph: 2.0, amp:  7, rot:  4, avatar: "#FFFF44" },
  { x: 1060,y: 440, w: 140, h: 50, appearAt: 0.64, ph: 4.2, amp: 11, rot: -4, avatar: "#FF44FF" },
  { x: 940, y: 580, w: 125, h: 44, appearAt: 0.74, ph: 1.0, amp:  8, rot:  3, avatar: "#44FFFF" },
  { x: 260, y: 570, w: 115, h: 40, appearAt: 0.84, ph: 5.3, amp:  9, rot: -5, avatar: "#FFFFFF" },
] as const;

const FLOATING_EMOJIS = [
  { emoji: "🔥", x: "15%", y: "30%", appearAt: 0.22, ph: 0.5 },
  { emoji: "🚀", x: "80%", y: "25%", appearAt: 0.35, ph: 1.2 },
  { emoji: "📈", x: "85%", y: "60%", appearAt: 0.55, ph: 2.8 },
  { emoji: "💎", x: "10%", y: "70%", appearAt: 0.70, ph: 3.5 },
  { emoji: "✨", x: "30%", y: "15%", appearAt: 0.45, ph: 4.1 },
  { emoji: "🤯", x: "80%", y: "80%", appearAt: 0.82, ph: 5.6 },
];

const VIDEO_SILHOUETTES = [
  { x: 180,  y: 420, appearAt: 0.12, ph: 0.0,  rot: -5 },
  { x: 380,  y: 320, appearAt: 0.28, ph: 1.5,  rot: 3 },
  { x: 620,  y: 220, appearAt: 0.45, ph: 3.1,  rot: -2 },
  { x: 860,  y: 140, appearAt: 0.62, ph: 4.2,  rot: 4 },
  { x: 1080, y: 80,  appearAt: 0.78, ph: 5.3,  rot: -3 },
] as const;

const PEOPLE_SILHOUETTES = [
  { x: 120,  y: 580, appearAt: 0.18, ph: 0.5,  rot: -2 },
  { x: 450,  y: 480, appearAt: 0.35, ph: 1.2,  rot: 4 },
  { x: 750,  y: 320, appearAt: 0.52, ph: 2.8,  rot: -3 },
  { x: 1020, y: 180, appearAt: 0.70, ph: 3.5,  rot: 2 },
] as const;

const EYE_SILHOUETTES = [
  { x: 280,  y: 380, appearAt: 0.22, ph: 1.0,  rot: 3 },
  { x: 580,  y: 280, appearAt: 0.42, ph: 4.1,  rot: -4 },
  { x: 880,  y: 120, appearAt: 0.65, ph: 5.6,  rot: 5 },
] as const;

// ── Components ─────────────────────────────────────────────────────

const VideoSilhouette: React.FC<{
  frame: number;
  appearAt: number;
  x: number;
  y: number;
  s: number;
  ph: number;
  rot: number;
  fps: number;
}> = ({ frame, appearAt, x, y, s, ph, rot, fps }) => {
  const revealFrame = CROSSFADE + 10 + appearAt * 58;
  const appear = spring({
    frame: frame - revealFrame,
    fps,
    config: { damping: 14, stiffness: 110, mass: 0.8 },
    durationInFrames: 18,
  });

  const floatY = Math.sin(frame / 20 + ph) * 12 * s;
  const floatX = Math.cos(frame / 25 + ph) * 8 * s;

  return (
    <div style={{
      position: "absolute",
      left: x * s,
      top: y * s,
      width: 140 * s,
      height: 80 * s,
      opacity: appear * 0.4,
      transform: `translate(${floatX}px, ${floatY}px) rotate(${rot}deg) scale(${appear})`,
      background: "linear-gradient(135deg, rgba(0,251,255,0.1) 0%, rgba(0,0,0,0.4) 100%)",
      borderRadius: 12 * s,
      border: `${1.5 * s}px solid rgba(0,251,255,0.25)`,
      boxShadow: `0 ${10 * s}px ${30 * s}px rgba(0,251,255,0.05)`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      pointerEvents: "none",
    }}>
      <div style={{
        width: 30 * s,
        height: 30 * s,
        borderRadius: "50%",
        border: `${s}px solid rgba(0,251,255,0.4)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: CYAN,
        fontSize: 10 * s,
      }}>
        <span style={{ marginLeft: 2 * s }}>▶</span>
      </div>
    </div>
  );
};

const PersonSilhouette: React.FC<{
  frame: number;
  appearAt: number;
  x: number;
  y: number;
  s: number;
  ph: number;
  rot: number;
  fps: number;
}> = ({ frame, appearAt, x, y, s, ph, rot, fps }) => {
  const revealFrame = CROSSFADE + 10 + appearAt * 58;
  const appear = spring({
    frame: frame - revealFrame,
    fps,
    config: { damping: 15, stiffness: 100, mass: 0.7 },
    durationInFrames: 20,
  });

  const floatY = Math.sin(frame / 22 + ph) * 15 * s;
  const floatX = Math.cos(frame / 28 + ph) * 10 * s;

  return (
    <div style={{
      position: "absolute",
      left: x * s,
      top: y * s,
      width: 60 * s,
      height: 60 * s,
      opacity: appear * 0.35,
      transform: `translate(${floatX}px, ${floatY}px) rotate(${rot}deg) scale(${appear})`,
      background: "rgba(57, 255, 20, 0.1)",
      borderRadius: "50%",
      border: `${1.5 * s}px solid rgba(57, 255, 20, 0.25)`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      pointerEvents: "none",
    }}>
      <svg width={30 * s} height={30 * s} viewBox="0 0 24 24" fill="none" stroke={GREEN} strokeWidth="2">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    </div>
  );
};

const EyeSilhouette: React.FC<{
  frame: number;
  appearAt: number;
  x: number;
  y: number;
  s: number;
  ph: number;
  rot: number;
  fps: number;
}> = ({ frame, appearAt, x, y, s, ph, rot, fps }) => {
  const revealFrame = CROSSFADE + 10 + appearAt * 58;
  const appear = spring({
    frame: frame - revealFrame,
    fps,
    config: { damping: 13, stiffness: 110, mass: 0.6 },
    durationInFrames: 18,
  });

  const floatY = Math.sin(frame / 18 + ph) * 10 * s;
  const floatX = Math.cos(frame / 24 + ph) * 12 * s;

  return (
    <div style={{
      position: "absolute",
      left: x * s,
      top: y * s,
      width: 70 * s,
      height: 40 * s,
      opacity: appear * 0.45,
      transform: `translate(${floatX}px, ${floatY}px) rotate(${rot}deg) scale(${appear})`,
      background: "rgba(0, 251, 255, 0.08)",
      borderRadius: 20 * s,
      border: `${1.5 * s}px solid rgba(0, 251, 255, 0.2)`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      pointerEvents: "none",
    }}>
      <svg width={24 * s} height={24 * s} viewBox="0 0 24 24" fill="none" stroke={CYAN} strokeWidth="2">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    </div>
  );
};

// ── Scene ──────────────────────────────────────────────────────────
export const RetentionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const s = width / 1280;

  // Chart geometry
  const SVG_W = 840 * s;
  const SVG_H = 360 * s;
  const PL = 60 * s;
  const PR = 20 * s;
  const PT = 20 * s;
  const PB = 50 * s;
  const GW = SVG_W - PL - PR;
  const GH = SVG_H - PT - PB;
  const BASELINE = PT + GH;

  const GRAPH_LEFT = (width - SVG_W) / 2;
  const GRAPH_TOP = 250 * s;

  // Exponential growth curve (50 points)
  const { CURVE_PTS, LINE_D, FILL_D, END_PT } = useMemo(() => {
    const pts = Array.from({ length: 50 }, (_, i) => {
      const t = i / 49;
      const yVal = 0.03 * Math.pow(1 / 0.03, t);
      return [PL + t * GW, BASELINE - yVal * GH] as [number, number];
    });
    const lineD = `M ${pts[0][0]},${pts[0][1]} ` + pts.slice(1).map(([x, y]) => `L ${x},${y}`).join(" ");
    const fillD = lineD + ` L ${pts[49][0]},${BASELINE} L ${pts[0][0]},${BASELINE} Z`;
    return { CURVE_PTS: pts, LINE_D: lineD, FILL_D: fillD, END_PT: pts[49] };
  }, [PL, GW, BASELINE, GH]);

  // Crossfade-in (local 0-15)
  const fadeIn = interpolate(frame, [0, CROSSFADE], [0, 1], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });

  // Axes spring in (local 15-32)
  const axisP = spring({
    frame: frame - CROSSFADE,
    fps,
    config: { damping: 16, stiffness: 90 },
    durationInFrames: 20,
  });

  // Curve draws left-to-right (local 25-75)
  const curveReveal = interpolate(frame, [CROSSFADE + 10, CROSSFADE + 58], [0, 1], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });

  // Green endpoint dot (local 65-78)
  const dotOpacity = interpolate(frame, [CROSSFADE + 50, CROSSFADE + 63], [0, 1], clamp);
  const dotPulse = 1 + Math.sin(frame / 5) * 0.35 * dotOpacity;

  // Upward arrow appears with endpoint (local 68-80)
  const arrowOpacity = interpolate(frame, [CROSSFADE + 55, CROSSFADE + 68], [0, 1], clamp);

  // View counter (local 20-90)
  const count = interpolate(frame, [CROSSFADE + 8, CROSSFADE + 72], [0, 1247832], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });

  // Counter pops in with spring
  const counterScale = spring({
    frame: frame - CROSSFADE,
    fps,
    config: { damping: 10, stiffness: 120, mass: 0.5 },
    durationInFrames: 16,
  });

  return (
    <AbsoluteFill
      style={{
        overflow: "hidden",
        fontFamily: "system-ui, -apple-system, sans-serif",
        opacity: fadeIn,
      }}
    >
      {/* ── "Vistas" label ──────────────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 32 * s,
          display: "flex",
          justifyContent: "center",
          opacity: interpolate(counterScale, [0.8, 1], [0, 1], clamp),
        }}
      >
        <span
          style={{
            fontSize: 56 * s,
            fontWeight: 900,
            color: CYAN,
            opacity: 0.9,
            letterSpacing: "0.45em",
            textTransform: "uppercase",
            textShadow: `0 0 ${20 * s}px ${CYAN}, 0 0 ${40 * s}px rgba(0,251,255,0.3)`,
          }}
        >
          Vistas
        </span>
      </div>

      {/* ── View counter ────────────────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 115 * s,
          display: "flex",
          justifyContent: "center",
          alignItems: "baseline",
          transform: `scale(${counterScale})`,
          transformOrigin: "center center",
        }}
      >
        <span
          style={{
            fontSize: 90 * s,
            fontWeight: 900,
            color: CYAN,
            letterSpacing: "-0.04em",
            textShadow: `0 0 ${28 * s}px ${CYAN}, 0 0 ${65 * s}px rgba(0,251,255,0.35)`,
          }}
        >
          {Math.round(count).toLocaleString()}
        </span>
      </div>

      {/* ── Area chart ──────────────────────────────────────────────── */}
      <svg
        width={SVG_W}
        height={SVG_H}
        style={{
          position: "absolute",
          left: GRAPH_LEFT,
          top: GRAPH_TOP,
          overflow: "visible",
        }}
      >
        <defs>
          <clipPath id="views-reveal">
            <rect x={PL} y={0} width={GW * curveReveal} height={SVG_H + 10 * s} />
          </clipPath>
          <linearGradient id="area-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor={CYAN} stopOpacity="0.18" />
            <stop offset="100%" stopColor={CYAN} stopOpacity="0.01" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation={5 * s} result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {[0.25, 0.5, 0.75].map((v) => (
          <line
            key={v}
            x1={PL} y1={BASELINE - v * GH}
            x2={PL + GW} y2={BASELINE - v * GH}
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={1 * s}
            strokeDasharray={`${4 * s} ${7 * s}`}
            opacity={axisP}
          />
        ))}

        <line
          x1={PL} y1={BASELINE - GH * axisP}
          x2={PL} y2={BASELINE}
          stroke="rgba(255,255,255,0.22)"
          strokeWidth={1.5 * s}
        />

        <line
          x1={PL} y1={BASELINE}
          x2={PL + GW * axisP} y2={BASELINE}
          stroke="rgba(255,255,255,0.22)"
          strokeWidth={1.5 * s}
        />

        {Array.from({ length: 8 }, (_, i) => (
          <line
            key={i}
            x1={PL + (i / 7) * GW} y1={BASELINE}
            x2={PL + (i / 7) * GW} y2={BASELINE + 6 * s}
            stroke="rgba(255,255,255,0.18)"
            strokeWidth={1 * s}
            opacity={axisP}
          />
        ))}

        <path d={FILL_D} fill="url(#area-grad)" clipPath="url(#views-reveal)" />
        <path d={LINE_D} stroke={CYAN} strokeWidth={4.5 * s} fill="none" clipPath="url(#views-reveal)" filter="url(#glow)" />

        <circle cx={END_PT[0]} cy={END_PT[1]} r={dotPulse * 18 * s} fill={GREEN} opacity={dotOpacity * 0.12} />
        <circle cx={END_PT[0]} cy={END_PT[1]} r={dotPulse * 7 * s} fill={GREEN} opacity={dotOpacity * 0.35} />
        <circle cx={END_PT[0]} cy={END_PT[1]} r={4 * s} fill={GREEN} opacity={dotOpacity} filter="url(#glow)" />

        <path
          d={`M ${END_PT[0]},${END_PT[1] - 10 * s} L ${END_PT[0]},${END_PT[1] - 32 * s} M ${END_PT[0] - 9 * s},${END_PT[1] - 25 * s} L ${END_PT[0]},${END_PT[1] - 32 * s} L ${END_PT[0] + 9 * s},${END_PT[1] - 25 * s}`}
          stroke={GREEN}
          strokeWidth={2.5 * s}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity={arrowOpacity}
          filter="url(#glow)"
        />
      </svg>

      {/* ── Floating comment bubbles ─────────────────────────────────── */}
      {COMMENT_BUBBLES.map((b, i) => {
        const revealFrame = CROSSFADE + 10 + b.appearAt * 58;
        const appear = spring({
          frame: frame - revealFrame,
          fps,
          config: { damping: 14, stiffness: 110, mass: 0.6 },
          durationInFrames: 14,
        });
        const floatY = Math.sin(frame / 10 + b.ph) * b.amp * s;
        const floatX = Math.cos(frame / 13 + b.ph) * (b.amp * 0.4) * s;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: b.x * s,
              top: b.y * s,
              width: b.w * s,
              height: b.h * s,
              opacity: appear * 0.85,
              transform: `translate(${floatX}px, ${floatY}px) rotate(${b.rot}deg) scale(${appear})`,
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: `blur(${6 * s}px)`,
              borderRadius: 12 * s,
              border: `${s}px solid rgba(0, 251, 255, 0.25)`,
              boxShadow: `0 ${4 * s}px ${15 * s}px rgba(0,0,0,0.3)`,
              display: "flex",
              alignItems: "center",
              padding: `0 ${10 * s}px`,
              gap: 8 * s,
              pointerEvents: "none",
            }}
          >
            <div style={{ width: 22 * s, height: 22 * s, borderRadius: "50%", background: b.avatar, opacity: 0.6 }} />
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 * s }}>
              <div style={{ width: "80%", height: 3 * s, background: "rgba(255,255,255,0.2)", borderRadius: 2 * s }} />
              <div style={{ width: "50%", height: 3 * s, background: "rgba(255,255,255,0.1)", borderRadius: 2 * s }} />
            </div>
          </div>
        );
      })}

      {/* ── Floating Emojis ────────────────────────────────────────── */}
      {FLOATING_EMOJIS.map((e, i) => {
        const revealFrame = CROSSFADE + 15 + e.appearAt * 58;
        const appear = spring({
          frame: frame - revealFrame,
          fps,
          config: { damping: 12, stiffness: 100, mass: 0.5 },
          durationInFrames: 12,
        });
        const floatY = Math.sin(frame / 15 + e.ph) * 15 * s;
        const floatX = Math.cos(frame / 20 + e.ph) * 8 * s;
        return (
          <div
            key={`emoji-${i}`}
            style={{
              position: "absolute",
              left: e.x,
              top: e.y,
              fontSize: 32 * s,
              opacity: appear * 0.7,
              transform: `translate(${floatX}px, ${floatY}px) scale(${appear})`,
              filter: `drop-shadow(0 0 ${10 * s}px rgba(0,0,0,0.5))`,
              pointerEvents: "none",
            }}
          >
            {e.emoji}
          </div>
        );
      })}

      {/* ── Floating Video Silhouettes ─────────────────────────────── */}
      {VIDEO_SILHOUETTES.map((vs, i) => (
        <VideoSilhouette
          key={`vs-${i}`}
          frame={frame}
          fps={fps}
          s={s}
          {...vs}
        />
      ))}

      {/* ── Floating People Silhouettes ────────────────────────────── */}
      {PEOPLE_SILHOUETTES.map((ps, i) => (
        <PersonSilhouette
          key={`ps-${i}`}
          frame={frame}
          fps={fps}
          s={s}
          {...ps}
        />
      ))}

      {/* ── Floating Eye Silhouettes ───────────────────────────────── */}
      {EYE_SILHOUETTES.map((es, i) => (
        <EyeSilhouette
          key={`es-${i}`}
          frame={frame}
          fps={fps}
          s={s}
          {...es}
        />
      ))}
    </AbsoluteFill>
  );
};
