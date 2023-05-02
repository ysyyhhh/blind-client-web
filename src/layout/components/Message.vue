<template>
  <div class="about">
    <el-popover
      ref="popverRef"
      width="400"
      placement="top-end"
      trigger="click"
      :offset="-10"
      popper-class="popverClass"
      @show="showPopver"
      @hide="hidePopver"
    >
      <!-- 触发事件 -->
      <div slot="reference" class="div_test">
        <div>
          <el-badge :value="messageNum" :hidden="isHidden" :max="9999" style="margin-top:12px">
            <i class="el-icon-message-solid" style="position:relative;top:-8px;right:-5px" />
          </el-badge>
        </div>
      </div>

      <!-- 弹框内容 -->
      <div class="div_content">
        <div style="margin-bottom:5px">未读消息
          <!-- <el-tag type="danger" style="postion:fixed;right:0px">一键已读</el-tag> -->

        </div>
        <div class="content_checkbox">
          <el-scrollbar>
            <el-card v-for="(item,index) in messageList" :key="item" :index="index" @click.native="clickMessage(item)">
              <el-row>
                <el-col :span="12"><img :src="item.imagePath" style="width:90%;height:100%"></el-col>
                <el-col :span="12">
                  <div>所属区域: {{ item.location }}</div>
                  <div>类型: {{ item.type }}</div>
                  <div>发现时间: {{ item.discoveryTime }} </div>
                </el-col>
              </el-row>
            </el-card>
          </el-scrollbar>

        </div>

        <!-- <div class="content_butts">
          <el-button>取消</el-button>
          <el-button type="primary">应用</el-button>
        </div> -->
      </div>
    </el-popover>
  </div>
</template>

<script>
import { getUnReadMessageList } from '@/api/message'

import { readMessage } from '@/api/message'
import { mapGetters } from 'vuex'
export default {
  name: 'Message',
  computed: {
    ...mapGetters([
      'sidebar'
    ])
  },
  data() {
    return {
      messageList: [{
        discoveryTime: '2023-04-02',
        imagePath: 'image1.png',
        isRead: false,
        location: '北京市-北京市-海淀区-北下关街道-大柳树路',
        obstacleId: 1,
        type: 'Type 1',
        userId: 5
      }],
      messageNum: 20,
      isHidden: false,
      checkList: []
    }
  },
  created() {
    console.log('message')
    this.initMessageList()
  },

  methods: {
    clickMessage(item) {
      console.log(item)

      readMessage(item.obstacleId).then(res => {
        console.log(res)
        this.$router.push({
          path: '/obstacleDetail/index',
          query: {
            obstacleId: item.obstacleId
          }
        })
        this.sidebar.opened = false
      })
      // this.isHidden = true
    },
    setMessageList(list) {
      if (list == null) {
        list = []
      }
      for (let i = 0; i < list.length; i++) {
        const location = list[i].location
        const lastIndex = location.lastIndexOf('-')
        const secondIndex = location.lastIndexOf('-', lastIndex - 1)
        list[i].location = location.substring(secondIndex + 1)
      }
      this.messageList = list
      this.messageNum = list.length
      if (this.messageNum == 0) {
        this.isHidden = true
      } else {
        this.isHidden = false
      }
    },
    initMessageList() {
      console.log('hello')
      getUnReadMessageList().then(res => {
        console.log(res)
        this.setMessageList(res.data)
      })
    },
    showPopver() {
    //   this.messageNum = 0
    //   this.isHidden = true
      this.initMessageList()
    },
    hidePopver() {
      this.initMessageList()
    //   this.messageNum = 0
    //   this.isHidden = true
    }
  }
}
</script>

<style lang="scss" scoped>
.about {
  display: flex;
  justify-content: center;
  .div_test {
    // position: relative;
    // right: 0px;
    width: 40px;
  }
}
</style>

<style lang="scss">
.el-popover.popverClass {
  .div_content {

    .content_checkbox {
      // height: 200px;
      // .el-checkbox-group {
      //   display: flex;
      //   flex-direction: column;
      // }
    }
    .content_butts {
      // margin-top: 20px;
      display: flex;
      justify-content: flex-end;
      .el-button {
        // padding: 7px 14px;
      }
    }
  }
}
</style>
