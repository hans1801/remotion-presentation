import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Sequence } from "remotion";
import { VideoGrid } from "./Components/VideoGrid";
import { RemotionPrecisionExample } from "../RemotionPrecisionExample/RemotionPrecisionExample";

export const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const s = width / 1280;

  const showGrid = frame > 173;
  const gridFade = spring({
    frame: frame - 173,
    fps,
    config: { damping: 12 },
  });

  return (
    <AbsoluteFill>
      {/* Background technical animation (reusing the one we made) */}
      <Sequence durationInFrames={353}>
        <div style={{ opacity: interpolate(frame, [173, 200], [1, 0.3]) }}>
          <RemotionPrecisionExample />
        </div>
      </Sequence>

      {/* Video Comparison Grid */}
      <Sequence from={173}>
        <div style={{ 
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 50 * s,
          opacity: gridFade,
        }}>
          <h2 style={{
            color: "#00FBFF",
            fontSize: 100 * s,
            fontWeight: "bold",
            textShadow: `0 0 ${40 * s}px rgba(0,251,255,0.4)`,
            margin: 0,
            textTransform: "uppercase"
          }}>
            PRECISIÓN DETERMINISTA
          </h2>
          <VideoGrid 
            videoPaths={[
              "assets/generations/with_remotion/result_1.mp4", 
              "assets/generations/with_remotion/result_2.mp4", 
              "assets/generations/with_remotion/result_3.mp4"
            ]} 
            columns={3}
          />
          <div style={{
            color: "#39FF14",
            fontSize: 48 * s,
            fontFamily: "monospace",
            backgroundColor: "rgba(57, 255, 20, 0.1)",
            padding: `${15 * s}px ${45 * s}px`,
            border: `${2 * s}px solid rgba(57, 255, 20, 0.3)`,
            borderRadius: 60 * s,
            marginTop: 40 * s
          }}>
            RESULTADO 100% REPRODUCIBLE
          </div>
        </div>
      </Sequence>
    </AbsoluteFill>
  );
};
