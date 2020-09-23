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
            <div style="margin-top:2%; margin-bottom: 1%;">请选择病人</div>
            <el-select v-model="form.clientId" placeholder="请选择">
              <el-option
                v-for="item in clientdata"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
            <div style="margin-top:2%; margin-bottom: 1%;">请选择套餐</div>
            <el-select v-model="form.dishSetId" placeholder="请选择">
              <el-option
                v-for="item in dishesdata"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
            <div style="margin-top:2%; margin-bottom: 1%;">选择起始日期</div>
            <span class="demonstration"></span>
            <el-date-picker v-model="form.startDate" type="date" placeholder="选择起始日期"></el-date-picker>
            <div style="margin-top:2%; margin-bottom: 1%;">选择终止日期</div>
            <span class="demonstration"></span>
            <el-date-picker v-model="form.endDate" type="date" placeholder="选择截止日期"></el-date-picker>
            <div style="margin-top: 5%;width: 20px;margin-left: 38%;">
              <el-form-item>
                <el-button type="primary" @click.native="onsubmit">设定</el-button>
              </el-form-item>
            </div>
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
      dishesdata: [],
      form: {
        clientId: "",
        dishSetId: "",
        startDate: new Date(),
        endDate: new Date()
      }
    };
  },
  created() {
    this.ini();
  },
  methods: {
    onsubmit: function() {
      let url = `http://47.107.189.55:8082/HomeCareCenter/dishSetCalendar/add`;
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
    },
    ini: function() {
      let url = `http://47.107.189.55:8082/HomeCareCenter/client/search`;
      axios.get(url).then(res => {
        if (res.data.code == 0) {
          this.clientdata = res.data.data;
        } else {
          alert(res.data.code);
        }
      });
      url = `http://47.107.189.55:8082/HomeCareCenter/dishSet/search`;
      axios.get(url).then(res => {
        if (res.data.code == 0) {
          this.dishesdata = res.data.data;
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
  background-color: white;
  color: #333;
  text-align: center;
  width: 80%;
}
.el-container {
  height: 600px;
}
</style>