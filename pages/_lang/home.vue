<template>
  <section class="home flex left-content">
    <!-- 左边内容区域 -->
    <div class="flex-1" style="position: relative;">
      <el-carousel :interval="4000" indicator-position="outside">
        <el-carousel-item v-for="(item, index) in options" :key="index">
          <a href="javascript:;" class="img-box" v-if="item.link === 'video'" @click="open">
            <svg class="svg" xmlns="http://www.w3.org/2000/svg" version="1.1">
              <g>
                <circle cx="25" cy="25" r="24" stroke="white" stroke-width="2" fill-opacity="0" />
                <polygon points="20,16 34,24 20, 32" stroke-width="2" stroke="white" fill="white" />
              </g>
            </svg>
            <i class="bimg" v-lazy:background-image="item.src"></i>
          </a>
          <a class="img-box" :href="item.link" target="_blank" v-else>
            <i class="bimg" v-lazy:background-image="item.src"></i>
          </a>
        </el-carousel-item>
      </el-carousel>
      <!-- 最新文章区域 -->
      <div>
        <LastestArticle></LastestArticle>
      </div>
    </div>
    <!-- 右边内容区域 -->
    <!-- <div class="right-content">
      <asides></asides>
    </div> -->
    <div class="dialog" v-show="show">
      <div class="video-content">
        <div class="icon_list">
          <span class="el-icon-minus" @click="minus"></span>
          <span class="el-icon-close" @click="close"></span>
        </div>
        <video class="video" ref="video" src="http://scenery.55lover.com/image/scenery/%E8%8A%B1%E7%B5%AE.mp4" autoplay muted controls="controls">您的浏览器不支持 video 标签。</video>
      </div>
    </div>
  </section>
</template>

<script>
import LastestArticle from '~/components/LastestArticle'
import Asides from '~/components/Aside'
export default {
  name: 'home',
  async fetch({ app, error, store }) {
    await store.dispatch('getLatestArticles', { page: 1, pagesize: 10 })
    // await store.dispatch('getStatistics')
    // await store.dispatch('getLatestNews')
  },
  head() {
    var _title = () => {
      return '首页_邓鹏博客'
    }
    return {
      title: _title()
    }
  },
  computed: {
    video() {
      return this.$refs['video']
    }
  },
  data() {
    return {
      msg: '',
      options: [
        {
          src: 'http://scenery.55lover.com/lover5.png',
          link: 'video'
        },
        {
          src: 'http://scenery.55lover.com/react.jpg',
          link: 'https://reactjs.org/'
        },
        {
          src: 'http://scenery.55lover.com/vue.jpeg',
          link: 'https://cn.vuejs.org'
        },
        {
          src: 'http://scenery.55lover.com/msyql.jpg',
          link: 'https://www.mysql.com/'
        },
        {
          src: 'http://scenery.55lover.com/nginx.jpg',
          link: 'https://nginx.org/'
        },
        {
          src: 'http://scenery.55lover.com/nodejs.jpg',
          link: 'https://nodejs.org/'
        },
        {
          src: 'http://scenery.55lover.com/python.jpg',
          link: 'https://www.python.org/'
        }
      ],
      show: true,
      minusShow: false
    }
  },
  components: {
    LastestArticle,
    Asides
  },
  asyncData({ params }) {
    // console.log(sr)
  },
  methods: {
    open() {
      this.show = true
      this.video.play()
    },
    close() {
      this.show = false
      this.video.pause()
    },
    minus() {
      this.show = true
      this.minusShow = true
      this.video.requestPictureInPicture()
    },
    goSkill() {
      this.$router.push({ path: '/program' })
    },
    goDynamic() {
      this.$router.push({ path: '/dynamic' })
    },
    goMusic() {
      this.$router.push({ path: '/music' })
    },
    goArticle() {
      this.$router.push({ path: '/articles' })
    }
  },
  mounted() {
    // console.log(this.$store)
    // console.log(sr)
    var demo1 = $('#slider').slippry({
      transition: 'kenburns',
      useCSS: true,
      speed: 5000,
      pause: 9000,
      auto: true,
      controls: false,
      preload: 'visible',
      autoHover: false
    })
    // sr.reveal(document.querySelectorAll('.sy-box2'))
    let that = this
    this.video.addEventListener('enterpictureinpicture', function() {
      // 已进入画中画模式
      that.show = false
    })
    // 退出画中画模式时候执行
    this.video.addEventListener('leavepictureinpicture', function() {
      // 已退出画中画模式
      that.show = true
    })
    window.addEventListener(
      'resize',
      function() {
        console.log(this.innerWidth)
        if (this.innerWidth <= 918) {
          document.querySelector('.video-content').style.width = '100%'
        }
      },
      false
    )
  }
}
</script>

