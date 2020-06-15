<template>
  <div class="order">
    <!-- nav -->
    <div class="nav">
      <el-button @click="addTeach" type="primary">新增入驻商家</el-button>
    </div>
    <!-- end -->

    <!-- 表格 -->
    <el-table :loading="isLoad" :data="tbArr" border style="width: 100%">
      <el-table-column align="center" prop="id" label="ID" width="180">
      </el-table-column>
      <el-table-column align="center" prop="title" label="名称">
      </el-table-column>
      <el-table-column align="center" prop="mobile" label="手机号">
      </el-table-column>
      <el-table-column align="center" prop="area" label="位置">
      </el-table-column>
      <el-table-column align="center" prop="notice" label="商家通知">
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
      <el-pagination :current-page.sync="page" :current-change="changePage" background layout="prev, pager, next"
        :total="total">
      </el-pagination>
    </div>

  </div>
</template>

<script>
  import { getTeacher, removeTeacher } from "@/api";

  export default {
    data() {
      return {
        isLoad: false,
        pageSize: 10,
        page: 1,
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
      addTeach() {
        this.$router.push("/teacher/add");
      },
      changePage(page) {
        this.page = page;
        this.getOrder();
      },
      changeTeacher() {
        this.page = 1;
        this.getOrder();
      },
      goEdit(row) {

        let parms = {
          id: row.id,
          title: row.title,
          area: row.area,
          notice: row.notice,
          business_type: row.business_type,
          business_category: row.business_category,
          address_desc: row.address_desc,
          photos: row.photos,
          mobile: row.mobile,
          content: row.content
        };

        this.$router.push({ path: "/teacher/add", query: parms });
      },
      removeTeacher(row) {
        this.$confirm("将要删除该记录？, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            removeTeacher({ id: row.id }).then(res => {
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
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      },
      getTeacher() {
        this.isLoad = true;
        this.tbArr = [];

        getTeacher({ page: this.page, limit: this.pageSize })
          .then(res => {

            this.isLoad = false;
            if (res.code == 200) {
              console.log(res);
              this.tbArr = res.data.data;
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
      text-align: right;
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