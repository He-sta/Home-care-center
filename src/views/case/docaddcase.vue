<template>
  <div class="main">
    <div class="box">
      <el-container>
        <el-main v-bind:class="{ 'el-mainrr': true }" style="display:flex;justify-content:center">
          <el-form
            :model="form"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
            style="width: 42%;"
          >
            <el-form-item label="请选择病人">
              
              <el-select v-model="form.clientId" placeholder="请选择"  style="width: 100%;"> 
                <el-option
                  v-for="item in clientdata"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
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
              <el-date-picker v-model="form.date" type="date" placeholder="选择日期" style="width: 100%;"></el-date-picker>
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
Date.prototype.Format = function(fmt) {
  //author: meizz
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return fmt;
};
export default {
  data() {
    return {
      clientdata: [],
      form: {
        clientId: "",
        disease: "",
        prescription: "",
        doctorId: "",
        remark: "",
        date: new Date()
      }
    };
  },
  created() {
    this.ini();
  },
  methods: {
     getCookie: function(name) {
      var arr,
        reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
      if ((arr = document.cookie.match(reg))) return arr[2];
      else return null;
    },
    onsubmit: function() {
      var temp=this.getCookie("id");
      this.form.doctorId=temp;
      var time1 = this.form.date.Format("yyyy-MM-dd");
      this.form.date = time1;
      let url = `http://47.107.189.55:8082/HomeCareCenter/medicalRecord/add`;
      axios.post(url, this.form).then(res => {
        if (res.data.code == 0) {
          
          if(res.data.msg===null)
          {
            alert("success");
          }
          else{
            alert(res.data.msg);
          }
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