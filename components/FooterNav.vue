<template>
  <footer
    :class="[
      { footers: true },
      { music: $store.state.GET_PLAY_STATUS },
      { footerScreen: $route.path === '/democase' }
    ]"
    v-show="$store.state.SHOW_FOOTER"
  >
    <div class="footer-top">
      <div class="flex footer-info flex-pack-justify">
        <!-- 底部一 友情链接 -->
        <div class="friends-link flex flex-v second-box">
          <div class="footer-title flex flex-align-center">
            <span class="iconfont dp-icon-youqinglianjie dp-icon-fff"></span>
            <span class="title-text">友情链接</span>
            <span class="title-label">Friends links</span>
          </div>
          <div
            class="link-addr"
            v-for="(item, index) in friendsLink"
            :key="index"
          >
            <a :href="item.url" class="flex flex-align-center" target="_blank">
              <span class="link-label" :class="`bgcolor${index + 1}`">{{
                index + 1
              }}</span>
              <span class="link-title">{{ item.title }}</span>
            </a>
          </div>
        </div>
        <!-- 底部二 申请友情链接 -->
        <div class="apply-friends second-box">
          <div class=" footer-title flex flex-align-center">
            <span class="iconfont dp-icon-jiaren dp-icon-fff"></span>
            <span class="title-text">申请友链</span>
            <span class="title-label">Apply links</span>
          </div>
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            :label-width="$t('message.LabelWidth')"
            class="demo-ruleForm"
          >
            <el-form-item :label="$t('message.WebsiteName')" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item :label="$t('message.YourMailbox')" prop="email">
              <el-input v-model="ruleForm.email"></el-input>
            </el-form-item>
            <el-form-item :label="$t('message.YourWebsite')" prop="website">
              <el-input v-model="ruleForm.website"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">{{
                $t("message.Apply")
              }}</el-button>
            </el-form-item>
          </el-form>
        </div>
        <!-- 底部三 数据统计 -->
        <div class="datas flex flex-v second-box">
          <div class="footer-title flex flex-align-center">
            <span class="iconfont dp-icon-tongji dp-icon-fff"></span>
            <span class="title-text">站长统计</span>
            <span class="title-label">Webmaster statistics</span>
          </div>
          <div class="flex flex-pack-justify">
            <div class="datas1 flex flex-v flex-pack-center">
              <div class="flex flex-align-center datas-label">
                <span class="el-icon-picture dp-icon-fff"></span>
                <span class="datas-title">{{ $t("message.Npictures") }}：</span
                ><span>103</span>
              </div>
              <div class="flex flex-align-center datas-label">
                <span
                  class="iconfont dp-icon-iconfontdongtaidianji dp-icon-fff"
                ></span
                ><span class="datas-title">{{ $t("message.NDynamic") }}：</span
                ><span>{{ $store.state.statistics.dynamic_num }}</span>
              </div>
              <div class="flex flex-align-center datas-label">
                <span class="iconfont dp-icon-wenzhang dp-icon-fff"></span
                ><span class="datas-title">{{ $t("message.NArticle") }}：</span
                ><span>{{ $store.state.statistics.article_num }}</span>
              </div>
              <div class="flex flex-align-center datas-label">
                <span class="iconfont dp-icon-comments dp-icon-fff"></span
                ><span class="datas-title">{{ $t("message.NComments") }}：</span
                ><span>{{ $store.state.statistics.comment_num }}</span>
              </div>
            </div>
            <div class="datas1 flex flex-v flex-pack-center">
              <div class="flex flex-align-center datas-label">
                <span class="iconfont dp-icon-music dp-icon-fff"></span
                ><span class="datas-title">{{ $t("message.NSongs") }}：</span
                ><span>{{ $store.state.statistics.audio_num }}</span>
              </div>
              <div class="flex flex-align-center datas-label">
                <span class="iconfont dp-icon-message dp-icon-fff"></span
                ><span class="datas-title">{{ $t("message.NMessages") }}：</span
                ><span>{{ $store.state.statistics.message_num }}</span>
              </div>
              <div class="flex flex-align-center datas-label">
                <span class="el-icon-view dp-icon-fff"></span
                ><span class="datas-title">{{ $t("message.NViews") }}：</span
                ><span>{{ $store.state.statistics.visitor_num }}</span>
              </div>
              <div class="flex flex-align-center datas-label">
                <span class="iconfont dp-icon-users dp-icon-fff"></span
                ><span class="datas-title">{{ $t("message.Users") }}：</span
                ><span>{{ $store.state.statistics.user_num }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="second-box ">
      <div class="mail"><span style="line-height: 160px;">分享好的资料、项目等给我，不胜感激！</span><a href="mailto:1181050123@qq.com" class="mailto">邮来邮去</a></div>
    </div> -->
    <div class="second-box footer-design flex flex-v flex-align-center">
      <div>
        <span>{{ $t("message.CopyRight") }}</span>
        <a
          href="https://beian.miit.gov.cn/"
          target="_blank"
          rel="noopener noreferrer"
          >蜀ICP备17041201号-1</a
        >
      </div>
      <div class="f-box">
        <p>{{ $t("message.FootTitle1") }}</p>
        <p>
          {{ $t("message.age[0]") }} <b>{{ age }}</b> {{ $t("message.age[1]") }}
        </p>
        <!-- <p>{{ $t("message.FootTitle2") }}</p> -->
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "footers",
  data() {
    return {
      activeIndex: "1",
      ruleForm: {
        name: "",
        website: "",
        email: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入网站名称", trigger: "blur" },
          { min: 1, max: 25, message: "长度在 1 到 25 个字符", trigger: "blur" }
        ],
        email: [{ required: true, message: "请输入您的邮箱", trigger: "blur" }],
        website: [
          { required: true, message: "请输入网站地址", trigger: "blur" }
        ]
      },
      age: Coms.ages("2017-11-27"),
      friendsLink: [
        {
          url: "https://www.liaoxuefeng.com/",
          title: "廖雪峰的官方网站",
          id: 1
        },
        {
          url: "http://www.ruanyifeng.com/blog/",
          title: "阮一峰的网络日志",
          id: 2
        },
        {
          url: "http://www.55lover.com/",
          title: "FeRookie的博客",
          id: 0
        }
      ]
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.applyFriends();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 申请友链
    applyFriends() {
      var para = {
        webname: this.ruleForm.name,
        website: this.ruleForm.website,
        email: this.ruleForm.email
      };
      this.$store.dispatch("applyFriends", para);
    }
  },
  mounted() {
    // console.log(this.GET_STAT)
    sr.reveal(document.querySelectorAll(".second-box"));
  }
};
</script>
<style type="text/css">
.apply-friends .el-input__inner {
  background-color: transparent;
  height: 36px;
  color: #fff;
}
.footer-top .apply-friends .el-form-item__label {
  color: #fff;
}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.demo-ruleForm {
  padding-top: 10px;
}
.footers {
  padding-top: 35px;
}
.footers.footerScreen {
  padding-top: 0;
}
.mail {
  text-align: center;
  height: 160px;
  margin: 20px 0 40px;
  background: #18aacf;
  color: #fff;
  font-size: 32px;
}
.mail a {
  border: 1px solid #fff;
  font-size: 24px;
  min-width: 150px;
  display: inline-block;
  height: 42px;
  position: relative;
  top: -6px;
  transition: all 0.45s;
  color: #fff;
}
.mail a:hover {
  background: #fff;
  color: #18aacf;
}
.box {
  height: 40px;
}
.box a {
  color: #4c4c4c;
}
.box a:hover {
  color: #18aacf;
}
.footer-design {
  font-size: 12px;
  background-color: rgba(85, 85, 85, 0.5);
  box-shadow: 0px -40px 50px rgba(85, 85, 85, 0.5);
  color: #fff;
  box-sizing: border-box;
  padding: 10px 0;
}
.f-box {
  margin-top: 10px;
  text-align: center;
  line-height: 1.6;
}
.f-box p {
  margin: 0;
}
.mysite a {
  margin-right: 10px;
}
.music {
  padding-bottom: 80px;
}
.footer-top {
  background-color: rgba(85, 85, 85, 0.5);
}
.footer-info {
  max-width: 1500px;
  margin: 0 auto;
  padding: 40px 30px;
  box-sizing: border-box;
  color: #fff;
}
.title-label {
  color: #c9c9c9;
}
.link-addr {
  margin: 10px 0;
}
.link-addr a {
  color: #fff;
}
.link-addr a:hover span.link-title {
  text-decoration: underline;
}
.footer-title {
  margin-bottom: 10px;
}
.datas {
  width: 320px;
  min-width: 320px;
}
.datas-label {
  padding: 10px 0;
  flex-wrap: nowrap;
}
.datas-label > span:nth-child(2) {
  width: 80px;
}
.datas-title {
  margin-left: 5px;
}
.link-label {
  padding: 0 9px;
  background-color: rgb(113, 95, 101);
  color: #fff;
  border-radius: 6px;
  margin-right: 10px;
}
.bgcolor1 {
  background-color: rgb(222, 0, 68);
}
.bgcolor2 {
  background-color: rgb(37, 202, 111);
}
.bgcolor3 {
  background-color: rgb(250, 79, 8);
}
</style>
