<template>
  <div class="main">
    <div class="box">
         <div class="search">
        <el-popover
            placement="right"
            width="400"
            trigger="click">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm ">
                <el-form-item label="客户" prop="clientId" class="">
                    <el-select v-model="ruleForm.clientId" placeholder="请选择客户">
                        <el-option
                                v-for="item in options"
                                :key="item.clientId"
                                :label="item.name"
                                :value="item.clientId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="护理日期">
                    <el-date-picker
                            v-model="ruleForm.date"
                            type="date"
                            placeholder="护理日期"
                            :default-time="'12:00:00'">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="护理内容" prop="content">
                    <el-input type="textarea" v-model="ruleForm.content"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-input type="textarea" v-model="ruleForm.remark"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
            <el-button slot="reference">添加护理记录</el-button>
            </el-popover>
            <el-form :inline="true" :model="form" class="demo-form-inline search_">
                <el-input v-model="form.id" placeholder="输入客户id" style="margin-right:10px"></el-input>
                    <el-button type="primary" @click="query">查询</el-button>
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
                        prop="id"
                        label="客户id"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="姓名"
                        width="80">
                </el-table-column>
                <el-table-column
                        prop="content"
                        label="护理内容"
                        width="280">
                </el-table-column>
                <el-table-column
                        prop="date"
                        label="护理日期"
                        width="180">
                </el-table-column>
                 <el-table-column
                        prop="remark"
                        label="remark"
                        >   
                </el-table-column>
               <!-- <el-table-column
                        label="操作">
                    <template slot-scope="scope">
                         <el-popover
            placement="right"
            width="400"
            trigger="click">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="客户" prop="clientId">
                    <el-select v-model="ruleForm.clientId" placeholder="请选择客户">
                        <el-option
                                v-for="item in options"
                                :key="item.clientId"
                                :label="item.name"
                                :value="item.clientId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="护理日期">
                    <el-date-picker
                            v-model="ruleForm.date"
                            type="date"
                            placeholder="护理日期"
                            :default-time="'12:00:00'">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="护理内容" prop="content">
                    <el-input type="textarea" v-model="ruleForm.content"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-input type="textarea" v-model="ruleForm.remark"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
            <el-button type="text" size="middle"  icon="el-icon-edit" slot="reference" @click="update(scope.row.custId)">更新信息</el-button>
            </el-popover>
                        
                        <el-button type="text" size="middle" icon="el-icon-s-order" @click="record(scope.row.custId)">护理记录</el-button>
                        <el-button type="text" size="middle" icon="el-icon-document-delete" @click="del(scope.row.custId)">退住</el-button>
                    </template>
                </el-table-column>-->
            </el-table>
            </div>
    </div>
</div>
</template>
<style scoped>
.box{
    flex-direction: column;
    min-height: 500px;
}
.search{
    display: flex;
    justify-content: space-between;
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
<script>
import axios from 'axios'
import Qs from 'qs'
import {HOST} from "../../common/js/config";
import {makeSimpleDate} from '../../common/js/dateformat.js'
import {makeDate} from '../../common/js/dateformat.js'
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
                ruleForm: {//定义form绑定的对象
                    clientId: '',          //入住人ID
                    name: '',     //入住人
                    content: '',           //外出理由
                    date: new Date(),        //外出时间
                    remark: '',    //备注
                    nurseId:'',
                },
                form:{
                    id:''
                },
                tableData:[],
                loading:false,
                options:[],
                nameArr:[],
                rules:{
                     outTime: [
                        { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                    ],
                    backTimeExpected: [
                        { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
                    ],
                }
            }
    },
    created(){
        this.getClient();
        this.ruleForm.nurseId=sessionStorage.getItem("id")
        this.getData()
        this.getClientName()

    },
    methods:{
         getClient(){
                let url = `${HOST}/client/search`
                var data=[];
                axios.get(url, {}).then(res=>{
                     for (let i = 0; i < res.data.data.length; i++) {
                        var form = {};
                        form.name=res.data.data[i].name;
                        form.clientId=res.data.data[i].id;
                        data[i] = form
                     }
                     this.options=data;
                   console.log(this.ruleForm.clientId)
                })
            },
            getClientName(){
               let url = `${HOST}/client/search`
                var data=[];
                axios.get(url, {}).then(res=>{
                     for (let i = 0; i < res.data.data.length; i++) {
                        var form = {};
                        form.name=res.data.data[i].name;
                        data[i] = form
                     }
                    // console.log(data)
                     this.nameArr=data;
                 //    console.log(this.tableData)
                })
            },
            getNurse(){
                let id = sessionStorage.getItem("id");
                this.nurseId=id
                    console.log(id)
                    console.log(this.nurseId)
            },
             getData(){
                //this.loading = true
                var data=[];
                let url = `${HOST}/nursingRecord/search`
                axios.get(url,{}).then(res=>{
                    console.log(res.data)
                    //console.log(res.data.data[2].name)
                    for (let i = 0; i < res.data.data.length; i++) {
                        //console.log(res.data.data[i].name)
                         var form = {};
                        form.name=this.nameArr[i].name;
                       // form.name=res.data.data[i].name;
                        form.id=res.data.data[i].id;
                        form.content=res.data.data[i].content;
                        form.remark=res.data.data[i].remark;
                        form.date=res.data.data[i].date;
                        data[i] = form
                        //this.form.name=res.data.date[i].name
                    }
                    console.log(data)
                this.tableData=data;
               // console.log(this.tableData)*/
                //this.ruleForm=res.data.data;
                console.log(this.ruleForm)
                })
            },
            query(){
                var data=[];
                let url = `${HOST}/nursingRecord/search?id=${this.form.id}`
                axios.get(url,{}).then(res=>{
                     console.log(res.data.data.id)
                     //this.tableData=res.data.data
                    //console.log(res.data.data[2].name)
                    //for (let i = 0; i < res.data.data.length; i++) {
                       // var i=0
                         var form = {};
                       // form.name=this.nameArr[i].name;
                       form.name=res.data.data.name;
                        form.id=res.data.data.id;
                        form.content=res.data.data.content;
                        form.remark=res.data.data.remark;
                        form.date=res.data.data.date;
                        data[0] = form
                        //this.form.name=res.data.date[i].name
                   // }
                this.tableData=data;
                console.log(this.tableData)

                })
            },
         submitForm(ruleForm) {
        // var formData = JSON.stringify(this.form); // 这里才是你的表单数据
        console.log(this.ruleForm.backTimeExpected)
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {//验证成功
                        //提交数据到服务器
                       
                        let url = `${HOST}/nursingRecord/add`
                        //let dt = Qs.stringify(this.form);
                        axios.post(url,this.ruleForm).then(res=>{
                           // this.form = res ?res :{}
                            alert(res.data.code)
                            if (res.data.code == 0){
                                this.$message({
                                    message: '新增成功',
                                    type: 'success'
                                });
                                alert('添加成功')
                                console.log("success");  
                            }
                        }).catch(function(){
                            console.log("服务器异常！");
                            
                         });
                    }
                })
         }
    },
     //过滤器
    filters:{
            //日期转换
            formatDate(val){
                if(val!=null) return makeSimpleDate(val)
                else  return null
            },
            formatDatetime(val){
                if(val!=null) return makeDate(val)
                else  return '暂无'
            },
        }
}
</script>