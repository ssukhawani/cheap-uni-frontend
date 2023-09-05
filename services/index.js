import { apiEndpoints } from "../constants/api-endpoints";
import { mainAxios } from "../interceptor/instance";
import { getStoredUser } from "../utility/localStorage";

export const getBlogListForSitemap = (from, to) =>
  mainAxios
    .get(
      `${apiEndpoints.BLOG_LIST_SITEMAP.replace("${FROM}", from).replace(
        "${TO}",
        to
      )}`
    )
    .then(({ data }) => data);

export const getBlogList = (searchValue, pageNumber = 1) =>
  mainAxios
    .get(
      `${apiEndpoints.BLOG_LIST.replace("${SEARCH_VALUE}", searchValue).replace(
        "${PAGE_NUMBER}",
        pageNumber
      )}`
    )
    .then(({ data }) => data);

export const fetchBlogDetails = (slug) =>
  mainAxios
    .get(`${apiEndpoints.BLOG_BY_SLUG.replace("${SLUG}", slug)}`)
    .then(({ data }) => data);

export const fetchBlogCommentsBySlug = (slug) =>
  mainAxios
    .get(`${apiEndpoints.BLOG_COMMENTS.replace("${SLUG}", slug)}`)
    .then(({ data }) => data);

export const postBlogCommentsBySlug = async (slug, commentData) => {
  const user = getStoredUser();
  if (!!user.access) {
    return await mainAxios({
      method: "post",
      url: apiEndpoints.BLOG_COMMENTS.replace("${SLUG}", slug),
      data: commentData,
    });
  }
};

export const getPopularBlogs = () =>
  mainAxios.get(`${apiEndpoints.POPULAR_BLOGS}`).then(({ data }) => data);

export const getTagsList = async () => {
  return await mainAxios({
    method: "get",
    url: apiEndpoints.TAGS_LIST,
  });
};

export const getBlogsByTagSlug = (slug, pageNumber = "1") =>
  mainAxios
    .get(
      `${apiEndpoints.BLOGS_BY_TAG_SLUG.replace("${SLUG}", slug).replace(
        "${PAGE_NUMBER}",
        pageNumber
      )}`
    )
    .then(({ data }) => data);

export const getFeaturedBlogList = () =>
  mainAxios.get(`${apiEndpoints.FEATURED_BLOGS}`).then(({ data }) => data);

export const getPageList = () =>
  mainAxios.get(`${apiEndpoints.PAGE_LIST}`).then(({ data }) => data);

export const getDecisionList = () =>
  mainAxios.get(`${apiEndpoints.DECISION}`).then(({ data }) => data);

export const getPageDetail = (slug) =>
  mainAxios
    .get(`${apiEndpoints.PAGE_BY_SLUG.replace("${SLUG}", slug)}`)
    .then(({ data }) => data);

export const getDownloadsById = async (id) => {
  return await mainAxios({
    method: "get",
    url: apiEndpoints.DOWNLOADS_BY_ID.replace("${ID}", id),
  });
};

export const signUp = async (userData) => {
  return await mainAxios({
    method: "post",
    url: apiEndpoints.SIGN_UP,
    data: userData,
  });
};

export const login = async (userData) => {
  return await mainAxios({
    method: "post",
    url: apiEndpoints.LOGIN,
    data: userData,
  });
};

export const loggedInUserDetails = async () => {
  return await mainAxios({
    method: "get",
    url: apiEndpoints.LOGGED_IN_USER_DETAILS,
  });
};

export const membershipDetails = async () => {
  return await mainAxios({
    method: "get",
    url: apiEndpoints.MEMBERSHIP_DETAILS,
  });
};

export const submitContactUsForm = async (formData) => {
  return await mainAxios({
    method: "post",
    url: `${apiEndpoints.PROMOTE_CONTACT}`,
    data: formData,
  });
};

export const handleCheckoutRedirect = async (courseIds) => {
  return await mainAxios({
    method: "post",
    url: `${apiEndpoints.CHECKOUT}`,
    data: courseIds,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getMyPurchasedCourse = async () => {
  return await mainAxios({
    method: "get",
    url: `${apiEndpoints.PURCHASED_COURSES}`,
  });
};

export const tellDownloadNotWorking = async (blogId) => {
  return await mainAxios({
    method: "post",
    url: `${apiEndpoints.DOWNLOAD_NOT_WORKING}`,
    data: {
      blog_id: blogId,
    },
  });
};

export const getTDBlogList = () =>
  mainAxios.get(`${apiEndpoints.BLOG_LIST_TD}`).then(({ data }) => data);

export const getDownloadsBySlug = async (slug) => {
  return await mainAxios({
    method: "get",
    url: apiEndpoints.DOWNLOADS_BY_SLUG.replace("${SLUG}", slug),
  });
};

export const getAllBlogRequest = (pageNumber = 1) =>
  mainAxios
    .get(
      `${apiEndpoints.ALL_BLOG_REQUEST.replace("${PAGE_NUMBER}", pageNumber)}`
    )
    .then(({ data }) => data);

export const upvote = (Id) =>
  mainAxios({
    method: "post",
    url: `${apiEndpoints.UPVOTE_BLOG_REQUEST.replace("${ID}", Id)}`,
  });

export const getAllFulfilledRequest = (pageNumber = 1) =>
  mainAxios
    .get(
      `${apiEndpoints.ALL_FULFILLED_REQUEST.replace(
        "${PAGE_NUMBER}",
        pageNumber
      )}`
    )
    .then(({ data }) => data);

export const submitCourseRequest = async (courseData) => {
  return await mainAxios({
    method: "post",
    url: apiEndpoints.SUBMIT_BLOG_REQUEST,
    data: courseData,
  });
};


// user activation
export const activateUser = async (activateObj) => {
  return await mainAxios({
    method: "post",
    url: apiEndpoints.ACTIVATE,
    data: activateObj,
  });
};


// user reset pass
export const resetPassword = async (resetObj) => {
  return await mainAxios({
    method: "post",
    url: apiEndpoints.RESET_PASS,
    data: resetObj,
  });
};


// user reset pass
export const resetPasswordConfirm = async (resetPassObj) => {
  return await mainAxios({
    method: "post",
    url: apiEndpoints.RESET_PASS_CONFIRMATION,
    data: resetPassObj,
  });
};

export const getAllPlans = async () => {
  return await mainAxios({
    method: "get",
    url: apiEndpoints.GET_ALL_PLANS
  });
};


// create new order request
export const createMOrderRequest = async (membershipObj) => {
  return await mainAxios({
    method: "post",
    url: apiEndpoints.CREATE_M_ORDER_REQUEST,
    data: membershipObj,
  });
};