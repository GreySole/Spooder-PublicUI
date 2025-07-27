import { KeyedObject } from "@greysole/spooder-component-library";
import React, { createContext, ReactNode, useContext } from "react";

// Define the shape of the context
interface BroadcasterContextType {
  botName: string;
  homeChannel: string;
  homePlatform: string;
  clientId: string;
  plugins: KeyedObject;
}

// Create the context
const BroadcasterContext = createContext<BroadcasterContextType | undefined>(
  undefined
);

interface BroadcasterContextProviderProps {
  botName: string;
  homeChannel: string;
  homePlatform: string;
  clientId: string;
  plugins: KeyedObject;
  children: ReactNode;
}

// Create the provider component
export function BroadcasterContextProvider(
  props: BroadcasterContextProviderProps
) {
  const { botName, homeChannel, homePlatform, clientId, plugins, children } =
    props;

  return (
    <BroadcasterContext.Provider
      value={{ botName, homeChannel, homePlatform, clientId, plugins }}
    >
      {children}
    </BroadcasterContext.Provider>
  );
}

// Custom hook to use the context
export const useBroadcasterContext = (): BroadcasterContextType => {
  const context = useContext(BroadcasterContext);
  if (!context) {
    throw new Error(
      "useBroadcasterContext must be used within an BroadcasterContextProvider"
    );
  }
  return context;
};
