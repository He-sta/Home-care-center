<template>
  <div class="main">
    <div class="box">
      <el-container>
        <el-main v-bind:class="{ 'el-mainrr': true } " style="display:flex;justify-content: center;">
          <el-form
            :model="form"
            :rules="rules"
            ref="ruleForm"
            label-width="50px"
            class="demo-ruleForm"
            style="width: 42%; "
          >
            <el-form-item label="菜名">
              <el-input  v-model="form.name" placeholder="请输入菜名" style="width: 100%;"></el-input>
            </el-form-item>
            <el-form-item label="评论">
              <el-input type="textarea" v-model="form.remark" placeholder="请输入评论" style="width: 100%;"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input type="textarea" v-model="form.labels" placeholder="请输入备注" style="width: 100%;"></el-input>
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
      if (this.form.name === "") {
        alert("菜名不能为空");
      } else {
        let url = `http://47.107.189.55:8082/HomeCareCenter/dish/add`;
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
  width: 40%;
  
}
.el-container {
  height: 600px;
}
</style>