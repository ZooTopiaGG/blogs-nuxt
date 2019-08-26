<template>
  <div id="app" :style="{ backgroundImage: bmg }">
    <canvas class="mouseClick" style="position: fixed; left: 0px; top: 0px; z-index: 99999999; pointer-events: none; width: 838px; height: 600px;" width="1676" height="1200">
    </canvas>
    <top-nav></top-nav>
    <div class="main flex" :class="{ pullScreen: $route.path === '/democase' }">
      <nuxt />
      <asides class="right-content" v-if="$store.state.showAside"></asides>
    </div>
    <footer-nav></footer-nav>
  </div>
</template>
<script>
import TopNav from '~/components/TopNav'
import FooterNav from '~/components/FooterNav'
import Asides from '~/components/Aside'
export default {
  name: 'app',
  data() {
    return {
      scrolled: false,
      totop: false,
      background: [
        'http://wallpaper.55lover.com/image/wallpaper/bg10.jpg',
        'http://wallpaper.55lover.com/image/wallpaper/bg9.jpg',
        'http://wallpaper.55lover.com/image/wallpaper/bg3.jpg',
        'http://wallpaper.55lover.com/image/wallpaper/bg15.jpg',
        'http://wallpaper.55lover.com/image/wallpaper/bg14.jpg'
      ],
      res: {}
    }
  },
  components: {
    TopNav,
    FooterNav,
    Asides
  },
  computed: {
    bmg() {
      let round = Math.floor(Math.random() * this.background.length)
      return `url(${this.background[round]})`
    }
  },
  methods: {
    handleScroll(e) {
      let s = document.querySelector('.s-left')
      if (this.$route.name == 'home' || this.$route.name == 'index') {
        if (window.scrollY >= 100) {
          this.$store.commit('IS_HOME', true)
        } else {
          this.$store.commit('IS_HOME', false)
        }
      } else {
        this.$store.commit('IS_HOME', true)
      }
      if (window.scrollY >= 1000) {
        this.totop = true
      } else {
        this.totop = false
      }
    },
    backtotop() {
      Coms.backtotop(0)
    },
    async getQQMusic() {
      var para = {
        size: 300,
        page: 1
      }
      let res = await this.$axios.$post(api.audio.getAudioList, para)
      if (res.isSuc) {
        this.res = res
        console.log(res)
        this.$store.commit('MusicList', res)
      }
    },
    async setStatistics() {
      await this.$axios.$post(api.stat.statistics)
    }
  },
  created() {
    this.setStatistics()
    this.$store.dispatch('getStatistics')
    this.$store.dispatch('getLatestNews')
    this.$store.dispatch('getQQMusic')
  },
  mounted() {
    sr.reveal('.second-box')
    this.$nextTick(() => {
      window.addEventListener('scroll', this.handleScroll)
    })
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>
<style>
.sy-box2 .sy-pager {
  display: none !important;
}
/* .sy-box2 {
  height: 360px;
  width: 100%;
  overflow: hidden;
  margin-bottom: 25px;
} */
.block .el-pagination__total,
.block .el-pagination__jump {
  color: #fff;
}
#app {
  min-width: 1115px;
  background-attachment: fixed;
  background-size: cover;
}
body {
  color: #444;
  font-size: 15px;
  line-height: 1.7;
  background-attachment: fixed;
  background-repeat: repeat;
  background-size: 100% 100%;
  background-image: url('http://wallpaper.55lover.com/image/wallpaper/bg3.jpg');
}
.main {
  padding-top: 120px;
  padding-left: 30px;
  padding-right: 30px;
  max-width: 1500px;
  box-sizing: border-box;
  margin: 0 auto;
  overflow: hidden;
}
.main.pullScreen {
  padding-top: 70px;
  padding-left: 0;
  padding-right: 0;
  max-width: 100%;
  box-sizing: border-box;
  margin: 0 auto;
  overflow: hidden;
  height: 100vh;
}
.title,
.center-title {
  padding: 6px 20px;
  font-size: 16px;
  color: #444;
  background-color: rgba(255, 255, 255, 0.7);
  margin-bottom: 20px;
}
.center-title {
  padding: 6px 10px;
  margin-bottom: 0;
}
.title-label {
  font-size: 14px;
  color: #666;
}
.title-text {
  margin: 0 5px;
}
.details-title {
  padding: 40px;
  font-size: 28px;
  color: #333;
  line-height: 1.6;
}
.editormd-html-preview,
.editormd-preview-container {
  font-size: 16px;
}
.top {
  position: fixed;
  right: 30px;
  bottom: 88px;
  cursor: pointer;
}
#doc-content {
  font-size: 16px;
}
#doc-content pre {
  display: block;
  margin: 0 0 10px;
  padding: 15px;
  font-size: 14px;
  word-wrap: normal;
  word-break: break-word !important;
  word-break: break-all;
  white-space: pre;
  overflow-x: auto;
  border-radius: 3px;
  background: #282c34;
  color: #abb2bf !important;
  box-shadow: rgba(0, 0, 0, 0.5) 0 1px 30px;
}
#doc-content img {
  max-width: 100%;
  max-height: 100%;
}
#doc-content iframe {
  border: 0;
  box-shadow: 0 1px 15px rgba(0, 0, 0, 0.5);
}
/*调整*/

.left-content {
  width: calc(100% - 27.5% - 25px);
}
.right-content {
  width: 27.5%;
  min-width: 320px;
  margin-left: 25px;
}
.box {
  padding: 20px;
  box-sizing: border-box;
}
.bgbox {
  background: rgba(255, 255, 255, 0.7);
  box-sizing: border-box;
  margin-bottom: 25px;
}
.page {
  text-align: right;
  margin-top: 60px;
}
.article-list {
  padding: 20px;
}
.article-list:hover {
  box-shadow: 1px 1px 10px 2px #ccc;
  transition: all 0.4s;
  border-color: red;
}
.article-list:last-child {
  margin-bottom: 40px;
}
.imgbox {
  font-size: 0;
  min-width: 200px;
  height: 128px;
  position: relative;
}
.imgbox img {
  width: 200px;
  height: 128px;
  /*margin-right: 25px;*/
  /* border: 1px solid #ddd; */
}
.art-title {
  font-size: 16px;
  margin-bottom: 10px;
}
.art-right {
  margin-right: 20px;
  min-height: 130px;
}
.art-title a,
.art-right a {
  color: #18aacf;
}
.art-title a:hover,
.art-right a:hover {
  text-decoration: underline;
}
.author-info {
  font-size: 14px;
  /*margin-top: 10px; */
  color: #555;
}
.desc {
  font-size: 14px;
  line-height: 1.5;
  text-align: justify;
  margin-bottom: 10px;
}
.look {
  margin-top: 10px;
}
.column-name {
  padding: 5px 8px;
  background-color: rgb(0, 168, 250);
  border-radius: 6px;
  font-size: 12px;
}
.column-name a {
  color: #fff;
}
.create-time {
  margin-right: 20px;
}
.icon-label {
  margin-right: 5px;
}
.el-icon-00AACD {
  color: #00aacd;
  font-size: 18px;
  margin-right: 5px;
}
.dp-icon-00AACD {
  font-size: 20px;
  color: #00aacd;
}
.dp-icon-fff {
  color: #fff;
  font-size: 18px;
}
#__nuxt img[lazy='error'],
#__nuxt img[lazy='loading'] {
  width: 48px;
  height: 48px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.bimg[lazy='loading'] {
  width: 60px;
  height: 60px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
}
</style>
