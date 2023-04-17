<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">name: {{ name }}</div>
    <el-tooltip class="item" effect="dark" content="admin权限显示" placement="top-start">
      <el-button v-permission="['admin']">admin</el-button>
    </el-tooltip>
    <el-tooltip class="item" effect="dark" content="admin&editor权限都能显示" placement="top-start">
      <el-button v-permission="['admin','user']">editor</el-button>
    </el-tooltip>

    <router-link :to="{path: '/obstacleDetail/index', query: {obstacleId:'1' }}">
      <button>跳转</button>
    </router-link> -->

    <div class="left-bar">
      <div>left</div>
    </div>
    <div class="right-bar">
      <div><total-card /></div>
    </div>
  </div>
</template>

<script>
import permission from '@/directive/permission/index.js' // 权限判断指令
import TotalCard from './components/TotalCard.vue'

export default {
  name: 'Dashboard',
  components: { TotalCard },
  directives: { permission } // 自定义指令
}
</script>

<style lang="scss" scoped>

.left-bar {
  float: left;
  width: 66%;
  height: 100%;
  position: absolute;
  overflow: auto;
  background-color: azure;
}
.right-bar {
  // margin-top: -190px;
  float: right;
  right: 0px;
  width: 33%;
  height: 100%;
  position: absolute;
  overflow: auto;
  background-color: antiquewhite;
}
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
