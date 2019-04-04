<template>
  <div class="albums left-content flex">
    <div class="articles" id="articles">
      <div class="title flex flex-align-center">
        <span class="el-icon-picture dp-icon-00AACD"></span>
        <div>
          <span class="title-text">相册专栏</span>
          <span class="title-label">Album column</span>
        </div>
      </div>
      <div class="album-list" ref="imgs">
        <ul id="ul" ref="ul"></ul>
      </div>
    </div>
    <!-- 右边内容区域 -->
    <!-- <div class="right-content">
      <asides></asides>
    </div> -->
  </div>
</template>

<script>
import Asides from '@/components/Aside'
export default {
  name: 'vue-waterfall-easy',
  head() {
    return {
      title: '美丽无须多言_相册专栏_邓鹏博客'
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
      pagesize: 300,
      // 页值
      page: 1,
      //
      li_num: 0,
      //
      pul: '',
      res: []
    }
  },
  components: {
    Asides
  },
  beforeMount() {
    this.getPersonAlbum()
  },
  methods: {
    lookMore(id) {
      this.$router.push({
        name: 'adetails',
        params: { articleid: id, type: 'a' }
      })
    },
    handleSizeChange(val) {
      // 每页多少条
      // console.log(val)
      this.pagesize = val
      let pul = this.$refs.ul
      pul.innerHTML = ''
      this.getPersonAlbum()
    },
    handleCurrentChange(val) {
      // 当前页数
      this.page = val
      // 清空ul
      let pul = this.$refs.ul
      pul.innerHTML = ''
      this.getPersonAlbum()
    },
    async getAlbum(res) {
      let self = this
      self.list = res.result
      self.totalcount = this.$store.state.albumsList.total
      // console.log(this.list)
      let pul = self.$refs.ul
      let _imgs = self.$refs.imgs
      // 计算一排可以放多少个li 每个li 200px
      let li_num = 5
      let li_width = pul.clientWidth / li_num
      // 初始化li个数和img图片
      for (let i = 0; i < li_num; i++) {
        let left = li_width * i
        if (self.list[i].personsrc) {
          pul.innerHTML += `<li class="album-list-cell" style="width: ${li_width}px; position: absolute; left:${left}px; font-size:0;">
        <img src="${
          self.list[i].personsrc
        }" width="${li_width}px" style="box-sizing:border-box; border:2px solid #fff;">
      </li>`
        }
      }
      return 'ok'
    },
    async getAlbum2() {
      let self = this
      let pul = self.$refs.ul
      let li_num = 5
      let li_width = pul.clientWidth / li_num
      let largestHeight
      for (let j = 4; j < self.list.length; j++) {
        let smallest = await self.findSmallIndex(pul, li_num, li_width)
        if (self.list[j].personsrc) {
          pul.children[smallest].innerHTML += `<img src="${
            self.list[j].personsrc
          }" width="${li_width}px" style="box-sizing:border-box; border:2px solid #fff;">`
        }
        largestHeight = await self.findLargeIndex(pul, li_num, li_width)
      }
      document.getElementById('ul').style.height = largestHeight + 'px'
    },
    async findSmallIndex(pul, li_num, li_width) {
      // body...
      var minLiHeight = pul.children[0].clientHeight
      let min = 0
      for (let i = 0; i < li_num; i++) {
        if (pul.children[i].clientHeight < minLiHeight) {
          minLiHeight = pul.children[i].clientHeight
          min = i
        }
      }
      return min
    },
    findLargeIndex(pul, li_num, li_width) {
      var maxLiHeight = pul.children[0].clientHeight
      for (let i = 0; i < li_num; i++) {
        if (pul.children[i].clientHeight > maxLiHeight) {
          maxLiHeight = pul.children[i].clientHeight
        }
      }
      return maxLiHeight
    },
    async getPersonAlbum() {
      let self = this
      let para = {
        page: self.page,
        size: self.pagesize,
        albumtype: -1 // 照片分类
      }
      let res = await this.$axios.$post(api.personAlbum.getPersonAlbum, para)
      if (res.isSuc) {
        // this.res = await res.result.map(x => {
        //   return x.personsrc
        // })
        await self.getAlbum(res)
        await self.getAlbum2()
      }
    }
  }
}
</script>
<style type="text/css">
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#ul {
  position: relative;
  min-height: 270vh;
}
.articles {
  padding-bottom: 60px;
  width: 100%;
}
.album-list {
  flex-wrap: wrap;
  padding-top: 20px;
}
</style>
