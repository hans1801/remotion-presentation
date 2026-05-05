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

const REMOTION_GREEN = "#39FF14";

type Token = { text: string; color: string };
type CodeLine = { indent: number; tokens: Token[] };

const dim = (text: string): Token => ({ text, color: "rgba(255,255,255,0.25)" });
const kw = (text: string): Token => ({ text, color: "rgba(255,255,255,0.55)" });
const el = (text: string): Token => ({ text, color: REMOTION_GREEN });
const prop = (text: string): Token => ({ text, color: "rgba(0,251,255,0.8)" });
const val = (text: string): Token => ({ text, color: "rgba(255,200,80,0.85)" });

const CODE_LINES: CodeLine[] = [
  { indent: 0, tokens: [dim("const "), kw("MyVideo"), dim(" = () => (")] },
  { indent: 1, tokens: [dim("<"), el("element_1"), dim(" "), prop("duration"), dim("="), val("{30}"), dim(" />")] },
  { indent: 1, tokens: [dim("<"), el("element_2"), dim(" "), prop("from"), dim("="), val("{30}"), dim(" "), prop("duration"), dim("="), val("{45}"), dim(" />")] },
  { indent: 1, tokens: [dim("<"), el("element_3"), dim(" "), prop("from"), dim("="), val("{75}"), dim(" />")] },
  { indent: 0, tokens: [dim(");")] },
];

const PseudoCodeSilhouette: React.FC = () => {
  const { width, height } = useVideoConfig();
  const s = Math.min(width, height) / 1280;
  const fs = 22 * s;

  return (
    <div
      style={{
        backgroundColor: "rgba(57,255,20,0.05)",
        border: `${2 * s}px solid rgba(57,255,20,0.2)`,
        borderRadius: 16 * s,
        padding: `${14 * s}px ${24 * s}px`,
        display: "flex",
        flexDirection: "column",
        gap: 6 * s,
        backdropFilter: "blur(20px)",
        boxShadow: `0 ${14 * s}px ${36 * s}px rgba(0,0,0,0.3)`,
        fontFamily: "monospace",
        fontSize: fs,
      }}
    >
      <div
        style={{
          color: "rgba(57,255,20,0.3)",
          fontSize: 12 * s,
          marginBottom: 4 * s,
          textTransform: "uppercase",
          letterSpacing: 2 * s,
        }}
      >
        REMOTION_COMPOSITION
      </div>
      {CODE_LINES.map((line, i) => (
        <div
          key={i}
          style={{
            paddingLeft: line.indent * 28 * s,
            display: "flex",
            flexWrap: "wrap",
            lineHeight: 1,
          }}
        >
          {line.tokens.map((token, j) => (
            <span key={j} style={{ color: token.color }}>
              {token.text}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};

export const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const s = Math.min(width, height) / 1280;

  const ITEM_H = height * 0.52;
  const ITEM_W = ITEM_H * (9 / 16);
  const GAP = 40 * s;
  const TOTAL_W = 4 * ITEM_W + 3 * GAP;

  // Title entrance
  const titleProgress = spring({ frame, fps, config: { damping: 14 } });
  const titleY = interpolate(titleProgress, [0, 1], [-30 * s, 0]);

  // Part 2 starts at frame 193: slide left to show all results
  const slideSpring = spring({
    frame: frame - 193,
    fps,
    config: { damping: 16, stiffness: 55 },
  });
  const rowOffset = interpolate(slideSpring, [0, 1], [ITEM_W / 2, TOTAL_W / 2]);

  // results 2–4 fade in shortly after slide starts
  const othersOpacity = spring({
    frame: frame - 199,
    fps,
    config: { damping: 14 },
  });

  // Footer crossfade at the Part 1→2 boundary
  const pseudoFadeIn = spring({ frame: frame - 5, fps, config: { damping: 14 } });
  const pseudoFadeOut = interpolate(frame, [181, 197], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const pseudoOpacity = Math.min(pseudoFadeIn, pseudoFadeOut);

  const siempreOpacity = interpolate(frame, [193, 210], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      {/* Title: "Con Remotion" */}
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
          color: REMOTION_GREEN,
          textShadow: `0 0 ${40 * s}px rgba(57,255,20,0.5)`,
          whiteSpace: "nowrap",
        }}
      >
        Con Remotion
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
            border: `${2 * s}px solid rgba(57,255,20,0.3)`,
            boxShadow: `0 0 ${30 * s}px rgba(57,255,20,0.1)`,
            backgroundColor: "#111",
          }}
        >
          <Video
            src={staticFile("assets/generations/with_remotion/result_1.mp4")}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            muted
            loop
          />
        </div>

        {/* Mounted from frame 0 so playback stays in sync with result_1 */}
        {([2, 3, 4] as const).map((num) => (
          <div
            key={num}
            style={{
              width: ITEM_W,
              height: ITEM_H,
              flexShrink: 0,
              borderRadius: 20 * s,
              overflow: "hidden",
              border: `${2 * s}px solid rgba(57,255,20,0.3)`,
              boxShadow: `0 0 ${30 * s}px rgba(57,255,20,0.1)`,
              backgroundColor: "#111",
              opacity: othersOpacity,
            }}
          >
            <Video
              src={staticFile(`assets/generations/with_remotion/result_${num}.mp4`)}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              muted
              loop
            />
          </div>
        ))}
      </div>

      {/* Footer: pseudo-code silhouette */}
      <div
        style={{
          position: "absolute",
          bottom: "5%",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: pseudoOpacity,
        }}
      >
        <div style={{ width: "60%" }}>
          <PseudoCodeSilhouette />
        </div>
      </div>

      {/* Footer: "Siempre lo mismo" */}
      <div
        style={{
          position: "absolute",
          bottom: "5%",
          left: "50%",
          transform: "translateX(-50%)",
          textAlign: "center",
          fontSize: 72 * s,
          fontWeight: "bold",
          color: REMOTION_GREEN,
          textShadow: `0 0 ${40 * s}px rgba(57,255,20,0.5)`,
          opacity: siempreOpacity,
          whiteSpace: "nowrap",
        }}
      >
        Siempre lo mismo
      </div>
    </AbsoluteFill>
  );
};
