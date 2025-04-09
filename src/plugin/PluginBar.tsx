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
  const { plugins } = useBroadcasterContext();
  const { isMobileDevice } = useTheme();

  const mockPlugins = {
    ...plugins,
    test1: "Test 1",
    test2: "Test 2",
    test3: "Test 3",
    test4: "Test 4",
    test5: "Test 5",
    test6: "Test 6",
    test7: "Test 7",
    test8: "Test 8",
    test9: "Test 9",
    test10: "Test 10",
    test11: "Test 11",
    test12: "Test 12",
  };

  return (
    <Box width="100%" height="100%">
      <Border>
        {userId ? (
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
          <Box>
            <Button
              label="Login to Twitch"
              onClick={() => {
                const twitchAuthURL = new URL(
                  "https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=24iyn648q3tkx09lqzyal5224qbyre&redirect_uri=http://localhost:3001&scope="
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
