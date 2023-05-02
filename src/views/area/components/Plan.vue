<template>
  <div class="app-container" style="display:flex;" @click="pageClick">
    <div style="width: 20%; margin-right:30px;">
      <el-input v-model="filterText" placeholder="Filter keyword" style="margin-bottom:30px;" />
      <el-tree
        ref="tree2"
        :data="treeData"
        :props="defaultProps"
        :filter-node-method="filterNode"
        :expand-on-click-node="false"
        class="filter-tree"
        default-expand-all
        @node-click="handleNodeClick"
      />
    </div>
    <div style="width:50%">
      <div :style="{width:'100%',height:'550px'}" @click.stop="">
        <el-amap
          class="amap-demo"
          vid="amap"
          :plugin="plugin"
          :center="center"
          :zoom="zoom"
          :style="{width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0, 0.5)', borderRadius: '6px'}"
        >
          <el-amap-marker
            v-for="(marker, index) in obstacles"
            :key="index"
            :position="marker.position"

            :events="marker.events"
            :ext-data="marker"
          >
            <div>
              <img :src="obstacleIcon" width="30px" height="30px">
            </div>
            <!-- <div class="marker-using-slot">使用slot的Marker</div> -->
          </el-amap-marker>

          <el-amap-info-window
            :visible="infoWindow.visible"
            :position="infoWindow.position"
            :content="infoWindow.content"
            :offset="[5, -28]"
            :events="infoWindow.events"
          >
            <div>
              <p>{{ infoWindow.text }}</p>
              <!-- <button @click="clickButton">点击按钮</button> -->
            </div>
          </el-amap-info-window>

        </el-amap>
      </div>
    </div>
    <div style="width:25%;margin-left:30px;">
      <div>
        障碍物全展示
        <el-switch v-model="showObstacle.showAllObstacles" />
      </div>

      <el-card :body-style="{ width: '400px' }">
        <div style="" />
        <span>区域编号：<span v-text="selectedArea.id" /></span>
        <el-button v-if="selectedArea.isSubscribed == 0" type="text" class="button" @click="modifyisSubscribed(1)">订阅</el-button>
        <el-button v-else type="text" class="button" @click="modifyisSubscribed(0)">取消订阅</el-button>
        <div style="">
          <div>区域全称：<span v-text="selectedArea.fullName" /></div>
          <div>行政级别：<span v-text="selectedArea.level" /></div>
          <div>总发现障碍物数量：<span v-text="selectedArea.obstacleCount" /> </div>
          <div>待处理障碍物数量：<span v-text="selectedArea.unprocessedObstacleCount" /></div>
        </div>
      </el-card>
      <el-card :body-style="{ padding: '0px',width:'100%' }">
        <div>障碍物列表</div>
        <el-table
          :key="tableKey"
          :data="obstaclesPageList"
          border
          fit
          highlight-current-row
          style="width: 100%; font-size:12px;"
        >
          <!-- <el-table-column label="ID" prop="id" align="center" width="35px" :show-overflow-tooltip="true">
            <template slot-scope="{row}">
              <span>{{ row.data.id }}</span>
            </template>
          </el-table-column> -->
          <el-table-column label="类型" align="center" width="62px" :show-overflow-tooltip="true">
            <template slot-scope="{row}">
              <span>{{ row.data.type }}</span>
            </template>
          </el-table-column>
          <el-table-column label="所属区域" width="130px">
            <template slot-scope="{row}">
              <span class="link-type" @click="handleUpdate(row)">{{ row.data.location }}</span>
              <!-- <el-tag>{{ row.data.location }}</el-tag> -->
            </template>
          </el-table-column>
          <el-table-column label="发现时间" width="88px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.data.discoveryTime }}</span>
            </template>
          </el-table-column>
          <el-table-column label="处理情况" width="60px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.data.processingStatus == 1?'已处理':'未处理' }}</span>
            </template>
          </el-table-column>
        </el-table>
        <pagination
          v-show="obstacleQuery.total>0"
          :page-count="2"
          small
          style="padding:2px;height:30px"
          :total="obstacleQuery.total"
          :page.sync="obstacleQuery.page"
          :limit.sync="obstacleQuery.limit"
          @pagination="getObstaclePage"
        />

      </el-card>
    </div>
  </div>
