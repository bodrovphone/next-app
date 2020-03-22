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

export const getPortfolios = async () => {
  return await axiosInstance.get("/portfolios").then(res => res.data);
};

export const getPorfolioById = async id => {
  return axiosInstance.get(`/portfolios/portfolio/${id}`).then(res => res.data);
};

export const createPortfolio = async data => {
  return await axiosInstance
    .post("/portfolios/portfolio", data, getAuthCookie())
    .then(res => res.data)
    .catch(error => handleErrorPromise(error));
};

export const updatePortfolio = async data => {
  return await axiosInstance
    .patch(`/portfolios/portfolio/${data._id}`, data, getAuthCookie())
    .then(res => res.data)
    .catch(error => handleErrorPromise(error));
};

export const deletePortfolio = portfolioId => {
  return axiosInstance
    .delete(`/portfolios/portfolio/${portfolioId}`, getAuthCookie())
    .then(response => response.data);
};

// ------------ BLOG ACTIONS ---------------

export const createBlog = data => {
  return axiosInstance
    .post(`/blogs`, data, getAuthCookie())
    .then(res => res.data)
    .catch(err => handleErrorPromise(err));
};
