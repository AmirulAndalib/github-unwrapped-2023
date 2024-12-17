import { TransitionSeries, springTiming } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { Internals } from "remotion";
import { z } from "zod";
import type { TopLanguage } from "../../src/config";
import { cornerType, rocketSchema, topLanguagesSchema } from "../../src/config";
import { PlanetScaleWiggle } from "./PlaneScaleWiggle";
import { PlanetScaleOut } from "./PlanetScaleOut";
import { PlanetScaleSpiral } from "./PlanetScaleSpiral";
import { getRotatingPlanetsToPrefetch } from "./RotatingPlanet";
import { TITLE_CARD_DURATION, TopLanguagesTitleCard } from "./TitleCard";
import { mapLanguageToPlanet } from "./constants";
import {
  deriveEnterDirectionFromCorner,
  mapEnterDirectionIntoSlideDirection,
  mapEnterDirectionToExitDirection,
  mapExitDirectionIntoSlideDirection,
} from "./corner";

export const allPlanetsSchema = z.object({
  topLanguages: topLanguagesSchema,
  corner: cornerType,
  showHelperLine: z.boolean(),
  login: z.string(),
  rocket: rocketSchema,
  octocatSeed: z.number(),
});

const allPlanetsTransitionTiming = springTiming({
  config: {
    damping: 200,
  },
  durationInFrames: 15,
});

export const FIRST_PLACE_DURATION = 82;
const SECOND_PLACE_DURATION = 112;
const THIRD_PLACE_DURATION = 110;

export const getDurationOfAllPlanets = ({
  fps,
  topLanguages,
}: {
  topLanguages: z.infer<typeof topLanguagesSchema>;
  fps: number;
}) => {
  const transitionDuration = allPlanetsTransitionTiming.getDurationInFrames({
    fps,
  });
  const { language2, language3 } = topLanguages;

  const transitionBetween1And2 = language2 ? -transitionDuration : 0;
  const transitionBetween2And3 = language3 ? -transitionDuration : 0;

  const thirdDuration = language3 ? THIRD_PLACE_DURATION : 0;
  const secondDuration = language2 ? SECOND_PLACE_DURATION : 0;

  return (
    TITLE_CARD_DURATION +
    thirdDuration +
    secondDuration +
    FIRST_PLACE_DURATION +
    transitionBetween1And2 +
    transitionBetween2And3 -
    transitionDuration
  );
};

export const getTopLanguageAssetsToPrefetch = ({
  language1,
  language2,
  language3,
}: {
  language1: TopLanguage | null;
  language2: TopLanguage | null;
  language3: TopLanguage | null;
}) => {
  return [
    ...getRotatingPlanetsToPrefetch(),
    language1 && language1.type === "designed"
      ? mapLanguageToPlanet[language1.name].source
      : null,
    language2 && language2.type === "designed"
      ? mapLanguageToPlanet[language2.name].source
      : null,
    language3 && language3.type === "designed"
      ? mapLanguageToPlanet[language3.name].source
      : null,
  ].filter(Internals.truthy);
};

export const AllPlanets: React.FC<z.infer<typeof allPlanetsSchema>> = ({
  corner,
  showHelperLine,
  login,
  topLanguages,
  rocket,
  octocatSeed,
}) => {
  const { language1, language2, language3 } = topLanguages;
  const enterDirection = deriveEnterDirectionFromCorner(corner);
  const exitDirection = mapEnterDirectionToExitDirection(enterDirection);

  return (
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={TITLE_CARD_DURATION}>
        <TopLanguagesTitleCard
          rocket={rocket}
          pluralizeLanguages={language2 !== null}
          randomizePlanetSeed={login}
          randomizeOctocatSeed={octocatSeed}
        />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={slide({ direction: "from-bottom" })}
        timing={allPlanetsTransitionTiming}
      />
      {language3 ? (
        <>
          <TransitionSeries.Sequence
            key="language3"
            durationInFrames={THIRD_PLACE_DURATION}
          >
            <PlanetScaleOut
              rocket={rocket}
              position={3}
              corner={corner}
              language={language3}
            />
          </TransitionSeries.Sequence>
          <TransitionSeries.Transition
            key="scene3"
            presentation={slide({
              direction: mapEnterDirectionIntoSlideDirection(enterDirection),
            })}
            timing={allPlanetsTransitionTiming}
          />
        </>
      ) : null}
      {language2 ? (
        <>
          <TransitionSeries.Sequence
            key="transition2"
            style={{
              overflow: "hidden",
            }}
            durationInFrames={SECOND_PLACE_DURATION}
          >
            <PlanetScaleSpiral
              showHelperLine={showHelperLine}
              language={language2}
              corner={corner}
              position={2}
              rocket={rocket}
            />
          </TransitionSeries.Sequence>
          <TransitionSeries.Transition
            key="scene2"
            presentation={slide({
              direction: mapExitDirectionIntoSlideDirection(exitDirection),
            })}
            timing={allPlanetsTransitionTiming}
          />
        </>
      ) : null}
      <TransitionSeries.Sequence
        durationInFrames={FIRST_PLACE_DURATION}
        style={{
          overflow: "hidden",
        }}
      >
        <PlanetScaleWiggle
          enterDirection={enterDirection}
          position={1}
          language={language1}
          rocket={rocket}
        />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
