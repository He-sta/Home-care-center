<template>
  <div class="main">
    <div class="box">
        <div  class="search">
            <el-form :inline="true" :model="form" class="demo-form-inline">
                <el-button type="primary" @click="add">入住登记</el-button>
                    <el-form-item>
                        <el-input v-model="form.name" placeholder="输入客户姓名"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="query">查询</el-button>
                    </el-form-item>
                </el-form>
        </div>
        <div class="table">
            <el-table
                    v-loading="loading"
                    element-loading-text="拼命加载中"
                    :data="tableData"
                    border
                    style="width: 100%">
                <el-table-column
                        type="index"
                        label="序号"
                        width="50">
                </el-table-column>
                 <el-table-column
                        prop="name"
                        label="客户名称"
                        width="80">
                </el-table-column>
                 <el-table-column
                        prop="id"
                        label="客户id"
                        width="80">
                </el-table-column>
                <el-table-column
                        prop="gender"
                        label="性别"
                        width="80">
                </el-table-column>
                <el-table-column
                        prop="bedId"
                        label="床位号"
                        width="80">
                </el-table-column>
                <el-table-column
                        prop="levelOfCare"
                        label="护理级别"
                        width="80">
                </el-table-column>
                <el-table-column
                        prop="inDate"
                        label="入住时间"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="outDate"
                        label="到期时间"
                        width="120">
                </el-table-column>
              <!-- <el-table-column
                        prop="marriage"
                        label="婚姻状况"
                        width="80">
                </el-table-column>
                <el-table-column
                        prop="birthday"
                        label="出生日期"
                        width="150">  
                </el-table-column> -->
                <el-table-column
                        label="操作" width="100">
                    <template slot-scope="scope">
                         <el-tooltip class="item" effect="dark" content="更新信息" placement="bottom">
                        <el-button type="text" size="middle"  icon="el-icon-edit" @click="update(scope.row.id)"></el-button>
                    </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="护理记录" placement="bottom">
                    <el-button type="text" size="middle" icon="el-icon-s-order" @click="record(scope.row.custId)"></el-button>>
                    </el-tooltip>
                     <el-tooltip class="item" effect="dark" content="退住" placement="bottom">
                     <el-button type="text" size="middle" icon="el-icon-document-delete" @click="del(scope.row.id)"></el-button>
                    </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
            </div>
   </div>
</div>
</template>
<script>
import axios from 'axios'
import Qs from 'qs'
import {HOST} from "../../common/js/config";
export default {
     data(){
            return{
                loading:false, //正在加载
                options:[],
                tableData:[],
                form:{
                    name:''
                }
            }
        },
        created(){
            this.getData()
        },
        methods:{
            //加载数据
            getData(){
                //this.loading = true
                var data=[];
                let url = `${HOST}/client/search`
                axios.get(url,{}).then(res=>{
                    // console.log(res.data)
                    //console.log(res.data.data[2].name)
                    for (let i = 0; i < res.data.data.length; i++) {
                        //console.log(res.data.data[i].name)
                         var form = {};
                        form.name=res.data.data[i].name;
                        form.gender=res.data.data[i].gender;
                        form.bedId=res.data.data[i].bedId;
                        form.name=res.data.data[i].name;
                        form.inDate=res.data.data[i].inDate;
                        form.outDate=res.data.data[i].outDate;
                        form.marriage=res.data.data[i].marriage;
                        form.id=res.data.data[i].id;
                        form.levelOfCare=res.data.data[i].levelOfCare;
                        data[i] = form
                        //this.form.name=res.data.date[i].name
                    }
                    console.log(data)
                this.tableData=data;
               // console.log(this.tableData)
                })
            },
             //页面跳转
            handleCurrentChange(val){
                this.currPage = val
                this.getData()
            },
            //修改
            update(id){
                console.log(id)
                //跳转路由到修改，传递主键
                this.$router.push(`/updateClient/${id}`)
            },
            //删除
            del(id){
                console.log(id)
                this.$confirm('是否登记退住?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                   // var id=this.tableData.id;
                      console.log(id)
                    let url = `${HOST}/client/delete?id=${id}`
                  
                    axios.get(url).then(res=>{
                        console.log(res.data)
                        if (res.data.code === 0){
                            this.$message({
                                message: '退住成功',
                                type: 'success'
                            });
                            this.currPage = 1
                           // this.tableData.splice(index,1)
                            this.getData()
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消退住'
                    });
                });
            },
            //新增
            add(){
                this.$router.push("/CheckinAdd")
            },
            //查询
            query(){
                this.currPage = 1
                this.getData()
            },
            //跳转到膳食日历
            foodCalendar(id){
                console.log(id)
                //跳转路由到修改，传递主键
                this.$router.push(`/calendar/${id}`)
            },

    
        }
}
</script>
<style scoped>
.box{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 500px;
}
.table{
    width: 96%;
    height: 90%;
}
</style>