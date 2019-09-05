<template>
  <section class="flex left-content">
    <div class="articles flex-1" id="articles">
      <div class="title flex flex-align-center">
        <span class="iconfont dp-icon-wenzhang dp-icon-00AACD"></span>
        <span class="title-text">Demo专栏</span>
        <span class="title-label">Demo column</span>
      </div>
      <article class="article-list bgbox" v-for="(item, index) in $store.state.demoList" :key="index">
        <div class="article-info flex flex-align-center flex-pack-justify">
          <div class="art-right flex flex-v flex-pack-justify flex-1">
            <div class="art-title">
              <router-link :to="{ path: '/democase', query: { demoid: item.id } }">{{ item.title }}</router-link>
            </div>
            <div class="desc">
              {{ item.desc }}
            </div>
            <div class="author-info flex flex-align-center flex-pack-justify">
              <span class="column-name">
                <router-link :to="{ path: '/democase', query: { demoid: item.id } }">查看演示</router-link>
              </span>
              <div class="flex flex-align-center">
                <span class="create-time flex flex-align-center"><span class="el-icon-time el-icon-00AACD"> </span>{{ item.createAt }}</span>
                <span class="flex flex-align-center"><span class="el-icon-view el-icon-00AACD"> </span><span class="review-count">{{ item.viewcount }}</span></span>
              </div>
            </div>
          </div>
        </div>
      </article>
      <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[10, 20, 30, 40]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="$store.state.demoListCount" class="page">
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
    await store.dispatch('postDemo', {
      page: 1,
      size: 10
    })
  },
  head() {
    return {
      title: '学习积累很重要_Demo_yyn博客'
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
