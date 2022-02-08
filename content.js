
chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponse) {
  console.log(JSON.parse(message));
  const blacklist = JSON.parse(message);
  const currUrl = window.location.href;
  for (let i = 0; i < blacklist.length; i++) {
    if (currUrl.includes(blacklist[i])) {
      blockSite()
    }
  }

  function blockSite() {
    if (document.title != 'Site blocked!') {
      var blockedSiteHTML =
        '<!DOCTYPE HTML><html>' +
        '<head><title>Site blocked!</title></head>' +
        '<body style = "text-align:center; background-color: orangered">' +
        '<h1 style = "color:white; font-family:verdana; margin-top: 100px">Site is Blocked !</h1>' +
        '</body></html>';
      let newHTML = document.open("text/html", "replace");
      newHTML.write(blockedSiteHTML);
    }
  }
}