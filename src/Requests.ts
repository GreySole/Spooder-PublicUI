export function getPublicData() {
  return fetch("/public/data")
    .then((res) => res.json());
}

export function validateToken(token: string|null) {
  return fetch("/twitch/viewer/validate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ access_token: token }),
  })
    .then((res) => res.json())
    .then((data) => data);
}