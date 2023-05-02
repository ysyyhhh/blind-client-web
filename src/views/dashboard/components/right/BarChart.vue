<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import * as echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
export default {
  name: 'BarChart',
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    },
    weeks: {
      type: Array,
      default: () => []
    },
    processing: {
      type: Array,
      default: () => []
    },
    discovery: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      charts: '',
      score: '100',
      source: [
        ['分类', '发现', '处理']
        // ['单选题', 45, 12],
        // ['多选题', 30, 15],
        // ['判断题', 45, 8],
        // ['填空题', 10, 2]
      ]
    }
  },
  watch: {
    weeks(val) {
      console.log(val)
      console.log('weeks changed')
      this.draw()
    },
    processing(val) {
      console.log(val)
      console.log('processing changed')
      this.draw()
    },
    discovery(val) {
      console.log(val)
      console.log('discovery changed')
      this.draw()
    }
  },
  mounted() {
    // this.$nextTick(function() {
    this.draw()
    // })
  },
  methods: {
    draw() {
      // this.source[]
      for (let i = 0; i < this.weeks.length; i++) {
        const arr = []
        arr.push(this.weeks[i])
        arr.push(this.discovery[i])
        arr.push(this.processing[i])
        this.source.push(arr)
        // this.source[i + 1][0] = this.weeks[i]
        // this.source[i + 1][1] = this.discovery[i]
        // this.source[i + 1][2] = this.processing[i]
      }
      this.charts = echarts.init(this.$el, 'macarons')
      this.charts.setOption({
        legend: {},
        tooltip: {},
        dataset: {
          source: this.source // 连接数据
        },
        xAxis: { type: 'category' },
        yAxis: {
        // 这个地方如果需要在Y轴定义最大值就放开,如果需要根据数据自适应的话,就注释掉
          // type: "value",
          // max: this.score,
          // maxInterval: this.score * 0.2,
          // minInterval: 1,
          // splitNumber: 4
        },
        grid: { bottom: 20, top: 30 },
        series: [
          {
            type: 'bar', // 表示这个是柱状图
            barCategoryGap: '40%',
            itemStyle: { color: '#999' }, // 定义颜色
            tooltip: {
              formatter: params => {
              // console.log(params)   打印这个params,按自己需要拼接字符串
                return ` ${params.value[0]} <br/>
                         ${params.seriesName}:${params.value[1]}`
              }
            }
          },
          {
            type: 'bar',
            barCategoryGap: '40%',
            itemStyle: { color: '#81cebe' },
            tooltip: {
              formatter: params => {
                return ` ${params.value[0]} <br/>
                         ${params.seriesName}:${params.value[2]}`
              }
            }
          }
        ]
      })
    }
  }
}

</script>
