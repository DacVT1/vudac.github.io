export function setCookie(cookieName, cookieValue) {
  if(typeof(cookieValue)==="string"){
    localStorage.setItem(cookieName, cookieValue);
  }else{
    localStorage.setItem(cookieName, JSON.stringify(cookieValue));
  }
}
export function getCookie(cookieName) {
  const result = localStorage.getItem(cookieName);
  return JSON.parse(result);
}
export function deleteCookie(cookieName) {
  localStorage.removeItem(cookieName);
  return true;
}
