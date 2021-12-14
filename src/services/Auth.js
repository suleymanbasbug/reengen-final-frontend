import axios from "../plugins/axios";
class AuthService {
  async login(user) {
    return await axios
      .post("/users/login", {
        email: user.email,
        password: user.password,
      })
      .then((response) => {
        if (response.data.tokens) {
          localStorage.setItem("token", JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  async checkAuth() {
    const token = localStorage.getItem("token");
    if (token) {
      let accessToken = JSON.parse(token).tokens.access_token;
      return await axios
        .get("/users/me", {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((response) => {
          return response.data;
        })
        .catch((err) => {
          localStorage.removeItem("token");
          return Promise.reject(err);
        });
    }
  }

  async register(user) {
    return await axios.post("/users", user).then((response) => {
      return response.data;
    });
  }
}

export default new AuthService();
