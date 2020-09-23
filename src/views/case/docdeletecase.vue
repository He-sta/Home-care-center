<template>
  <div class="main">
    <div class="box">
      <el-container>
        <el-main v-bind:class="{ 'el-mainll': true }">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{path:'/doctor/docsearchcase' }">查找病例</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path:'/doctor/docaddcase'}">增加病例</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path:'/doctor/docmanagecase'}">修改病例</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path:'/doctor/docdeletecase'}">删除病例</el-breadcrumb-item>
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
            <el-form-item label="id">
              <el-input v-model="form.id" placeholder="请输入id"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click.native="delet">删除</el-button>
            </el-form-item>
          </el-form>
        </el-main>
      </el-container>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        id: ""
      }
    };
  },
  methods: {
    delet: function() {
      alert(this.form.id);
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
  background-color: white;
  color: #333;
  text-align: center;
  width: 80%;
}
.el-container {
  height: 600px;
}
</style>