<template>
  <div>
    <section class="flex bgbox">
      <div class="music">
        <div class="music-list m-content">
          <ul class="list">
            <li class="list-cell flex flex-align-center flex-pack-justify" v-for="(item, index) in $store.state.musicList.result" :key="index">
              <span style="width: 25px; min-width: 25px;">{{ index + 1 }}. </span>
              <audio class="audio" :src="item.url"> {{ $t('message.SupportWeb') }} </audio>
              <i style="cursor: pointer" @click.self="playorpause(index, item.singername, item.songname)" :class="{active: index===i ? true: false }"></i>
              <a href="javascript:;" class="music-title" style="color:#000;margin-left: 10px;">{{ item.songname }}</a>
              <!-- <span style="margin: 0 5px">-</span>
              <a href="javascript:;">{{ item.singername }}</a> -->
              <span class="flex-1"></span>
              <div class="playStatus">
                <b></b>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
    <div class="music-bg flex flex-align-center" v-show="$store.state.GET_PLAY_STATUS">
      <div class="mb flex flex-align-center flex-pack-justify">
        <div class="music-btns flex flex-pack-justify">
          <a href="javascript:;" hidefocus="true" data-action="prev" class="prv" @click="prev" title="上一首(ctrl+←)">
            <span class="iconfont dp-icon-shangyiqu101 dp-icon-fff"></span>
          </a>
          <a href="javascript:;" hidefocus="true" data-action="pause" @click="isPlay" class="ply j-flag pas" title="播放/暂停(p)">
            <span v-if="names" class="iconfont dp-icon-bofang dp-icon-fff" style="font-size:20px"></span>
            <span v-else class="iconfont dp-icon-zanting dp-icon-fff" style="font-size:20px"></span>
          </a>
          <a href="javascript:;" hidefocus="true" data-action="next" class="nxt" @click="next" title="下一首(ctrl+→)">
            <span class="iconfont dp-icon-xiayiqu101 dp-icon-fff"></span>
          </a>
        </div>
        <div class="music-process flex-1" style="width:400px;">
          <div class="flex flex-pack-justify" style="color:#fff; font-size:14px;">
            <span>{{ title }}</span>
            <span><span class="currentTime">00:00</span>/{{ durationTime }}</span>
          </div>
          <div style="position:relative; width:100%" @click="pointPos($event)">
            <div class="base-line1 base-line-audio-all-process"></div>
            <div class="flex flex-align-center">
              <div class="base-line base-line-audio-process"></div>
              <div class="base-ball"></div>
            </div>
          </div>
        </div>
        <div class="volume-btns flex flex-align-center" style="width: 160px;">
          <div @click="volumeormute" style="width:2.8em;">
            <span v-if="volume" class="iconfont dp-icon-yinliangdayinliangda dp-icon-fff" style="font-size:20px"></span>
            <span v-else class="iconfont dp-icon-mutejingyin dp-icon-fff" style="font-size:20px"></span>
          </div>
          <div style="position:relative; width:100%" @click="pointVol($event, $event.offsetX)">
            <div class="base-line1 base-line-volume-all-process"></div>
            <div class="flex flex-align-center">
              <div class="base-line base-line-volume-process"></div>
              <div class="base-ball" draggable="true" @dragstart="dragStart($event, index)" @drag="drag($event, index)" @dragend="dragend($event, index)"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// icon 图标
