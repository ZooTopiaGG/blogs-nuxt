<template>
  <div v-show='$store.state.SHOW_NAV' :class="[{navs: true}, { isHome: $store.state.GET_IS_HOME }]">
    <div class="menus flex flex-pack-around">
      <div class="logo flex">
        <router-link :to="{ path: '/home' }">
          <svg width="130" height="70" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <defs>
              <filter id="blend2">
                <!-- IE浏览器不支持overly混合模式，可使用multiply替代 -->
                <feBlend mode="overlay" in="SourceGraphic" in2="patternSource" />
              </filter>
              <linearGradient id="gradient2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="33%" stop-color="red" />
                <stop offset="55%" stop-color="yellow" />
                <stop offset="77%" stop-color="green" />
              </linearGradient>
              <pattern id="pattern2" width="130" height="70" patternUnits="userSpaceOnUse">
                <rect x="0" y="0" width="100%" height="100%" fill="url(#gradient2)" filter="url(#pattern2)"></rect>
              </pattern>
            </defs>
            <text font-family="Microsoft Yahei" font-weight="900" fill="url(#pattern2)">
              <tspan x="29" y="33" font-size="17">yyn博客</tspan>
              <tspan x="0" y="51" font-size="14">www.55lover.com</tspan>
            </text>
          </svg>
        </router-link>
      </div>
      <div class="flex flex-1 flex-pack-end">
        <ul class="menu flex">
          <li :class="{ active: $route.name === 'home'}">
            <router-link :to="{ path: '/home' }">{{ $t('message.Home') }}</router-link>
          </li>
          <li :class="{ active: $route.name === 'program' || $route.path.indexOf('articles/p') > -1 || $route.name === 'articles' || $route.path.indexOf('articles/a') > -1 || $route.name==='studies'}">
            <el-dropdown trigger="click" @command="handleCommand2">
              <span class="el-dropdown-link">
                {{ $t('message.Classification') }}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="program" :class="{ active: $route.path === '/program' || $route.path.indexOf('articles/p') > -1}">
                  <span>{{ $t('message.Technology') }}</span>

                </el-dropdown-item>
                <el-dropdown-item command="articles" :class="{ active: $route.path === '/articles' || $route.path.indexOf('articles/a') > -1}">
                  <span>{{ $t('message.Article') }}</span>
                </el-dropdown-item>
                <el-dropdown-item command="studies" :class="{ active: $route.path === '/study'}">
                  <span>{{ $t('message.Studies') }}</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </li>
          <li :class="{ active: $route.path === '/demo'}" class="demo">
            <router-link :to="{ path: '/demo' }">
              <svg width="52" height="17" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <defs>
                  <filter id="blend">
                    <!-- IE浏览器不支持overly混合模式，可使用multiply替代 -->
                    <feBlend mode="overlay" in="SourceGraphic" in2="patternSource" />
                  </filter>
                  <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="55%" stop-color="red" />
                    <stop offset="77%" stop-color="green" />
                  </linearGradient>
                  <pattern id="pattern" width="40" height="17" patternUnits="userSpaceOnUse">
                    <rect x="0" y="0" width="100%" height="100%" fill="url(#gradient)" filter="url(#blend)"></rect>
                  </pattern>
                </defs>
                <text x="0" y="17" font-family="Microsoft Yahei" font-size="17" font-weight="900" fill="url(#pattern)">
                  Demo
                </text>
              </svg>
            </router-link>
          </li>
          <li :class="{ active: $route.path === '/dynamic'}">
            <router-link :to="{ path: '/dynamic' }">{{ $t('message.Dynamic') }}</router-link>
          </li>
          <li :class="{ active: $route.path === '/messageboard'}">
            <router-link :to="{ path: '/messageboard' }">{{ $t('message.MessageBoard') }}</router-link>
          </li>
          <li :class="{ active: $route.path === '/info'}">
            <router-link :to="{ path: '/info' }">{{ $t('message.AboutMe') }}</router-link>
          </li>
          <li>
            <el-dropdown trigger="click" @command="handleCommand1">
              <span class="el-dropdown-link">
                {{ $store.state.locale === 'en' ? 'English' : '中文' }}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="cn">中文</el-dropdown-item>
                <el-dropdown-item command="en">English</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </li>
        </ul>
        <div class="sign" v-if="!$store.state.GET_LOGIN_STATUS">
          <router-link id="noClicks" :to="{ path: '/signin' }">{{ $t('message.SignIn') }}</router-link>
          /
          <router-link id="noClicks" :to="{ path: '/signup' }">{{ $t('message.SignUp') }}</router-link>
        </div>
        <el-dropdown v-else trigger="click" class="signing flex flex-align-center" @command="handleCommand">
          <span class="el-dropdown-link flex flex-align-center">
            <img id="noClicks" v-if="$store.state.GET_LOGIN_STATUS.avatar" v-lazy="$store.state.GET_LOGIN_STATUS.avatar" style="width: 48px;height: 48px;border-radius: 100%;">
            <img id="noClicks" v-else src="../assets/images/signin.png">
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item class="el-icon-setting" command="info" id="noClicks"> {{ $t('message.WebMasterInfomation') }}</el-dropdown-item>
            <el-dropdown-item class="el-icon-sort" command="signout" id="noClicks"> {{ $t('message.SignOut') }}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'navs',
  data() {
    return {
      activeIndex: '1',
      show: false,
      show1: false,
      res: {}
    }
  },
  // created() {
  //   this.$store.commit('SET_LANG', 'en')
  //   this.$i18n.locale = 'en'
  // },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    },
    handleCommand1(command) {
      this.$store.commit('SET_LANG', command)
      this.$i18n.locale = command
    },
    handleCommand(command) {
      if (command === 'info') {
        this.$router.push({ path: '/info' })
      } else {
        window.localStorage.clear()
        this.$store.dispatch('sign_out')
      }
    },
    handleCommand2(command) {
      switch (command) {
        case 'program':
          this.$router.push({ path: '/program' })
          break
        case 'articles':
          this.$router.push({ path: '/articles' })
          break
        case 'studies':
          this.$router.push({ path: '/study' })
          break
        default:
          this.$router.push({ path: '/program' })
      }
    }
  }
}
</script>
<style>
.menu .el-dropdown {
  font-size: 15px;
}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.navs {
  height: 70px;
  position: fixed;
  top: 0;
  background: transparent;
  width: 100%;
  transition: all 0.45s;
  z-index: 9;
  color: #fff;
  padding-top: 25px;
}
.navs.isHome {
  /*background: #18aacf;*/
  background: #fff;
  box-shadow: 0 0 5px #18aacf;
  -webkit-box-shadow: 0 0 5px #18aacf;
  -moz-box-shadow: 0 0 5px #18aacf;
  padding-top: 0;
}
.menus {
  padding-left: 30px;
  padding-right: 30px;
  max-width: 1500px;
  min-width: 1115px;
  box-sizing: border-box;
  margin: 0 auto;
  /*overflow: hidden;*/
}
.menu li {
  box-sizing: border-box;
  font-size: 0;
  cursor: pointer;
  padding: 0 25px;
}
.menu li a {
  height: 69px;
  font-size: 15px;
  line-height: 69px;
}

