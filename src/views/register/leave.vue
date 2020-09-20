<template>
  <div class="main">
    <div class="box">
         <div class="search">
        <el-popover
            placement="right"
            width="400"
            trigger="click">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="外出人" prop="clientId">
                    <el-select v-model="ruleForm.clientId" placeholder="请选择外出人">
                        <el-option
                                v-for="item in options"
                                :key="item.clientId"
                                :label="item.name"
                                :value="item.clientId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="外出事由" prop="reason">
                    <el-select v-model="ruleForm.reason" placeholder="请选择类型">
                        <el-option label="回家" value="回家"></el-option>
                        <el-option label="旅游" value="旅游"></el-option>
                        <el-option label="出去玩" value="出去玩"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="外出时间">
                    <el-date-picker
                            v-model="ruleForm.outTime"
                            type="datetime"
                            placeholder="外出时间"
                            :default-time="'12:00:00'">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="预计回院时间">
                    <el-date-picker
                            v-model="ruleForm.backTimeExpected"
                            type="datetime"
                            placeholder="回院时间"
                            :default-time="'12:00:00'">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="陪同人" prop="partnerName">
                    <el-input v-model="ruleForm.partnerName"></el-input>
                </el-form-item>
                <el-form-item label="陪同人电话" prop="partnerPhone">
                    <el-input v-model="ruleForm.partnerPhone"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-input type="textarea" v-model="ruleForm.remark"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
            <el-button slot="reference">click 激活</el-button>
            </el-popover>
            <el-form :inline="true" :model="form" class="demo-form-inline">
                <el-input v-model="form.name" placeholder="输入客户姓名"></el-input>
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
                        prop="clientId"
                        label="客户id"
                        width="80">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="姓名"
                        width="80">
                </el-table-column>
                <el-table-column
                        prop="reason"
                        label="出行原因"
                        width="80">
                </el-table-column>
                <el-table-column
                        prop="outTime"
                        label="外出时间"
                        width="80">
                </el-table-column>
                <el-table-column
                        prop="backTimeExpected"
                        label="预计返回时间"
                        width="80"
                >
                </el-table-column>
                <el-table-column
                        prop="backTimeReal"
                        label="实际返回时间"
                        width="120">
                         </el-table-column>
                <el-table-column
                        prop="partnerName"
                        label="陪同⼈姓名"
                        width="120">   
                </el-table-column>
                <el-table-column
                        prop="partnerPhone"
                        label="陪同⼈电话"
                        width="120">   
                </el-table-column>
                 <el-table-column
                        prop="remark"
                        label="remark"
                        width="120">   
                </el-table-column>
                <el-table-column
                        label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="middle"  icon="el-icon-edit" @click="update(scope.row.custId)">更新信息</el-button>
                        <el-button type="text" size="middle" icon="el-icon-s-order" @click="record(scope.row.custId)">护理记录</el-button>
                        <el-button type="text" size="middle" icon="el-icon-document-delete" @click="del(scope.row.custId)">退住</el-button>
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
                    reason: '',           //外出理由
                    outTime: new Date(),        //外出时间
                    backTimeExpected:new Date(), 
                    backTimeReal:'',     //回院时间
                    partnerName: '',    //陪同人
                    relation: '',    //与老人关系
                    partnerPhone: '',    //陪同人电话
                    remark: '',    //备注
                    nurseId:'',
                },
                form:{
                    name:''
                },
                tableData:[],
                loading:false,
                options:[],
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
            getNurse(){
                let id = sessionStorage.getItem("id");
                this.nurseId=id
                    console.log(id)
                    console.log(this.nurseId)
            },
             getData(){
                //this.loading = true
                var data=[];
                let url = `${HOST}/outRegistration/search`
                axios.get(url,{}).then(res=>{
                    console.log(res.data)
                    //console.log(res.data.data[2].name)
                 /*   for (let i = 0; i < res.data.data.length; i++) {
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
               // console.log(this.tableData)*/
                this.ruleForm=res.data.data;
                console.log(this.ruleForm)
                })
            },
         submitForm(ruleForm) {
        // var formData = JSON.stringify(this.form); // 这里才是你的表单数据
      /*  var back=this.ruleForm.backTimeExpected.Format("yyyy/MM/dd hh:mm:ss")
        var out=this.ruleForm.outTime.Format("yyyy/MM/dd hh:mm:ss")
        this.ruleForm.backTimeExpected=back;
        this.ruleForm.outTime=out;
        console.log(this.ruleForm.backTimeExpected)*/
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {//验证成功
                        //提交数据到服务器
                       
                        let url = `${HOST}/outRegistration/add`
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
                            console.log(this.ruleForm)
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