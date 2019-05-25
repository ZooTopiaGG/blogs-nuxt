import Vue from 'vue'
// import 'element-ui/lib/theme-default/base.css'
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
import {
  Button,
  Select,
  Form,
  FormItem,
  Input,
  Upload,
  Radio,
  RadioGroup,
  Col,
  Pagination,
  DatePicker,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Submenu,
  Menu,
  MenuItem,
  MenuItemGroup,
  RadioButton,
  Loading,
  Message,
  Carousel,
  CarouselItem,
  Badge
} from 'element-ui'
import lazyload from 'vue-lazyload'
Vue.use(Badge)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)
Vue.use(Select)
Vue.use(Upload)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Col)
Vue.use(Pagination)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Menu)
Vue.use(MenuItemGroup)
Vue.use(RadioButton)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.component(CollapseTransition.name, CollapseTransition)
Vue.use(DatePicker)
Vue.use(Loading.directive)
Vue.use(lazyload, {
  lazyComponent: true,
  preLoad: 1.3,
  error: require('~/assets/images/404.png'),
  loading: require('~/assets/images/download.gif'),
  attempt: 3
  // listenEvents: ['scroll']
})

Vue.prototype.$message = Message
Vue.prototype.$loading = Loading.service
if (typeof window !== 'undefined') {
  window.$message = Message
}
