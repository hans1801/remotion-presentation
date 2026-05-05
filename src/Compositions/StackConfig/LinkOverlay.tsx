import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, staticFile, Img, Series } from "remotion";

const WideOverlayCard: React.FC<{ 
  imageUrl: string; 
  cardWidth: number; 
  cardHeight: number;
  zoom?: number;
  name?: string;
}> = ({ imageUrl, cardWidth, cardHeight, zoom = 1, name }) => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const s = width / 1280;

  const entrance = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 150 },
  });

  const opacity = interpolate(entrance, [0, 1], [0, 1]);
  const scale = interpolate(entrance, [0, 1], [0.8, 1]) * zoom;
  const floatY = Math.sin(frame / 20) * 5 * s;

  return (
    <AbsoluteFill style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      paddingBottom: 10 * s,
    }}>
      <div style={{
        opacity,
        transform: `scale(${scale}) translateY(${floatY}px)`,
        background: "white",
        border: `${2 * s}px solid rgba(0, 0, 0, 0.1)`,
        borderRadius: 20 * s,
        width: cardWidth * s,
        height: cardHeight * s,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: name ? 30 * s : 0, // Only gap if there's text
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
        overflow: "hidden",
        padding: name ? `0 ${40 * s}px` : 0, // Only padding if there's text
      }}>
        <div style={{
          height: name ? "80%" : "100%",
          width: name ? "auto" : "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <Img 
            src={staticFile(imageUrl)} 
            style={{ 
              height: "100%",
              width: "100%",
              objectFit: "contain",
            }} 
          />
        </div>
        {name && (
          <span style={{
            color: "black",
            fontSize: 60 * s,
            fontWeight: 900,
            fontFamily: "Inter, sans-serif",
            letterSpacing: -1 * s,
          }}>
            {name}
          </span>
        )}
      </div>
    </AbsoluteFill>
  );
};

export const LinkOverlay: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#808080" }}>
      <Series>
        <Series.Sequence durationInFrames={77}>
          <WideOverlayCard imageUrl="overlay_assets/stack_links.png" cardWidth={860} cardHeight={186} zoom={0.85} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={91}>
          <WideOverlayCard imageUrl="overlay_assets/remotion_logo.png" cardWidth={688} cardHeight={167} name="Remotion" zoom={0.85} />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
