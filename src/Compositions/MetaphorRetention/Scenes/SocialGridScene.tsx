import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
  Img,
  staticFile,
} from "remotion";

const COLS = 4;
const ROWS = 10;

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

const SOCIAL_LOGOS = [
  { row: 4, col: 0, file: "social_networks/youtube_logo.png", tint: "rgba(255,0,0,0.14)", delay: 2 },
  { row: 4, col: 3, file: "social_networks/instagram_logo.png", tint: "rgba(195,60,215,0.13)", delay: 6 },
  { row: 5, col: 1, file: "social_networks/facebook_logo.png", tint: "rgba(24,119,242,0.15)", delay: 10 },
  { row: 5, col: 2, file: "social_networks/tiktok_logo.png", tint: "rgba(105,201,208,0.12)", delay: 14 },
] as const;

const LOGO_CELL_SET = new Set(SOCIAL_LOGOS.map((l) => `${l.row}-${l.col}`));

const BlockLines: React.FC<{ alpha?: number; s: number }> = ({ alpha = 1, s }) => (
  <>
    <div style={{ height: 12 * s, background: `rgba(255,255,255,${0.09 * alpha})`, borderRadius: 4 * s, width: "65%" }} />
    <div style={{ height: 12 * s, background: `rgba(255,255,255,${0.06 * alpha})`, borderRadius: 4 * s, width: "85%" }} />
    <div style={{ height: 12 * s, background: `rgba(255,255,255,${0.04 * alpha})`, borderRadius: 4 * s, width: "45%" }} />
  </>
);

export const SocialGridScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames, width, height } = useVideoConfig();
  const s = width / 1280;

  const BLOCK_W = 270 * s;
  const BLOCK_H = 130 * s;
  const GAP_X = 22 * s;
  const GAP_Y = 18 * s;
  const ROW_H = BLOCK_H + GAP_Y;
  const GRID_W = COLS * BLOCK_W + (COLS - 1) * GAP_X;
  const GRID_LEFT = (width - GRID_W) / 2;
  const GRID_TOP = -1.5 * ROW_H;

  // Scrolling grid
  const scrollOffset = interpolate(frame, [0, 45], [0, -ROW_H * 1.2], {
    ...clamp,
    easing: Easing.inOut(Easing.quad),
  });
  
  // Fade out at the end
  const gridOpacity = interpolate(frame, [durationInFrames - 8, durationInFrames - 3], [1, 0], clamp);

  return (
    <AbsoluteFill style={{ opacity: gridOpacity }}>
      {Array.from({ length: ROWS }, (_, row) =>
        Array.from({ length: COLS }, (_, col) => {
          if (LOGO_CELL_SET.has(`${row}-${col}`)) return null;
          const x = GRID_LEFT + col * (BLOCK_W + GAP_X);
          const y = GRID_TOP + row * ROW_H + scrollOffset;
          if (y > height + BLOCK_H || y < -BLOCK_H * 2) return null;
          return (
            <div
              key={`${row}-${col}`}
              style={{
                position: "absolute",
                left: x,
                top: y,
                width: BLOCK_W,
                height: BLOCK_H,
                background: "linear-gradient(135deg, #191919 0%, #232326 100%)",
                borderRadius: 10 * s,
                border: `${s}px solid rgba(255,255,255,0.05)`,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: `${20 * s}px ${24 * s}px`,
                gap: 12 * s,
              }}
            >
              <BlockLines s={s} />
            </div>
          );
        })
      )}

      {/* Social network logo blocks */}
      {SOCIAL_LOGOS.map((logo) => {
        const x = GRID_LEFT + logo.col * (BLOCK_W + GAP_X);
        const y = GRID_TOP + logo.row * ROW_H + scrollOffset;
        if (y > height + BLOCK_H || y < -BLOCK_H * 2) return null;

        const logoEnter = spring({
          frame: frame - logo.delay,
          fps,
          config: { damping: 12, stiffness: 110, mass: 0.5 },
          durationInFrames: 16,
        });

        return (
          <div
            key={logo.file}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: BLOCK_W,
              height: BLOCK_H,
              background: `linear-gradient(135deg, ${logo.tint}, rgba(30,30,34,0.95))`,
              borderRadius: 10 * s,
              border: `${s}px solid rgba(255,255,255,0.09)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: logoEnter,
              transform: `scale(${interpolate(logoEnter, [0, 1], [0.7, 1], clamp)})`,
            }}
          >
            <Img
              src={staticFile(logo.file)}
              style={{ width: 64 * s, height: 64 * s, objectFit: "contain" }}
            />
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
