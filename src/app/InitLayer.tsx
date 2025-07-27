import {
  KeyedObject,
  SpooderPet,
  SpooderPetPair,
  ThemeProvider,
  ThemeVariables,
  TooltipProvider,
} from "@greysole/spooder-component-library";
import React from "react";
import { useEffect, useState } from "react";
import { getPublicData } from "../Requests";
import App from "./App";
import { BroadcasterContextProvider } from "../context/BroadcasterContextProvider";

export default function InitLayer() {
  const [theme, setTheme] = useState<ThemeVariables | undefined>();
  const [spooder, setSpooder] = useState<SpooderPetPair[] | undefined>();
  const [botName, setBotName] = useState<string | undefined>();
  const [homeChannel, setHomeChannel] = useState<string | undefined>();
  const [clientId, setClientId] = useState<string | undefined>();
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
      const spooderData = response.spooderpet as SpooderPetPair[];
      console.log("Spooder data:", spooderData);
      setTheme(themeData);
      setSpooder(spooderData);
      setBotName(response.botName);
      setHomeChannel(response.homeChannel);
      setHomePlatform("twitch");
      setClientId(response.clientId);
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
      <TooltipProvider>
        <BroadcasterContextProvider
          botName={botName}
          homeChannel={homeChannel}
          homePlatform={homePlatform}
          clientId={clientId ?? ""}
          plugins={plugins ?? {}}
        >
          <App />
        </BroadcasterContextProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}
