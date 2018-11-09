<template>
  <div id="study">
    <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
      <el-radio-button :label="false">{{$t('message.UnFold')}}</el-radio-button>
      <el-radio-button :label="true">{{$t('message.Collapse')}}</el-radio-button>
    </el-radio-group>
    <div class="flex">
      <el-menu default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" @select="handleSelect">
        <el-menu-item index="1">
          <i class="el-icon-menu"></i>
          <span slot="title">全部</span>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-document"></i>
          <span slot="title">Vue生态</span>
        </el-menu-item>
        <!-- <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-document"></i>
            <span slot="title">Vue生态</span>
          </template>
          <el-menu-item-group>
            <span slot="title">Vue(PC端)</span>
            <el-menu-item index="2-1">Vue(PC端)</el-menu-item>
            <el-menu-item index="2-2">Vue(移动端)</el-menu-item>
          </el-menu-item-group>
        </el-submenu> -->
        <el-menu-item index="3">
          <i class="el-icon-document"></i>
          <span slot="title">React生态</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-document"></i>
          <span slot="title">Angular生态</span>
        </el-menu-item>
        <el-menu-item index="5">
          <i class="el-icon-document"></i>
          <span slot="title">NodeJs生态</span>
        </el-menu-item>
        
        <el-menu-item index="6">
          <i class="el-icon-document"></i>
          <span slot="title">CSS生态</span>
        </el-menu-item>
        <el-menu-item index="7">
          <i class="el-icon-document"></i>
          <span slot="title">代码检查</span>
        </el-menu-item>
        <el-menu-item index="8">
          <i class="el-icon-document"></i>
          <span slot="title">代码构建</span>
        </el-menu-item>
      </el-menu>
      <div class="list-box flex flex-1">
        <div class="list flex flex-align-center" v-for="(item, index) in studyList" :key="index">
          <div class="list-img-box flex flex-align-center">
            <img class="list-img" :src="item.image">
          </div>
          <div class="list-aside flex flex-v">
            <a :href="item.url" target="_blank" style="color:#13acff">{{ item.title }}</a>
            <span>{{ item.desc }}</span>
            <span>
              <a :href="item.url" target="_blank">
                 <span class="iconfont dp-icon-home dp-icon-00AACD" style="color:#13afff;font-size:18px"></span>
              </a>
              <a v-if="item.github != '' " :href="item.github" target="_blank">
                <span class="iconfont dp-icon-GitHub dp-icon-00AACD" style="color:#13afff;font-size:18px"></span>
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import study from "@/assets/js/studies";
export default {
  data() {
    return {
      isCollapse: false,
      studyList: []
    };
  },
  computed: {
    all() {
      var newall = [];
      var na = newall.concat(
        study.vue,
        study.react,
        study.angular,
        study.nodejs,
        study.css,
        study.lint,
        study.build
      );
      return na;
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleSelect(key, keyPath) {
      switch (key) {
        case "1":
          this.studyList = this.all;
          break;
        case "2":
          this.studyList = study.vue;
          break;
        case "3":
          this.studyList = study.react;
          break;
        case "4":
          this.studyList = study.angular;
          break;
        case "5":
          this.studyList = study.nodejs;
          break;
        case "6":
          this.studyList = study.css;
          break;
        case "7":
          this.studyList = study.lint;
          break;
        case "8":
          this.studyList = study.build;
          break;
        default:
          this.studyList = this.all;
      }
    }
  },
  mounted() {
    this.studyList = this.all;
  }
};
</script>
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
#study .el-menu {
  background: rgba(255, 255, 255, 0.6);
}
</style>
<style scoped>
.list-box {
  flex-wrap: wrap;
  margin-left: 20px;
}
.list {
  padding: 20px;
  height: 100px;
  width: 250px;
  box-sizing: border-box;
  margin-bottom: 15px;
  margin-right: 20px;
  background: #fff;
}
.list-img-box {
  width: 60px;
  height: 60px;
  margin-right: 10px;
}
.list-img {
  width: 100%;
}
</style>
