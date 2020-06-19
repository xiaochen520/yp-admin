<template>
  <div class="order">
    <div class="filter">
      <span>名称：</span>
      <el-input type="text" style="width: 200px" v-model="query.title"></el-input>
      <span style="margin-left: 10px">手机号：</span>
      <el-input type="text" style="width: 200px" v-model="query.mobile"></el-input>
      <span style="margin-left: 10px">类型：</span>
      <el-select @change="changeTeacher" v-model="filterId" placeholder="请选择教练">
        <el-option v-for="item in teacherArr" :key="item.id" :label="item.label" :value="item.id">
        </el-option>
      </el-select>
      <el-button style="margin-left: 10px" @click="filterClick" type="primary">搜索</el-button>
      <el-button style="float: right" @click="addOrder" type="primary">添加转铺信息</el-button>
    </div>
    <el-table :loading="isLoad" :data="tbArr" border style="width: 100%">
      <el-table-column align="center" prop="id" label="ID" width="180">
      </el-table-column>
      <el-table-column align="center" prop="name" label="联系人姓名">
      </el-table-column>
      <el-table-column align="center" prop="mobile" label="联系方式">
      </el-table-column>
      <el-table-column align="center" prop="area" label="面积">
      </el-table-column>
      <el-table-column align="center" prop="zj" label="租金">
      </el-table-column>
      <el-table-column align="center" prop="type" label="转让类型">
      </el-table-column>
      <el-table-column align="center" label="地址">
        <template slot-scope="scope">
          {{scope.row.province + scope.row.city + scope.row.region}}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="address_desc" label="详细地址">
      </el-table-column>
      <el-table-column align="center" prop="update_time" label="更新时间">
      </el-table-column>
      <el-table-column align="center" label="是都置顶">
        <template slot-scope="scope">
          {{scope.row.is_top == 0 ? '否' : '是'}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button @click="goEdit(scope.row)" type="text">编辑</el-button>
          <el-button type="text" @click="removeOrder(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="page">
      <el-pagination :current-page.sync="page" @current-change="changePage" background layout="prev, pager, next, total" :total="total">
      </el-pagination>
    </div>

  </div>
</template>

<script>
  import { order, removeOrder } from '@/api'

  export default {
    data() {
      return {
        query: {
          title: "",
          mobile: ""
        },
        isLoad: false,
        pageSize: 10,
        page: 1,
        filterId: 1,
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
      filterClick() {
        this.page = 1;
        this.getOrder();
      },
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
          'type': row.type,
          is_top: row.is_top
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
            removeOrder({ id: row.id }).then(res => {
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
          type: this.filterId,
          title: this.query.title,
          mobile: this.query.mobile
        }
        order(parms).then(res => {
          this.isLoad = false;
          if (res.code == 200) {
            this.total = res.data.total;
            this.tbArr = res.data.data;
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