<template>
  <div class="signin">
    <div class="box bgbox s-form">
      <div class="logo">
        <img src="../../assets/images/logo2.png">
      </div>
      <el-form class="in-form signin-form " :label-position="labelPosition" :label-width="$t('message.LabelWidth')" :model="formLabelAlign">
        <el-form-item>
        </el-form-item>
        <el-form-item :label="$t('message.NameAccount')">
          <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <el-form-item :label="$t('message.Password')">
          <el-input type='password' v-model="formLabelAlign.password"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="flex flex-pack-justify">
            <p>{{$t('message.NoAccount')}}<nuxt-link :to="{ path: '/signup' }">{{$t('message.GoRegister')}}</nuxt-link>
            </p>
            <p>
              <nuxt-link :to="{ path: '/home' }">{{$t('message.BackHome')}}</nuxt-link>
            </p>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">{{$t('message.LogInImmediately')}}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
export default {
  name: 'signin',
  head() {
    return {
      title: '登录_yyn博客'
    }
  },
  data() {
    return {
      labelPosition: 'top',
      formLabelAlign: {
        name: '',
        password: ''
      },
      fromSignUp: false
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      // 通过 `vm` 访问组件实例
      // console.log(from)
      // console.log(vm.fromSignUp)
      if (from.path === '/signup' || from.path === '/signin') {
        vm.fromSignUp = true
      }
    })
  },
  methods: {
    async submitForm() {
      var self = this
      // AJAX提交JSON:
      var para = {
        name: self.formLabelAlign.name,
        password: self.formLabelAlign.password
      }
      let res = await self.$axios.$post(api.sign.signin, para)
      if (res.isSuc) {
        let r = JSON.stringify(res.result)
        // window.localStorage.setItem('_55lover_reader', r)
        Cookies.set('_55lover_avatar', res.result.avatar, {
          expires: 7,
          path: ''
        })
        Cookies.set('_55lover_email', res.result.email, {
          expires: 7,
          path: ''
        })
        Cookies.set('_55lover_id', res.result.id, { expires: 7, path: '' })
        Cookies.set('_55lover_name', res.result.name, { expires: 7, path: '' })
        self.$store.commit('NO_LOGIN', {
          avatar: res.result.avatar,
          email: res.result.email,
          id: res.result.id,
          name: res.result.name
        })
        if (self.fromSignUp) {
          self.$router.push({ path: '/' })
        } else {
          self.$router.go(-1)
        }
        self.$message({
          message: res.message,
          type: 'success'
        })
      }
    }
  },
  mounted() {
    let wHeight = $(window).height() - 120,
      bHeight = $('.box').height() + 60
    if (wHeight < bHeight) {
      $('.signin').height(bHeight)
    } else {
      $('.signin').height(wHeight)
    }
  }
}
</script>
<style type="text/css">
.signin-form .el-form-item {
  margin-bottom: 0;
}
.signin-form .el-form-item__label {
  color: #444;
}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.signin {
  box-sizing: border-box;
  margin: 0 auto;
}
.box {
  width: 400px;
}
.s-form {
  margin: 0 auto;
}
.logo {
  text-align: center;
}
.logo img {
  height: 70px;
  overflow: hidden;
}
.box h3 {
  font-size: 42px;
  text-align: center;
  color: #333;
}
.in-form .el-button--primary {
  width: 100%;
}
</style>
