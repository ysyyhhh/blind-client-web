<template>
  <div class="about">
    <el-popover
      ref="popverRef"
      width="300"
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
        <div style="margin-bottom:5px">未读消息 <el-tag type="danger" style="postion:fixed;right:0px">一键已读</el-tag></div>
        <div class="content_checkbox">
          <el-scrollbar>
            <el-card v-for="(item,index) in messageList">
              <el-row>
                <el-col :span="12"><img src="item.imgPath" alt=""></el-col>
                <el-col :span="12">
                  <div>所属区域: {{ item.area }}</div>
                  <div>类型: {{ item.area }}</div>
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

export default {
  name: 'Message',
  data() {
    return {
      messageList: [1, 2, 3, 4],
      messageNum: 20,
      isHidden: false,
      checkList: []
    }
  },
  methods: {
    showPopver() {
      this.messageNum = 0
      this.isHidden = true
    },
    hidePopver() {
      this.messageNum = 0
      this.isHidden = true
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
