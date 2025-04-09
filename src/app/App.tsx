import React, { useEffect, useState } from "react";
import { validateToken } from "../Requests";
import { AppContextProvider } from "../context/AppContextProvider";
import AppContent from "./AppContent";

export default function App() {
  const params = new URLSearchParams(window.location.hash.substring(1));
  const accessToken = params.get("access_token");
  const [viewerId, setViewerId] = useState<string>();
  const [displayName, setDisplayName] = useState<string>();

  useEffect(() => {
    validateToken(accessToken).then((data) => {
      if (data.status === "ok") {
        window.history.replaceState(
          null,
          "",
          window.location.pathname + window.location.search
        );
        console.log(data.data.data);
        setViewerId(data.data.data[0]?.id);
        setDisplayName(data.data.data[0]?.display_name);
      } else {
        setViewerId("");
        setDisplayName("");
      }
    });
  }, []);

  if (!viewerId || !displayName) {
    return null;
  }

  console.log("Access Token:", accessToken);

  return (
    <AppContextProvider userId={viewerId} displayName={displayName}>
      <AppContent />
    </AppContextProvider>
  );
}
