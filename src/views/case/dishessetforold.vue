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
            <el-breadcrumb-item></el-breadcrumb-item>
          </el-breadcrumb>
        </el-main>
        <el-main v-bind:class="{ 'el-mainrr': true }">
           <el-form
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label="病人id">
                <el-input v-model="form.clientId" placeholder="请输入病人id"></el-input>
              </el-form-item>
              <el-form-item label="套餐名">
                <el-input v-model="form.dishSetId" placeholder="请输入套餐名"></el-input>
              </el-form-item>
              <el-form-item>
                <div class="block">
                  <div>选择起始日期</div>
                  <span class="demonstration"></span>
                  <el-date-picker v-model="form.startDate" type="date" placeholder="选择起始日期"></el-date-picker>
                </div>
                <div class="block">
                  <div>选择终止日期</div>
                  <span class="demonstration"></span>
                  <el-date-picker v-model="form.endDate" type="date" placeholder="选择截止日期"></el-date-picker>
                </div>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click.native="onsubmit">设定</el-button>
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
        clientId: "",
        dishSetId: "",
        startDate: new Date(),
        endDate: new Date()
      }
    };
  },
  methods: {
    onsubmit: function() {
      alert("success");
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