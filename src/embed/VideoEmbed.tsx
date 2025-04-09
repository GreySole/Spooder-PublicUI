import React from "react";
import { TwitchPlayer } from "react-twitch-embed";
import { useBroadcasterContext } from "../context/BroadcasterContextProvider";

export default function VideoEmbed() {
  const { homeChannel } = useBroadcasterContext();
  return (
    <TwitchPlayer
      channel={homeChannel}
      width="100%"
      height="100%"
      autoplay
      muted
      allowFullscreen={true}
    />
  );
}
