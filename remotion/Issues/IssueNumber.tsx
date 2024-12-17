import React from "react";
import { SevenSegment } from "../SevenSegment/SevenSegmentNumber";

export const IssueNumber: React.FC<{
  readonly currentNumber: number;
  readonly max: number;
  readonly label: string;
  readonly align: "left" | "right" | "center";
}> = ({ currentNumber, label, align, max }) => {
  return (
    <div
      style={{
        color: "white",
        fontFamily: "Mona Sans",
        fontWeight: "800",
      }}
    >
      <div
        style={{
          display: "inline-flex",
          flexDirection: "column",
          ...(align === "left"
            ? { left: 40, alignItems: "flex-start" }
            : align === "right"
              ? { right: 40, alignItems: "flex-end" }
              : {
                  alignSelf: "center",
                  alignItems: "center",
                }),
          width: 300,
          paddingLeft: 10,
          paddingRight: 10,
          paddingTop: 5,
          paddingBottom: 5,
        }}
      >
        <div>
          <SevenSegment max={max} num={currentNumber} fontSize={120} />
        </div>
        <div
          style={{
            fontFamily: "Mona Sans",
            color: "white",
            fontSize: 30,
            marginBottom: 14,
            marginTop: 19,
            fontWeight: "700",
            paddingLeft: align === "left" ? 15 : 0,
            paddingRight: align === "right" ? 15 : 0,
            textAlign: align,
            opacity: 0.7,
          }}
        >
          {label}
        </div>
      </div>
    </div>
  );
};
