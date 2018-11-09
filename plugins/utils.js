import Coms from '~/assets/js/fn.js'

if (typeof window !== 'undefined') {
    window.Coms = Coms
} else {
    global.Coms = Coms
}