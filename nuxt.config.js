module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: '邓鹏博客',
    meta: [{
      charset: 'utf-8'
    },
    {
      name: 'keywords',
      content: '博客，技术，文章，离婚，JavaScript，css，html5，vue，react，es6，node，python，mysql，nginx，法律知识'
    },
    {
      hid: 'description',
      name: 'description',
      content: '“邓鹏博客”是一个基于博主兴趣而开发的网站，网站包括法律知识，技术交流，前端技术等许多内容。'
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0'
    },
    {
      name: 'format-detection',
      content: "telephone=no"
    },
    {
      'http-equiv': "X-UA-Compatible",
      content: 'IE=edge,chrome=1'
    }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    },
    {
      rel: 'stylesheet',
      type: 'text/css',
      href: '//cdn.bootcss.com/slippry/1.4.0/slippry.min.css'
    }
    ],
    // 可使用外链形式 引入第三方库
    script: [{
      src: 'https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js'
    },
    {
      src: 'https://cdn.bootcss.com/slippry/1.4.0/slippry.min.js'
    },
    {
      src: 'https://cdn.bootcss.com/scrollReveal.js/3.3.6/scrollreveal.min.js'
    }
    ]
  },
  // 全局CSS配置
  css: [{
    src: 'element-ui/lib/theme-chalk/index.css'
  }, {
    src: '~/assets/css/reset.css'
  },
  {
    src: '~/assets/css/common.css'
  },
  {
    src: '~/assets/fonts/iconfont.css'
  },
  ],
  // 路由配置 
  router: {
    base: '/',
    mode: 'history',
    middleware: ['i18n', 'user-agent'],
    scrollBehavior(to, from, savedPosition) {
      // return 期望滚动到哪个的位置
      if (savedPosition) {
        return savedPosition
      } else {
        return {
          x: 0,
          y: 0
        }
      }
    },
    // 自定义路由路线
    // extendRoutes (routes, resolve) {
    //   console.log(routes)
    //   routes.push({
    //     name: 'report-index',
    //     path: '/',
    //     component: resolve(__dirname, 'pages/report/index.vue')
    //   })
    // }
  },
  /*
   ** Customize the progress bar color
   */
  loading: {
    color: '#FDDB00',
    height: '2px'
  },
  modules: [
    '@nuxtjs/axios'
  ],
  axios: {
    retry: {
      retries: 3
    },
    debug: true, // 添加拦截器
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** Run ESLint on save
     */
    analyze: {
      analyzerMode: 'static'
    },
    extend(config, {
      isDev
    }) {
      if (isDev && process.client) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  plugins: [
    '~/plugins/api.js',
    '~/plugins/utils.js',
    '~/plugins/i18n.js',
    '~/plugins/axios.js',
    // {src: '~/plugins/i18n.js', ssr: false},
    '~/plugins/element.js',
    {
      src: '~/plugins/scroll-view.js',
      ssr: false
    },
    {
      src: '~/plugins/mouseClick.js',
      ssr: false
    }
  ]
}
