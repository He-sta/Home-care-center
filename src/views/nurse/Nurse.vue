<template>
  <div class="main">
    <div class="box">
    <div>
        <div class="search">
            <el-form :inline="true" :model="form" class="demo-form-inline">
                <el-form-item label="员工名称">
                    <el-input  v-model="form.name" placeholder="员工名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="query">查询</el-button>
                </el-form-item>
                <el-button type="primary" icon="el-icon-edit" circle @click="add"></el-button>
            </el-form>
        </div>
        <div class="table">
            <el-table
                    v-loading="loading"
                    element-loading-text="拼命加载中"
                    :data="tableData"
                    border
                    style="width: 98%">
            <el-table-column
                    prop="id"
                    label="员工编号"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="员工名称"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="gender"
                    label="性别"
                    width="100"
            >
            </el-table-column>
            <el-table-column
                    prop="phoneNo"
                    label="电话号码"
                    width="100"
            >
            </el-table-column>
            <el-table-column
                    prop="idCardNo"
                    label="身份证号"
                    width="180"
            >
            </el-table-column>
            <!--<el-table-column
                    prop="number"
                    label="员工号"
                    width="200">
            </el-table-column>-->
            <el-table-column
                    prop="registerDate"
                    label="注册时间"
                    width="250">
            </el-table-column>
            <el-table-column
                    label="操作"
                     >
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" content="编辑" placement="bottom">
                    <el-button type="text" size="middle"  icon="el-icon-edit" @click="update(scope.row.id)">编辑</el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
                    <el-button type="text" size="middle" icon="el-icon-delete" @click="del(scope.row.id)">删除</el-button>
                    </el-tooltip>
                </template>
            </el-table-column>
        </el-table>
    </div>
 </div>
  </div>
  </div>
</template>

<script>
    import axios from 'axios'
    export default {
        data() {
            return {
                loading:false, //正在加载
                options:[],
                tableData:[],
                form:{//提交查询的数据
                    name:'',
                }
            }
        },
         created(){
            this.getData()
        },
        methods:{
            //加载数据
            getData(){
                //this.loading=true
                var data=[];
                let url =`http://47.107.189.55:8082/HomeCareCenter/worker/search?type=2`
                axios.get(url,{}).then(res=>{
                    for (let i = 0; i < res.data.data.length; i++) {
                        //console.log(res.data.data[i].name)
                         var form = {};
                        form.id=res.data.data[i].id;
                        form.name=res.data.data[i].name;
                        if(res.data.data[i].gender==1)
                        form.gender="男";
                        else
                        form.gender="女";
                        form.phoneNo=res.data.data[i].phoneNo;
                        form.idCardNo=res.data.data[i].idCardNo;
                        form.registerDate=res.data.data[i].registerDate;
                        data[i] = form
                }
                 console.log(data)
                this.tableData=data;
                })
            },
            //页面跳转
            handleCurrentChange(val){
                this.currPage=val,
                    this.getData()
            },
            //查询
            query(){
                this.currPage=1
                 var data=[];
                let url =`http://47.107.189.55:8082/HomeCareCenter/worker/search?type=2&name=${name}`
                axios.get(url,{}).then(res=>{
                    for (let i = 0; i < res.data.data.length; i++) {
                        //console.log(res.data.data[i].name)
                         var form = {};
                        form.id=res.data.data[i].id;
                        form.name=res.data.data[i].name;
                        if(res.data.data[i].gender==1)
                        form.gender="男";
                        else
                        form.gender="女";
                        form.phoneNo=res.data.data[i].phoneNo;
                        form.idCardNo=res.data.data[i].idCardNo;
                        form.registerDate=res.data.data[i].registerDate;
                        data[i] = form
                }
                 console.log(data)
                this.tableData=data;
                })
            },

            update(id){
                console.log(id)
                this.$router.push(`/nurse/NurseUpdate/${id}`)
            },
            del(id){
                console.log(id)
                this.$confirm('是否删除该记录?', '提示', {
                    cancelButtonText: '取消',
                    confirmButtonText: '确定',
                    type: 'warning'
                }).then(() => {
                    console.log(id)
                    let url =`http://47.107.189.55:8082/HomeCareCenter/worker/delete?id=${id}`
                    axios.get(url).then(res=>{
                        console.log(res.data)
                        if (res.data.code === 0){
                            this.$message({
                                message: '操作成功',
                                type: 'success'
                            });
                
                        this.getData()
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已删除'
                    });
                });
            },
            add(){
                this.$router.push('/nurse/NurseAdd')
            },
        }

        

    }
</script>

<style scoped>

.search{
        margin-top: 15px;
        margin: 0 auto;
}
.table{
    width: 98%;
    height: 90%;
}
.box{
    flex-direction: column;
    min-height: 500px;
}
.search{
    display: flex;
    justify-content: center;
    margin: 1% 10%;
}
.search_{
    display: flex;
    margin-left: 10%;
}
.table{
    margin: 0 2% 1%;
}
</style>