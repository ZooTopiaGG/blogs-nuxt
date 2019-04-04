// 路由中间件
export default async function ({
  store,
  app,
  route,
  req
}) {
  if (route.path != '/home' && route.path != '/') {
    store.commit("IS_HOME", true);
  } else {
    store.commit("IS_HOME", false);
  }
  if (route.path == '/signin' || route.path == '/signup') {
    store.commit('SHOW_NAV', false)
    store.commit('SHOW_FOOTER', false)
  } else {
    store.commit('SHOW_NAV', true)
    store.commit('SHOW_FOOTER', true)
  }
  if (route.path == '/signin' || route.path == '/signup' || route.path == '/study') {
    store.commit('SHOW_ASIDE', false)
  } else {
    store.commit('SHOW_ASIDE', true)
  }
}
