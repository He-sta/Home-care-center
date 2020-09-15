<template>
  <div class="main">
    <div class="box">
      <el-container>
        <el-main v-bind:class="{ 'el-mainl': true }">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{path:'/doctor/docsearchcase' }">查找病例</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path:'/doctor/docaddcase'}">增加病例</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path:'/doctor/docmanagecase'}">修改病例</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path:'/doctor/docdeletecase'}">删除病例</el-breadcrumb-item>
            <el-breadcrumb-item></el-breadcrumb-item>
          </el-breadcrumb>
        </el-main>
        <el-main v-bind:class="{ 'el-mainr': true }">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="id">
              <el-input v-model="form.inputa" placeholder="请输入id"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click.native="getcookie">删除</el-button>
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
        inputa: ""
      }
    };
  },
  methods: {
    getcookie: function() {
      var str=document.cookie;
      alert(str);
    }
  }
};
</script>
<style>
.el-mainl {
  background-color: #ffffff;
  color: #333;
  text-align: center;
  width: 30%;
}
.el-mainr {
  background-color: #bdbdbd;
  color: #333;
  text-align: center;
  width: 70%;
}
.el-container {
  height: 600px;
}
</style>