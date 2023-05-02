
<template>
  <el-card style="margin-left:8px;">
    <div style="margin-bottom:10px;margin-top:10px;font-size:18px">
      <!-- <img src="http://localhost:9528/service-datasource/admin/image?path=1/1.jpg"> -->
      全部区域 | 合计
    </div>
    <div style="width:100%;">
      <!-- <pan-thumb :image="avatar" class="panThumb" /> -->
      <!-- <mallki class-name="mallki-text" text="vue-element-admin" /> -->

      <div style="margin-top:20px;margin-bottom:20px;">
        <div style="font-size:17px;margin-bottom:15px;">障碍物总计
          <span>
            <el-select v-model="areaLevel" placeholder="区域级别" style="width: 100px" class="filter-item" @change="initTotal">
              <el-option v-for="item in levels" :key="item" :value="item" :label="levelName[item]" />
            </el-select>

          </span>
        </div>
        <div style="text-align:center;margin-bottom:5px">
          <el-row>
            <el-col :span="8">总发现数{{ total.isDeal + total.isNotDeal }}</el-col>
            <el-col :span="8">已处理数{{ total.isDeal }}</el-col>
            <el-col :span="8">未处理数{{ total.isNotDeal }}</el-col>
          </el-row>
        </div>
        <div style="height:200px"><chart :x-data="xData" :processed-data="processedData" :unprocessed-data="unprocessedData" height="100%" width="100%" /></div>
      </div>
      <div style="margin-top:10px">
        <div style="font-size:17px;margin-bottom:5px">障碍物总计</div>
        <div style="height:180px"><bar-chart height="100%" width="100%" :weeks="weeks" :discovery="discoveryData" :processing="processingData" /></div>
      </div>
      <div style="margin-top:10px">
        <div style="font-size:17px;margin-bottom:5px">   障碍物分类
        </div>
        <div style="height:300px"><annulus-chart height="80%" width="100%" :pie-data="pieData" /></div>
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
import { getAreaListByLevel, getObstacleTypeByDate, getObstacleCountByDate } from '@/api/dashboard'
export default {
  name: 'TotalCard',
  components: { Chart, BarChart, AnnulusChart },
  data() {
    return {
      totalNum: 0,
      unprocessedNum: 0,
      processedNum: 0,
      levelName: ['省', '市', '区县', '乡镇', '道路'],
      xData: [],
      processedData: [],
      unprocessedData: [],
      areaLevel: 2,
      levels: [0, 1, 2, 3, 4],
      pieData: [],
      weeks: [],
      discoveryData: [],
      processingData: [],
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
  created() {
    this.initWeeks()
    this.initClass()
    this.initTotal()
  },
  methods: {
    initTotal() {
      getAreaListByLevel(this.areaLevel).then(response => {
        //         0: {id: 9, fullName: "北京市-北京市-海淀区-北下关街道-大柳树路", level: 4, obstacleCount: 1, unprocessedObstacleCount: 0}
        // fullName: "北京市-北京市-海淀区-北下关街道-大柳树路"
        // id: 9
        // level: 4
        // obstacleCount: 1
        // unprocessedObstacleCount: 0
        this.xData = []
        this.processedData = []
        this.unprocessedData = []
        this.total.isDeal = 0
        this.total.isNotDeal = 0
        for (let i = 0; i < response.data.length; i++) {
          // fullName取最后一个 - 后面的
          const index = response.data[i].fullName.lastIndexOf('-')
          response.data[i].fullName = response.data[i].fullName.substring(index + 1)
          this.xData.push(response.data[i].fullName)
          this.processedData.push(response.data[i].obstacleCount - response.data[i].unprocessedObstacleCount)
          this.unprocessedData.push(response.data[i].unprocessedObstacleCount)
          this.total.isDeal += response.data[i].obstacleCount - response.data[i].unprocessedObstacleCount
          this.total.isNotDeal += response.data[i].unprocessedObstacleCount
        }

        // const area = {}
        // // area.push("",);
        // console.log(response)

        // this.total.isDeal = response.data.isDeal
        // this.total.isNotDeal = response.data.isNotDeal
      })
    },
    edit() {
      console.log('edit')
      // this.$parent.handleUpdate(this.dataSource)
      this.$emit('edit', this.dataSource)
    },
    initClass() {
      // [
      //         { value: 320, name: 'Industries' },
      //         { value: 240, name: 'Technology' },
      //         { value: 149, name: 'Forex' },
      //         { value: 100, name: 'Gold' },
      //         { value: 59, name: 'Forecasts' }
      //       ]
      getObstacleTypeByDate('', '1999-01-01', '9999-12-31').then(response => {
        console.log(response)
        this.pieData = Object.assign([])
        for (let i = 0; i < response.data.length; i++) {
          const obj = {}
          obj.value = response.data[i].count
          obj.name = response.data[i].type
          this.pieData.push(obj)
          // this.pieData[i].value = response.data[i].num
          // this.pieData[i].name = response.data[i].type
        }
        console.log(this.pieData)
      })
    },
    initWeeks() {
      const weeks = []
      const discoveryNum = []
      const processingNum = []
      // 获取最近7天的日期 YYYY-MM-DD
      for (let i = 0; i < 7; i++) {
        const date = new Date()
        date.setDate(date.getDate() - i)
        const year = date.getFullYear()
        let month = date.getMonth() + 1
        let day = date.getDate()
        if (month < 10) {
          month = '0' + month
        }
        if (day < 10) {
          day = '0' + day
        }
        weeks.push(year + '-' + month + '-' + day)
        discoveryNum.push(0)
        processingNum.push(0)
      }
      // console.log(weeks)

      getObstacleCountByDate('').then(response => {
        console.log('initWeeks')
        console.log(response)
        // this.lineData = response.data
        response.data.forEach(element => {
          const index = weeks.indexOf(element.date)
          if (index !== -1) {
            if (element.status === 'discovery') {
              discoveryNum[index] = element.count
            } else {
              processingNum[index] = element.count
            }
          }
        })
        this.weeks = weeks
        this.discoveryData = discoveryNum
        this.processingData = processingNum
        // discoveryNum[0] = 10
        console.log(weeks)
        console.log(discoveryNum)
        console.log(processingNum)
      })
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
