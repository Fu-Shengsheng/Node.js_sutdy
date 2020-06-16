import axios from "axios"

const fetch = axios.create({
  baseURL: "//192.168.31.105:8765",
  timeout: 10000,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
})
export default fetch
