export default function ({
  $axios,
  store,
}) {
  $axios.onRequest(config => {
    // 全局设置 启用跨域传cookies
    console.log('process===NODE_ENV=====', process.env.NODE_ENV)
    store.commit('NODE_ENV', process.env.NODE_ENV)
    // config.withCredentials = true
    config.baseURL = process.env.NODE_ENV === 'production' ? 'http://api.55lover.com/api/' : 'http://localhost:8088/api/';
  })

}
