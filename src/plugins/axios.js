import axios from "axios";

export default axios.create({
  baseURL: "https://reengen-final-backend-suleymanbasbug.vercel.app/",
  headers: {
    "Content-Type": "application/json",
  },
});
