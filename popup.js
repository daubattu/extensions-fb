chrome.runtime.onMessage.addListener(function (request, sender) {
  if (request.action == "getBodyFB") {
    message.innerText = request.source;
  } else if (request.action === "getCookieFB") {
    console.log("getCookieFB")
    message.innerText = message.innerText + "message.innerText"
  }
});

function onWindowLoad() {

  var message = document.querySelector('#message');

  chrome.tabs.executeScript(null, {
    file: "getPagesSource.js"
  }, function () {
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
    if (chrome.runtime.lastError) {
      message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
    }
  });

  chrome.tabs.executeScript(null, { code: `` }, function () {
    chrome.cookies.getAll({ url: "https://business.facebook.com" }, cookies => console.log(JSON.stringify(cookies)));
    chrome.runtime.sendMessage({
      action: "getCookieFB",
      source: "NHK"
    })
  });
}

window.onload = onWindowLoad;