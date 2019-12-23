<template>
  <section class="error">
    <!-- 404页面 -->
    <div class="page-404" v-if="error.statusCode === 404">
      <p>
        <img src="@/assets/images/404-2.png" alt="叮当码" />
      </p>
      <p>您访问的页面不见了~</p>
    </div>
    <div v-else class="page-else">
      <p>{{ error.statusCode }}</p>
      <p>{{ error.message }}</p>
    </div>
    <p class="back-home">
      <nuxt-link to="/">返回首页</nuxt-link>
    </p>
  </section>
</template>

<script>
export default {
  layout: "full",
  name: "errors",
  props: ["error"]
};
</script>

<style scoped>
.error {
  max-width: 375px;
  position: fixed;
  left: 50%;
  top: 0;
  transform: translate(-50%, 0);
  font-size: 36px;
  text-align: center;
  margin-top: 15vh;
}
.back-home {
  font-size: 20px;
  margin-top: 40px;
}
.back-home :hover {
  text-decoration: underline;
}
.page-else p:nth-child(1) {
  font-size: 40px;
  margin-bottom: 10px;
}
.page-404 {
  color: #909799;
  font-size: 24px;
}
.page-404 img {
  width: 374px;
  height: 236px;
}
.page-404 p:nth-child(2) {
  margin-top: 20px;
}
</style>
