<template>
  <div class="main">
    <div class="box">
     <div class="picture">
     <div class="block"><el-avatar :size="120" :src="ruleForm.headImg"></el-avatar></div>
     <el-upload
                class="avatar-uploader"
                 ref="image"
                name="image"
                :action="`http://47.107.189.55:8080/HomeCareCenter/image/upload`"
                :data="uploadData"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <el-button style="margin-top:30px">添加照片</el-button>
            </el-upload>
    </div>
    <div class="info1">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" >
    <el-form-item label="姓名" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>


    <el-form-item label="类型" prop="type">
    <el-select v-model="ruleForm.type" placeholder="职业类型" style="width:100%">
       <el-option
      v-for="item in option"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      :disabled="item.disabled">
      </el-option>
    </el-select>
    </el-form-item>

     <el-form-item label="性别">
    <el-select v-model="ruleForm.gender" placeholder="请选择性别" style="width:100%">
      <el-option label="男" value="0"></el-option>
      <el-option label="女" value="1"></el-option>
    </el-select>
  </el-form-item>

    <el-form-item label="电话" prop="phoneNo">
        <el-input v-model.number="ruleForm.phoneNo"></el-input>
    </el-form-item>
    
    <el-form-item label="身份证号" prop="idCardNo">
        <el-input v-model="ruleForm.idCardNo" placeholder="请填写证件号码"></el-input>
    </el-form-item>   
    </el-form>
    
    </div>
    <div class="info2">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" >
    <el-form-item label="入职时间" required>
        <el-col :span="21">
         <el-form-item prop="registerDate">
          <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.registerDate" style="width: 100%;"></el-date-picker>
         </el-form-item>
        </el-col> 
    </el-form-item>

       <el-form-item label="生日" required>
        <el-col :span="21">
         <el-form-item prop="birthday">
          <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.birthday" style="width: 100%;"></el-date-picker>
         </el-form-item>
        </el-col> 
    </el-form-item>

    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
    </el-form-item>
    </el-form>

    <el-form-item label="确认密码" prop="checkPassword">
        <el-input type="password" v-model="ruleForm.checkPassword" autocomplete="off"></el-input>
    </el-form-item>
    
    <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">更新</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
</el-form>
</div>
</div>
  </div>
</template>

<script>
const axios = require('axios');
  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPassword !== '') {
            this.$refs.ruleForm.validateField('checkPassword');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };

      return {
        option: [{
          value: '1',
          label: '医生'
        }],
        imgUrl:'',
        ruleForm: {
          name: '',
          type: '',
          id:'',
          gender:'',
          phoneNo:'',
          idCardNo:'',
          registerDate: '',
          birthday: '',
          areaId:null,
          password: '',
          checkPassword: '',
          headImg:''
        },
        uploadData: {
            userId:'1234',
        },
        options:[],
        param:"",
        rules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
          ],
          id: [
            { message: '请输入编号', trigger: 'blur' },
            { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '请选择职业', trigger: 'change' }
          ],
          gender: [
            { required: true, message: '请选择性别', trigger: 'change' }
          ],
         phoneNo: [
          {
            message: '请输入手机号',trigger: 'blur'
          }],
         idCardNo: [
          { required: true, message: '请填写证件号码', trigger: 'blur' },
          {
            pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
            message: '证件号码格式有误！',
            trigger: 'blur'
          }
        ],
          registerDate: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          birthday: [
            { type: 'date', message: '请选择时间', trigger: 'change' }
          ],
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPassword: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        }
      }
    },
     created(){
          this.ruleForm.id = this.$route.params.id
          this.getData()
        },
      methods: {
          
          getData(){
             console.log(this.$route.params.id)
                let url = `http://47.107.189.55:8082/HomeCareCenter/worker/search/?id=${this.ruleForm.id}`
                axios.get(url).then(res=>{
                    console.log(res.data.data.headImg)
                    this.ruleForm = res.data.data
                })
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {//验证成功
                        let url =`http://47.107.189.55:8082/HomeCareCenter/worker/update`
                        axios.post(url,this.ruleForm).then(res=>{
                            alert(res.data.code)
                            if (res.data.code==0){
                                this.$message({
                                    message: '操作成功',
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
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
             handleAvatarSuccess(res,file) {
              console.log(this.ruleForm.headImg)
                this.imgUrl = URL.createObjectURL(file.raw);
                this.ruleForm.headImg=this.imgUrl
                 
                },
           
            //上传成功前的回调函数
            beforeAvatarUpload(file) {
                this.image=file;
               console.log(this.image)
                console.log(file);
                 //console.log(this.form)
                //this.image=JSON.stringify(file);
                const isJPG = file.type === 'image/jpeg'||'image/png';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG或者PNG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            }
        }
    }
</script>

<style scoped>
.info1{
    width: 30%;
    margin: 2% 2% 2% 8%;
    order: 1;
}
.info2{
     width: 30%;
     margin:2% 1% 2% 1%;
     order: 2;
}
.picture{
    width: 24%;
    margin: 4% 4% 4% 1%;
    display: flex;
    flex-direction: column;
    order: 3;
}
.block{
    width: 100%;
}
</style>