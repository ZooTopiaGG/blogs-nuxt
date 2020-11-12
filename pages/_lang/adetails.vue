<template>
  <div class="adetails bgbox box flex-1">
    <div class="details-title">{{ $store.state.articleDetail.title }}</div>
    <div class="details-url">
      <span>本文地址：</span>
      <nuxt-link :to="{ path: $route.params.fullPath }"
        >({{ currentUrl }})</nuxt-link
      >
    </div>
    <div class="desc flex flex-align-center">
      <img
        class="avatar"
        src="http://scenery.55lover.com/image/scenery/23115938.7a36240.jpg"
        alt="avatar"
      />
      <div class="desc-info">
        <div class="author">
          <span>作者：</span>
          <nuxt-link :to="{ name: 'home' }">FeRookie</nuxt-link>
          <span class="type">类型：</span>
          <span>{{
            $store.state.articleDetail.type === 0 ? "原创" : "转载"
          }}</span>
        </div>
        <div class="art-info">
          <span>更新时间：</span
          ><span class="time" style="margin-right:15px;">{{
            $store.state.articleDetail.updateAt
          }}</span>
          <span>阅读：</span
          ><span>{{ $store.state.articleDetail.viewcount }}</span>
        </div>
      </div>
    </div>
    <article
      class="content highlight"
      id="doc-content"
      v-html="content"
    ></article>
  </div>
</template>

<script>
import marked from "marked";
import hljs from "highlight.js";
import javascript from "highlight.js/lib/languages/javascript";
import "highlight.js/styles/monokai-sublime.css";
import "braft-extensions/dist/code-highlighter.css";
import { asyncHighlight, replaceBr } from "@/assets/js/fn";
marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: function(code) {
    return hljs.highlightAuto(code).value;
  },
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false
});
export default {
  name: "adetails",
  head() {
    return {
      title: `${this.$store.state.articleDetail.title}-FeRookie的博客`
    };
  },
  async fetch({ store, params }) {
    await store.dispatch("getArticle", { id: params.articleid });
  },
  computed: {
    content() {
      return marked(replaceBr(this.$store.state.articleDetail.content));
    }
  },
  data() {
    return {
      title: "",
      type: "原创",
      viewcount: 0,
      createtime: "",
      currentUrl: ""
    };
  },
  mounted() {
    this.currentUrl = typeof window != undefined ? window.location.href : "";
    asyncHighlight();
  }
};
</script>
<style type="text/css">
#doc-content ul,
#doc-content ol,
#doc-content li {
  list-style: inside;
}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.adetails {
  max-width: 920px;
  margin: 0 auto;
}
.details-url {
  padding: 0 40px 40px;
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