import Asides from '~/components/Aside'
export default {
  name: 'music',
  props: {
    musicList: {}
  },
  head() {
    return {
      title: '聆听他的声音_音乐专栏_邓鹏博客'
    }
  },
  components: {
    Asides
  },
  computed: {
    // 以规定数量分割数组，并重组
    lists() {
      var arr = []
      this.$store.state.musicList.result.map((x, i) => {
        if (i % 10 == 0) {
          arr.push([])
        }
        arr[arr.length - 1].push()
      })
      return arr
    }
  },
  data() {
    return {
      list: [],
      totalcount: 100,
      currentPage4: 1,
      size: 10,
      page: 1,
      active: false,
      i: -1,
      names: true,
      timer: '',
      title: '',
      currentTime: '00:00',
      durationTime: '00:00',
      currentTimes: '00:00',
      index: 0, // 歌曲索引,
      volume: true,
      initVolume: 0.5,
      // 起始位置
      startPoint: 0,
      // 结束位置
      endPoint: 0,
      volumeWidth: 0,
      nowVolWidth: 0
    }
  },
  methods: {
    handleSizeChange(val) {
      this.size = val
      this.getQQMusic()
    },
    handleCurrentChange(val) {
      this.page = val
      this.getQQMusic()
    },
    // 获取音乐列表
    // async getQQMusic() {
    //   // 自定义配置axios
    //   var para = {
    //     size: this.size,
    //     page: this.page
    //   }
    //   let res = await this.$axios.$post(api.audio.getAudioList, para)
    //   if (res.isSuc) {
    //     let result = res.result
    //     this.totalcount = res.total_count
    //     this.$store.state.musicList.result = result
    //     this.$store.commit('MusicList', res)
    //   }
    // },
    // 播放暂停
    isPlay() {
      var $audio = $('.audio')
        .eq(this.index)
        .get(0)
      //改变暂停/播放icon
      if ($audio.paused) {
        $audio.play()
        this.names = false
      } else {
        $audio.pause()
        this.names = true
      }
    },
    // 下一曲
    next() {
      let musicList = this.$store.state.musicList.result
      if (this.index < musicList.length - 1) {
        this.playorpause(
          this.index + 1,
          musicList[this.index + 1].singername,
          musicList[this.index + 1].songname
        )
      } else {
        this.playorpause(0, musicList[0].singername, musicList[0].songname)
      }
    },
    prev() {
      // 上一曲 判断 当前播放歌曲索引 如果比0大则 可上一曲 否则调到最后一曲
      let musicList = this.$store.state.musicList.result
      if (this.index > 0) {
        this.playorpause(
          this.index - 1,
          musicList[this.index - 1].singername,
          musicList[this.index - 1].songname
        )
      } else {
        this.playorpause(
          musicList.length - 1,
          musicList[musicList.length - 1].singername,
          musicList[musicList.length - 1].songname
        )
      }
    },
    // 改变进度条
    updateProcess($audio) {
      var self = this,
        musicList = self.$store.state.musicList.result
      var value = Math.round(
        (Math.floor($audio.currentTime) / Math.floor($audio.duration)) * 100
      )
      // jquery 可实现实时更新当前进度
      $('.base-line-audio-process').css('width', value + '%')
      $('.currentTime').html(Coms.transTime($audio.currentTime))
      if (value == 100) {
        self.names = true
        if (self.index < musicList.length - 1) {
          self.playorpause(
            self.index + 1,
            musicList[self.index + 1].singername,
            musicList[self.index + 1].songname
          )
        } else {
          self.playorpause(0, musicList[0].singername, musicList[0].songname)
        }
        self.names = false
        clearInterval(self.timer) // 播放完歌曲 自动停止定时器
      }
    },
    // 进度直接跳转到点击位置
    pointPos(e) {
      var $audio = $('.audio')
        .eq(this.index)
        .get(0)
      $('.base-line-audio-process').width(e.offsetX)
      var pgsWidth = $('.base-line-audio-all-process').width()
      // 计算点击位置 与 播放总长度 的比例 算时间比例
      var rate = e.offsetX / pgsWidth
      $audio.currentTime = $audio.duration * rate
      this.updateProcess($audio)
    },
    // 点击喇叭，静音或者有声
    volumeormute() {
      var $audio = $('.audio')
        .eq(this.index)
        .get(0)
      if (this.volume) {
        this.volume = false
        $audio.volume = this.initVolume
      } else {
        this.volume = true
        $audio.volume = 0
      }
    },
    // 控制音量
    pointVol(e, x) {
      $('.base-line-volume-process').width(x)
      var pgsWidth = $('.base-line-volume-all-process').width()
      // 计算点击位置 与 播放总长度 的比例 算时间比例
      var rate = x / pgsWidth
      var $audio = $('.audio')
        .eq(this.index)
        .get(0)
      this.initVolume = rate
      $audio.volume = rate
    },
    // 拖拽控制音量
    dragStart(e) {
      // 保存起始位置 以及球的起始位置
      this.startPoint = e.offsetX
      // 保存起始base-line的宽度
      this.volumeWidth = $('.base-line-volume-process').width()
    },
    drag(e) {},
    dragend(e) {
      // 拖拽末位置-起始位置 拖拽距离 即 volume的长度 也要+
      var $min = e.offsetX - this.startPoint
      var nowVolWidth = this.volumeWidth + $min
      if (nowVolWidth >= $('.base-line-volume-all-process').width()) {
        this.nowVolWidth = $('.base-line-volume-all-process').width()
      } else if (nowVolWidth <= 0) {
        this.nowVolWidth = 0
      } else {
        this.nowVolWidth = nowVolWidth
      }
      this.pointVol(e, this.nowVolWidth)
    },
    // 点击图标播放歌曲
    async playorpause(index, singername, songname) {
      var self = this
      self.$store.commit('MUISC_PLAYED', true)
      self.firstplay = true
      self.index = index
      clearInterval(this.timer) // 避免再次选择歌曲时  没重复
      var s = []
      this.title = `${songname} - ${singername}`
      var str = ` 正在播放 ${songname} - ${singername}`
      $('title').html(str)
      // 滚动 标题
      s = $('title')
        .html()
        .split('')
      self.timer = setInterval(() => {
        s.push(s[0])
        s.shift() // 去掉数组的第一个元素
        document.title = s.join('')
      }, 1000) //设置时间间隔运行
      await $('.audio')
        .get(this.i)
        .pause()
      self.names = false
      self.i = index
      // console.log(`播放歌曲索引是：${index}`)
      var $audio = $('.audio')
        .eq(index)
        .get(0)
      //  设置音量
      if ($audio != null) {
        $audio.load()
        $audio.oncanplay = function() {
          // 获取音乐总时长
          self.durationTime = Coms.transTime($audio.duration)
        }
      }
      $audio.volume = this.initVolume
      // 获取音量
      // self.durationTime = Coms.transTime($audio.duration)
      //  设置进度条
      $audio.addEventListener(
        'timeupdate',
        function() {
          self.updateProcess($audio)
        },
        false
      )
      $audio.play()
      // console.log($('.audio').eq(index).get(0).play())
    }
  },
  beforeMount() {
    // this.getQQMusic();
    // console.log(this.$refs['audio'])
  },
  destroyed() {
    clearInterval(this.timer)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
.music {
  width: 100%;
}
.m-content {
  padding: 20px 10px;
}
.avatar {
  width: 124px;
  height: 124px;
  border: 1px solid #d5d5d5;
  background: #fff;
  padding: 2px;
  border-radius: 2px;
  margin-right: 30px;
}
.music-header {
  font-size: 14px;
}
.user {
  border-bottom: 1px solid #d5d5d5;
  padding-bottom: 15px;
}
.music-list-title {
  padding-bottom: 10px;
  border-bottom: 2px solid #409eff;
}
.name {
  color: #000;
  font-size: 24px;
  font-weight: bold;
  margin-right: 15px;
}
.from {
  color: #999;
}
.intro {
  padding-top: 15px;
}
.address {
  padding: 15px 0;
}

.music-list {
  font-size: 14px;
}
.music-list-title {
  font-size: 24px;
}
.music-list-title span {
  font-size: 14px;
  color: #999;
}
.list .list-cell {
  height: 50px;
  transition: all 0.4s;
  font-size: 14px;
  padding: 0 20px;
}
.list .list-cell:hover {
  background: #eee;
}
.list .list-cell i {
  display: inline-block;
  width: 18px;
  min-width: 18px;
  height: 18px;
  background: url(../assets/images/bf1.png) no-repeat;
  background-size: cover;
}
.list-cell a {
  color: #888;
}
.list-cell a:hover {
  text-decoration: underline !important;
}
.list .list-cell i:hover {
  background: url(../assets/images/bf3.png) no-repeat;
  background-size: cover;
}
.list .list-cell i.active {
  background: url(../assets/images/bf2.png) no-repeat;
  background-size: cover;
}
.playStatus {
  padding: 5px 10px;
  background: #409eff;
  width: 15px;
  height: 10px;
  margin-left: 10px;
}
.playStatus b {
  display: block;
  width: 15px;
  height: 10px;
  background: url(../assets/images/music.png) no-repeat;
  background-size: cover;
}
.list .list-cell i.active ~ .playStatus b {
  background: url(https://qzonestyle.gtimg.cn/aoi/skin/img/skin-gif/1-music-sonic.gif)
    no-repeat;
  background-size: cover;
}
.page {
  text-align: right;
  margin-top: 60px;
}
.music-bg {
  height: 80px;
  width: 100%;
  background: linear-gradient(70deg, #333, #666);
  background: -webkit-linear-gradient(70deg, #333, #666);
  background: -moz-linear-gradient(70deg, #333, #666);
  background: -ms-linear-gradient(70deg, #333, #666);
  background: -o-linear-gradient(70deg, #333, #666);
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 9999;
}
.mb {
  max-width: 1500px;
  width: 100%;
  box-sizing: border-box;
  padding: 0 30px;
  margin: 0 auto;
}
.music-btns {
  width: 120px;
  margin-top: 10px;
}
.music-process {
  margin-left: 40px;
  margin-right: 80px;
  margin-top: -9px;
}
.base-line1 {
  position: absolute;
  top: 3px;
  width: 100%;
  z-index: -1;
  height: 2px;
  background: #aaa;
}
.base-line {
  height: 2px;
  background: #fff;
  width: 0%;
}
.base-ball {
  width: 8px;
  height: 8px;
  border-radius: 100%;
  background: #fff;
  box-shadow: 0 0 2px 2px #fff;
}
.base-line-volume-process {
  width: 50%;
}
.base-line-audio-process {
  width: 0;
}
</style>
