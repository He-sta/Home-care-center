
<template>
  <div>
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
             style="display:flex">
              <el-form-item >
                <el-select v-model="form.clientId" placeholder="请选择病人">
                  <el-option
                    v-for="item in clientdata"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
                </el-form-item >
                <el-form-item label="选择起始日期">
                <span class="demonstration"></span>
                <el-date-picker v-model="form.startDate" type="date" placeholder="选择起始日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="选择终止日期">
                <span class="demonstration"></span>
                <el-date-picker v-model="form.endDate" type="date" placeholder="选择截止日期"></el-date-picker>
                </el-form-item>
              <el-form-item>
                <el-button type="primary" @click.native="search">查找</el-button>
              </el-form-item>
            </el-form>
            <el-table :data="tableData" style="width: 100%">
              <el-table-column type="index" width="50"></el-table-column>
              <el-table-column prop="date" label="日期"></el-table-column>
              <el-table-column prop="disease" label="病名"></el-table-column>
              <el-table-column prop="prescription" label="处方"></el-table-column>
              <el-table-column prop="remark" label="评论"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="handlechange(scope.row.id,scope.row.disease,scope.row.prescription,scope.row.remark)"
                  >编辑</el-button>
                  <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-main>
        </el-container>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import qs from "qs";
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
        startDate: new Date(),
        endDate: new Date()
      },
      info: {},
      tableData: []
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
    search: function() {
      let url = `http://47.107.189.55:8082/HomeCareCenter/medicalRecord/search`;
      var time1 = this.form.startDate.Format("yyyy/MM/dd hh:mm:ss");
      var time2 = this.form.endDate.Format("yyyy/MM/dd") + " 23:59:59";
      axios
        .get(url, {
          params: {
            clientId: this.form.clientId,
            endDate: time2,
            startDate: time1
          }
        })
        .then(res => {
          if (res.data.code == 0) {
            this.tableData = res.data.data;
          } else {
            alert(res.data.code);
          }
        });
    },
    handleDelete: function(caseid) {
      let url = `http://47.107.189.55:8082/HomeCareCenter/medicalRecord/delete`;
      axios.get(url, { params: { id: caseid } }).then(res => {
        if (res.data.code == 0) {
          this.tableData = res.data.data;
        } else {
          alert("失败");
        }
      });
    },
    handlechange: function(caseid, casedisease, caseprescription, caseremark) {
      this.$router.push({
        name: "manage",
        params: {
          id: caseid,
          disease: casedisease,
          prescription: caseprescription,
          remark: caseremark
        }
      });
    },
    ini: function() {
      let url = `http://47.107.189.55:8082/HomeCareCenter/client/search`;
      axios
        .get(url, {

          params: {}
        })
        .then(res => {
          if (res.data.code == 0) {
        
            this.clientdata = res.data.data;
          } else {
            alert(res.data.code);
          }
        })
        .catch(err => {
          console.log(err);
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
.block {
  width: 50%;

  height: 100px;

  display: inline-block;
}
.el-container {
  height: 600px;
}
</style>