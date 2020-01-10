export const getCookieFromRequest = (req, cookieName) => {
  let cookieValue;
  let res;
  if (req.headers && req.headers.cookie) {
    cookieValue = req.headers.cookie
      .split(";")
      .find(c => c.trim().startsWith(`${cookieName}=`));

    res = cookieValue && cookieValue.split("=")[1];
  }

  return res;
};
