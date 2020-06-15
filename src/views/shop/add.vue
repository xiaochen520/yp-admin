<template>
  <div class="shop">
    <el-form label-width="120px">
      <el-form-item label="名称">
        <el-input style="width: 200px" v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="期待区域">
        <el-input style="width: 200px" v-model="form.region"></el-input>
      </el-form-item>
      <el-form-item label="所属行业">
        <el-select style="width: 200px" v-model="form.industry" placeholder="请选择">
          <el-option
            v-for="item in industryArr"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="最小面积(平米)">
        <el-input style="width: 200px" v-model="form.min_area"></el-input>
      </el-form-item>
      <el-form-item label="最大面积(平米)">
        <el-input style="width: 200px" v-model="form.max_area"></el-input>
      </el-form-item>
      <el-form-item label="最小租金(元)">
        <el-input style="width: 200px" v-model="form.min_zj"></el-input>
      </el-form-item>
      <el-form-item label="最大租金(元)">
        <el-input style="width: 200px" v-model="form.max_zj"></el-input>
      </el-form-item>
      <el-form-item label="联系人名称">
        <el-input style="width: 200px" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="联系人手机号">
        <el-input style="width: 200px" v-model="form.mobile"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <el-input type="textarea" v-model="form.content" style="width: 500px"></el-input>
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
import { shop, addShop, updateShop } from "@/api";
import { industryArr } from "@/utils/type";
export default {
  components: { VDistpicker },
  data() {
    return {
      shop: null,
      saveLoad: false,
      industryArr: industryArr,
      form: {
        title: "",
        region: "",
        industry: "",
        min_area: 0,
        max_area: 0,
        min_zj: 0,
        max_zj: 0,
        name: "",
        mobile: "",
        content: ""
      },
      fileList: []
    };
  },
  mounted() {
    if (this.$route.query.id) {
      this.form = this.$route.query;
      this.form.industry = +this.form.industry;
      console.log()
      this.$route.meta.title = "编辑门店";
    }
  },
  methods: {
    selectAddr(res) {
      this.form.address = res.province.value + res.city.value + res.area.value;
    },
    onSubmit() {
      this.saveLoad = true;
      if (this.$route.query.id) {
        updateShop(this.form).then(res => {
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
        addShop(this.form).then(res => {
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
      }
    }
  }
};
</script>

<style lang="less" scoped>
.shop {
  padding: 15px;
  .upload-demo {
    width: 400px;
  }
}
</style>