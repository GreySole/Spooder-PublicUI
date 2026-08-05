import { Box, useTheme } from "@spooder/webui-component-library";
import React from "react";
import StreamChat from "../embed/StreamChat";
import VideoEmbed from "../embed/VideoEmbed";
import PluginBar from "../plugin/PluginBar";
import Header from "../Header";

export default function AppContent() {
  const { isMobileDevice } = useTheme();

  const height = `calc(100dvh - var(--header-height))`;
  return (
    <Box flexFlow="column">
      <Header />
      <Box flexFlow="column" width="100vw" height={height} padding="small">
        <Box
          flexFlow={isMobileDevice ? "column" : "row"}
          width="100%"
          height={isMobileDevice ? "84%" : "80%"}
        >
          <Box width="100%" height="100%">
            <VideoEmbed />
          </Box>
          <Box height="100%">
            <StreamChat
              width={isMobileDevice ? "100%" : "inherit"}
              height="inherit"
            />
          </Box>
        </Box>
        <Box width="100%" height={isMobileDevice ? "16%" : "20%"}>
          <PluginBar />
        </Box>
      </Box>
    </Box>
  );
}
