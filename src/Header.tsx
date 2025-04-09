import React from "react";
import {
  Border,
  Box,
  CustomSpooder,
  TypeFace,
  useTheme,
} from "@greysole/spooder-component-library";
import { useAppContext } from "./context/AppContextProvider";

export default function Header() {
  const { isMobileDevice } = useTheme();
  const { displayName } = useAppContext();
  return (
    <Box
      className={`top-header`}
      width="100%"
      flexFlow="column"
      justifyContent="center"
      alignItems="center"
      height={"var(--header-height)"}
    >
      <Border borderBottom>
        <Box
          className="navigation-bar"
          flexFlow="row nowrap"
          width="100%"
          height="100%"
          justifyContent={isMobileDevice ? "center" : "space-between"}
          alignItems="center"
          paddingLeft="small"
          paddingRight="small"
        >
          {isMobileDevice ? null : (
            <TypeFace fontSize="large">{`Welcome ${displayName}!`}</TypeFace>
          )}
          <CustomSpooder fontSize="xlarge" />
        </Box>
      </Border>
    </Box>
  );
}
