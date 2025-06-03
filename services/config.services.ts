import axios from "axios";

const BASE_URL = "https://api.github.com";

const restClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_PERSONAL_ACCESS_TOKEN}`,
  },
});

export default restClient;