<template>
  <div class="order">
    <el-form ref="form" :model="form" label-width="180px">
      <el-form-item label="入驻半年费用(元)" prop="business_double">
        <el-input style="width: 200px" v-model="form.business_double"></el-input>
      </el-form-item>
      <el-form-item label="入驻一年费用(元)" prop="business_one">
        <el-input style="width: 200px" v-model="form.business_one"></el-input>
      </el-form-item>
      <el-form-item label="置顶一天费用(元)" prop="top_day">
        <el-input style="width: 200px" v-model="form.top_day"></el-input>
      </el-form-item>
      <el-form-item label="置顶一周费用(元)" prop="top_week">
        <el-input style="width: 200px" v-model="form.top_week"></el-input>
      </el-form-item>
      <el-form-item label="置顶一月费用(元)" prop="top_month">
        <el-input style="width: 200px" v-model="form.top_month"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" :loading="saveLoad" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
  import { course, updateCourse } from '@/api'

  export default {
    data() {
      return {
        isLoad: false,
        teacherArr: [],
        pageSize: 10,
        page: 1,
        filterId: "",
        teacherArr: [],
        total: 0,
        tbArr: [],
        saveLoad: false,

        form: {
          'business_double': 0,
          'business_one': 0,
          'top_day': 0,
          'top_week': 0,
          'top_month': 0
        }
      };
    },
    mounted() {
      this.getCourse();
    },
    methods: {
      addCourse() {
        this.$router.push("/course/add");
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
          title: row.title,
          id: row.id,
          day: row.day,
          time: row.time,
          content: row.content,
          jl_id: row.jl_ids,
          price: row.price
        };

        this.$router.push({ path: "/course/add", query: parms });
      },

      removeTeacher(row) {
        this.$confirm("将要删除该课程, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            removeCourse(row.id).then(res => {
              if (res.code === 200) {
                this.$message({
                  message: "删除成功",
                  type: "success",
                  duration: 1500,
                  onClose: () => {
                    this.getCourse();
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
      getCourse() {
        this.isLoad = true;
        this.tbArr = [];

        course()
          .then(res => {
            if (res.code == 200) {
              this.form = res.data;
            }
          })
          .catch(err => {
            
            console.log(err);
          });
      },
      onSubmit() {
        this.saveLoad = true;
        updateCourse(this.form).then(res => {
          this.saveLoad = false;
            if (res.code == 200) {
              
            }
          })
          .catch(err => {
            this.saveLoad = false;
            console.log(err);
          });
      }
    }
  };
</script>

<style lang="scss" scoped>
  .order {
    padding: 20px;

  }
</style>