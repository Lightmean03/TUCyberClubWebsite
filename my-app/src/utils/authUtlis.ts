const isValidToken = (token: string | undefined) => {
  if (!token) {
    return false;
  }

  const payload = JSON.parse(atob(token.split(".")[1]));
  if (!payload) {
    return false;
  }

  const decodePayload = JSON.parse(window.atob(payload));

  const expires = decodePayload.exp * 1000;
  const time = Date.now();
  return expires > time;
};

export default isValidToken;
