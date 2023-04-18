<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>
<script>
import * as echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
export default {
  name: 'AnnulusChart',
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data() {
    return {
      myChart: '',
      opinionData2: [
        { value: 1, name: '校园暴力行为', itemStyle: 'red' },
        { value: 45, name: '正常行为', itemStyle: '#1FC48D' },
        { value: 3, name: '睡觉行为', itemStyle: '#6DC8EC' },
        { value: 3, name: '玩手机行为', itemStyle: '#3F8FFF' }
      ]
    }
  },
  mounted: function() {
    this.drawLine()
  },
  methods: {
    drawLine() {
      this.myChart = echarts.init(this.$el, 'macarons')
      this.myChart.setOption({
        // title: {
        //   text: '障碍物分类', // 主标题
        //   subtext: '', // 副标题
        //   x: 'left' // x轴方向对齐方式
        // },
        grid: { containLabel: true },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {d}%'
        },
        // color: ['#1FC48D', '#F5A60A', '#6DC8EC', '#3F8FFF'],
        color: ['red', '#1FC48D', '#6DC8EC', '#3F8FFF'],
        // backgroundColor: '#ffffff',
        legend: {
          orient: 'vertical',
          icon: 'circle',
          align: 'left',
          x: 'left',
          y: 'bottom',
          data: ['校园暴力行为', '正常行为', '睡觉行为', '玩手机行为']
        },
        series: [
          {
            name: '课堂行为',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            center: ['60%', '50%'],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              },
              color: function(params) {
                // 自定义颜色
                var colorList = ['red', '#1FC48D', '#6DC8EC', '#3F8FFF']
                return colorList[params.dataIndex]
              }
            },
            data: this.opinionData2
          }
        ]
      })
    }
  }
}
</script>
