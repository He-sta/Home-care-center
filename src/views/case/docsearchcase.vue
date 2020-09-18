
<template>
  <div>
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
    search: function() {
      let url = `http://47.107.189.55:8081/HomeCareCenter/medicalRecord/search`;
      alert(this.form.endDate);
      axios.get(url, { params: { clientId: this.form.clientId } }).then(res => {
        if (res.data.code == 0) {
          this.tableData = res.data.data;
        } else {
          alert(res.data.code);
        }
      });
    },
    handleDelete: function(caseid) {
      let url = `http://47.107.189.55:8081/HomeCareCenter/medicalRecord/delete`;
      alert(caseid);
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
.block {
  width: 50%;

  height: 100px;

  display: inline-block;
}
.el-container {
  height: 600px;
}
</style>