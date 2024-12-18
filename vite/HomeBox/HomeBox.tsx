import React from "react";
import { ShineEffect } from "../../remotion/ShineEffect";
import { Box } from "../Box/Box";
import { HomeBoxBottom } from "./HomeBoxBottom";
import { HomeBoxTop } from "./HomeBoxTop";
import styles from "./styles.module.css";

export const HomeBox: React.FC<{
  readonly userNotFound: boolean;
  readonly setUserNotFound: React.Dispatch<React.SetStateAction<boolean>>;
}> = (props) => {
  return (
    <Box
      className={styles.homeBoxWrapper}
      style={{ maxWidth: 800, border: 0, position: "relative" }}
    >
      <ShineEffect borderRadius={10} />
      <HomeBoxTop />
      <HomeBoxBottom {...props} />
    </Box>
  );
};
