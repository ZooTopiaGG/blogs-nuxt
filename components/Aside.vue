<template>
  <aside class="aside">
    <!-- 右一 技术标签 -->
    <div class="box bgbox">
      <div class="title flex flex-align-center">
        <span class="iconfont dp-icon-focusactive dp-icon-00AACD"></span>
        <span class="title-text">关注我</span>
        <span class="title-label">Focus me</span>
      </div>
      <div class="flex focus-icon flex-pack-justify">
        <div class="flex flex-v flex-align-center">
          <a href="https://github.com/ZooTopiaGG" title="github" target="_blank" class="github flex flex-align-center flex-pack-center" style="background-color: #0078D7">
            <span class="iconfont dp-icon-GitHub dp-icon-fff" style="font-size:22px;"></span>
          </a>
          <span class="focus-label">{{ $t('message.GitHub') }}</span>
        </div>
        <div class="flex flex-v flex-align-center">
          <a href="http://www.jianshu.com/u/b7cc32782554" title="简书" target="_blank" class="jianshu flex flex-align-center flex-pack-center" style="background-color: #07BF44">
            <span class="iconfont dp-icon-CN_jianshu dp-icon-fff" style="font-size:20px;"></span>
          </a>
          <span class="focus-label">{{ $t('message.JianShu') }}</span>
        </div>
        <div class="flex flex-v flex-align-center">
          <a href="https://www.linkedin.com/in/%E9%B9%8F-%E9%82%93-a23169144/" title="领英" target="_blank" class="linkin flex flex-align-center flex-pack-center" style="background-color: #0073AE">
            <span class="iconfont dp-icon-linkedin dp-icon-fff" style="font-size:22px;"></span>

          </a>
          <span class="focus-label">{{ $t('message.LinkIn') }}</span>
        </div>
        <div class="flex flex-v flex-align-center">
          <a href="https://weibo.com/u/5111513792?refer_flag=1001030201_" title="微博" target="_blank" class="weibo flex flex-align-center flex-pack-center" style="background-color:#FF8245;">
            <span class="iconfont dp-icon-xinlang dp-icon-fff" style="font-size:22px;margin-top:5px;"></span>
          </a>
          <span class="focus-label">{{ $t('message.Sina') }}</span>
        </div>
      </div>
    </div>
    <!-- 右二 网站信息 -->
    <div class="box bgbox">
      <div class="title flex flex-align-center">
        <span class="iconfont dp-icon-wangzhan dp-icon-00AACD"></span>
        <span class="title-text">网站信息</span>
        <span class="title-label">Website information</span>
      </div>
      <div class="flex flex-v flex-align-center website-info">
        <img class="avatar website-avatar" src="http://scenery.55lover.com/image/scenery/23115938.7a36240.jpg" alt="avatar">
        <div class="fb-title">
          邓鹏
        </div>
        <div class="desc">
          {{ $t('message.Intro') }}
        </div>
        <div class="statistics flex flex-align-center flex-pack-justify">
          <div class="flex flex-v flex-align-center">
            <span class="all-num">{{$store.state.statistics.article_num | overNum}}</span>
            <p>{{ $t('message.TotalArticles') }}</p>
          </div>
          <div class="line"></div>
          <div class="flex flex-v flex-align-center">
            <span class="all-num">{{$store.state.statistics.user_num | overNum}}</span>
            <p>{{ $t('message.TotalUsers') }}</p>
          </div>
          <div class="line"></div>
          <div class="flex flex-v flex-align-center">
            <el-badge class="mark" :value="$store.state.statistics.today_pv | badgeNum">
              <span class="all-num">{{$store.state.statistics.visitor_num | overNum}}</span>
            </el-badge>
            <p>{{ $t('message.TotalViews') }}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 右一 技术标签 -->
    <div class="box bgbox">
      <div class="title flex flex-align-center">
        <span class="iconfont dp-icon-biaoqian dp-icon-00AACD"></span>
        <span class="title-text">技术标签</span>
        <span class="title-label">Technical label</span>
      </div>
      <div class="flex label-group">
        <a href="javascript:;" v-for="(item, index) in labelres" :key="index" :style="{background: item.backgroundColor}">{{ item.name }}({{item.num}})</a>
      </div>
    </div>
    <!-- 右三 最新动态 -->
    <div class="box bgbox">
      <div class="title flex flex-align-center">
        <span class="iconfont dp-icon-bookmark-focus dp-icon-00AACD"></span>
        <span class="title-text">最新动态</span>
        <span class="title-label">Latest news</span>
      </div>
      <div class="flex label-group news-group">
        <div class="news flex flex-align-center" v-for="(item, index) in $store.state.latestNews" :key="index">
          <span v-if="item.icontype == 0" class="iconfont dp-icon-wenzhang" style="color:rgb(243, 105, 67);font-size:18px;"></span>
          <span v-else-if="item.icontype == 1" class="iconfont dp-icon-iconfontdongtaidianji" style="color:rgb(243, 105, 67);font-size:18px;"></span>
          <span v-else-if="item.icontype == 2" class="iconfont dp-icon-music" style="color:rgb(243, 105, 67);font-size:18px;"></span>
          <span v-else-if="item.icontype == 3" class="el-icon-picture" style="color:rgb(243, 105, 67);font-size:18px;"></span>
          <span v-else-if="item.icontype == 4" class="iconfont dp-icon-jishuwendang" style="color:rgb(243, 105, 67);font-size:18px;"></span>
          <span v-else class="iconfont dp-icon-focusactive" style="color:rgb(243, 105, 67);font-size:18px;"></span>
          <span class="news-author">{{item.author}}</span>
          <span class="news-time">{{item.time}}</span>
          <span class="news-text">{{item.operation}}了</span>
          <router-link v-if="item.types == '文章'" :to="{ path: `/adetails/a/${item.latestid}` }" class="types" style="background-color: rgb(0, 168, 250)">{{item.types}}</router-link>
          <router-link v-else-if="item.types == '技术'" :to="{ path: `/adetails/p/${item.latestid}` }" class="types" style="background-color: rgb(123, 104, 238)">{{item.types}}</router-link>
          <router-link v-else-if="item.types == '动态'" :to="{ path: '/dynamic' }" class="types" style="background-color: rgb(60, 179, 113)">{{item.types}}</router-link>
          <router-link v-else-if="item.types == '音乐'" :to="{ path: '/music' }" class="types" style="background-color: rgb(123, 104, 238)">{{item.types}}</router-link>
          <router-link v-else-if="item.types == '相册'" :to="{ path: '/albums' }" class="types" style="background-color: rgb(218, 112, 214)">{{item.types}}</router-link>
          <a v-else href="javascript:;" class="types" style="background-color: rgb(200, 200, 171)">{{item.types}}</a>
        </div>
      </div>
    </div>
    <!-- 右三 最近的音乐 -->
    <div class="box bgbox music">
      <div class="title flex flex-align-center">
        <span class="iconfont dp-icon-focusactive dp-icon-00AACD"></span>
        <span class="title-text">喜欢的音乐</span>
        <span class="title-label">Favorite Music</span>
      </div>
      <div>
        <dp-music></dp-music>
      </div>
    </div>
    <!-- 右四 工作经历 -->
    <div class="box bgbox job">
      <div class="title flex flex-align-center">
        <span class="iconfont dp-icon-gongzuojingli dp-icon-00AACD"></span>
        <span class="title-text">工作经历</span>
        <span class="title-label">Work experience</span>
      </div>
      <div class="con">
        {{ $t('message.WorkExperience') }}
      </div>
      <div class="second-box">
        <img class='maps' src="http://scenery.55lover.com/image/scenery/maps.png">
      </div>
    </div>
    <!-- 右五 关于我 -->
    <div class="box bgbox about">
      <div class="title flex flex-align-center">
        <span class="iconfont dp-icon-jianjie dp-icon-00AACD"></span>
        <span class="title-text">站长简介</span>
        <span class="title-label">Webmaster profile</span>
      </div>
      <div class="flex flex-v flex-align-center">
        <div>
          <img class="avatar" src="http://scenery.55lover.com/image/scenery/23115938.7a36240.jpg" alt="avatar">
        </div>
        <div class="con">
          {{ $t('message.WebmasterProfile') }}
        </div>
        <div>
          {{ $t('message.TechnologyStack') }}
        </div>
        <div class="flex flex-v flex-align-center mail">
          <span>{{ $t('message.Study') }}</span>
          <a href="mailto:1181050123@qq.com" class="mailto">{{ $t('message.ByMail') }}</a>
        </div>
      </div>
    </div>
  </aside>
