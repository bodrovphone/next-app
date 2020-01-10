import axios from "axios";
import Cookie from "js-cookie";
import { getCookieFromRequest } from "../helpers/utils";

const getAuthCookie = req => {
  const token = req ? getCookieFromRequest(req, "jwt") : Cookie.getJSON("jwt");
  let header;
  if (token) {
    header = {
      headers: { authorization: `Bearer ${token}` }
    };
    return header;
  }

  return undefined;
};

export const getSecretData = async req => {
  const url = "http://localhost:3000/api/v1/secret";
  return await axios.get(url, getAuthCookie(req)).then(res => res.data);
};
