<template>
  <div class="add-teacher">
    <el-form :rules="rules" ref="form" :model="form" label-width="120px">
      <el-form-item label="名称" prop="title">
        <el-input style="width: 200px" v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="位置">
        <v-distpicker @selected="selectAddr"></v-distpicker>
      </el-form-item>
      <el-form-item label="商家通知" prop="notice">
        <el-input type="text" style="width: 200px" v-model="form.notice"></el-input>
      </el-form-item>
      <el-form-item label="商家类型" prop="business_type">
        <el-select style="width: 200px" v-model="form.business_type" placeholder="请选择">
          <el-option v-for="item in shopTypeArr" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="行业分类" prop="business_category">
        <el-select style="width: 200px" v-model="form.business_category" placeholder="请选择">
          <el-option v-for="item in industryArr" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="详细地址" prop="address_desc">
        <el-input type="text" style="width: 200px" v-model="form.address_desc"></el-input>
      </el-form-item>
      <el-form-item label="图片" prop="photos">
        <el-upload name="imgFile" action="https://hzp.langyiquan.com/api/shop_zr/upload" list-type="picture-card"
          :on-preview="handlePictureCardPreview" :on-success="handleSuc" :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input type="number" style="width: 200px" v-model="form.mobile"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <el-input type="textarea" style="width: 500px" v-model="form.content"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="saveLoad" @click="onSubmit">保存</el-button>
        <el-button @click="$router.go(-1)">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import VDistpicker from "v-distpicker";
  import { industryArr, shopTypeArr } from "@/utils/type";
  import { addTeacher, updateTeacher } from "@/api";
  export default {
    components: { VDistpicker },
    data() {
      return {
        saveLoad: false,
        industryArr: industryArr,
        shopTypeArr: shopTypeArr,
        form: {
          title: "",
          area: "",
          notice: "",
          business_type: "",
          business_category: "",
          address_desc: "",
          photos: "",
          mobile: "",
          content: ""
        },
        dialogImageUrl: "",
        dialogVisible: false,
        rules: {
          name: [{ required: true, message: "请输入教练名称", trigger: "blur" }],
          limit_person: [
            { required: true, message: "请输入可预约人数", trigger: "blur" }
          ]
        }
      };
    },
    mounted() {
      if (this.$route.query.id) {
        this.form = this.$route.query;
        this.$route.meta.title = "编辑";
      }
    },
    methods: {
      handleSuc(res, file, fileList) {
        if (res.code === 200) {
          this.form.photos = fileList.map(e => e.response.data).join();
        }
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      selectAddr(res) {
        this.form.area = res.province.value + res.city.value + res.area.value;
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
              updateTeacher(this.form).then(res => {
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
              addTeacher(this.form).then(res => {
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