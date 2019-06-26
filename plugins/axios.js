export default function({ $axios, store }) {
  $axios.onRequest(config => {
    // 全局设置 启用跨域传cookies
    store.commit('NODE_ENV', process.env.NODE_ENV)
    // config.withCredentials = true
    config.baseURL = process.env.baseUrl
  })
}
