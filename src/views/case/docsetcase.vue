<template>
  <div class="main">
    <div class="box">
      <el-container>
        <el-main v-bind:class="{ 'el-mainll': true }"></el-main>
        <el-main v-bind:class="{ 'el-mainrr': true }">
          <el-form
            :model="form"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <div>请选择护理级别</div>
            <div class="block" style="width:500px;margin: 0 auto;">
              <el-slider v-model="form.level" :step="1" max="3" show-stops width:100px></el-slider>
            </div>
            <el-form-item label="床号">
              <el-input v-model="form.inputa" placeholder="请输入床号"></el-input>
            </el-form-item>
            <el-form-item label="食物需求">
              <el-input v-model="form.inputb" placeholder="请输入食物"></el-input>
            </el-form-item>
            <el-form-item label="clientid">
              <el-input v-model="form.inputc" placeholder="请输入病人id"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click.native="onsubmit">创建</el-button>
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
        level: 1,
        inputa: "",
        inputb: "",
        inputc: "",
        inputd: ""
      }
    };
  },
  methods: {
    onsubmit: function() {
      document.cookie="id=1111111";
      var x = document.cookie;
      alert(x);
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