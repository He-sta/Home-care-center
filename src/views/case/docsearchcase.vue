
<template>
  <div>
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
              <el-form-item label="病人id">
                <el-input v-model="form.clientId" placeholder="请输入病人id"></el-input>
              </el-form-item>
              <el-form-item label="医生id">
                <el-input v-model="form.doctorId" placeholder="请输入医生id"></el-input>
              </el-form-item>
              <el-form-item label="病例id">
                <el-input v-model="form.id" placeholder="请输入病例id"></el-input>
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
                <el-button type="primary" @click.native="search">查找</el-button>
              </el-form-item>
            </el-form>
            <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="clientId" label="客户id" width="180"></el-table-column>
              <el-table-column prop="date" label="日期" width="180"></el-table-column>
              <el-table-column prop="disease" label="病名"></el-table-column>
              <el-table-column prop="doctorId" label="医生id"></el-table-column>
              <el-table-column prop="prescription" label="处方"></el-table-column>
              <el-table-column prop="remark" label="评论"></el-table-column>
            </el-table>
          </el-main>
        </el-container>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        clientId: "",
        doctorId: "",
        id: "",
        startDate: new Date(),
        endDate: new Date()
      },
      info: {},
      tableData: []
    };
  },
  methods: {
    search: function() {
      this.tableData = [{ clientId: "ddddd" }];
      alert(this.form.startDate);
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
.block {
  width: 50%;

  height: 100px;

  display: inline-block;
}
.el-container {
  height: 600px;
}
</style>