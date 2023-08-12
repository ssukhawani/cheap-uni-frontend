export const apiEndpoints = {
  BLOG_LIST: "api/blogs/?page=${PAGE_NUMBER}&search=${SEARCH_VALUE}",
  BLOG_LIST_SITEMAP: "api/blogs/all/list?from=${FROM}&to=${TO}",
  BLOG_BY_SLUG: "api/blogs/${SLUG}",
  TAGS_LIST: "api/tags",
  BLOGS_BY_TAG_SLUG: "api/blogs/?page=${PAGE_NUMBER}&tags__slug=${SLUG}",
  BLOG_COMMENTS: "api/blogs/${SLUG}/comments",
  FEATURED_BLOGS: "api/blogs/?isFeaturedPost=1",
  PAGE_LIST: "api/pages/",
  PAGE_BY_SLUG: "api/pages/${SLUG}",
  POPULAR_BLOGS: "api/blogs/?visitCount__gt=100",
  DOWNLOADS_BY_ID: "api/downloads/${ID}",
  SIGN_UP: "auth/users/", // This is sign up and update user data ( for update need auth token)
  LOGIN: "auth/jwt/create", // Login api ( username and password -->> access token & refresh token)
  DECISION: "api/pages/final/decision",
  LOGGED_IN_USER_DETAILS: "auth/users/me/", // Get Logged In User Details
  MEMBERSHIP_DETAILS: "api/members/me/", // Get Logged In User Membership Details
  PROMOTE_CONTACT: "api/pages/promote/contact/",
  CHECKOUT: "api/checkout/",
  PURCHASED_COURSES:"api/purchase_history/",
  DOWNLOAD_NOT_WORKING:"api/download-not-working/",
  BLOG_LIST_TD:"api/blogs/all/td",
  DOWNLOADS_BY_SLUG:"api/blogs/${SLUG}/downloads/",
  ALL_BLOG_REQUEST:"api/blog-requests/?page=${PAGE_NUMBER}",
  UPVOTE_BLOG_REQUEST:"api/blog-requests/${ID}/upvote/",
  ALL_FULFILLED_REQUEST:"api/blog-requests/fullfilled/?page=${PAGE_NUMBER}",
  SUBMIT_BLOG_REQUEST:"api/blog-requests/",
  ACTIVATE: "auth/users/activation/",
  RESET_PASS: "auth/users/reset_password/",
  RESET_PASS_CONFIRMATION: "auth/users/reset_password_confirm/",
  GET_ALL_PLANS: "api/plans/",
  CREATE_MEMBERSHIP_REQUEST:"api/create-membership-request/"
};
