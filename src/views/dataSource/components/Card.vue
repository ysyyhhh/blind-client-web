<template>
  <el-card class="box-card-component" style="margin-left:8px;">
    <div slot="header" class="box-card-header" @click="edit">
      <img src="http://localhost:9528/service-datasource/admin/image?path=1/1.jpg">
    </div>
    <div style="width:100%">
      <!-- <pan-thumb :image="avatar" class="panThumb" /> -->
      <!-- <mallki class-name="mallki-text" text="vue-element-admin" /> -->
      <el-row class="progress-item">
        <el-col :span="12">
          <span>数据源编号: </span>
          <span>{{ dataSource.id }}</span>
        </el-col>
        <el-col :span="12">
          <span>类型: </span>
          <span>{{ dataSource.type }}</span>
        </el-col>
      </el-row>
      <el-row class="progress-item">
        <el-col :span="12">
          <span>运行状态: </span>
          <span>{{ dataSource.status }}</span>
        </el-col>
        <el-col :span="12">
          <span>运行时间: </span>
          <span>{{ dataSource.runtime }}</span>
        </el-col>
      </el-row>
      <el-row class="progress-item">
        <el-col :span="12">
          <span>已发现障碍物: </span>
          <span>{{ dataSource.id }}</span>
        </el-col>
        <el-col :span="12">
          <span>实时监控信息: </span>
          <span>{{ dataSource.id }}</span>
        </el-col>
      </el-row>

    </div>
  </el-card>

</template>

<script>

// import PanThumb from '@/components/PanThumb'
// import Mallki from '@/components/TextHoverEffect/Mallki'

export default {
  filters: {
    // statusFilter(status) {
    //   const statusMap = {
    //     success: 'success',
    //     pending: 'danger'
    //   }
    //   return statusMap[status]
    // }
  },
  // components: { Pagination },
  props: {
    dataSource: {
      type: Object,
      default: () => {
        return {
          id: 1,
          runtime: 100,
          status: '正在运行',
          type: '无人车'
        }
      }
    }
  },
  data() {
    return {
      statisticsData: {
        article_count: 1024,
        pageviews_count: 1024
      }
    }
  },
  computed: {
  },
  methods: {
    edit() {
      console.log('edit')
      // this.$parent.handleUpdate(this.dataSource)
      this.$emit('edit', this.dataSource)
    }
  }
}
</script>

<style lang="scss" >
.box-card-component{
  .el-card__header {
    padding: 0px!important;
  }
}
</style>
<style lang="scss" scoped>
.box-card-component {
  // display: flex;
  // flex-direction: row;
  .box-card-header {
    position: relative;
    height: 130px;
    // width:50px;
    img {
      width: 100%;
      height: 100%;
      transition: all 0.2s linear;
      &:hover {
        transform: scale(1.1, 1.1);
        filter: contrast(130%);
      }
    }
  }
  .mallki-text {
    position: absolute;
    top: 0px;
    right: 0px;
    font-size: 20px;
    font-weight: bold;
  }
  .panThumb {
    z-index: 100;
    height: 70px!important;
    width: 70px!important;
    position: absolute!important;
    top: -45px;
    left: 0px;
    border: 5px solid #ffffff;
    background-color: #fff;
    margin: auto;
    box-shadow: none!important;
    ::v-deep .pan-info {
      box-shadow: none!important;
    }
  }
  .progress-item {
    margin-bottom: 20px;
    margin-top: 20px;
    padding: auto;
    // margin:20px;
    width: 100%;
    font-size: 14px;
  }
  @media only screen and (max-width: 1510px){
    .mallki-text{
      display: none;
    }
  }
}
</style>
