<template>
  <div class="adetails bgbox box">
    <div class="details-title">{{ $store.state.articleDetail.title }}</div>
    <div class="desc flex flex-align-center">
      <img class="avatar" src="http://scenery.55lover.com/image/scenery/23115938.7a36240.jpg" alt='avatar'>
      <div class="desc-info">
        <div class="author">
          <span>作者：</span>
          <router-link :to="{ name: 'home' }">邓鹏</router-link>
          <span class="type">类型：</span>
          <span>{{ $store.state.articleDetail.type === 0 ? '原创' : '转载' }}</span>
        </div>
        <div class="art-info">
          <span>创建时间：</span><span class="time" style="margin-right:15px;">{{ $store.state.articleDetail.createAt }}</span>
          <span>阅读：</span><span>{{ $store.state.articleDetail.viewcount }}</span>
        </div>
      </div>
    </div>
    <article class="content" id='doc-content' v-html="content">
    </article>
  </div>
</template>

<script>
import marked from 'marked'
import hljs from 'highlight.js'
import javascript from 'highlight.js/lib/languages/javascript'
import 'highlight.js/styles/monokai-sublime.css'
marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: function(code) {
    return hljs.highlightAuto(code).value
  },
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false
})
export default {
  name: 'adetails',
  head() {
    return {
      title: `${this.$store.state.articleDetail.title}_yyn博客`
    }
  },
  async fetch({ store, params }) {
    await store.dispatch('getArticle', { id: params.articleid })
  },
  computed: {
    content() {
      return marked(this.$store.state.articleDetail.content)
    }
  },
  data() {
    return {
      title: '',
      type: '原创',
      viewcount: 0,
      createtime: ''
    }
  },
  mounted() {}
}
</script>
<style type="text/css">
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.adetails {
  max-width: 920px;
  margin: 0 auto;
}
.desc {
  font-size: 14px;
  padding: 0 40px;
}
.avatar {
  width: 48px;
  height: 48px;
  border-radius: 100%;
  margin-right: 20px;
}
.author a {
  color: #18aacf;
}
.author a:hover {
  text-decoration: underline;
}
.type {
  margin-left: 20px;
}
.art-info {
  font-size: 12px;
  margin-top: 10px;
}
.time {
  color: #808080;
}
.content {
  margin-top: 40px;
  padding: 0 40px;
}
</style>
