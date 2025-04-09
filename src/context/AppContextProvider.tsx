import React, { createContext, useContext, useState, ReactNode } from "react";
import AppContent from "../app/AppContent";

// Define the shape of the context
interface AppContextType {
  userId: string;
  displayName: string;
}

// Create the context
const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppContextProviderProps {
  userId: string;
  displayName: string;
  children: ReactNode;
}

// Create the provider component
export function AppContextProvider(props: AppContextProviderProps) {
  const { userId, displayName, children } = props;

  return (
    <AppContext.Provider value={{ userId, displayName }}>
      {children}
    </AppContext.Provider>
  );
}

// Custom hook to use the context
export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};
