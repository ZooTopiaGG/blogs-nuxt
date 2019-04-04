<template>
  <section class="flex left-content">
    <div class="articles flex-1" id="articles">
      <div class="title flex flex-align-center">
        <span class="iconfont dp-icon-wenzhang dp-icon-00AACD"></span>
        <span class="title-text">文章专栏</span>
        <span class="title-label">Article column</span>
      </div>
      <article class="article-list bgbox" v-for="(item, index) in $store.state.articleList" :key="index">
        <div class="article-info flex flex-align-center flex-pack-justify">
          <div class="art-right flex flex-v flex-pack-justify flex-1">
            <div class="art-title">
              <router-link :to="{ path: `/adetails/a/${item.id}` }">{{ item.title }}</router-link>
            </div>
            <div class="desc">
              {{ item.desc }}
            </div>
            <div class="author-info flex flex-align-center flex-pack-justify">
              <span class="column-name"><a href="javascript:;">文章集</a></span>
              <div class="flex flex-align-center">
                <span class="create-time flex flex-align-center"><span class="el-icon-time el-icon-00AACD"> </span>{{ item.createAt }}</span>
                <span class="flex flex-align-center"><span class="el-icon-view el-icon-00AACD"> </span><span class="review-count">{{ item.viewcount }}</span></span>
              </div>
            </div>
          </div>
          <router-link class="imgbox" :to="{ path: `/adetails/a/${item.id}` }">
            <img v-if="!item.smallimg" src="http://scenery.55lover.com/image/scenery/photo-peggy.jpg" alt="article">
            <img v-else v-lazy="item.smallimg" alt="article">
          </router-link>
        </div>
        <!-- <div class="look">
          <el-button type="primary" @click="lookMore(item.id)">前往阅读</el-button>
        </div> -->
      </article>
      <div class="block">
        <!-- <span class="demonstration">完整功能</span> -->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[10, 20, 30, 40]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="$store.state.articleListCount" class="page">
        </el-pagination>
      </div>
    </div>
    <!-- 右边内容区域 -->
    <!-- <div class="right-content">
      <asides></asides>
    </div> -->
  </section>
</template>

<script>
import Asides from '~/components/Aside'
export default {
  name: 'articles',
  async fetch({ store }) {
    await store.dispatch('postArticle', {
      page: 1,
      size: 10,
      columntype: 0 //  文章类
    })
  },
  head() {
    return {
      title: '法律知识很重要_文章专栏_邓鹏博客'
    }
  },
  data() {
    return {
      list: [],
      // 当前页
      currentPage4: 1,
      // 总条数
      totalcount: 200,
      // 每页多少条
      pagesize: 10,
      // 页值
      page: 1,
      logo: 'this.src="http://file.55lover.com/uploads/aff0d0293f71.jpg"'
    }
  },
  components: {
    Asides
  },
  methods: {
    lookMore(id) {
      this.$router.push({
        path: `/adetails/a/${id}`
      })
    },
    async handleSizeChange(val) {
      // 每页多少条
      this.pagesize = val
      await this.handlePost()
    },
    async handleCurrentChange(val) {
      // 当前页数
      this.page = val
      await this.handlePost()
    },
    async handlePost() {
      await this.$store.dispatch('postArticle', {
        page: this.page,
        size: this.pagesize,
        columntype: 0 // 文章
      })
    }
  }
}
</script>
<style type="text/css">
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.articles {
  padding-bottom: 60px;
}
</style>
