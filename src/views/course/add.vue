<template>
  <div class="add-teacher">
    <el-form :rules="rules" ref="form" :model="form" label-width="120px">
      <el-form-item label="课程名称" prop="title">
        <el-input style="width: 200px" v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="预约日期" prop="day">
        <el-select v-model="form.day" placeholder="请选择预约日期">
          <el-option v-for="item in dateArr" :key="item.id" :label="item.label" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="预约时间" prop="time">
        <el-time-select style="width: 200px" v-model="form.time" placeholder="选择时间">
        </el-time-select>
      </el-form-item>
      <el-form-item label="教练" prop="jl_id">
        <el-select v-model="form.jl_id" placeholder="请选择教练">
          <el-option v-for="item in teacherArr" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="课程价格（元）" prop="price">
        <el-input type="number" style="width: 200px" v-model="form.price"></el-input>
      </el-form-item>
      <el-form-item label="课程内容" prop="content">
        <el-input type="textarea" style="width: 500px" placeholder="请输入课程内容" v-model="form.content"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" :loading="saveLoad" @click="onSubmit">保存</el-button>
        <el-button @click="$router.go(-1)">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addCourse, getTeacher, updateCourse } from "@/api";
export default {
  data() {
    return {
      teacherArr: [],
      dateArr: [
        {
          label: "星期一",
          id: 1
        },
        {
          label: "星期二",
          id: 2
        },
        {
          label: "星期三",
          id: 3
        },
        {
          label: "星期四",
          id: 4
        },
        {
          label: "星期五",
          id: 5
        },
        {
          label: "星期六",
          id: 6
        },
        {
          label: "星期日",
          id: 0
        }
      ],
      saveLoad: false,
      form: {
        title: "",
        day: 0,
        time: "",
        content: "",
        jl_id: "",
        price: 0
      },
      rules: {
        day: [{ required: true, message: "请选择日期", trigger: "blur" }],
        time: [{ required: true, message: "请选择时间", trigger: "blur" }],
        content: [
          { required: true, message: "请输入课程内容", trigger: "blur" }
        ],
        jl_id: [{ required: true, message: "请选择教练", trigger: "blur" }],
        price: [{ required: true, message: "请输入价格", trigger: "blur" }]
      }
    };
  },
  mounted() {
    this.getTeacher();
    if (this.$route.query.id) {
      this.form = this.$route.query;
      this.form.jl_id = parseInt(this.form.jl_id);
      this.$route.meta.title = "编辑课程";
    }
  },
  methods: {
    getTeacher() {
      this.teacherArr = [];
      getTeacher()
        .then(res => {
          if (res.code == 200) {
            this.teacherArr = res.data;
          }
        })
        .catch(err => {
          this.isLoad = false;
          console.log(err);
        });
    },
    handleAvatarSuccess(res) {
      if (res.code === 200) {
        this.form.photo = res.data;
      }
    },
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.saveLoad = true;
          if (this.form.id) {
            // 编辑
            updateCourse(this.form).then(res => {
              this.saveLoad = false;
              if (res.code === 200) {
                this.$message({
                  message: "恭喜你，保存成功",
                  type: "success",
                  duration: 1500,
                  onClose: () => {
                    this.$router.go(-1);
                  }
                });
              }
            });
          } else {
            //新增
            addCourse(this.form).then(res => {
              this.saveLoad = false;
              if (res.code === 200) {
                this.$message({
                  message: "恭喜你，新增成功",
                  type: "success",
                  duration: 1500,
                  onClose: () => {
                    this.$router.go(-1);
                  }
                });
              }
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.add-teacher {
  padding: 25px 15px;
  .avatar-uploader {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 178px;
  }
  .avatar-uploader:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>
