import axios from "axios";
import Cookie from "js-cookie";
import { getCookieFromRequest } from "../helpers/utils";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  timeout: 2000
});

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
  return await axiosInstance
    .get("/secret", getAuthCookie(req))
    .then(res => res.data);
};

const handleErrorPromise = resError => {
  let error = {};
  if (resError && resError.response && resError.response.data) {
    error = resError.response.data;
  } else {
    error = resError;
  }
  return Promise.reject(error);
};

export const getPorfolios = async () => {
  return await axiosInstance.get("/portfolio").then(res => res.data);
};

export const getPorfolioById = async id => {
  return axiosInstance.get(`/portfolios/portfolio/${id}`).then(res => res.data);
};

export const createPortfolio = async data => {
  return await axiosInstance
    .post("/portfolio", data, getAuthCookie())
    .then(res => res.data)
    .catch(error => handleErrorPromise(error));
};
