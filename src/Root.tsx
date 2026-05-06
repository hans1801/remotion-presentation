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
import { AIAsistentes } from "./Compositions/AIAsistentes/AIAsistentes";
import { StackConfig } from "./Compositions/StackConfig/StackConfig";
import { StackOverlay } from "./Compositions/StackConfig/StackOverlay";
import { LinkOverlay } from "./Compositions/StackConfig/LinkOverlay";
import { HypnozIntro } from "./Compositions/HypnozIntro/HypnozIntro";
import { AntigravityPlan } from "./Compositions/AntigravityPlan/AntigravityPlan";
import { StackInstall } from "./Compositions/StackInstall/StackInstall";
import { PrevConfig } from "./Compositions/Titles/PrevConfig";
import { InstallRemotion } from "./Compositions/Titles/InstallRemotion";
import { Top10Anim } from "./Compositions/Titles/Top10Anim";
import { RemotionClaude } from "./Compositions/Showcase/RemotionClaude";



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
        durationInFrames={787}
        fps={30}
        width={3840}
        height={2160}
      />
      <Composition
        id="ShowcaseFeatures"
        component={ShowcaseFeatures}
        durationInFrames={210}
        fps={30}
        width={3840}
        height={2160}
      />
      <Composition
        id="AIAsistentes"
        component={AIAsistentes}
        durationInFrames={280}
        fps={30}
        width={3840}
        height={2160}
      />
      <Composition
        id="HypnozIntro"
        component={HypnozIntro}
        durationInFrames={546}
        fps={30}
        width={3840}
        height={2160}
      />
      <Composition
        id="StackConfig"
        component={StackConfig}
        durationInFrames={341}
        fps={30}
        width={3840}
        height={2160}
      />
      <Composition
        id="AntigravityPlan"
        component={AntigravityPlan}
        durationInFrames={285}
        fps={30}
        width={3840}
        height={2160}
      />
      <Composition
        id="StackOverlay"
        component={StackOverlay}
        durationInFrames={70}
        fps={30}
        width={3840}
        height={2160}
      />
      <Composition
        id="LinkOverlay"
        component={LinkOverlay}
        durationInFrames={168}
        fps={30}
        width={3840}
        height={2160}
      />
      <Composition
        id="StackInstall"
        component={StackInstall}
        durationInFrames={839}
        fps={30}
        width={3840}
        height={2160}
      />
      <Composition
        id="PrevConfig"
        component={PrevConfig}
        durationInFrames={30}
        fps={30}
        width={3840}
        height={2160}
      />
      <Composition
        id="InstallRemotion"
        component={InstallRemotion}
        durationInFrames={30}
        fps={30}
        width={3840}
        height={2160}
      />
      <Composition
        id="Top10Anim"
        component={Top10Anim}
        durationInFrames={30}
        fps={30}
        width={3840}
        height={2160}
      />
      <Composition
        id="RemotionClaude"
        component={RemotionClaude}
        durationInFrames={145}
        fps={30}
        width={3840}
        height={2160}
      />
    </>

  );
};
