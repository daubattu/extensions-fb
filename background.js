function printCookies(msg) {
  return function () {
    console.log(msg);
    chrome.cookies.getAll({}, function (cookie) {
      console.log(cookie.length);
      let allCookieInfo = "";
      for (i = 0; i < cookie.length; i++) {
        console.log(JSON.stringify(cookie[i]));

        allCookieInfo = allCookieInfo + JSON.stringify(cookie[i]);
      }
    })
      // chrome.cookies.getAll({ "url": "https://www.facebook.com/" }), cookies => console.log(JSON.stringify(cookies));
    }
}

var callback = function (cookies) {
  // setTimeout(printCookies("from callback:"), 10000);
};

chrome.tabs.executeScript(null, { file: 'getCookieFB.js' }, callback);

setTimeout(printCookies("not from callback:"), 10000);

// // console.log("chrome.cookie", chrome.cookies)

// // chrome.cookies.getAllCookieStores(callback)

// chrome.cookies.getAll({ "url": "https://*.facebook.com/" }), cookies => console.log(JSON.stringify(cookies));