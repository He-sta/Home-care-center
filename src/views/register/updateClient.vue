<template>
  <div class="main">
      <div class="box">
      <div class="picture">
       <div class="block"><el-avatar :size="120" :src="form.headImg"></el-avatar></div>
           <!-- <el-button @click="add">添加照片</el-button>-->
           <!-- <el-upload
                class="avatar-uploader"
                 ref="image"
                name="image"
                :action="`http://47.107.189.55:8080/HomeCareCenter/image/upload`"
                :data="uploadData"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imgUrl" :src="`${imgUrl}`" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>-->
      </div>
      <div class="info1">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="姓名">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="性别">
                <el-radio-group v-model="form.gender">
                <el-radio label="0">男</el-radio>
                <el-radio label="1">女</el-radio>
                </el-radio-group>
            </el-form-item>
             <el-form-item label="身份证号">
                <el-input v-model="form.idCardNo"></el-input>
            </el-form-item>
          <el-form-item label="入住日期">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.inDate" style="width: 100%;"></el-date-picker>
            </el-form-item> 
            <el-form-item label="退住日期">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.outDate" style="width: 100%;"></el-date-picker>
            </el-form-item> 
            <el-form-item label="手机号">
                <el-input v-model="form.phoneNo"></el-input>
            </el-form-item>
             <el-form-item label="床位号" prop="bedId">
                <el-select v-model="form.bedId" placeholder="请选择床位号" style="width:100%">
                    <el-option
                            v-for="item in options"
                            :key="item.id"
                            :label="item.id"
                            :value="item.id">
                    </el-option>
                </el-select>
                </el-form-item>
                <el-form-item label="食物要求">
                <el-input type="textarea" v-model="form.foodReq"></el-input>
            </el-form-item>
                 </el-form>
      </div>
      <div class="info2">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="家人">
                <el-input v-model="form.relativeName"></el-input>
            </el-form-item>
             <el-form-item label="护理级别">
                <el-input v-model="form.levelOfCare"></el-input>
            </el-form-item>
            
           
      
            <el-form-item label="联系方式">
                <el-input v-model="form.relativePhone"></el-input>
            </el-form-item>
            <el-form-item label="配偶">
                <el-radio-group v-model="form.marriage">
                <el-radio label="0">未婚</el-radio>
                <el-radio label="1">已婚</el-radio>
                </el-radio-group>
            </el-form-item>
            
             <el-form-item label="身高">
                <el-input v-model="form.height"></el-input>
            </el-form-item>
            
            <el-form-item label="体重">
                <el-input v-model="form.weight"></el-input>
            </el-form-item>
            <el-form-item label="备注">
                <el-input type="textarea" v-model="form.remark"></el-input>
            </el-form-item>
             <el-form-item >
                <el-button type="primary" @click="onSubmit" style="margin-right:40px">更新</el-button>
                <el-button>取消</el-button>
            </el-form-item>
          </el-form>
      </div>
      </div>
  </div>
</template>
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
.but{
    width: 100%;
    margin-top: 190px;
    margin-left: 0 !important;
}
el-input{
    width: 100px !important;
}
</style>
<script>
    import axios from 'axios'
    import Qs from 'qs'
    import {HOST} from "../../common/js/config";
    export default {
        data() {
        return {
            imgUrl:'',
            form: {
            name: '',
            gender:'',
            bedId:'',
            phoneNo:'',
            foodReq:'',
            relativeName:'',
            relativePhone:'',
            marriage:'',
            height:'',
            weight:'',
            remark:'',
            idCardNo:'',
            inDate:'',
            ouDate:'',
            headImg:'',
            id:''
        },
        uploadData: {
            userId:'1234',
        },
        options:[],
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          inDate: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          gender: [
            { required: true, message: '请选择性别', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        }
      }
    },
    created(){
            this.host = HOST
            this.getBed()
            this.form.id = this.$route.params.id
            this.getData()

        },
    methods: {
         getData(){
             console.log(this.$route.params.id)
                let url = `${HOST}/client/search/?id=${this.form.id}`
                axios.get(url).then(res=>{
                    console.log(res.data.data.headImg)
                    this.form = res.data.data
                })
            },
        //查询所有空余的床位
            getBed(){
                let url = `${HOST}/bed/search`
                axios.get(url, {params: {bedId:this.form.bedId}}).then(res=>{
                    this.options = res.data.data
                })
            },
            onSubmit(form) {
        // var formData = JSON.stringify(this.form); // 这里才是你的表单数据
                this.$refs.form.validate((valid) => {
                    if (valid) {//验证成功
                        //提交数据到服务器
                       
                        let url = `${HOST}/client/update`
                        //let dt = Qs.stringify(this.form);
                        axios.post(url,this.form).then(res=>{
                           // this.form = res ?res :{}
                           // alert(res.data.code)
                            if (res.data.code == 0){
                                this.$message({
                                    message: '新增成功',
                                    type: 'success'
                                });
                               // alert('添加成功')
                                console.log("success");  
                                 this.$router.push(`/register/client`)
                            }
                        }).catch(function(){
                            console.log("服务器异常！");
                            
                         });
                    }
                })
    
      },
            handleAvatarSuccess(res,file) {
                console.log(this.imgUrl)
                this.imgUrl = URL.createObjectURL(file.raw);
                this.headImg=this.imgUrl
                // console.log(res.pic_url)

                },
           
            //上传成功前的回调函数
            beforeAvatarUpload(file) {
                this.image=file;
                console.log(this.image)
                console.log(file);
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
    width: 34%;
    margin: 2% 4%;
}
.info2{
     width: 34%;
     margin: 2% 4%;
}
.picture{
    width: 20%;
    margin: 2% 2%;
}


</style>

