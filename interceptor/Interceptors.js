import { toast } from "react-toastify";
import { getStoredUser } from "../utility/localStorage";

const onRequest = (config) => {
  const user = getStoredUser();
  if (user) {
    return {
      ...config,
      headers: {
        Authorization: user.jwt_access,
      },
    };
  }
  return config;
};

const onRequestError = (error) => {
  return Promise.reject(error);
};

const onResponse = (response) => {
  return response;
};

const onResponseError = (error, router) => {
  if (error?.response?.status === 401) {
    toast.error("Unauthorized", {
      toastId: "unauthorized",
    });
    router.push("/login");
  }
  if (error?.response?.status === 404) {
    toast.error("Sorry dude, Content Not Found", {
      toastId: "notFound",
    });
    // router.push("/404");
  }
  return Promise.reject(error);
};

export function setupInterceptorsTo(axiosInstance, router) {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, (e) =>
    onResponseError(e, router)
  );
  return axiosInstance;
}
