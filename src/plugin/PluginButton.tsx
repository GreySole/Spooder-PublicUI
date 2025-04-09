import React from "react";
import { Box, Button } from "@greysole/spooder-component-library";
import { faPlug } from "@fortawesome/free-solid-svg-icons";

interface PluginButtonProps {
  pluginName: string;
  displayName: string;
}

export default function PluginButton(props: PluginButtonProps) {
  const { pluginName, displayName } = props;
  const handleButtonClick = () => {
    const url = `/plugin/${pluginName}`;
    window.open(url, "_blank"); // Opens the URL in a new tab
  };
  return (
    <Box margin="small">
      <Button
        width="large"
        height="large"
        icon={`/icons/${pluginName}`}
        iconSize="large"
        fallbackIcon={faPlug}
        iconPosition="top"
        label={displayName}
        onClick={() => handleButtonClick()}
      />
    </Box>
  );
}
