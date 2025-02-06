import axios from "axios";
import Spotify from "../api/spotify";

export const makeRequest = async (method, url, data = null) => {
  const token = Spotify.getAccessToken();
  if (!token) {
    console.error("No access token found! User may need to log in.");
    return null;
  }

  try {
    const response = await axios({
      method,
      url,
      data,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (e) {
    console.error(
      `Error with ${method.toUpperCase()} request to ${url}:`,
      e.response?.data?.error?.message || e.message
    );
    return null;
  }
};
