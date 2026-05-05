import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
  staticFile,
  Sequence,
} from "remotion";
import { Video } from "@remotion/media";
import { PromptInterface } from "./Components/PromptInterface";

export const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const s = Math.min(width, height) / 1280;

  const promptText =
    "Un cubo de cristal futurista flotando en el vacío, con circuitos cian brillantes...";

  const ITEM_H = height * 0.52;
  const ITEM_W = ITEM_H * (9 / 16);
  const GAP = 40 * s;
  const TOTAL_W = 4 * ITEM_W + 3 * GAP;

  // Title entrance
  const titleProgress = spring({ frame, fps, config: { damping: 14 } });
  const titleY = interpolate(titleProgress, [0, 1], [-30 * s, 0]);

  // Part 2 starts at frame 140: slide left to show all results
  const slideSpring = spring({
    frame: frame - 140,
    fps,
    config: { damping: 16, stiffness: 55 },
  });
  const rowOffset = interpolate(slideSpring, [0, 1], [ITEM_W / 2, TOTAL_W / 2]);

  // results 2–4 fade in shortly after slide starts
  const othersOpacity = spring({
    frame: frame - 146,
    fps,
    config: { damping: 14 },
  });

  // Footer crossfade at the Part 1→2 boundary
  const promptOpacity = interpolate(frame, [128, 143], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const resultadosOpacity = interpolate(frame, [140, 157], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      {/* Title: "Con IA" */}
      <div
        style={{
          position: "absolute",
          top: "5%",
          left: "50%",
          transform: `translateX(-50%) translateY(${titleY}px)`,
          opacity: titleProgress,
          textAlign: "center",
          fontSize: 90 * s,
          fontWeight: "bold",
          color: "#00FBFF",
          textShadow: `0 0 ${40 * s}px rgba(0,251,255,0.5)`,
          whiteSpace: "nowrap",
        }}
      >
        Con IA
      </div>

      {/* Video row — slides left to reveal results */}
      <div
        style={{
          position: "absolute",
          top: "25%",
          left: "50%",
          transform: `translateX(-${rowOffset}px)`,
          display: "flex",
          gap: `${GAP}px`,
        }}
      >
        <div
          style={{
            width: ITEM_W,
            height: ITEM_H,
            flexShrink: 0,
            borderRadius: 20 * s,
            overflow: "hidden",
            border: `${2 * s}px solid rgba(0,251,255,0.3)`,
            boxShadow: `0 0 ${30 * s}px rgba(0,251,255,0.1)`,
            backgroundColor: "#111",
          }}
        >
          <Video
            src={staticFile("assets/generations/with_ia/result_1.mp4")}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            muted
            loop
          />
        </div>

        <Sequence from={140} layout="none">
          {([2, 3, 4] as const).map((num) => (
            <div
              key={num}
              style={{
                width: ITEM_W,
                height: ITEM_H,
                flexShrink: 0,
                borderRadius: 20 * s,
                overflow: "hidden",
                border: `${2 * s}px solid rgba(0,251,255,0.3)`,
                boxShadow: `0 0 ${30 * s}px rgba(0,251,255,0.1)`,
                backgroundColor: "#111",
                opacity: othersOpacity,
              }}
            >
              <Video
                src={staticFile(`assets/generations/with_ia/result_${num}.mp4`)}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                muted
                loop
              />
            </div>
          ))}
        </Sequence>
      </div>

      {/* Footer: prompt */}
      <div
        style={{
          position: "absolute",
          bottom: "5%",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: promptOpacity,
        }}
      >
        <PromptInterface text={promptText} typingDelay={3} typingDuration={25} />
      </div>

      {/* Footer: "Resultados distintos" */}
      <div
        style={{
          position: "absolute",
          bottom: "5%",
          left: "50%",
          transform: "translateX(-50%)",
          textAlign: "center",
          fontSize: 72 * s,
          fontWeight: "bold",
          color: "#00FBFF",
          textShadow: `0 0 ${40 * s}px rgba(0,251,255,0.5)`,
          opacity: resultadosOpacity,
          whiteSpace: "nowrap",
        }}
      >
        Resultados distintos
      </div>
    </AbsoluteFill>
  );
};
