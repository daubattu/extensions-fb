chrome.runtime.onMessage.addListener(function (request, sender) {
  if (request.action == "getBodyFB") {
    message.innerText = request.source;
  } else if (request.action === "getCookieFB") {
    console.log("request.source", request.source)
    message.innerText = message.innerText
  }
});

console.log(chrome.cookies)

function onWindowLoad() {

  var message = document.querySelector('#message');

  var scripts = [
    'getPagesSource.js',
    'getCookieFB.js'
  ];

  scripts.forEach(async script => {
    await chrome.tabs.executeScript(null, {
      file: script
    }, function () {
      // If you try and inject into an extensions page or the webstore/NTP you'll get an error
      if (chrome.runtime.lastError) {
        message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
      }
    });
  })
}

window.onload = onWindowLoad;