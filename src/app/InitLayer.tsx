import {
  KeyedObject,
  SpooderPet,
  ThemeProvider,
  ThemeVariables,
} from "@greysole/spooder-component-library";
import React from "react";
import { useEffect, useState } from "react";
import { getPublicData } from "../Requests";
import App from "./App";
import { BroadcasterContextProvider } from "../context/BroadcasterContextProvider";

export default function InitLayer() {
  const [theme, setTheme] = useState<ThemeVariables | undefined>();
  const [spooder, setSpooder] = useState<SpooderPet | undefined>();
  const [botName, setBotName] = useState<string | undefined>();
  const [homeChannel, setHomeChannel] = useState<string | undefined>();
  const [homePlatform, setHomePlatform] = useState<string | undefined>();
  const [plugins, setPlugins] = useState<KeyedObject | undefined>();

  console.log(theme, spooder);

  useEffect(() => {
    console.log("Fetching public data...");
    getPublicData().then((response) => {
      const themeData = response.theme
        ? (response.theme as ThemeVariables)
        : ({ hue: 0.5, saturation: 1.0, isDarkTheme: true } as ThemeVariables);
      console.log("Theme data:", themeData);
      const spooderData = response.spooderpet as SpooderPet;
      console.log("Spooder data:", spooderData);
      setTheme(themeData);
      setSpooder(spooderData);
      setBotName(response.botName);
      setHomeChannel(response.homeChannel);
      setHomePlatform("twitch");
      setPlugins(response.plugins);
      document.title = `${response.botName}@${response.homeChannel}`;
    });
  }, []);

  if (!theme || !spooder || !botName || !homeChannel || !homePlatform) {
    return null;
  }

  console.log("Theme data:", theme);

  return (
    <ThemeProvider theme={theme} spooder={spooder}>
      <BroadcasterContextProvider
        botName={botName}
        homeChannel={homeChannel}
        homePlatform={homePlatform}
        plugins={plugins ?? {}}
      >
        <App />
      </BroadcasterContextProvider>
    </ThemeProvider>
  );
}
