function resetRender() {
  var currWidth =
    document.documentElement.clientWidth || document.body.clientWidth
  var _body = document.querySelector('body')
  if (currWidth < 360) {
    _body.style.zoom = 0.25
  } else if (currWidth >= 360 && currWidth < 500) {
    _body.style.zoom = 0.3
  } else if (currWidth >= 500 && currWidth < 700) {
    _body.style.zoom = 0.4
  } else if (currWidth >= 700 && currWidth < 1115) {
    _body.style.zoom = 0.5
  } else {
    _body.style.zoom = 1
  }
}
resetRender()