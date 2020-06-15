<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.title" placeholder="题库名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.state" placeholder="题库是否启用" clearable style="width: 130px" class="filter-item">
        <el-option v-for="item in stateOptions" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        查询
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        添加
      </el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="ID" width="120px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column label="题库名称" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>

      <el-table-column label="发布时间" width="200px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.create_time }}</span>
        </template>
      </el-table-column>

      <el-table-column label="发布人" width="200px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.publish_id }}</span>
        </template>
      </el-table-column>

      <el-table-column label="是否启用" width="200px" class-name="status-col" align="center">
        <template slot-scope="{row}">
          <el-tag :type="row.state | statusFilter">
            {{ translateSlate(row.state) }}
          </el-tag>
        </template>
      </el-table-column>


      <el-table-column label="操作" align="center" width="300px" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            修改
          </el-button>
          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="dialogStatus" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="题库名称" prop="title">
          <el-input v-model="temp.title" />
        </el-form-item>
        <el-form-item label="是否启用" prop="state">
          <el-select v-model="temp.state" class="filter-item" placeholder="请选择">
            <el-option v-for="item in stateOptions" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-input v-model="temp.id" type="hidden" />
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogStatus==='添加'?createData():updateData()">
          提交
        </el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { fetchList, createQuestionLib, updateQuestionLib, deleteQuestionLib } from '@/api/question-lib'
import waves from '@/directive/waves' // waves directive

import { stateOptions } from '@/utils/type'

export default {
  name: 'QuestionLib',
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        "-1": 'danger',
        "1": 'success'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        title: undefined,
        state: undefined
      },
      stateOptions: stateOptions,
      temp: {
        id: 0,
        title: '',
        state: 1,
      },
      dialogFormVisible: false,
      dialogStatus: '',
      rules: {
        title: [{ required: true, message: '题库名称必须', trigger: 'blur' }],
        state: [{ required: true, message: '题库是否启用必须', trigger: 'change' }]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    translateSlate(status) {
      const item = this.stateOptions.find((item) => {
        return item.id == status
      });
      return item.name
    },
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total

        setTimeout(() => {
          this.listLoading = false
        }, 400)
      })
    },
    handleFilter() {
      this.getList()
    },
    resetTemp() {
      this.temp = {
        id: 0,
        title: '',
        state: 1
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = '添加'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {

          const data = {
            title: this.temp.title,
            state: this.temp.state,
          }

          createQuestionLib(this.temp).then((res) => {
            this.list.unshift(res.data)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: '创建题库成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row)
      this.dialogStatus = '编辑'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          updateQuestionLib(tempData).then((res) => {
            for (const v of this.list) {
              if (v.id === this.temp.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, res.data)
                break
              }
            }
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row) {
      deleteQuestionLib(row.id).then((res) => {
        this.$notify({
          title: 'Success',
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
