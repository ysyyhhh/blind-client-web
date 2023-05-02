<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import * as echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from '@/utils/resize'

export default {
  mixins: [resize],
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
    },
    pieData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    pieData(val) { // message即为父组件的值，val参数为值
      console.log(val)
      console.log('pieData changed')
      this.initChart()
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')

      const legendData = []
      for (let i = 0; i < this.pieData.length; i++) {
        legendData.push(this.pieData[i].name)
      }
      console.log(legendData)
      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          bottom: '2',
          // data: ['Industries', 'Technology', 'Forex', 'Gold', 'Forecasts']
          data: legendData
        },
        series: [
          {
            name: 'Obstacle Type',
            type: 'pie',
            roseType: 'radius',
            radius: [15, 95],
            center: ['50%', '38%'],
            data: this.pieData,
            // data: [
            //   { value: 320, name: 'Industries' },
            //   { value: 240, name: 'Technology' },
            //   { value: 149, name: 'Forex' },
            //   { value: 100, name: 'Gold' },
            //   { value: 59, name: 'Forecasts' }
            // ],
            animationEasing: 'cubicInOut',
            animationDuration: 2600
          }
        ]
      })
    }
  }
}
</script>
