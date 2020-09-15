<template>
  <div class="main">
    <div class="box">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" >
    <el-form-item label="姓名" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>

    <el-form-item label="编号" prop="id">
        <el-input v-model="ruleForm.id"></el-input>
    </el-form-item>

    <el-form-item label="类型" prop="type">
    <el-select v-model="ruleForm.type" placeholder="职业类型">
       <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      :disabled="item.disabled">
      </el-option>
    </el-select>
    </el-form-item>

    <el-form-item label="性别" prop="gender">
    <el-radio-group v-model="ruleForm.gneder">
      <el-radio label="男"></el-radio>
      <el-radio label="女"></el-radio>
    </el-radio-group>
    </el-form-item>

    <el-form-item label="电话" prop="phone_no">
        <el-input v-model.number="ruleForm.phone_no"></el-input>
    </el-form-item>
 
    <el-form-item label="身份证号" prop="id_card">
        <el-input v-model="ruleForm.id_card" placeholder="请填写证件号码"></el-input>
    </el-form-item>   

    <el-form-item label="入职时间" required>
        <el-col :span="11">
         <el-form-item prop="date1">
          <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
         </el-form-item>
        </el-col> 

        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
        <el-form-item prop="date2">
        <el-time-picker placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
         </el-form-item>
       </el-col>
    </el-form-item>
   
    <el-form-item label="管理病区" prop="areaId">
        <el-input v-model="ruleForm.areaId"></el-input>
    </el-form-item>   

    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
    </el-form-item>
    </el-form>

    <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
    </el-form-item>
    
    <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
</el-form>
  </div>
  </div>
</template>

<script>
  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };

      return {
        options: [{
          value: '选项1',
          label: '护士'
        }, {
          value: '选项2',
          label: '医生',
          disabled: true
        }],
        ruleForm: {
          name: '',
          id:'',
          type: '',
          gender:'',
          phone_no:'',
          id_card:'',
          date1: '',
          date2: '',
          areaId:'',
          pass: '',
          checkPass: '',
        },
        rules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
          ],
          id: [
            { required: true, message: '请输入编号', trigger: 'blur' },
            { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '请选择职业', trigger: 'change' }
          ],
          gender: [
            { required: true, message: '请选择性别', trigger: 'change' }
          ],
         phone_no: [
          {
            type: 'number',required: true,message: '请输入手机号',trigger: 'blur'
          },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: '手机号格式不对',
            trigger: 'blur'
          }
         ],
         id_card: [
          { required: true, message: '请填写证件号码', trigger: 'blur' },
          {
            pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
            message: '证件号码格式有误！',
            trigger: 'blur'
          }
        ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
           areaId: [
            { required: true, message: '请输入病区编号', trigger: 'blur' },
            { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
  }
}
</script>