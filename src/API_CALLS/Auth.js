import API from "./client";

export const login = async (credentials) => {
  try {
    const response = await API.post("auth/login", credentials);
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};

export const register = async (credentials) => {
  try {
    const response = await API.post("auth/register", credentials);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const isLoggedIn = async () => {
  try {
    const response = await API.get("auth/isloggedin", {
      credentials: "include",
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const logoutUser = async () => {
  try {
    const response = await API.delete("auth/logout");
    console.log(response)
    return response.data;
  } catch (err) {
    throw err;
  }
};
