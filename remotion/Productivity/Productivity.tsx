import {
  AbsoluteFill,
  Audio,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import type { Hour, ProductivityPerHour, Weekday } from "../../src/config";
import { isMobileDevice } from "../Opening/devices";
import { PANE_BACKGROUND } from "../TopLanguages/Pane";
import { TopDay } from "./TopDay";

type Props = {
  graphData: Array<ProductivityPerHour>;
  weekday: Weekday;
  hour: Hour;
};

const Bar = (props: {
  readonly productivity: number;
  readonly index: number;
  readonly mostProductive: boolean;
}) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const height = spring({
    fps,
    frame,
    from: 0,
    to: 100,
    config: {
      mass: props.productivity * 10 + 0.1,
      damping: 200,
    },
    delay: 30 + props.index * 2,
  });

  return (
    <div
      style={{
        width: 30,
        height: `${height}%`,
        display: "flex",
        alignItems: "flex-end",
        borderRadius: 4,
      }}
    >
      <div
        style={{
          width: "100%",
          height: `${props.productivity * 100}%`,
          borderRadius: 4,
          backgroundColor: props.mostProductive ? PANE_BACKGROUND : "#181B28",
          border: "3px solid rgba(255, 255, 255, 0.1)",
        }}
      />
    </div>
  );
};

const ProductivityGraph = (props: {
  readonly productivityPerHour: Array<ProductivityPerHour>;
  readonly style?: React.CSSProperties;
}) => {
  const maxProductivity = Math.max(
    ...props.productivityPerHour.map((p) => p.productivity),
  );

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        gap: 10,
        height: 480,
        ...props.style,
      }}
    >
      {props.productivityPerHour.map((productivityPerHour) => {
        return (
          <div
            key={productivityPerHour.time}
            style={{
              height: "100%",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <Bar
              index={productivityPerHour.time}
              productivity={productivityPerHour.productivity / maxProductivity}
              mostProductive={
                productivityPerHour.productivity === maxProductivity &&
                maxProductivity > 0
              }
            />
            <div
              style={{
                color: "white",
                fontSize: 24,
                fontWeight: 700,
                fontFamily: "Mona Sans",
              }}
            >
              {productivityPerHour.time}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const DECELERATE_SOUND = staticFile("decelerate.mp3");

export const getProductivityAssetToPrefetch = () => {
  return [DECELERATE_SOUND];
};

export const Productivity: React.FC<Props> = ({ graphData, weekday, hour }) => {
  return (
    <AbsoluteFill
      style={{
        display: "flex",
      }}
    >
      {isMobileDevice() ? null : <Audio src={DECELERATE_SOUND} volume={0.8} />}
      <TopDay
        values={[
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ]}
        label="Most productive day"
        value={weekday}
        radius={130}
        renderLabel={(value) => value}
        delay={60}
        soundDelay={95}
      />
      <br />
      <br />
      <TopDay
        values={[
          "0",
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
          "18",
          "19",
          "20",
          "21",
          "22",
          "23",
        ]}
        label="Most productive time"
        value={hour}
        radius={300}
        delay={70}
        renderLabel={(value) => {
          if (value === "12") {
            return "12 pm";
          }

          if (value === "0") {
            return "12 am";
          }

          if (Number(value) > 12) {
            return `${Number(value) - 12} pm`;
          }

          return `${value} am`;
        }}
        soundDelay={120}
      />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div
        style={{
          display: "flex",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ProductivityGraph productivityPerHour={graphData} />
      </div>
    </AbsoluteFill>
  );
};
