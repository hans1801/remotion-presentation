import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Sequence } from "remotion";
import { PromptInterface } from "./Components/PromptInterface";
import { VideoGrid } from "./Components/VideoGrid";

export const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const s = width / 1280;

  const promptText = "Un cubo de cristal futurista flotando en el vacío, con circuitos cian brillantes...";

  const videoFade = spring({
    frame: frame - 40,
    fps,
    config: { damping: 12 },
  });

  const gridFade = spring({
    frame: frame - 112,
    fps,
    config: { damping: 12 },
  });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", gap: 80 * s }}>
      <Sequence durationInFrames={151}>
        <div style={{ transform: `translateY(${interpolate(videoFade, [0, 1], [0, -50 * s])}px)`, width: "60%" }}>
          <PromptInterface text={promptText} />
        </div>
      </Sequence>

      <Sequence from={40}>
        <div style={{ opacity: videoFade, transform: `scale(${interpolate(videoFade, [0, 1], [0.8, 1])})` }}>
          {frame < 112 ? (
            <VideoGrid videoPaths={["assets/generations/with_ia/result_1.mp4"]} columns={1} />
          ) : (
            <VideoGrid 
              videoPaths={[
                "assets/generations/with_ia/result_1.mp4", 
                "assets/generations/with_ia/result_2.mp4", 
                "assets/generations/with_ia/result_3.mp4"
              ]} 
              columns={3}
              opacity={gridFade}
            />
          )}
        </div>
      </Sequence>

      {/* Label IA es creativa */}
      {frame > 112 && (
        <div style={{
          position: "absolute",
          top: "15%",
          color: "#FF3B30",
          fontSize: 60 * s,
          fontWeight: "bold",
          textShadow: `0 0 ${20 * s}px rgba(255,59,48,0.5)`,
          opacity: gridFade,
        }}>
          RESULTADOS INCONSISTENTES
        </div>
      )}
    </AbsoluteFill>
  );
};
