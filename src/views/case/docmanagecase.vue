<template>
  <div class="main">
    <div class="box">
      <el-container>
        <el-main v-bind:class="{ 'el-mainrr': true }">
          <el-form
            :model="form"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
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
              <el-button type="primary" @click.native="change">修改</el-button>
            </el-form-item>
          </el-form>
        </el-main>
      </el-container>
    </div>
  </div>
</template>
<script>
import axios from "axios"
export default {
  data() {
    return {
      form: {
        id:this.$route.params.id,
        disease: this.$route.params.disease,
        prescription: this.$route.params.prescription,
        remark: this.$route.params.remark,
        date: new Date()
      }
    };
  },
  methods: {
    change: function() {
      let url = `http://47.107.189.55:8081/HomeCareCenter/medicalRecord/update`;
      alert(this.form.endDate);
        axios.post(url,this.form).then(res => {
          if (res.data.code == 0) {
            alert("success");
          }
          else
          {
            alert(res.data.code );
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