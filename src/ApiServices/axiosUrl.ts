import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import url from "./BackendUrl";

const instance = axios.create({
  baseURL: url,
});

// Add a response interceptor
instance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if (!error.response) {
      console.error("Network/Server error:", error);
      return Promise.reject(error);
    }

    // If Unauthorized (401) and it's a token request, logout the user
    if (
      error.response.status === 401 &&
      originalRequest.url === url + "auth/token"
    ) {
      localStorage.clear();
      window.location.href = "/login"; // Consider using React Router
      return Promise.reject(error);
    }

    // If Unauthorized (401) and token refresh is needed
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("ref_token");
      if (!refreshToken) {
        console.warn("No refresh token found, logging out...");
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(error);
      }

      try {
        console.log("Refreshing token...");
        const res = await axios.post(
          `${url}auth/token/`,
          { refresh_token: refreshToken },
          {
            headers: { Authorization: `Bearer ${refreshToken}` },
          }
        );

        if (res.status === 200 || res.status === 201) {
          console.log("Token refreshed successfully.");
          localStorage.setItem("ref_token", res.data.refresh_token);
          localStorage.setItem("user", res.data.access_token);

          // Update request with new token
          originalRequest.headers = {
            ...originalRequest.headers,
            Authorization: `Bearer ${res.data.access_token}`,
          };

          return axios(originalRequest); // Retry original request
        }
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
