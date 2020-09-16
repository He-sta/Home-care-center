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
            <el-breadcrumb-item></el-breadcrumb-item>
          </el-breadcrumb>
        </el-main>
        <el-main v-bind:class="{ 'el-mainrr': true }">
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
              <el-form-item>
                <el-button type="primary" @click.native="search">查找</el-button>
              </el-form-item>
            </el-form>
            <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="clientId" label="客户id" width="180"></el-table-column>
              <el-table-column prop="startDate" label="开始日期" width="180"></el-table-column>
              <el-table-column prop="endDate" label="截止日期" width="180"></el-table-column>
              <el-table-column prop="dishSetId" label="套餐id"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.row.dishSetId)"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
        </el-main>
      </el-container>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        clientId: ""
      },
      tableData:[]
    };
  },
  methods: {
    search: function() {
      this.tableData = [{ clientId: "ddddd",dishSetId:"21313"}];
      alert(this.form.clientId);
    },
    handleDelete: function(id) {
        alert(id);
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