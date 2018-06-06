chrome.runtime.onMessage.addListener(function (request, sender) {
  if (request.action == "getBodyFB") {
    message.innerText = request.source.bodyData;
    access_token.innerText = request.source.access_token
  }
});

function onWindowLoad() {

  var message = document.querySelector('#message'),
    cookieDiv = document.querySelector("#cookie"),
    access_token = document.querySelector("#access_token")

  chrome.tabs.executeScript(null, {
    file: "getPagesSource.js"
  }, function () {
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
    if (chrome.runtime.lastError) {
      message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
    }
  });

  chrome.tabs.executeScript(null, { code: `` }, function () {
    chrome.cookies.getAll({ url: "https://business.facebook.com" }, cookies => {
      let cookieValue = ""
      // arrayCookieName = ["sb", "datr", "c_user", "xs", "pl", "fr", "wd", "presence"]

      for(let cookie of cookies) {
        // console.log(cookie)
        // cookie = JSON.stringify(cookie)
        // if(arrayCookieName.includes(cookie.name))
        cookieValue = cookieValue + `${cookie.name}=${cookie.value}; `
      }
      
      cookieDiv.innerHTML = cookieValue
    });
  });
}

window.onload = onWindowLoad;