<style>
.el-carousel__container {
  width: 100%;
  height: 0;
  padding-top: 56.25%;
}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
  overflow: hidden;
}
.home {
  position: relative;
}
.first-box {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  overflow: hidden;
  z-index: 8;
}
.fb {
  width: 800px;
  margin: 0 auto;
  text-align: center;
  line-height: 1.6;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -240px;
  margin-left: -400px;
  z-index: 8;
  color: #fff;
}
.fb-title {
  font-size: 68px;
  padding-bottom: 5%;
}
.desc {
  font-size: 36px;
}
.s-left,
.s-right {
  width: 50%;
}
.s-left img {
  width: 100%;
  transition: 6s;
  -webkit-transition: 6s;
  -moz-transition: 6s;
}
.el-carousel {
  margin-bottom: 25px;
}
.img-box {
  width: 100%;
  height: 100%;
  display: block;
  position: relative;
}
.svg {
  width: 50px;
  height: 50px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 99;
}
.img-box i {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}
.img-box img {
  width: 100%;
}
.s-right img {
  transition: 6s;
  -webkit-transition: 6s;
  -moz-transition: 6s;
}
.s-right1:hover img,
.s-right2:hover img,
.s-right3:hover img {
  transform: scale(1.5);
  -webkit-transform: scale(1.5);
  -moz-transform: scale(1.5);
}
.s-left:hover img {
  transform: scale(1.5);
  -webkit-transform: scale(1.5);
  -moz-transform: scale(1.5);
}
.s-left1 {
  width: 50%;
}
.s-left1 img {
  width: 100%;
  height: 100%;
}
.img {
  position: relative;
  color: #fff;
  font-size: 40px;
  overflow: hidden;
}
.img div {
  position: absolute;
  z-index: 9;
  left: 20px;
  bottom: 20px;
  font-size: 24px;
}
small::after {
  -webkit-transition: all 0.4s;
  --moz-transition: all 0.4s;
  -o-transition: all 0.4s;
  transition: all 0.4s;
  margin-top: 20px;
  content: ' ';
  display: block;
  height: 4px;
  width: 40px;
  background-color: #3d69e7;
  margin-bottom: 25px;
}
.pbtn {
  margin: 40px 0 20px 0;
}
.pbtn button {
  color: #fff;
  width: 120px;
  border: 1px solid #fff;
  outline: none;
  text-indent: 12px;
  font-size: 16px;
  font-weight: bold;
  background: rgba(255, 255, 255, 0);
  cursor: pointer;
  letter-spacing: 4px;
  -webkit-transition: all 0.4s;
  --moz-transition: all 0.4s;
  -o-transition: all 0.4s;
  transition: all 0.4s;
}
.s-left:hover .pbtn button,
.s-right1:hover .pbtn button,
.s-right2:hover .pbtn button,
.s-right3:hover .pbtn button {
  background: #fff;
  color: #3d69e7;
}
.s-left:hover .bg,
.s-right1:hover .bg,
.s-right2:hover .bg,
.s-right3:hover .bg {
  background: rgba(0, 0, 0, 0.3);
}
.pbtn button pre {
  -webkit-transition: all 0.4s;
  --moz-transition: all 0.4s;
  -o-transition: all 0.4s;
  transition: all 0.4s;
}
.pbtn button:hover {
  width: 160px;
}
.pbtn button:hover pre {
  margin-left: 40px;
}
.job {
  color: #555;
  font-size: 15px;
  line-height: 1.7;
  padding: 40px 20px;
  text-align: center;
}
.job h1 {
  color: #18aacf;
  font-size: 42px;
  margin: 20px 0 20px;
}
.job img {
  margin: 20px auto 0;
}
.about {
  text-align: center;
  padding: 40px 20px;
}
.about img {
  margin: auto;
}
.con-title {
  color: #18aacf;
  font-size: 42px;
  margin: 20px 0 20px;
}
.maps {
  width: 100%;
  height: 100%;
}
.dialog {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 9999;
}
.video-content {
  width: 918px;
  max-width: 918px;
  height: auto;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  animation-duration: 0.25s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  padding-top: 30px;
  background: #fff;
  border-radius: 6px;
  font-size: 0;
}
.video-content .video {
  width: 100%;
  height: auto;
}
.icon_list {
  position: absolute;
  right: 18px;
  top: 0;
  font-size: 18px;
  color: #000;
  font-weight: bold;
  cursor: pointer;
}
.icon_list span {
  position: relative;
  transition: all 0.3s;
}
.icon_list .el-icon-close {
  margin-left: 18px;
}
.icon_list .el-icon-close:hover {
  transform: rotate(180deg) scale(1.5);
}
.icon_list .el-icon-minus:hover {
  transform: scale(1.5);
}
</style>
