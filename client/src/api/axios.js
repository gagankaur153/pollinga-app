import axios from "axios";
const url = window.location.origin.includes("localhost")
    ? "http://localhost:5000/api"
    : "https://polling-system-det7.vercel.app/api"


const instance = axios.create({
  baseURL:url,
  withCredentials: true
});

export default instance;