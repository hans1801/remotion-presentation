import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
  staticFile,
} from "remotion";
import { Video } from "@remotion/media";

const IA_CYAN = "#00FBFF";
const REMOTION_GREEN = "#39FF14";

export const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const s = Math.min(width, height) / 1280;

  const ITEM_H = height * 0.62;
  const ITEM_W = ITEM_H * (9 / 16);
  const GAP = 100 * s;

  // IA card enters from the left
  const iaProgress = spring({ frame, fps, config: { damping: 14, stiffness: 60 } });
  const iaX = interpolate(iaProgress, [0, 1], [-ITEM_W * 1.5, 0]);

  // Remotion card enters from the right at Part 2 (frame 68)
  const remotionProgress = spring({
    frame: frame - 68,
    fps,
    config: { damping: 14, stiffness: 60 },
  });
  const remotionX = interpolate(remotionProgress, [0, 1], [ITEM_W * 1.5, 0]);

  // Labels fade in with their cards
  const iaLabelOpacity = spring({ frame, fps, config: { damping: 16 } });
  const remotionLabelOpacity = spring({
    frame: frame - 68,
    fps,
    config: { damping: 16 },
  });

  // "CREATIVA" appears after IA card settles (~frame 20)
  const iaCharOpacity = spring({
    frame: frame - 20,
    fps,
    config: { damping: 14 },
  });

  // "CONSISTENTE" appears after Remotion card settles (~frame 90)
  const remotionCharOpacity = spring({
    frame: frame - 90,
    fps,
    config: { damping: 14 },
  });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: GAP,
      }}
    >
      {/* IA column */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24 * s,
          transform: `translateX(${iaX}px)`,
          opacity: iaProgress,
        }}
      >
        {/* Label */}
        <div
          style={{
            fontSize: 56 * s,
            fontWeight: "bold",
            color: IA_CYAN,
            textShadow: `0 0 ${30 * s}px rgba(0,251,255,0.5)`,
            opacity: iaLabelOpacity,
            whiteSpace: "nowrap",
          }}
        >
          Con IA
        </div>

        {/* Video card */}
        <div
          style={{
            width: ITEM_W,
            height: ITEM_H,
            borderRadius: 20 * s,
            overflow: "hidden",
            border: `${2 * s}px solid rgba(0,251,255,0.35)`,
            boxShadow: `0 0 ${40 * s}px rgba(0,251,255,0.15)`,
            backgroundColor: "#111",
            flexShrink: 0,
          }}
        >
          <Video
            src={staticFile("assets/generations/with_ia/result_1.mp4")}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            muted
            loop
          />
        </div>

        {/* Characteristic */}
        <div
          style={{
            fontSize: 48 * s,
            fontWeight: "bold",
            color: IA_CYAN,
            textShadow: `0 0 ${20 * s}px rgba(0,251,255,0.4)`,
            opacity: iaCharOpacity,
            whiteSpace: "nowrap",
          }}
        >
          CREATIVA
        </div>
      </div>

      {/* VS divider */}
      <div
        style={{
          fontSize: 40 * s,
          fontWeight: "bold",
          color: "rgba(255,255,255,0.2)",
          letterSpacing: 4 * s,
          opacity: interpolate(frame, [68, 85], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          flexShrink: 0,
        }}
      >
        VS
      </div>

      {/* Remotion column */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24 * s,
          transform: `translateX(${remotionX}px)`,
          opacity: remotionProgress,
        }}
      >
        {/* Label */}
        <div
          style={{
            fontSize: 56 * s,
            fontWeight: "bold",
            color: REMOTION_GREEN,
            textShadow: `0 0 ${30 * s}px rgba(57,255,20,0.5)`,
            opacity: remotionLabelOpacity,
            whiteSpace: "nowrap",
          }}
        >
          Con Remotion
        </div>

        {/* Video card */}
        <div
          style={{
            width: ITEM_W,
            height: ITEM_H,
            borderRadius: 20 * s,
            overflow: "hidden",
            border: `${2 * s}px solid rgba(57,255,20,0.35)`,
            boxShadow: `0 0 ${40 * s}px rgba(57,255,20,0.15)`,
            backgroundColor: "#111",
            flexShrink: 0,
          }}
        >
          <Video
            src={staticFile("assets/generations/with_remotion/result_1.mp4")}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            muted
            loop
          />
        </div>

        {/* Characteristic */}
        <div
          style={{
            fontSize: 48 * s,
            fontWeight: "bold",
            color: REMOTION_GREEN,
            textShadow: `0 0 ${20 * s}px rgba(57,255,20,0.4)`,
            opacity: remotionCharOpacity,
            whiteSpace: "nowrap",
          }}
        >
          CONSISTENTE
        </div>
      </div>
    </AbsoluteFill>
  );
};
