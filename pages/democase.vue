<template>
  <section class="democase">
    <iframe :src="src" frameborder="0" scrolling="no"></iframe>
  </section>
</template>
<script>
export default {
  name: 'demo-case',
  data() {
    return {
      src: 'http://demo.55lover.com/rainfall'
    }
  }
}
</script>

<style scoped>
.democase {
  width: 100vw;
  height: calc(100vh - 110px);
  margin-top: -30px;
}
.democase iframe {
  width: 100%;
  height: 100%;
  border-radius: 6px;
}
</style>
