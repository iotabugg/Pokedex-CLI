import axios from "axios";
import { getConfig } from "../config/runtimeConfig.js";

export function getApiClient() {
  const { apiBaseUrl } = getConfig() 

  if(!apiBaseUrl.startsWith("http")) {
    throw new Error("Invalid apiBaseUrl in config")
  }

  return axios.create({
    baseURL : apiBaseUrl
  })
}
