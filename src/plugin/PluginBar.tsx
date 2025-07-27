import React from "react";
import {
  Border,
  Box,
  Button,
  useTheme,
} from "@greysole/spooder-component-library";
import { useBroadcasterContext } from "../context/BroadcasterContextProvider";
import PluginButton from "./PluginButton";
import { useAppContext } from "../context/AppContextProvider";

export default function PluginBar() {
  const { userId } = useAppContext();
  const { plugins, clientId } = useBroadcasterContext();
  const { isMobileDevice } = useTheme();

  const mockPlugins = {
    ...plugins,
  };

  return (
    <Box width="100%" height="100%">
      <Border>
        {userId !== "-1" ? (
          <Box
            flexFlow={`row ${!isMobileDevice ? "wrap" : ""}`}
            height="100%"
            overflow="auto"
            padding="small"
          >
            {Object.entries(mockPlugins).map(([key, value]) => (
              <PluginButton key={key} pluginName={key} displayName={value} />
            ))}
          </Box>
        ) : (
          <Box
            width={"100%"}
            height="100%"
            alignItems="center"
            justifyContent="center"
          >
            <Button
              label="Login to Twitch for Plugins"
              onClick={() => {
                const twitchAuthURL = new URL(
                  `https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=${clientId}&redirect_uri=${document.location.origin}&scope=`
                );
                window.open(twitchAuthURL.toString(), "_self");
              }}
            />
          </Box>
        )}
      </Border>
    </Box>
  );
}
