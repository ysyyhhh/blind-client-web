
<template>
  <el-card style="margin-left:8px;">
    <div style="margin-bottom:10px;font-size:18px">
      <!-- <img src="http://localhost:9528/service-datasource/admin/image?path=1/1.jpg"> -->
      全部区域 | 合计
    </div>
    <div style="width:100%">
      <!-- <pan-thumb :image="avatar" class="panThumb" /> -->
      <!-- <mallki class-name="mallki-text" text="vue-element-admin" /> -->

      <div>
        <div style="font-size:17px;margin-bottom:5px">障碍物总计</div>
        <div style="text-align:center;margin-bottom:5px">
          <el-row>
            <el-col :span="8">总发现数{{ total.isDeal + total.isNotDeal }}</el-col>
            <el-col :span="8">已处理数{{ total.isDeal }}</el-col>
            <el-col :span="8">未处理数{{ total.isNotDeal }}</el-col>
          </el-row>
        </div>
        <div style="height:180px"><chart height="100%" width="100%" /></div>
      </div>
      <div style="margin-top:10px">
        <div style="font-size:17px;margin-bottom:5px">障碍物总计</div>
        <div style="height:180px"><bar-chart height="100%" width="100%" /></div>
      </div>
      <div style="margin-top:10px">
        <div style="font-size:17px;margin-bottom:5px">   障碍物分类
        </div>
        <div style="height:300px"><annulus-chart height="80%" width="100%" /></div>
      </div>
    </div>
  </el-card>

</template>

<script>

// import PanThumb from '@/components/PanThumb'
// import Mallki from '@/components/TextHoverEffect/Mallki'
import Chart from './right/MixChart'
import BarChart from './right/BarChart'
import AnnulusChart from './right/AnnulusChart'
export default {
  name: 'TotalCard',
  components: { Chart, BarChart, AnnulusChart },
  data() {
    return {
      total: {
        isDeal: 10,
        isNotDeal: 20
      },
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
.chart-container{
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
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
