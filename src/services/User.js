import axios from "../plugins/axios";
export const getAuthUser = async (token) => {
  if (!token) {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
  return await axios.get("users/me");
};
