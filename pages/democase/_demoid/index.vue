<template>
  <section class="democase flex">
    <section class="demo-left">
      <div class="demo-title flex flex-align-center flex-pack-center">
        <svg width="76" height="25" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <defs>
            <filter id="blend">
              <!-- IE浏览器不支持overly混合模式，可使用multiply替代 -->
              <feBlend mode="overlay" in="SourceGraphic" in2="patternSource" />
            </filter>
            <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="55%" stop-color="red" />
              <stop offset="77%" stop-color="green" />
            </linearGradient>
            <pattern id="pattern" width="76" height="25" patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width="100%" height="100%" fill="url(#gradient)" filter="url(#blend)"></rect>
            </pattern>
          </defs>
          <text x="0" y="25" font-family="Microsoft Yahei" font-size="25" font-weight="900" fill="url(#pattern)">
            Demo
          </text>
        </svg>
      </div>
      <ul class="list">
        <li class="list-cell" :class="{ point: index % 2 === 0 }" v-for="(item, index) in $store.state.demoList" :key="index">
          <a href="javascript:;" class="link" @click="openSource(item)">{{ item.title }}</a>
        </li>
      </ul>
    </section>
    <section class="flex-1 demo-right">
      <iframe :src="src" frameborder="0" scrolling="no"></iframe>
    </section>
  </section>
</template>
<script>
export default {
  name: 'demo-case',
  async fetch({ store, query }) {
    await store.dispatch('getDemo', { id: query.demoid })
    await store.dispatch('postDemo', {
      page: 1,
      size: 10
    })
  },
  data() {
    return {
      src: this.$store.state.demoCase.url
    }
  },
  methods: {
    openSource(item) {
      this.src = item.url
    }
  }
}
</script>

<style scoped>
.democase {
  width: 100%;
  height: 100%;
  font-size: 0;
  line-height: 0;
}
.democase iframe {
  width: 100%;
  height: 100%;
}
.demo-left {
  width: 250px;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  background: #fff;
}
.list {
  width: 100%;
}
.list-cell {
  line-height: 25px;
  box-sizing: border-box;
  width: 100%;
  padding: 8px 13px;
}
.point .link {
  padding: 0;
}
.point .link:hover {
  background-size: 20px 17px;
}
@keyframes waveFlow {
  from {
    background-position-x: -10px, 0;
  }
  to {
    background-position-x: -30px, -20px;
  }
}
.demo-title {
  height: 50px;
  text-align: center;
  font-size: 25px;
  width: 100%;
  box-sizing: border-box;
  color: #444;
  margin-top: 13px;
}
</style>
