<template>
  <div class="signin">
    <div class="box bgbox s-form">
      <div class="logo">
        <img src="../../assets/images/logo2.png">
      </div>
      <el-form class="in-form signup-form" :label-position="labelPosition" :label-width="$t('message.LabelWidth')" :model="formLabelAlign">
        <el-form-item>
        </el-form-item>
        <el-form-item :label="$t('message.NameAccount')">
          <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <el-form-item :label="$t('message.Email')">
          <el-input v-model="formLabelAlign.email"></el-input>
        </el-form-item>
        <el-form-item :label="$t('message.Gender')">
          <el-radio-group v-model="formLabelAlign.gender">
            <el-radio :label="$t('message.Male')"></el-radio>
            <el-radio :label="$t('message.Female')"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('message.Password')">
          <el-input type='password' v-model="formLabelAlign.password"></el-input>
        </el-form-item>
        <el-form-item :label="$t('message.SurePassword')">
          <el-input type='password' v-model="formLabelAlign.password1"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="flex flex-pack-justify">
            <p>{{$t('message.HaveAccount')}}<nuxt-link :to="{ name: 'signin' }">{{$t('message.GoLogin')}}</nuxt-link>
            </p>
            <p>
              <nuxt-link :to="{ name: 'home' }">{{$t('message.BackHome')}}</nuxt-link>
            </p>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">{{$t('message.Register')}}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'signin',
  head() {
    return {
      title: '注册_yyn博客'
    }
  },
  data() {
    return {
      name: '',
      password: '',
      labelPosition: 'top',
      formLabelAlign: {
        name: '',
        password1: '',
        password: '',
        gender: '',
        email: '',
        avatar: [
          'http://scenery.55lover.com/image/scenery/20180319113550.jpg',
          'http://scenery.55lover.com/image/scenery/20180319113533.jpg',
          'http://scenery.55lover.com/image/scenery/20180319113616.jpg',
          'http://scenery.55lover.com/image/scenery/20180319113602.jpg',
          'http://scenery.55lover.com/image/scenery/20180319113556.jpg',
          'http://scenery.55lover.com/image/scenery/20180319113609.jpg',
          'http://scenery.55lover.com/image/scenery/20180319113630.jpg',
          'http://scenery.55lover.com/image/scenery/20180319113621.jpg',
          'http://scenery.55lover.com/image/scenery/20180319113625.jpg',
          'http://scenery.55lover.com/image/scenery/20180319113635.jpg'
        ]
      }
    }
  },
  methods: {
    async submitForm() {
      // console.log(this.formLabelAlign.gender)
      let that = this,
        round = Math.floor(Math.random() * that.formLabelAlign.avatar.length),
        avatar = that.formLabelAlign.avatar[round],
        // AJAX提交JSON:
        para = {
          name: that.formLabelAlign.name,
          password: that.formLabelAlign.password,
          password1: that.formLabelAlign.password1,
          gender: that.formLabelAlign.gender,
          email: that.formLabelAlign.email,
          avatar: avatar
        }
      let res = await this.$axios.$post(api.sign.signup, para)
      if (res.isSuc) {
        this.$message({
          message: res.message,
          type: 'success'
        })
      } else {
        this.$message({
          message: res.message,
          type: 'error'
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
.signup-form .el-form-item {
  margin-bottom: 0;
}
.signup-form .el-form-item__label {
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
