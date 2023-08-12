import axios from "axios";
import { toastMsg } from "../constants/toast-messages";

export const mainAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
  timeout: 20000,
  timeoutErrorMessage:toastMsg.SERVER_NOT_RESPONDING,
});
