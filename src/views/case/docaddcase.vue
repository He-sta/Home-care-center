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
            <div>请选择病人</div>
            <el-select v-model="form.clientId" placeholder="请选择">
              <el-option
                v-for="item in clientdata"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
            <el-form-item label="病例">
              <el-input v-model="form.disease" placeholder="请输入病例"></el-input>
            </el-form-item>
            <el-form-item label="处方">
              <el-input v-model="form.prescription" placeholder="请输入处方"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="form.remark" placeholder="备注"></el-input>
            </el-form-item>
            <el-form-item label="选择日期">
              <span class="demonstration"></span>
              <el-date-picker v-model="form.date" type="date" placeholder="选择日期"></el-date-picker>
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
      clientdata: [],
      form: {
        clientId: "",
        disease: "",
        prescription: "",
        doctorId:"1306054044329996288",
        remark: "",
        date: new Date()
      }
    };
  },
  created() {
    this.ini();
  },
  methods: {
    onsubmit: function() {
      let url = `http://47.107.189.55:8081/HomeCareCenter/medicalRecord/add`;
        axios.post(url,this.form).then(res => {
          if (res.data.code == 0) {
            this.$message({
              message: "操作成功",
              type: "success",
            });
          }
          else
          {
            alert(res.data.code );
          }
        });
    },
    ini: function() {
      let url = `http://47.107.189.55:8081/HomeCareCenter/client/search`;
      axios.get(url).then(res => {
        if (res.data.code == 0) {
          this.clientdata = res.data.data;
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