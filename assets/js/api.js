let api = {
  // 接口地址
  base: "https://api.55lover.com/api/",
  // base: 'http://localhost:8088/api/',
  article: {
    // wenzhang详情
    getLatestArticles: "getLatestArticles",
    getLatestNews: "getLatestNews",
    getArticle: "getArticle",
    getDemoList: "getDemoList",
    getDemoById: "getDemoById"
  },
  stat: {
    getStatistics: "getStatistics",
    statistics: "statistics"
  },
  dynamic: {
    getDynamicList: "getDynamicList",
    addComments: "addComments"
  },
  friendsLink: {
    applyFriendsLink: "applyFriendsLink"
  },
  audio: {
    getAudioList: "getAudioList"
  },
  personAlbum: {
    getPersonAlbum: "getPersonAlbum"
  },
  message: {
    replyMessage: "replyMessage",
    addMessage: "addMessage",
    getMessages: "getMessages"
  },
  info: {
    updateInfo: "updateInfo",
    getInfo: "getInfo"
  },
  sign: {
    signin: "login",
    signup: "signup",
    signout: "signout"
  }
};

export default api;