</template>

<style scoped>
.marker-using-slot {
  border: 3px solid #000;
  margin: 0;
  white-space: nowrap;
  padding: 0 10px;
  background-color: rgba(255, 255, 255, 0.2);
}
</style>
<script>

import { getUnprocessedObstacleListByArea, updateObstacleProcessingStatus } from '@/api/obstacle'
import { unSubscribeArea, subscribeArea, getAreaTree, getLocation, getAreaById } from '@/api/area'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

import waves from '@/directive/waves' // waves directive

import obstacleIcon from '@/assets/icons/svg/obstacle.svg'

// import { loadAmap, loadPlugins } from 'Amap-vue'
export default {
  name: 'Plan',
  components: { Pagination },
  directives: { waves },
  filters: {
  },
  data() {
    const self = this
    // const obstacleImg = require('../../../icons/svg/obstacle.svg')
    return {
      obstaclesPageList: [],
      showObstacle: {
        showAllObstacles: true,
        selectArea: ''
      },
      obstacleQuery: {
        page: 1,
        total: 20,
        limit: 5
      },
      selectedArea: {
        fullName: '北京市-北京市-海淀区',
        id: 1,
        level: 2,
        obstacleCount: 7,
        unprocessedObstacleCount: 7
      },
      obstacleIcon,
      infoWindow: {
        position: [116.329966, 39.955451],
        visible: false,
        content: '使用slot的InfoWindow',
        events: {
          close: (e) => {
            this.infoWindow.visible = false
          }
        }
      },
      obstacles: [],
      zoomLevel: [5, 7, 10, 13, 15],
      center: [116.329966, 39.955451],
      zoom: 10,
      lng: 0,
      lat: 0,
      loaded: false,
      plugin: [{
        enableHighAccuracy: true, // 是否使用高精度定位，默认:true
        timeout: 100, // 超过10秒后停止定位，默认：无穷大
        maximumAge: 0, // 定位结果缓存0毫秒，默认：0
        convert: true, // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true
        showButton: true, // 显示定位按钮，默认：true
        buttonPosition: 'RB', // 定位按钮停靠位置，默认：'LB'，左下角
        showMarker: true, // 定位成功后在定位到的位置显示点标记，默认：true
        showCircle: true, // 定位成功后用圆圈表示定位精度范围，默认：true
        panToLocation: true, // 定位成功后将定位到的位置作为地图中心点，默认：true
        zoomToAccuracy: true, // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：f
        extensions: 'all',
        pName: 'Geolocation',
        events: {
          init(o) {
            // o 是高德地图定位插件实例
            // o.getCurrentPosition((status, result) => {
            //   console.log(result)
            //   if (result && result.position) {
            //     self.lng = result.position.lng
            //     self.lat = result.position.lat
            //     self.center = [self.lng, self.lat]
            //     self.loaded = true
            //     self.$nextTick()
            //   }
            // })
          }
        }
      }],

      filterText: '',
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      tableKey: 0

    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val)
    }
  },
  created() {
    this.getTree()
    this.getObstacleList()
    window.dealObstacle = this.dealObstacle
    window.toDetailObstacle = this.toDetailObstacle
  },

  methods: {
    modifyisSubscribed(status) {
      const data = {
        'areaId': this.selectedArea.id
      }
      if (status == 0) { // 取消订阅
        unSubscribeArea(data).then(response => {
          console.log(response)
          if (response.code != 1) {
            this.$message({
              message: '取消订阅失败',
              type: 'error'
            })

            return
          }
          this.$message({
            message: '取消订阅成功',
            type: 'success'
          })
          this.selectedArea.isSubscribed = 0
          // this.getList()
        })
      } else {
        subscribeArea(data).then(response => {
          console.log(response)
          if (response.code != 1) {
            this.$message({
              message: '订阅失败',
              type: 'error'
            })
            return
          }
          this.$message({
            message: '订阅成功',
            type: 'success'
          })
          this.selectedArea.isSubscribed = 1
          // this.getList()
        })
      }
    },
    getObstaclePage() {
      // obstacleQuery: {
      //         page: 1,
      //         total: 20,
      //         limit: 10,
      //       },
      this.obstaclesPageList = []
      this.obstacleQuery.total = this.obstacles.length
      var beg = (this.obstacleQuery.page - 1) * this.obstacleQuery.limit
      var end = this.obstacleQuery.page * this.obstacleQuery.limit
      for (let i = beg; i < end; i++) {
        if (i < this.obstacles.length) {
          this.obstaclesPageList.push(this.obstacles[i])
        }
      }
    },
    toDetailObstacle(id) {
      console.log(id)
      this.$router.push({
        path: '/obstacleDetail/index',
        query: {
          obstacleId: id
        }
      })
    },
    dealObstacle(id) {
      console.log(id)
      const data = {
        'obstacleId': parseInt(id),
        'newStatus': 1
      }
      updateObstacleProcessingStatus(data).then(response => {
        console.log(response)
        if (response.code != 1) {
          this.$message({
            message: '修改失败',
            type: 'error'
          })
          return
        }
        this.$message({
          message: '修改成功',
          type: 'success'
        })
        if (this.infoWindow.visible) { this.infoWindow.visible = !this.infoWindow.visible }
        this.getObstacleList()
      })
    },
    markerClick(marker) {
      console.log(marker)
    },
    handleNodeClick(data, node, obj) {
      // console.log(data)
      console.log(node)
      getAreaById(node.data.id).then(response => {
        console.log(response)
        this.selectedArea = response.data
      })
      var label = ''
      var areaLabel = ''
      var nowLevel = node.level
      var now = node
      while (now.parent != null) {
        label = now.data.label + label
        if (areaLabel == '') {
          areaLabel = now.data.label
        } else {
          areaLabel = now.data.label + '-' + areaLabel
        }
        now = now.parent
      }
      this.showObstacle.showAllObstacles = false
      this.showObstacle.selectArea = areaLabel
      this.getObstacleList()
      // console.log(label)
      getLocation(label).then(response => {
        // console.log(response)
        var [lat, lng] = response.data.split(',')
        this.center = [lng, lat]
        this.zoom = this.zoomLevel[nowLevel]
      })
    },
    getObstacleList() {
      if (this.showObstacle.selectArea == '' && this.showObstacle.showAllObstacles == false) {
        this.obstacles = []
        return
      }
      getUnprocessedObstacleListByArea(this.showObstacle.selectArea).then(response => {
        // console.log(response)

        this.obstacles = []
        for (var i = 0; i < response.data.length; i++) {
          this.obstacles.push(this.reSetObstacle(response.data[i]))
        }
        this.getObstaclePage()
      })
      // getUnprocessedObstacleListByArea
    },
    getTree() {
      getAreaTree().then(response => {
        // console.log(response)
        this.treeData = response.data
      })
    },
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },

    reSetObstacle(obstacle) {
      // console.log(obstacle)
      var newObstacle = {
        'position': obstacle.longitude == null ? [116.441142, 39.942141] : [obstacle.longitude, obstacle.latitude],
        'data': obstacle,
        'events': {
          click: (e) => {
            var marker = e.target.De.extData
            // console.log(marker)
            if (!this.infoWindow.visible) { this.infoWindow.visible = !this.infoWindow.visible }
            this.infoWindow.content = this.addContent(marker.data)
            this.infoWindow.position = marker.position
            // ...点击操作
          },
          dblclick: (e) => {
            // ...双击操作
          }
        }
      }
      return newObstacle
    },
    addContent(obstacle) {
      var content = `<div id="infoWindow" style="color:white;width:200px;background-color:rgba(7,25,54,0.6);">
                <div style="margin:0 0 10px;background-color:#071936;text-align: center;">${obstacle.id}</div>
                <div style="margin:0 0 10px 10px;">类型：${obstacle.type}</div>
                <div style="margin:0 0 10px 10px;">发现时间：${obstacle.discoveryTime}</div>
                <button type="checkbox" onclick="toDetailObstacle('${obstacle.id}')" style="margin:0 0 10px 10px;"> 详情</button>
                <button type="checkbox" onclick="dealObstacle('${obstacle.id}')" style="margin:0 0 10px 10px;"> 处理</button>
            
            </div>`
      return content
    },
    pageClick(e) {
      // console.log(e)
      if (this.infoWindow.visible) { this.infoWindow.visible = !this.infoWindow.visible }
      // console.log(this.infoWindow)
    }

  }
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

</style>
