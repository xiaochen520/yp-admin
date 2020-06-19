<template>
  <div class="add-teacher">
    <el-form :rules="rules" ref="form" :model="form" label-width="120px">
      <el-form-item label="名称" prop="title">
        <el-input style="width: 200px" v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="面积(平方米)" prop="area">
        <el-input style="width: 200px" v-model="form.area"></el-input>
      </el-form-item>
      <el-form-item label="租金(元)" prop="zj">
        <el-input style="width: 200px" v-model="form.zj"></el-input>
      </el-form-item>
      <el-form-item label="位置">
        <v-distpicker @selected="selectAddr"></v-distpicker>
      </el-form-item>
      <el-form-item label="详细地址" prop="address_desc">
        <el-input type="text" style="width: 200px" v-model="form.address_desc"></el-input>
      </el-form-item>
      <el-form-item label="联系人名称" prop="name">
        <el-input type="text" style="width: 200px" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input type="number" style="width: 200px" v-model="form.mobile"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <el-input type="textarea" style="width: 500px" v-model="form.content"></el-input>
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
      <el-form-item label="转让类型" prop="type">
        <el-select v-model="form.type">
          <el-option v-for="item in transferType" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否置顶" prop="type">
        <el-radio v-model="form.is_top" label="1">置顶</el-radio>
        <el-radio v-model="form.is_top" label="0">不置顶</el-radio>
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
  import { addOrder, updateOrder } from "@/api";
  import { transferType } from "@/utils/type"
  export default {
    components: { VDistpicker },
    data() {
      return {
        saveLoad: false,
        dialogImageUrl: "",
        dialogVisible: false,
        transferType: transferType,
        form: {
          'title': "",
          'area': 0,
          'zj': 0,
          'province': "",
          'city': "",
          'region': "",
          'address_desc': "",
          'name': "",
          'mobile': "",
          'content': "",
          'photos': "",
          'type': "",
          is_top: '0'
        },
        rules: {
          // name: [{ required: true, message: "请输入教练名称", trigger: "blur" }],
          // limit_person: [
          //   { required: true, message: "请输入可预约人数", trigger: "blur" }
          // ]
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
        console.log(fileList);
        if(res.code === 200) {
          this.form.photos = fileList.map(e => e.response.data).join();
        }
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleRemove(file, fileList) {
        this.form.photos = fileList.map(e => e.response.data).join();
      },
      selectAddr(res) {
        this.form.province = res.province.value;
        this.form.city = res.city.value;
        this.form.region = res.area.value;
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
              updateOrder(this.form).then(res => {
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
              addOrder(this.form).then(res => {
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