import Vue from 'vue'
import vuescroll from 'vue-scroll'
Vue.use(vuescroll)
if (typeof window !== 'undefined') {
    window.sr = ScrollReveal()
} else {
    global.sr = ScrollReveal()
}
