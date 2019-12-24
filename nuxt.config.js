const env = require("./env");
module.exports = {
  mode: "universal",
  env: {
    baseUrl: env[process.env.MODE].ENV_API
  },
  /*
   ** Headers of the page
   */
  head: {
    title: "邓鹏博客",
    meta: [
      {
        charset: "utf-8"
      },
      {
        name: "keywords",
        content:
          "博客，技术，文章，JavaScript，css，html5，vue，react，es6，node，python，mysql，nginx"
      },
      {
        hid: "description",
        name: "description",
        content:
          "“邓鹏博客”是一个基于博主兴趣而开发的网站，网站包括法律文章，兴趣文章，技术交流，前端技术等许多内容。"
      },
      {
        name: "viewport",
        content:
          "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
      },
      {
        name: "format-detection",
        content: "telephone=no"
      },
      {
        "http-equiv": "X-UA-Compatible",
        content: "IE=edge,chrome=1"
      }
    ],
    link: [
      {
        rel: "dns-prefetch",
        href: "//cdn.bootcss.com"
      },
      {
        rel: "dns-prefetch",
        href: "//www.55lover.com"
      },
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon.ico"
      },
      {
        rel: "stylesheet",
        type: "text/css",
        href: "//cdn.bootcss.com/slippry/1.4.0/slippry.min.css"
      }
    ],
    // 可使用外链形式 引入第三方库
    script: [
      {
        innerHTML: `(function(){
          var bp = document.createElement('script');
          var curProtocol = window.location.protocol.split(':')[0];
          if (curProtocol === 'https') {
              bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
          }
          else {
              bp.src = 'http://push.zhanzhang.baidu.com/push.js';
          }
          var s = document.getElementsByTagName("script")[0];
          s.parentNode.insertBefore(bp, s);
      })();`
      },
      {
        innerHTML: `(function() {
          var script = document.createElement('script');
          script.src = "https://jspassport.ssl.qhimg.com/11.0.1.js?d182b3f28525f2db83acfaaf6e696dba";
          script.id="sozz"
          var b = document.getElementsByTagName("head")[0];
          b.appendChild(script);
        })()`
      },
      {
        src: "https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js"
      },
      {
        src: "https://cdn.bootcss.com/slippry/1.4.0/slippry.min.js"
      },
      {
        src: "https://cdn.bootcss.com/scrollReveal.js/3.3.6/scrollreveal.min.js"
      },
      {
        src: "/anime.js"
      }
    ],
    __dangerouslyDisableSanitizers: ["script"]
  },
  // 全局CSS配置
  css: [
    {
      src: "element-ui/lib/theme-chalk/index.css"
    },
    {
      src: "~/assets/css/reset.css"
    },
    {
      src: "~/assets/css/common.css"
    },
    {
      src: "~/assets/fonts/iconfont.css"
    }
  ],
  watchQuery: true,
  // 路由配置
  router: {
    base: "/",
    mode: "history",
    middleware: ["i18n", "user-agent"],
    scrollBehavior(to, from, savedPosition) {
      // return 期望滚动到哪个的位置
      if (savedPosition) {
        return savedPosition;
      } else {
        return {
          x: 0,
          y: 0
        };
      }
    }
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
    color: "#FDDB00",
    height: "2px"
  },
  modules: ["@nuxtjs/axios"],
  axios: {
    retry: {
      retries: 3
    },
    debug: true // 添加拦截器
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** Run ESLint on save
     */
    // vendor: ['axios'],
    // extractCSS 会导致ssr页面样式紊乱
    // extractCSS: true,
    parallel: true,
    // hardSource: true,
    optimizeCSS: true,
    filenames: {
      chunk: ({ isDev }) =>
        isDev ? "[name].js" : "55lover.com.[chunkhash].js",
      app: ({ isDev }) => (isDev ? "[name].js" : "55lover.com.[chunkhash].js"),
      css: ({ isDev }) =>
        isDev ? "[name].css" : "55lover.com.[contenthash].css"
    },
    terser: {
      parallel: true,
      cache: false,
      sourceMap: false,
      extractComments: {
        filename: "LICENSES"
      },
      terserOptions: {
        compress: {
          warnings: false,
          drop_debugger: true,
          drop_console: true
        },
        output: {
          comments: /^\**!|@preserve|@license|@cc_on/
        }
      }
    },
    // analyze: {
    //   analyzerMode: 'static'
    // },
    extend(config, { isDev }) {
      if (isDev && process.client) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        });
      }
    },
    loaders: [
      {
        test: /\.(jpe?g|png|gif|svg|webp)$/,
        use: [
          {
            loader: "url-loader",
            query: {
              limit: 1000 * 1024 * 2.5,
              name: "img/[name].[hash].[ext]"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    "~/plugins/api.js",
    "~/plugins/utils.js",
    "~/plugins/i18n.js",
    "~/plugins/axios.js",
    "~/plugins/element.js",
    // {src: '~/plugins/i18n.js', ssr: false},
    {
      src: "~/plugins/scroll-view.js",
      ssr: false
    },
    {
      src: "~/plugins/mouseClick.js",
      ssr: false
    },
    {
      src: "~/plugins/zoom.js",
      ssr: false
    }
  ]
};
