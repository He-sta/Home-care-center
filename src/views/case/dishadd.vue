<template>
  <div class="main">
    <div class="box">
      <el-container>
        <el-main v-bind:class="{ 'el-mainll': true }">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{path:'/doctor/dishadd' }">添加菜品</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path:'/doctor/dishesset'}">设置套餐</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path:'/doctor/dishessetforold'}">为老人设定套餐</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path:'/doctor/dishescalenshow'}">老人的套餐展示</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path:'/doctor/dishescalenmanage'}">老人的套餐设定</el-breadcrumb-item>
            <el-breadcrumb-item></el-breadcrumb-item>
          </el-breadcrumb>
        </el-main>
        <el-main v-bind:class="{ 'el-mainrr': true }">
          <el-form
            :model="form"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="菜名">
              <el-input v-model="form.name" placeholder="请输入菜名"></el-input>
            </el-form-item>
            <el-form-item label="评论">
              <el-input v-model="form.remark" placeholder="请输入评论"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="form.labels" placeholder="请输入备注"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click.native="onsubmit">添加</el-button>
            </el-form-item>
          </el-form>
        </el-main>
      </el-container>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      form: {
        name: "",
        labels: "",
        remark: ""
      }
    };
  },
  methods: {
    onsubmit: function() {
      let url = `http://47.107.189.55:8081/HomeCareCenter/dish/add`;
      axios.post(url, this.form).then(res => {
        if (res.data.code == 0) {
          this.$message({
            message: "操作成功",
            type: "success"
          });
        } else {
          alert(res.data.code);
        }
      });
    }
  }
};
</script>
<style>
.el-mainll {
  background-color: #ffffff;
  color: #333;
  text-align: center;
  width: 20%;
}
.el-mainrr {
  background-color: #bdbdbd;
  color: #333;
  text-align: center;
  width: 80%;
}
.el-container {
  height: 600px;
}
</style>