import _api from '~/assets/js/api.js'

if (typeof window !== 'undefined') {
    window.api = _api
} else {
    global.api = _api
}