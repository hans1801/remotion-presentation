import "./index.css";
import { Composition } from "remotion";
import { EditorChaos } from "./Compositions/EditorChaos/EditorChaos";
import { MetaphorRetention } from "./Compositions/MetaphorRetention/MetaphorRetention";
import { TutorialHell } from "./Compositions/TutorialHell/TutorialHell";
import { ViralDifference } from "./Compositions/ViralDifference/ViralDifference";
import { AutomationQuestion } from "./Compositions/AutomationQuestion/AutomationQuestion";
import { RemotionIntro } from "./Compositions/RemotionIntro/RemotionIntro";
import { IADemonstration } from "./Compositions/IADemonstration/IADemonstration";
import { RemotionPrecisionExample } from "./Compositions/RemotionPrecisionExample/RemotionPrecisionExample";
import { AIVsRemotion } from "./Compositions/AIVsRemotion/AIVsRemotion";
import { ShowcaseFeatures } from "./Compositions/ShowcaseFeatures/ShowcaseFeatures";


export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="RemotionIntro"
        component={RemotionIntro}
        durationInFrames={211}
        fps={30}
        width={3840}
        height={2160}
      />
      <Composition
        id="AutomationQuestion"
        component={AutomationQuestion}
        durationInFrames={200}
        fps={30}
        width={3840}
        height={2160}
      />
      <Composition
        id="EditorChaos"
        component={EditorChaos}
        durationInFrames={210}
        fps={30}
        width={3840}
        height={2160}
      />
      <Composition
        id="MetaphorRetention"
        component={MetaphorRetention}
        durationInFrames={280}
        fps={30}
        width={3840}
        height={2160}
      />
      <Composition
        id="TutorialHell"
        component={TutorialHell}
        durationInFrames={150}
        fps={30}
        width={3840}
        height={2160}
      />
      <Composition
        id="ViralDifference"
        component={ViralDifference}
        durationInFrames={195}
        fps={30}
        width={3840}
        height={2160}
      />
      <Composition
        id="IADemonstration"
        component={IADemonstration}
        durationInFrames={89}
        fps={30}
        width={3840}
        height={2160}
      />
      <Composition
        id="RemotionPrecision"
        component={RemotionPrecisionExample}
        durationInFrames={150}
        fps={30}
        width={2160}
        height={3840}
      />
      <Composition
        id="AIVsRemotion"
        component={AIVsRemotion}
        durationInFrames={647}
        fps={30}
        width={3840}
        height={2160}
      />
      <Composition
        id="ShowcaseFeatures"
        component={ShowcaseFeatures}
        durationInFrames={153}
        fps={30}
        width={3840}
        height={2160}
      />
    </>
  );
};
