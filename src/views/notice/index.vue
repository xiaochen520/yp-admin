<template>
    <div class="order">
      <div class="filter">
        <span>类型：</span>
        <el-select style="width: 220px" @change="changeTeacher" v-model="queryType" placeholder="请选择类型">
          <el-option v-for="(value, key) in noticeType" :key="key" :label="value" :value="key">
          </el-option>
        </el-select>
        <span style="margin-left: 15px">目标id：</span>
        <el-input style="width: 220px" v-model="filterId"></el-input>
        <el-button style="float: right" @click="addOrder" type="primary">添加公告</el-button>
      </div>
      <el-table :loading="isLoad" :data="tbArr" border style="width: 100%">
        <el-table-column align="center" prop="id" label="ID" width="180">
        </el-table-column>
        <el-table-column align="center" prop="title" label="标题">
          </el-table-column>
        <el-table-column align="center" prop="name" label="类型">
            <template slot-scope="scope">
                {{noticeType[scope.row.type]}}
              </template>
        </el-table-column>
        <el-table-column align="center" prop="update_time" label="更新时间">
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button @click="goEdit(scope.row)" type="text">编辑</el-button>
            <el-button type="text" @click="removeOrder(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- dialog -->
      <el-dialog :title="modalTitle" :visible.sync="showModal">
          <el-form ref="form" :model="modalForm" label-width="80px">
              <el-form-item label="标题">
                <el-input style="width: 320px" v-model="modalForm.title"></el-input>
              </el-form-item>
              <el-form-item label="目标id">
                  <el-input style="width: 320px" v-model="modalForm.target_id"></el-input>
                </el-form-item>
              <el-form-item label="类型">
                  <el-select style="width: 320px" v-model="modalForm.type" placeholder="请选择类型">
                    <el-option v-for="(value, key) in noticeType" :key="key" :label="value" :value="key">
                    </el-option>
                  </el-select>
              </el-form-item>
            </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="showModal = false">取 消</el-button>
            <el-button type="primary" @click="conformAdd">确 定</el-button>
          </div>
        </el-dialog>
    </div>
  </template>
  
  <script>
    import { notice, removeNotice, addNotice, editNotice } from '@/api'
  
    export default {
      data() {
        return {
          showModal: false,
          isLoad: false,
          pageSize: 10,
          isAdd: true,
          page: 1,
          filterId: "", //目标id
          queryType: "1", //1转让 2招租 3商家
          noticeType: {
            1: "转让",
            2: "招租",
            3: "商家"
          },
          teacherArr: [
            {
              label: "店铺",
              id: 1
            },
            {
              label: "工厂仓库",
              id: 2
            },
            {
              label: "写字楼",
              id: 3
            },
            {
              label: "商铺",
              id: 4
            }
          ],
          total: 0,
          tbArr: [],
          modalTitle: "",
          modalForm: {
            title: "",
            target_id: "",
            type: "1"
          }
        }
      },
      mounted() {
        this.getOrder();
      },
      methods: {
        conformAdd() {
          if(this.isAdd) {
            addNotice(this.modalForm).then(res => {
                if (res.code === 200) {
                  this.$message({
                    message: "操作成功",
                    type: "success",
                    duration: 1500,
                    onClose: () => {
                      this.showModal = false;
                      this.getOrder();
                    }
                  });
                }
              });
          } else {
            editNotice(this.modalForm).then(res => {
                if (res.code === 200) {
                  this.$message({
                    message: "操作成功",
                    type: "success",
                    duration: 1500,
                    onClose: () => {
                      this.showModal = false;
                      this.getOrder();
                    }
                  });
                }
              });
          }
        },
        goEdit(row) {
         this.isAdd = false;
         this.modalTitle = "编辑";
         this.modalForm.title = row.title;
         this.modalForm.target_id = row.target_id;
         this.modalForm.type = row.type;
         this.showModal = true;
         this.modalForm.id = row.id;
        },
        removeOrder(row) {
          this.$confirm("将要该条记录？, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              removeNotice({ id: row.id }).then(res => {
                if (res.code === 200) {
                  this.$message({
                    message: "删除成功",
                    type: "success",
                    duration: 1500,
                    onClose: () => {
                      this.getOrder();
                    }
                  });
                }
              });
            })
            .catch(err => {
              console.log(err)
              this.$message({
                type: "info",
                message: "已取消删除"
              });
            });
        },
        addOrder() {
          this.modalTitle = "新增";
          this.isAdd = true;
          this.modalForm = {
            title: "",
            target_id: "",
            type: "1"
          };
          this.showModal = true;
        },
        changePage(page) {
          this.page = page;
          this.getOrder();
        },
        changeTeacher() {
          this.page = 1;
          this.getOrder();
        },
        // getTeacherFilter() {
        //   getTeacherFilter().then(res => {
        //     if (res.code == 200) {
        //       this.teacherArr = res.data;
        //     }
        //   });
        // },
        getOrder() {
          this.isLoad = true;
          this.tbArr = [];
          let parms = {
            page: this.page,
            limit: this.pageSize,
            type: this.queryType,
            target_id: this.filterId
          }
          notice(parms).then(res => {
            this.isLoad = false;
            if (res.code == 200) {
              this.tbArr = res.data;
            }
          }).catch(err => {
            this.isLoad = false;
            console.log(err);
          });
        }
      }
    }
  </script>
  
  <style lang="scss" scoped>
    .order {
      padding: 20px;
  
      .filter {
        padding: 10px 0;
        margin-bottom: 20px;
      }
  
      .page {
        padding: 15px 0;
        text-align: right;
      }
    }
  </style>