<template>
  <div class="main">
    <div class="box">
       <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/register/add' }">人员管理</el-breadcrumb-item>
              <el-breadcrumb-item><a href="/">护士信息管理</a></el-breadcrumb-item>
        </el-breadcrumb>
<div style="width:1130px">
  <el-table
    :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
    height="600"
    border
    style:width="100%">
    <el-table-column
      fixed
      prop="id"
      label="编号"
      width="130">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="130">
    </el-table-column>
    <el-table-column
      prop="gender"
      label="性别"
      width="130">
    </el-table-column>
      <el-table-column
      prop="type"
      label="类别"
      width="130">
    </el-table-column>
    <el-table-column
      prop="areaId"
      label="管理病区"
      width="130">
    </el-table-column>
    <el-table-column
      prop="phone_no"
      label="联系方式"
      width="130">
    </el-table-column>
    <el-table-column
      prop="id_card"
      label="身份证号"
      width="170">
    </el-table-column>
    <el-table-column
      align="right"
      width="180">
      <template slot="header">
        <el-input
          v-model="search"
          placeholder="输入关键字搜索"/>
      </template>
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" >查看</el-button>
        <el-button type="text" >编辑</el-button>
        <el-button type="text" >删除</el-button>
      </template>      
    </el-table-column>
  </el-table>
  </div>
  </div>
  </div>
</template>

<script>
  export default {
    methods: {
      handleClick(row) {
        console.log(row);
      }
    },

    data() {
      return {
        tableData: [{
          id: '01',
          name: '小王',
          gender: '男',
          type: '护士',
          areaId:'01',
          phone_no: '15072281719',
          id_card: 420129199912274512
        }]
      }
    }
  }
</script>