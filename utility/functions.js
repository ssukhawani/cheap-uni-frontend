import { getDownloadsById } from "../services";

export const getMeDownloadLinkAndRedirect = (id) => {
  getDownloadsById(id).then((res) => window.open(atob(res?.data.url)));
  // getDownloadsById(id).then((res) => {});
};

export const handelPagination = (url, setPageNumber, scrollTo=true) => {
  var urlParams = new URL(url);
  var pageNumber = urlParams.searchParams.get("page");
  if (pageNumber) {
    setPageNumber(pageNumber);
  } else {
    setPageNumber("1");
  }
  if (scrollTo){
    window.scrollTo(0, 0);
  }
};

export const encode = (slug, id) => {
  const key = "IAmQuickGnMrugan";

  let encodedStr = "";
  let str = `${slug + "," + id}`;

  for (let i = 0; i < str.length; i++) {
    let keyIndex = i % key.length;
    let charCode = str.charCodeAt(i) ^ key.charCodeAt(keyIndex);
    encodedStr += String.fromCharCode(charCode);
  }

  return btoa(encodedStr);
};

export const decode = (encoded_str) => {
  const key = "IAmQuickGnMrugan";
  let decodedStr = "";

  // Decode the input string from base64 encoding
  const inputStr = atob(encoded_str);

  // Iterate through each character of the input string and perform XOR operation
  for (let i = 0; i < inputStr.length; i++) {
    let keyIndex = i % key.length;
    let charCode = inputStr.charCodeAt(i) ^ key.charCodeAt(keyIndex);
    decodedStr += String.fromCharCode(charCode);
  }

  return decodedStr;
};

export function uuid() {
  let dt = new Date().getTime();
  const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      const r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    }
  );
  return uuid;
}


export const checkIsNoob=()=>{
  if (typeof window !== "undefined") {
    const userAgent = navigator.userAgent;
    const isNoob = /bot|googlebot|crawler|spider|robot|crawling/i.test(
      userAgent
    );
    return isNoob
  }
}