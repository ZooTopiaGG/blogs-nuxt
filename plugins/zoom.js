// function resetRender() {
//   var currWidth =
//     document.documentElement.clientWidth || document.body.clientWidth
//   var _body = document.querySelector('body')
//   if (currWidth < 360) {
//     _body.style.zoom = 0.25
//   } else if (currWidth >= 360 && currWidth < 500) {
//     _body.style.zoom = 0.3
//   } else if (currWidth >= 500 && currWidth < 700) {
//     _body.style.zoom = 0.4
//   } else if (currWidth >= 700 && currWidth < 1115) {
//     _body.style.zoom = 0.5
//   } else {
//     _body.style.zoom = 1
//   }
// }
// resetRender()

function browserRedirect() {
  var sUserAgent = navigator.userAgent.toLowerCase();
  var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
  var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
  var bIsMidp = sUserAgent.match(/midp/i) == "midp";
  var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
  var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
  var bIsAndroid = sUserAgent.match(/android/i) == "android";
  var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
  var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
  var bIsSS = window.innerWidth <= 750;
  if (
    bIsIpad ||
    bIsIphoneOs ||
    bIsMidp ||
    bIsUc7 ||
    bIsUc ||
    bIsAndroid ||
    bIsCE ||
    bIsWM ||
    bIsSS
  ) {
    window.location.href = "https://m.55lover.com";
  }
}
browserRedirect();
