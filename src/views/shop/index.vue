<template>
  <div class="order">
    <!-- nav -->
    <div class="nav">
      <span>名称：</span>
      <el-input type="text" style="width: 200px" v-model="query.title"></el-input>
      <span style="margin-left: 10px">手机号：</span>
      <el-input type="text" style="width: 200px" v-model="query.mobile"></el-input>
      <el-button style="margin-left: 10px" @click="filterClick" type="primary">搜索</el-button>

      <el-button style="float: right" @click="addTeach" type="primary">添加求租信息</el-button>
    </div>
    <!-- end -->

    <!-- 表格 -->
    <el-table :loading="isLoad" :data="tbArr" border style="width: 100%">
      <el-table-column align="center" prop="id" label="ID" width="180">
      </el-table-column>
      <el-table-column align="center" prop="name" label="姓名">
      </el-table-column>
      <el-table-column align="center" prop="mobile" label="手机号">
      </el-table-column>
      <el-table-column align="center" prop="region" label="期望区域">
      </el-table-column>
      <el-table-column align="center" prop="industry" label="所属行业">
      </el-table-column>
      <el-table-column align="center" prop="min_zj" label="最小租金">
      </el-table-column>
      <el-table-column align="center" prop="max_zj" label="最大租金">
      </el-table-column>
      <el-table-column align="center" prop="min_area" label="最小面积">
      </el-table-column>
      <el-table-column align="center" prop="max_area" label="最大面积">
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button @click="goEdit(scope.row)" type="text">编辑</el-button>
          <el-button type="text" @click="removeTeacher(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- end -->

    <!-- 分页 -->
    <div class="page">
      <el-pagination :current-page.sync="page" @current-change="changePage" background layout="prev, pager, next, total" :total="total">
      </el-pagination>
    </div>

  </div>
</template>

<script>
  import { shop, removeShop } from "@/api";

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
        limit: 10,
        filterId: "",
        teacherArr: [],
        total: 0,
        tbArr: []
      };
    },
    mounted() {
      this.getTeacher();
    },
    methods: {
      filterClick() {
        this.page = 1;
        this.getTeacher();
      },
      addTeach() {
        this.$router.push("/shop/add");
      },
      changePage(page) {
        this.page = page;
        this.getTeacher();
      },
      goEdit(row) {

        let parms = {
          id: row.id,
          'title': row.title,
          'region': row.region,
          'industry': row.industry,
          'min_area': row.min_area,
          'max_area': row.max_area,
          'min_zj': row.min_zj,
          'max_zj': row.max_zj,
          'name': row.name,
          'mobile': row.mobile,
          'content': row.content
        };

        this.$router.push({ path: "/shop/add", query: parms });
      },
      removeTeacher(row) {
        this.$confirm("将要该条记录？, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            removeShop({ id: row.id }).then(res => {
              if (res.code === 200) {
                this.$message({
                  message: "删除成功",
                  type: "success",
                  duration: 1500,
                  onClose: () => {
                    this.getTeacher();
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
      getTeacher() {
        this.isLoad = true;
        this.tbArr = [];
        let params = Object.assign({}, this.query, {page: this.page, limit: this.limit});

        shop(params)
          .then(res => {
            this.isLoad = false;
            if (res.code == 200) {
              this.tbArr = res.data.data;
              this.total = res.data.total;
            }
          })
          .catch(err => {
            this.isLoad = false;
            console.log(err);
          });
      }
    }
  };
</script>

<style lang="scss" scoped>
  .order {
    padding: 20px;
    .nav {
      /* text-align: right; */
      padding-bottom: 15px;
    }
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