.menu > li.active > a,
.menu > li:hover > a,
.menu > li.active .el-dropdown-link {
  color: #13afff;
}

.menu > li.demo > a {
  color: #f30;
  text-decoration: underline;
}
.menu > li.demo:hover > a {
  text-decoration: none;
  background: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 4'><path fill='none' stroke='%23ff3300' d='M0 3.5c5 0 5-3 10-3s5 3 10 3 5-3 10-3 5 3 10 3'/></svg>");
  background-size: 10px 46px;
  background-position: -10px calc(100% + 42px), 0 calc(100% - -19px);
  -webkit-animation: waveMove-data-v-46f24cae 1s infinite linear;
  animation: waveMove-data-v-46f24cae 1s infinite linear;
}
@keyframes waveMove {
  from {
    background-position-x: -10px, 0;
  }
  to {
    background-position-x: -30px, -20px;
  }
}
.menu a {
  display: block;
  min-width: 40px;
  height: 100%;
  color: #666;
  text-align: center;
}
.logo {
  width: 30%;
}
.logo,
.logo img {
  height: 70px;
  overflow: hidden;
}

.menu,
.sign {
  font-size: 16px;
  line-height: 70px;
  height: 70px;
}
.sign {
  text-align: center;
  cursor: pointer;
  position: relative;
  padding-left: 30px;
}
.signing {
  padding-left: 30px;
  cursor: pointer;
}
.showit {
  margin-top: 10px;
  width: 200px;
  background: #fff;
  box-shadow: 1px 1px 10px 1px #ccc;
  -webkit-box-shadow: 1px 1px 10px 1px #ccc;
  -moz-box-shadow: 1px 1px 10px 1px #ccc;
  border-bottom-color: red;
  color: #4c4c4c;
  position: absolute;
  right: 0;
  top: 70px;
  line-height: 60px;
  text-align: left;
}
.item li {
  transition: all 0.45s;
  -webkit-transition: all 0.45s;
  -moz-transition: all 0.45s;
  padding-left: 20px;
}
.item li:hover {
  background: #18aacf;
  color: #fff;
  /*height: 40px;*/
}
.item li i {
  width: 24px;
  height: 24px;
  margin-right: 8px;
}
.sign,
.sign a {
  color: #666;
}
.signin {
  float: right;
}
.signup {
  float: right;
}
.kind > a {
  width: 100%;
}
.kind.active > a {
  color: #13afff;
}
.kind:hover > a {
  color: #fff;
}
</style>
