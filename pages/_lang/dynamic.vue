<template>
  <section class="flex left-content">
    <div class="dynamic flex-1">
      <div class="title flex flex-align-center">
        <span class="iconfont dp-icon-iconfontdongtaidianji dp-icon-00AACD"></span>
        <span class="title-text">动态专栏</span>
        <span class="title-label">Dynamic column</span>
      </div>
      <div class="dy-box bgbox flex" v-for="(item, index) in lists" :key='index'>
        <div class="avatar">
          <img src="http://scenery.55lover.com/image/scenery/23115938.7a36240.jpg" alt="avatar">
        </div>
        <div class="dy-con flex-1">
          <div class="con">
            <div class="con-first">
              <div class="content">
                <nuxt-link :to="{ name: 'home' }" style="color:#409EFF">FeRookie。</nuxt-link> &nbsp;&nbsp;{{ item.content }}
              </div>
              <div class="time"><span>{{ $t('message.PostTime') }}：</span><span>{{ item.createAt | time }}</span></div>
            </div>
            <div v-if="item.commentsList.length > 0" :class="{'foldheight': foldheight,'comments-area': commentsArea}">
              <div class="comment-area">
                <div v-for="(item1, index1) in item.commentsList" :key="index1">
                  <div class="comment-item">
                    <span v-if="item1.isreply === 1">
                      <span style="color:#409EFF">{{ item1.username }}</span>{{ $t('message.Reply') }}<span style="color:#409EFF">{{ item1.tousername }}</span>
                    </span>
                    <span v-else>
                      <span style="color:#409EFF">{{ item1.username }}</span>
                    </span>:
                    <span>{{ item1.comment }}</span>
                    <span class="replys" style="color:#409EFF;cursor: pointer;margin-left: 10px;" @click="reply(index, item1.userid, item1.touserid, item1.username, item1.tousername)">{{ $t('message.Reply') }}</span>
                    <span style="margin-left: 10px;font-size:12px;">{{ item1.createAt | time }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="fold" v-if="item.commentsList.length > 2" @click="foldheight = !foldheight">
              <span v-if="!foldheight">{{ $t('message.UnFold') }}</span>
              <span v-else>{{ $t('message.Collapse') }}</span>
            </div>
          </div>
          <div class="comment">
            <el-input type="textarea" v-model="item.value" :placeholder="item.placeholder"></el-input>
            <div class="btn-primary">
              <el-button type="primary" @click="addComments(item.id, item.value)">{{ $t('message.PostComment') }}</el-button>
            </div>
          </div>
        </div>
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
import Cookies from 'js-cookie'

export default {
  name: 'dynamic',
  head() {
    return {
      title: '他又在说什么_动态专栏-FeRookie的博客'
    }
  },
  filters: {
    time(val) {
      return Coms.getCommonTime1(val)
    }
  },
  data() {
    return {
      list: [],
      comment: '',
      isreply: 0,
      placeholder: '',
      value: '',
      testLogin: false,
      foldheight: false,
      commentsArea: true,
      userid: '',
      username: '',
      touserid: 'd17692be-eca7-41ef-87df-aef4313e2b02', // m如果没有设置，则默认管理员
      tousername: 'FeRookie' // 如果没有设置，则默认管理员
    }
  },
  components: {
    Asides
  },
  computed: {
    lists() {
      var arr = []
      this.list.forEach(val => {
        // val.value = this.value // 返回的不是observe对象
        this.$set(val, 'value', '') // 返回的是observe对象 ,深入响应式
        this.$set(val, 'placeholder', '') // 返回的是observe对象 ,深入响应式
        arr.push(val)
      })
      return arr
    }
  },
  methods: {
    async getDynamicList() {
      let res = await this.$axios.$get(`${api.dynamic.getDynamicList}`)
      if (res.isSuc) {
        this.list = res.result
        setTimeout(() => {
          sr.reveal(document.querySelectorAll('.dy-box'))
        }, 0)
      } else {
        this.$message.info('作者没有发布动态')
      }
    },
    reply(index, userid, touserid, username, tousername) {
      this.isreply = 1
      // this.userid = touserid
      // this.username = tousername
      this.touserid = userid
      this.tousername = username
      this.list[index].placeholder = `回复${username}：`
      // alert(this.tousername +'--'+ this.touserid)
    },
    async addComments(dynamicid, comment) {
      let id = Cookies.get('_55lover_id')
      let name = Cookies.get('_55lover_name')
      if (id) {
      } else {
        this.$message({
          showClose: true,
          message: '未登录或者登录信息已过期'
        })
        return
      }
      // alert( this.tousername +'--'+ this.touserid )
      var para = {
        dynamicid: dynamicid,
        userid: id, // 登录用户
        username: name, // 登录用户
        touserid: this.touserid, // 默认管理员 'd17692be-eca7-41ef-87df-aef4313e2b02',
        tousername: this.tousername, // 默认管理员 'FeRookie',
        isreply: this.isreply,
        comment: comment
      }
      let res = await this.$axios.$post(`${api.dynamic.addComments}`, para)
      if (res.isSuc) {
        await this.getDynamicList()
        this.$message({
          showClose: true,
          message: res.message,
          type: 'success'
        })
      }
    }
  },
  beforeMount() {
    this.getDynamicList()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
a:hover {
  text-decoration: underline;
}
.dy-box {
  padding: 40px;
}
.avatar img {
  width: 60px;
  height: 60px;
  border-radius: 4px;
  margin-right: 20px;
}
.dy-con {
  border-radius: 3px;
}
.dy-con:hover {
  box-shadow: 1px 1px 10px 2px #ccc;
  transition: all 0.4s;
  border-color: red;
}
.dy-con .con {
  font-size: 13px;
  color: #555;
}
.con-first {
  padding: 20px;
  border: 1px solid #87ceeb;
  border-radius: 3px 3px 0 0;
}
.dy-con .content {
  font-size: 16px;
  line-height: 1.6;
  color: #333;
}
.dy-con .time {
  margin: 15px 0 0;
}
.comments-area {
  border: 1px solid #87ceeb;
  border-top: 0;
  border-bottom: 0;
  padding: 0 20px;
  max-height: 64px;
  overflow: hidden;
  transition: all 0.5s ease;
  -moz-transition: all 0.5s ease;
  -webkit-transition: all 0.5s ease;
  margin-bottom: 5px;
}
.comment-area {
  margin-top: 20px;
}
.foldheight {
  max-height: 1000px;
}

.fold {
  border: 1px solid #87ceeb;
  border-top: 0;
  border-bottom: 0;
  text-align: center;
  cursor: pointer;
}
.fold span {
  display: inline-block;
  width: 120px;
  height: 36px;
  line-height: 36px;
  color: #87ceeb;
  border: 1px solid #87ceeb;
  border-radius: 4px;
}
.fold span:hover {
  border: 1px solid #13afff;
  color: #13afff;
}
.comment {
  border: 1px solid #87ceeb;
  border-top: 0;
  padding: 15px;
  border-radius: 0 0 3px 3px;
}
.comment textarea {
  width: 80%;
  min-height: 16px;
  border-radius: 3px;
  padding: 5px 10px;
  font-size: 14px;
}
.btn-primary {
  margin-top: 15px;
}
.replys:hover {
  text-decoration: underline;
}
</style>
