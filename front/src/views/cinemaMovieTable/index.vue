<template>
  <div class="app-container">
    <div class="filter-container">

      <el-input v-model="listQuery.title" placeholder="标题" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-select v-model="listQuery.importance" placeholder="重要性" clearable style="width: 90px" class="filter-item"/>
      <el-select v-model="listQuery.type" placeholder="类型" clearable class="filter-item" style="width: 130px"/>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">添加 </el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;min-height:1000px;margin-top:10px;">
      <el-table-column label="序号" align="center" width="65">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="电影名称" width="250px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.movie_info.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="影院" width="300px" align="center" min-width="150px">
        <template slot-scope="scope">
          <span>{{ scope.row.cinema_info.cinema_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="票价" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.price }}元/张</span>
        </template>
      </el-table-column>
      <el-table-column label="余票量" align="center" width="140px">
        <template slot-scope="scope">
          <el-tag >{{ scope.row.ticket_odd }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="总票量" align="center" width="140px">
        <template slot-scope="scope">
          <el-tag type="success">{{ scope.row.ticket_sum }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button v-if="scope.row.status!='deleted'" size="mini" type="danger" @click="handleDelete(scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="电影" prop="name">
          <template>
            <el-select v-if="dialogStatus=='create'" v-model="temp.movie_id" clearable placeholder="请选择">
              <el-option v-for="item in movieOptions" :key="item.id" :label="item.name" :value="item.id"/>
            </el-select>
            <el-select v-else v-model="temp.movie_id" clearable placeholder="不允许修改" disabled >
              <el-option v-for="item in movieOptions" :key="item.id" :label="item.name" :value="item.id"/>
            </el-select>
          </template>
        </el-form-item>
        <el-form-item label="时间" prop="produceTime">
          <el-date-picker v-model="temp.time" format="yyyy 年 MM 月 dd 日" type="date" placeholder="选择上映时间"/>
        </el-form-item>
        <el-form-item label="影院" prop="director">
          <template>
            <el-select v-if="dialogStatus=='create'" v-model="temp.cinema_id" clearable placeholder="请选择">
              <el-option v-for="item in cinemaOptions" :key="item.id" :label="item.cinema_name" :value="item.id"/>
            </el-select>
            <el-select v-else v-model="temp.cinema_id" clearable placeholder="不允许修改" disabled >
              <el-option v-for="item in cinemaOptions" :key="item.id" :label="item.cinema_name" :value="item.id"/>
            </el-select>
          </template>
        </el-form-item>
        <el-form-item label="票价">
          <el-checkbox-group :max="3" :min="1" v-model="temp.type">
            <el-input v-model="temp.price" type="number" max="100"/>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="总票量">
          <el-input v-model="temp.ticket_sum" type="number" max="60"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">确认</el-button>
        <el-button v-else type="primary" @click="updateData">确认</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { fetchCinemaMovieList, createCinemaMovie, updateCinemaMovie, deleteCinemaMovie } from '@/api/cinemaMovie'
import { fetchCinemaAll } from '@/api/cinemaInfo'
import { fetchMovieAll } from '@/api/movieinfo'
import waves from '@/directive/waves' // 水波纹指令
import axios from 'axios'

export default {
  name: 'ComplexTable',
  directives: {
    waves
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      movieOptions: [],
      cinemaOptions: [],
      temp: {
        id: undefined,
        movie_id: undefined,
        movie_info: '',
        cinema_id: undefined,
        cinema_info: '',
        price: 0,
        time: '',
        ticket_odd: '',
        ticket_sum: 0
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      axios.all([fetchCinemaMovieList(this.listQuery), fetchCinemaAll(), fetchMovieAll()]).then(axios.spread((CinemaMovieData, CinemaData, MovieData) => {
        this.list = CinemaMovieData.data.items
        this.total = CinemaMovieData.data.total

        this.movieOptions = MovieData.data.items
        this.cinemaOptions = CinemaData.data.items

        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      }
      )
      )
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      row.status = status
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        movie_id: undefined,
        movie_info: '',
        cinema_id: undefined,
        cinema_info: '',
        price: 0,
        time: '',
        ticket_odd: '',
        ticket_sum: 0
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.ticket_odd = this.temp.ticket_sum
          createCinemaMovie(this.temp).then(() => {
            // this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      console.log(row)
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          updateCinemaMovie(this.temp).then(() => {
            for (const v of this.list) {
              if (v.id === this.temp.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, this.temp)
                break
              }
            }
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row) {
      this.temp = row
      deleteCinemaMovie(this.temp).then(() => {
        this.$notify({
          title: '成功',
          message: '删除成功',
          type: 'success',
          duration: 2000
        })
        const index = this.list.indexOf(row)
        this.list.splice(index, 1)
      })
    }
  }
}
</script>
