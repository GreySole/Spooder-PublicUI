import React from "react";
import { TwitchChat } from "react-twitch-embed";
import { useBroadcasterContext } from "../context/BroadcasterContextProvider";

interface StreamChatProps {
  width?: string;
  height?: string;
}

export default function StreamChat(props: StreamChatProps) {
  const { width, height } = props;
  const { homeChannel } = useBroadcasterContext();
  return <TwitchChat channel={homeChannel} width={width} height={height} />;
}
