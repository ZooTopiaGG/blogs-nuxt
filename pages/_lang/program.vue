<template>
  <section class="flex left-content">
    <div class="program flex-1">
      <div class="title flex flex-align-center">
        <span class="iconfont dp-icon-jishuwendang dp-icon-00AACD"></span>
        <span class="title-text">技术专栏</span>
        <span class="title-label">Technical column</span>
      </div>
      <article class="article-list bgbox" v-for="(item, index) in $store.state.articleList" :key="index">
        <div class="article-info flex flex-align-center flex-pack-justify">
          <div class="art-right flex flex-v flex-pack-justify flex-1">
            <div class="art-title">
              <nuxt-link :to="{ path: `/adetails/p/${item.id}` }">{{ item.title }}</nuxt-link>
            </div>
            <div class="desc">
              {{ item.desc }}
            </div>
            <div class="author-info flex flex-align-center flex-pack-justify">
              <span class="column-name"><a href="javascript:;">技术集</a></span>
              <div class="flex flex-align-center">
                <span class="create-time flex flex-align-center"><span class="el-icon-time el-icon-00AACD"> </span> {{ item.createAt }}</span>
                <span class="flex flex-align-center"><span class="el-icon-view el-icon-00AACD"> </span> <span class="review-count">{{ item.viewcount }}</span></span>
              </div>
            </div>
          </div>
          <nuxt-link class="imgbox" :to="{ path: `/adetails/p/${item.id}` }">
            <img v-if="!item.smallimg" src="http://scenery.55lover.com/image/scenery/photo-peggy.jpg" alt="article">
            <img v-else v-lazy="item.smallimg" alt="article">
          </nuxt-link>
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
import Asides from '@/components/Aside'
export default {
  name: 'program',
  async fetch({ store }) {
    await store.dispatch('postArticle', {
      page: 1,
      size: 10,
      columntype: 1 //  技术类
    })
  },
  head() {
    return {
      title: '优雅的学习态度_技术专栏_yyn博客'
    }
  },
  data() {
    return {
      list: [],
      currentPage4: 1,
      totalcount: 0,
      pagesize: 10,
      page: 1,
      logo: 'this.src="http://file.55lover.com/uploads/aff0d0293f71.jpg"'
    }
  },
  components: {
    Asides
  },
  methods: {
    lookMore(id) {
      this.$router.push({ path: `/adetails/p/${id}` })
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
        columntype: 1 // 文章
      })
    }
  }
}
</script>
<style type="text/css">
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.program {
  padding-bottom: 60px;
}
</style>
