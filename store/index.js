export const state = () => ({
  counter: 0,
  locales: ['en', 'cn'],
  locale: 'cn',
  GET_NAV_SHOW: true,
  GET_FOOTER_SHOW: true,
  GET_IS_HOME: false,
  GET_FOOTER_SHOW: true,
  GET_LOGIN_STATUS: '',
  GET_PLAY_STATUS: false,
  GET_STAT: {},
  GET_TO_ALBUM: false,
  getLatestArticles: {},
  totalCount: 0,
  statistics: {},
  latestNews: {},
  articleDetail: {},
  dynamicList: {},
  articleList: {},
  articleListCount: 0,
  SHOW_FOOTER: false,
  SHOW_NAV: false,
  node_env: 'production'
})

export const mutations = {
  increment(state) {
    state.counter++
  },
  // shezhi语言
  SET_LANG(state, locale) {
    if (state.locales.indexOf(locale) !== -1) {
      state.locale = locale
    }
  },
  IS_HOME(state, para) {
    state.GET_IS_HOME = para
  },
  SHOW_NAV(state, para) {
    state.SHOW_NAV = para
  },
  SHOW_FOOTER(state, para) {
    state.SHOW_FOOTER = para
  },
  MUISC_PLAYED(state, para) {
    state.GET_PLAY_STATUS = para
  },
  NO_LOGIN(state, para) {
    state.GET_LOGIN_STATUS = para
  },
  LatestArticles(state, para) {
    state.getLatestArticles = para
  },
  TotalCount(state, para) {
    state.totalCount = para
  },
  Statistics(state, para) {
    state.statistics = para
  },
  LatestNews(state, para) {
    state.latestNews = para
  },
  ArticleDetail(state, para) {
    state.articleDetail = para
  },
  ArticleList(state, para) {
    state.articleList = para
  },
  ArticleListCount(state, para) {
    state.articleListCount = para
  },
  DynamicList(state, para) {
    state.dynamicList = para
  },
  NODE_ENV(state, para) {
    state.node_env = para
  }
}

export const actions = {
  nuxtServerInit({
    commit
  }, {
    req
  }) {
    if (req && req.headers.cookie) {
      // 进入页面之前请求服务 获取cookies
      let duc = decodeURIComponent;
      let avatar = duc(Coms.getCookiebyName(req.headers.cookie, '_55lover_avatar')),
        email = duc(Coms.getCookiebyName(req.headers.cookie, '_55lover_email')),
        id = duc(Coms.getCookiebyName(req.headers.cookie, '_55lover_id')),
        name = duc(Coms.getCookiebyName(req.headers.cookie, '_55lover_name'));
      commit('NO_LOGIN', {
        avatar,
        email,
        id,
        name
      })
      // commit('SET_TOKEN', token)
      // commit('SET_H5COOKIES', h5Cookies)
      // commit('SET_ADID', h5Adid)
    }
  },
  // 获取最新文章
  async getLatestArticles({
    commit,
    state
  }, para) {
    let res = await this.$axios.$post(
      `${api.article.getLatestArticles}`,
      para
    );
    if (res.result && res.result.length > 0) {
      let arr = await res.result.map(x => {
        x.createAt = Coms.getCommonTime(x.createAt);
        return x;
      });
      commit("LatestArticles", arr);
      commit("TotalCount", res.totalcount);
    }
  },
  // 获取文章详情
  async getArticle({
    commit,
    state
  }, para) {
    let res = await this.$axios.$get(`${api.article.getArticle}/${para.id}`);
    if (res.isSuc) {
      res.result.createAt = Coms.getCommonTime(res.result.createAt)
      commit('ArticleDetail', res.result)
    } else {
      $message.error(res.message)
    }
  },
  async postArticle({
    commit,
    state
  }, para) {
    let res = await this.$axios.$post(`${api.article.getArticle}`, para);
    if (res.isSuc) {
      let arr = await res.result.map(x => {
        x.type = x.type == 0 ? '原创' : '转载'
        x.createAt = Coms.getCommonTime(x.createAt);
      })
      commit('ArticleList', res.result);
      commit('ArticleListCount', res.total)
    } else {
      $message.error(res.message)
    }
  },
  // 获取最新统计
  async getStatistics({
    commit,
    state
  }) {
    let res = await this.$axios.$get(`${api.stat.getStatistics}`);
    if (res.isSuc) {
      commit('Statistics', res.result)
    }
  },
  // 最新动态
  async getLatestNews({
    commit,
    state
  }) {
    let res = await this.$axios.$get(`${api.article.getLatestNews}`);
    if (res.isSuc) {
      let arr = await res.result.map(x => {
        x.time = Coms.getCommonTime1(x.time);
        return x;
      })
      commit('LatestNews', arr)
    }
  },
  // 申请友链
  async applyFriends({
    commit,
    state
  }, para) {
    let res = await this.$axios.$post(`${api.friendsLink.applyFriendsLink}`, para);
    $message(res.message)
  },
  // 退出登录
  async sign_out({
    commit,
    state
  }) {
    let res = await this.$axios.$get(`${api.sign.signout}`)
    if (res.isSuc) {
      commit('NO_LOGIN', '');
      $message(res.message)
    }
  }
  // // 获取动态列表
  // async getDynamicList({
  //   commit,
  //   state
  // }) {
  //   let res = await this.$axios.$get(`${api.dynamic.getDynamicList}`);
  //   if (res.isSuc) {
  //     if (res.result && res.result.length > 0) {
  //       this.list = res.result;
  //       commit('DynamicList', res.result)
  //       return true;
  //     } else {
  //       this.$message.info("作者没有发布动态");
  //     }
  //   }
  // }
}
