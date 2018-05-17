async function getCookies() {
  let listCookies = await chrome.cookies.getAll({}, function (cookies) {
    let allCookieInfo = "";
    for (i = 0; i < cookie.length; i++) {
      allCookieInfo = allCookieInfo + JSON.stringify(cookie[i]);
    }
    return allCookieInfo
  })
}

console.log(chrome.cookies)

chrome.runtime.sendMessage({
  action: "getCookieFB",
  source: "getCookies()"
});