</template>

<script>
import dpMusic from '~/components/Music'
export default {
  name: 'asides',
  filters: {
    overNum(val) {
      if (!val) return 0
      return val && parseInt(val) > 9999 ? (val / 10000).toFixed(2) + 'w' : val
    },
    badgeNum(val) {
      if (!val) return 0
      return val && parseInt(val) > 99 ? '99+' : val
    }
  },
  components: {
    dpMusic
  },
  data() {
    return {
      activeIndex: '1',
      show: false,
      res: {},
      labelres: [
        {
          name: 'css3',
          num: 3,
          backgroundColor: '#da70d6'
        },
        {
          name: 'html5',
          num: 1,
          backgroundColor: '#efc95e'
        },
        {
          name: 'javascript',
          num: 1,
          backgroundColor: '#7b68ee'
        },
        {
          name: 'vuejs',
          num: 3,
          backgroundColor: '#3cb371'
        },
        {
          name: 'es6',
          num: 1,
          backgroundColor: '#7b68ee'
        },
        {
          name: 'reactjs',
          num: 0,
          backgroundColor: '#00A8FA'
        },
        {
          name: 'nodejs',
          num: 2,
          backgroundColor: '#f36943'
        },
        {
          name: 'python',
          num: 10,
          backgroundColor: '#ff4762'
        },
        {
          name: 'mysql',
          num: 1,
          backgroundColor: '#c8c8ab'
        },
        {
          name: 'nginx',
          num: 5,
          backgroundColor: '#3cb371'
        },
        {
          name: '法律知识',
          num: 15,
          backgroundColor: '#ff4762'
        }
      ],
      newsres: [],
      getStat: {}
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    },
    signout() {
      window.localStorage.clear()
      this.show = false
      this.$store.dispatch('NO_LOGIN', '')
    },
    toinfo() {
      this.show = false
      this.$router.push({
        name: 'info',
        params: { userid: 'd17692be-eca7-41ef-87df-aef4313e2b02' }
      })
    }
  },
  created() {
    // sr.reveal(document.querySelectorAll('.box'))
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title {
  padding: 6px 10px;
}
.avatar {
  width: 80px;
  height: 80px;
  border-radius: 100%;
  margin-bottom: 15px;
}
.job {
  color: #555;
  font-size: 15px;
  line-height: 1.7;
}
.job h1 {
  color: #18aacf;
  font-size: 42px;
  margin: 20px 0 20px;
}
.job img {
  margin: 20px auto 0;
}
.skillsBox {
  width: 100%;
  height: 160px;
  font-size: 24px;
  background: url(http://api.55lover.com/static/web/uploads/9fdd4722137ce.jpg)
    no-repeat;
  background-size: auto;
  color: #fff;
}
.skillsBox img {
  margin: 0 auto 20px;
}
.skillsBox aside {
  font-size: 48px;
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
.label-group {
  flex-wrap: wrap;
}
.label-group a {
  padding: 3px 8px;
  background: #ff4762;
  color: #fff;
  margin-right: 10px;
  margin-bottom: 5px;
  border-radius: 10px;
  transition: all 0.4s;
  font-size: 13px;
}
.label-group a:hover {
  opacity: 0.8;
  border-radius: 0;
}
.website-info {
  padding: 10px;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.5);
  margin-top: 60px;
}
.website-avatar {
  margin-top: -55px;
  margin-bottom: 5px;
  border: 2px solid #fff;
  box-shadow: 0 0 5px #999;
  cursor: pointer;
  transition: all 0.8s;
}
.website-avatar:hover {
  transform: rotate(360deg);
}
.fb-title,
.author {
  color: #18aacf;
}
.statistics {
  width: 100%;
  font-size: 14px;
  margin-top: 20px;
}
.line {
  width: 1px;
  height: 46px;
  background: #d1d1d1;
}
.statistics p {
  margin: 0;
}
.all-num {
  color: #000;
}
.con {
  text-align: justify;
}
.focus-icon a {
  width: 50px;
  height: 50px;
  border-radius: 100%;
  background-color: #000;
  transition: all 0.8s;
}
.focus-icon a:hover {
  transform: rotate(360deg) scale(1.3);
}
.focus-label {
  font-size: 13px;
  margin-top: 10px;
}
.mail span {
  font-weight: bold;
}
.mail a {
  border: 1px solid #444;
  font-size: 24px;
  width: 150px;
  height: 42px;
  transition: all 0.45s;
  color: #444;
  text-align: center;
  margin-top: 10px;
}
.mail a:hover {
  border: 1px solid #fff;
  background: #fff;
  color: #18aacf;
}
.news {
  padding: 0 10px;
}
.news-time {
  margin: 0 10px;
}
.news-author {
  margin-left: 10px;
  color: rgb(0, 168, 250);
}
.news-text {
  margin-right: 5px;
}
</style>
