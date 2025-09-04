export function saveUrls(urls) {
  localStorage.setItem("shortUrls", JSON.stringify(urls));
}

export function loadUrls() {
  return JSON.parse(localStorage.getItem("shortUrls")) || {};
}