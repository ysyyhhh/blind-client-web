<template>
  <div class="app-container">
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="image" min-width="25%">
        <template slot-scope="{row}">
          <img :src="row.url" style="width:100%">
        </template>
      </el-table-column>
      <el-table-column label="时间" min-width="25%">
        <template slot-scope="{row}">
          <span>{{ row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column label="位置" min-width="25%">
        <template slot-scope="{row}">
          <span>{{ row.gps[0] }},{{ row.gps[1] }} </span>
        </template>
      </el-table-column>
      <el-table-column label="状态" min-width="25%">
        <template slot-scope="{row}">
          <span>{{ row.status }} </span>
        </template>
      </el-table-column>

    </el-table>

    <!-- <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" /> -->

  </div>
</template>

<script>

export default {
  name: 'RawTable',
  //   directives: { waves },
  filters: {
  },
  props: {
    list: {
      type: Object,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      tableKey: 0,
      //   list: null,
      total: 0,
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 10,
        level: undefined,
        fullName: undefined

      },
      options: {
        level: [],
        fullName: []
      },
      temp: {
        // id: undefined,
        // importance: 1,
        // remark: '',
        // timestamp: new Date(),
        // title: '',
        // type: '',
        // status: 'published'
      }
    }
  },
  created() {
  },
  methods: {

  }
}
</script>
