<template>
    <div class="order">
      <div class="filter">
        <span>类型：</span>
        <el-select @change="changeTeacher" v-model="filterId" placeholder="请选择类型">
          <el-option v-for="(value, key) in noticeType" :key="key" :label="value" :value="key">
          </el-option>
        </el-select>
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
          <el-form :model="form">
            <el-form-item label="活动名称" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="活动区域" :label-width="formLabelWidth">
              <el-select v-model="form.region" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
          </div>
        </el-dialog>
    </div>
  </template>
  
  <script>
    import { notice, removeNotice } from '@/api'
  
    export default {
      data() {
        return {
          isLoad: false,
          pageSize: 10,
          page: 1,
          filterId: 1, //目标id
          queryType: 1, //1转让 2招租 3商家
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
          tbArr: []
        }
      },
      mounted() {
        this.getOrder();
      },
      methods: {
        goEdit(row) {
          let parms = {
            id: row.id,
            'title': row.title,
            'area': row.area,
            'zj': row.zj,
            'province': row.province,
            'city': row.city,
            'region': row.region,
            'address_desc': row.address_desc,
            'name': row.name,
            'mobile': row.mobile,
            'content': row.content,
            'photos': row.photos,
            'type': row.type
          };
          this.$router.push({ path: "/add", query: parms });
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
          this.$router.push("/add");
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