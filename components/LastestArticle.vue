<template>
  <section class="flex">
    <div class="articles left-content flex-1" id="articles">
      <div class="title flex flex-align-center">
        <span class="iconfont dp-icon-wenzhang dp-icon-00AACD"></span>
        <span class="title-text">最新文章</span>
        <span class="title-label">Article column</span>
      </div>
      <article class="article-list bgbox" v-for="(item, index) in $store.state.getLatestArticles" :key="index">
        <div class="article-info flex flex-align-center flex-pack-justify">
          <div class="art-right flex flex-v flex-pack-justify flex-1">
            <div class="art-title" v-if="item.columntype==0">
              <nuxt-link :to="{ path: `/adetails/a/${item.id}` }">{{ item.title }}</nuxt-link>
            </div>
            <div class="art-title" v-else>
              <nuxt-link :to="{ path: `/adetails/p/${item.id}` }">{{ item.title }}</nuxt-link>
            </div>
            <div class="desc flex-1">
              {{ item.desc }}
            </div>
            <div class="author-info flex flex-align-center flex-pack-justify">
              <!-- <span class="author"><nuxt-link :to="{ name : 'home' }">邓鹏</nuxt-link></span> /  -->
              <span class="column-name" v-if="item.columntype==0">
                <nuxt-link :to="{ name : 'articles' }">文章类</nuxt-link>
              </span>
              <span class="column-name" v-else>
                <nuxt-link :to="{ name : 'program' }">技术类</nuxt-link>
              </span>
              <!-- <span class="article-type">{{ item.type }}</span> /  -->
              <div class="flex flex-align-center">
                <span class="create-time flex flex-align-center"><span class="el-icon-time el-icon-00AACD"> </span>{{ item.createAt }}</span>
                <span class="flex flex-align-center"><span class="el-icon-view el-icon-00AACD"></span><span class="review-count">{{ item.viewcount }}</span></span>
              </div>
            </div>
          </div>
          <nuxt-link v-if="item.columntype==0" class="imgbox" :to="{ path: `/adetails/a/${item.id}` }">
            <img v-if="!item.smallimg" src="http://scenery.55lover.com/image/scenery/photo-peggy.jpg" alt="article">
            <img v-else v-lazy="item.smallimg" alt="article">
          </nuxt-link>
          <nuxt-link v-else class="imgbox" :to="{ path: `/adetails/p/${item.id}` }">
            <img v-if="!item.smallimg" src="http://scenery.55lover.com/image/scenery/photo-peggy.jpg" alt="article">
            <img v-else v-lazy="item.smallimg" alt="article">
          </nuxt-link>
        </div>
        <!-- <div class="look">
          <el-button type="primary" @click="lookMore(item.id)">前往阅读</el-button>
        </div> -->
      </article>
      <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10, 15, 30, 45]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="$store.state.totalCount" class="page">
        </el-pagination>
      </div>
    </div>
  </section>
</template>

<script>
import Asides from '~/components/Aside'
export default {
  name: 'lastArticles',
  data() {
    return {
      list: [],
      // 总条数
      totalcount: 200,
      // 每页多少条
      pagesize: Number(this.$route.query.size) || 10,
      // 页值
      page: Number(this.$route.query.page) || 1,
      logo: 'this.src="http://file.55lover.com/uploads/aff0d0293f71.jpg"'
    }
  },
  components: {
    Asides
  },
  methods: {
    lookMore(id) {
      // this.$router.push({ name: 'adetails', params: { articleid: id, type: 'a' } })
    },
    refreshLatest() {
      this.$router.push({
        path: '/home',
        query: {
          page: this.page,
          size: this.pagesize
        }
      })
    },
    handleSizeChange(val) {
      // 每页多少条
      this.pagesize = val
      this.refreshLatest()
    },
    handleCurrentChange(val) {
      // 当前页数
      this.page = val
      this.refreshLatest()
    }
  }
}
</script>
<style type="text/css">
.page.el-pagination .el-select .el-input .el-input__inner {
  height: 28px;
  line-height: 28px;
}
.page.el-pagination .el-input__icon {
  height: 28px;
  line-height: 28px;
}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@media (max-width: 1300px) {
  .lastest {
    display: none;
  }
}
.articles {
  padding-bottom: 60px;
}
.right-contents {
  width: 240px;
  margin-left: 10px;
}
.album-face {
  width: 200px;
  height: 248px;
  overflow: hidden;
  position: relative;
}
.hide-over {
  position: absolute;
  background-color: rgba(251, 206, 136, 0.85);
  width: 100%;
  height: 100%;
  z-index: 1;
  display: none;
  color: #fff;
}
.hide-text {
  width: 100%;
  height: 100%;
}
.photo-num {
  position: absolute;
  right: 14px;
  bottom: 7px;
  font-size: 18px;
  color: #fff;
}
.album-face-img,
.videos-face-img {
  width: 200px;
}
.album-face-img,
.videos-face-img {
  box-sizing: border-box;
  padding: 10px;
  box-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
  transition: all 0.8s;
}
.album-face:hover .hide-over {
  display: block;
}
.album-face:hover .album-face-img {
  transform: rotate(-5deg) scale(1.5);
}
</style>
