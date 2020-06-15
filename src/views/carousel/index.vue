<template>
  <div class="carousel">
    <div style="text-align: right">
      <el-button @click="showDialog" type="primary">添加轮播图</el-button>
    </div>
    <div class="img-item" v-for="item in picList">
      <div>
        <span>轮播图链接：</span>
        <el-input v-model="item.link" readonly style="width: 320px" placeholder="请输入内容"></el-input>
      </div>
      <div style="margin-top: 15px">
        <img width="250px" :src="item.img" alt />
      </div>
      <el-button @click="showDialog(item)" class="link-btn link-edit-btn" type="primary">编辑</el-button>
      <el-button @click="removeCar(item)" class="link-btn" type="danger">删除</el-button>
    </div>

    <!-- modal -->
    <el-dialog title="图片上传" :visible.sync="picDialog">
      <div>
        <span>轮播图链接：</span>
        <el-input v-model="picLink" style="width: 320px" placeholder="请输入内容"></el-input>
      </div>
      <el-upload
        name="imgFile"
        class="avatar-uploader"
        action="https://hzp.langyiquan.com/api/shop_zr/upload"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button @click="picDialog = false">取 消</el-button>
        <el-button type="primary" @click="addSave">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  carousel,
  uploadCarousel,
  removeCarousel,
  updateCarousel
} from "@/api";
export default {
  data() {
    return {
      imageUrl: "",
      picLink: "",
      picList: [],
      picDialog: false,
      picId: ""
    };
  },
  mounted() {
    this.getCarousel();
  },
  methods: {
    removeCar(row) {
      this.$confirm("将要删除该条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          removeCarousel({ id: row.id }).then(res => {
            if (res.code === 200) {
              this.$message({
                message: "删除成功",
                type: "success",
                duration: 1000,
                onClose: () => {
                  this.getCarousel();
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
    showDialog(type) {
      if (type.link) {
        this.picId = type.id;
        this.imageUrl = type.img;
        this.picLink = type.link;
      } else {
        this.picId = "";
        this.imageUrl = "";
        this.picLink = "";
      }
      this.picDialog = true;
    },
    handleAvatarSuccess(res, file, fileList) {
      if (res.code === 200) {
        this.imageUrl = res.data;
      }
    },
    getCarousel() {
      carousel()
        .then(res => {
          if (res.code == 200) {
            this.picList = res.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    addSave() {
      if (this.picId) {
        updateCarousel({
          id: this.picId,
          img: this.imageUrl,
          link: this.picLink
        }).then(res => {
          if (res.code === 200) {
            this.$message({
              message: "保存成功",
              type: "success",
              duration: 1000,
              onClose: () => {
                this.picDialog = false;
                this.getCarousel();
              }
            });
          }
        });
      } else {
        console.log(this.picLink)
        uploadCarousel({ img: this.imageUrl, link: this.picLink }).then(res => {
          if (res.code === 200) {
            this.$message({
              message: "保存成功",
              type: "success",
              duration: 1000,
              onClose: () => {
                this.picDialog = false;
                this.getCarousel();
              }
            });
          }
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.carousel {
  padding: 20px;
  .img-item {
    border: 1px solid #d9d9d9;
    position: relative;
    border-radius: 6px;
    padding: 15px;
    width: 800px;
    margin-top: 20px;
    .link-btn {
      position: absolute;
      right: 15px;
      top: 15px;
    }
    .link-edit-btn {
      right: 110px;
    }
  }
  .link-box {
    display: inline-block;
    vertical-align: middle;
    > * {
      display: inline-block;
    }
  }
}
.avatar-uploader {
  display: inline-block;
  vertical-align: middle;
  margin-top: 20px;
}
/deep/.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
/deep/.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
/deep/.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
/deep/.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>