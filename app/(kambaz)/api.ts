import axios from "axios";

export const HTTP_SERVER =
  process.env.NODE_ENV === "production"
    ? ""
    : process.env.NEXT_PUBLIC_HTTP_SERVER || "";
export const axiosWithCredentials = axios.create({ withCredentials: true });
