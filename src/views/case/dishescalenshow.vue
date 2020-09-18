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
            <el-breadcrumb-item :to="{path:'/doctor/dishescalenmanage'}">老人的套餐设定</el-breadcrumb-item>
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
              <el-button type="primary" @click.native="search">查找</el-button>
            </el-form-item>
          </el-form>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="clientFull.name" label="客户" width="180"></el-table-column>
            <el-table-column prop="startDate" label="开始日期" width="180"></el-table-column>
            <el-table-column prop="endDate" label="截止日期" width="180"></el-table-column>
            <el-table-column label="套餐" width="180">
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                  <div>
                    周一
                  <li
                    class="item"
                    v-for="(item, index) in scope.row.dishSetFull.monDish"
                    :key="index"
                  >{{ item.name }}</li>
                  </div>
                  <div>
                    周二
                  <li
                    class="item"
                    v-for="(item, index) in scope.row.dishSetFull.tueDish"
                    :key="index"
                  >{{ item.name }}</li>
                  </div>
                  <div>
                    周三
                  <li
                    class="item"
                    v-for="(item, index) in scope.row.dishSetFull.wedDish"
                    :key="index"
                  >{{ item.name }}</li>
                  </div>
                  <div>
                    周四
                  <li
                    class="item"
                    v-for="(item, index) in scope.row.dishSetFull.thuDish"
                    :key="index"
                  >{{ item.name }}</li>
                  </div>
                  <div>
                    周五
                  <li
                    class="item"
                    v-for="(item, index) in scope.row.dishSetFull.friDish"
                    :key="index"
                  >{{ item.name }}</li>
                  </div>
                  <div>
                    周六
                  <li
                    class="item"
                    v-for="(item, index) in scope.row.dishSetFull.satDish"
                    :key="index"
                  >{{ item.name }}</li>
                  </div>
                  <div>
                    周日
                  <li
                    class="item"
                    v-for="(item, index) in scope.row.dishSetFull.sunDish"
                    :key="index"
                  >{{ item.name }}</li>
                  </div>
                  <div slot="reference" class="name-wrapper">
                    <el-tag size="medium">{{ scope.row.dishSetFull.name }}</el-tag>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" @click="handlechange(scope.row.id,scope.row.clientId)">编辑</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
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
        clientId: ""
      },
      tableData: []
    };
  },
  created() {
    this.ini();
  },
  methods: {
    search: function() {
      let url = `http://47.107.189.55:8081/HomeCareCenter/dishSetCalendar/search`;
      axios.get(url, { params: { clientId: this.form.clientId } }).then(res => {
        if (res.data.code == 0) {
          this.tableData = res.data.data;
        } else {
          alert(res.data.code);
        }
      });
    },
    handleDelete: function(caseid) {
      let url = `http://47.107.189.55:8081/HomeCareCenter/dishSetCalendar/delete`;
      axios.get(url, { params: { id: caseid } }).then(res => {
        if (res.data.code == 0) {
          this.tableData = res.data.data;
        } else {
          alert("失败");
        }
      });
    },
    handlechange: function(caseid,cliid) {
      this.$router.push({ name: "calenmanage", params: { calenid: caseid,clientid: cliid } });
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