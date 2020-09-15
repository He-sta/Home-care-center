<template>
  <div class="main">
      <div class="box">
      <div class="picture">
          <div class="block"><el-avatar :size="120" :src="circleUrl"></el-avatar></div>
           <el-button>添加照片</el-button>
      </div>
      <div class="info1">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="姓名">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="性别">
                <el-radio-group v-model="form.sex">
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
                </el-radio-group>
            </el-form-item>
             <el-form-item label="身份证号">
                <el-input v-model="form.id"></el-input>
            </el-form-item>
             <el-form-item label="生日">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
            </el-form-item>
            <el-form-item label="手机号">
                <el-input v-model="form.mobile"></el-input>
            </el-form-item>
            <el-form-item label="床位">
                <el-input v-model="form.bed"></el-input>
            </el-form-item>
            <el-form-item label="食物要求">
                <el-input type="textarea" v-model="form.food"></el-input>
            </el-form-item>
           
        </el-form>
      </div>
      <div class="info2">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="famaily">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="联系方式">
                <el-input v-model="form.famailyMobile"></el-input>
            </el-form-item>
            <el-form-item label="配偶">
                <el-radio-group v-model="form.mate">
                <el-radio label="是"></el-radio>
                <el-radio label="否"></el-radio>
                </el-radio-group>
            </el-form-item>
            
             <el-form-item label="身高">
                <el-input v-model="form.height"></el-input>
            </el-form-item>
            
            <el-form-item label="体重">
                <el-input v-model="form.width"></el-input>
            </el-form-item>
            <el-form-item label="备注">
                <el-input type="textarea" v-model="form.remark"></el-input>
            </el-form-item>
             <el-form-item class="but">
                <el-button type="primary" @click="onSubmit" style="margin-right:40px">立即创建</el-button>
                <el-button>取消</el-button>
            </el-form-item>
          </el-form>
      </div>
      </div>
  </div>
</template>
<script>
    //import Nav from '@/components/nav.vue'
    export default {
        
         data() {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
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

