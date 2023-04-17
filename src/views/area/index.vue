<template>
  <div class="app-container">
    <el-tabs v-model="activeName">

      <el-tab-pane label="平面图" name="directly">

        <!-- <el-input v-model="inputData" placeholder="Please input" style="width:400px;max-width:100%;" />
        <el-button type="primary" icon="el-icon-document" @click="handleCopy(inputData,$event)">
          copy1
        </el-button> -->
        <plan />
      </el-tab-pane>

      <el-tab-pane label="区域列表" name="v-directive">
        <area-table />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
// import clip from '@/utils/clipboard' // use clipboard directly
// import clipboard from '@/directive/clipboard/index.js' // use clipboard by v-directive
import AreaTable from './components/AreaTable'
import Plan from './components/Plan'
// import AreaTable from './components/AreaTable.vue'
export default {
  name: 'ClipboardDemo',
  components: { AreaTable, Plan },
  // AreaTabledirectives: {
  //   // clipboard
  // },
  data() {
    return {
      activeName: 'directly',
      inputData: 'https://github.com/PanJiaChen/vue-element-admin'
    }
  },
  methods: {
    handleCopy(text, event) {
    //   clip(text, event)
    },
    clipboardSuccess() {
      this.$message({
        message: 'Copy successfully',
        type: 'success',
        duration: 1500
      })
    }
  }
}
</script>

