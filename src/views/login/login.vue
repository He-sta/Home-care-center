<template>
  <div class="main">
    <div class="box">
      <el-container>
        <el-main v-bind:class="{ 'el-lomainl': true }"></el-main>
        <el-main v-bind:class="{ 'el-lomainr': true }">
          <div style="margin-top:20%;font-size:40px">东软颐养中心</div>
          <div style="font-size:30px">sign in</div>
          <div style="margin-top:5%">
            <el-form
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label="用户名">
                <el-input v-model="form.idCardNo" placeholder="请输入用户名"></el-input>
              </el-form-item>
              <el-form-item label="密码">
                <el-input v-model="form.password" placeholder="请输入密码" show-password></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click.native="login">登录</el-button>
              </el-form-item>
            </el-form>
          </div>
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
        idCardNo: "",
        password: ""
      }
    };
  },
  methods: {
    login: function() {
      if (this.form.idCardNo === "") {
        alert("用户名不能为空");
      } else {
        let url = `http://47.107.189.55:8082/HomeCareCenter/worker/login`;
        axios.post(url, this.form).then(res => {
          if (res.data.code === 0) {
            this.$message({
              message: "操作成功",
              type: "success"
            });
            document.cookie = "id=" + res.data.data.worker.id + ";";
            document.cookie = "jwt=" + res.data.data.jwt + ";";
            document.cookie = "expires=" + res.data.data.ttl + ";";
            var x = document.cookie;
            console.log(res.data.data.worker.id);
            sessionStorage.setItem("id", res.data.data.worker.id);
            var id=sessionStorage.getItem("id")
            console.log(id)
            this.$router.push('/main')

          }
          else
          {
            alert("失败");
          }
        });

      }
    }
  }
};
</script>
<style>
.el-lomainl {
  background-color: #000000;
  color: #333;
  text-align: center;
  width: 60%;
  background-image: url(sour.jpeg);
  background-size: cover;
}
.el-lomainr {
  background-color: #ffffff;
  color: #000000;
  text-align: center;
  width: 40%;
}
.el-container {
  height: 600px;
}
</style>