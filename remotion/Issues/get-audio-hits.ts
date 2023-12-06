import { staticFile } from "remotion";
import { MAXIMUM_NUMBER_OF_AUDIO_TAGS } from "../audio-tags";
import type {
  ExplosionExpanded,
  ShotWithShootDelay,
} from "./get-shots-to-fire";
import { sampleUniqueIndices } from "./sample-indices";

const MAX_SHOTS = 5;
const MAX_HITS = 4;

if (MAX_SHOTS + MAX_HITS > MAXIMUM_NUMBER_OF_AUDIO_TAGS - 1) {
  throw new Error(
    "MAX_SHOTS + MAX_HITS must be less than MAXIMUM_NUMBER_OF_AUDIO_TAGS -1",
  );
}

type AudioSample = {
  type: "shot" | "explosion";
  delay: number;
  source: string;
};

const SHOT_SOUNDS = [
  staticFile("space-shot-1.mp3"),
  staticFile("space-shot-2.mp3"),
];

const EXPLODE_SOUNDS = [staticFile("ufo-explode-1.mp3")];

export const getIssueSounds = () => {
  return [...SHOT_SOUNDS, ...EXPLODE_SOUNDS];
};

export const getAudioHits = (
  shots: ShotWithShootDelay[],
  explosions: ExplosionExpanded[],
): AudioSample[] => {
  const shotSamples = sampleUniqueIndices(
    shots.length,
    Math.min(shots.length, MAX_SHOTS),
  );

  const explosionSamples = sampleUniqueIndices(
    explosions.length,
    Math.min(explosions.length, MAX_HITS),
  );

  return [
    ...shotSamples.map((index): AudioSample => {
      return {
        type: "shot" as const,
        delay: shots[index].shootDelay,
        source: SHOT_SOUNDS[index % SHOT_SOUNDS.length],
      };
    }),
    ...explosionSamples.map((index): AudioSample => {
      return {
        type: "explosion" as const,
        delay: explosions[index].explodeAfterFrames - 2,
        source: EXPLODE_SOUNDS[0],
      };
    }),
  ];
};
