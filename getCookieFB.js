// function printCookies(msg) {
//   return function() {
//     console.log(msg);
//     chrome.cookies.getAll({}, cookies => console.log(JSON.stringify(cookies)));
//   }
// }

// var callback = function() {
//   setTimeout(printCookies("from callback:"), 10000);  
// };

// chrome.tabs.executeScript(null, {file: 'login.js'}, callback);

// setTimeout(printCookies("not from callback:"), 10000);

chrome.runtime.sendMessage({
  action: "getCookieFB",
  source: "1234"
});