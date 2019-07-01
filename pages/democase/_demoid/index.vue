<template>
  <section class="democase">
    <iframe :src="$store.state.demoCase.url" frameborder="0" scrolling="no"></iframe>
  </section>
</template>
<script>
export default {
  name: 'demo-case',
  async fetch({ store, query }) {
    console.log(query)
    await store.dispatch('getDemo', { id: query.demoid })
  }
}
</script>

<style scoped>
.democase {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  font-size: 0;
  line-height: 0;
}
.democase iframe {
  width: 100%;
  height: 100%;
}
</style>
