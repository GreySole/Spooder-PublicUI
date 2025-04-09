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
    function clearCookies() {
      const cookies = document.cookie.split(";");

      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;
      }
    }
    clearCookies();
    validateToken(accessToken).then((data) => {
      if (data.status === "ok") {
        window.history.replaceState(
          null,
          "",
          window.location.pathname + window.location.search
        );
        setViewerId(data.data.data[0]?.id);
        setDisplayName(data.data.data[0]?.display_name);
      } else {
        setViewerId("-1");
        setDisplayName("Anonymous");
      }
    });
  }, [accessToken]);

  if (!viewerId || !displayName) {
    return null;
  }

  return (
    <AppContextProvider userId={viewerId} displayName={displayName}>
      <AppContent />
    </AppContextProvider>
  );
}
