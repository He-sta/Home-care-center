<template>
  <div class="main">
    <div class="box">
      <el-container>
        <el-main v-bind:class="{ 'el-mainrr': true }" style="display:flex;justify-content: center;">
          <el-form ref="form" :model="form" label-width="70px"  style="width: 26%;">
            <el-form-item label="套餐名">
              <el-input v-model="form.name" ></el-input>
            </el-form-item>
            <el-form-item label="周一">
              <el-select v-model="form.monId" multiple placeholder="请选择" >
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="周二">
              <el-select v-model="form.tueId" multiple placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="周三">
              <el-select v-model="form.wedId" multiple placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="周四">
              <el-select v-model="form.thuId" multiple placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="周五">
              <el-select v-model="form.friId" multiple placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="周六">
              <el-select v-model="form.satId" multiple placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="周日">
              <el-select v-model="form.sunId" multiple placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-button type="primary" @click.native="onsubmit">添加</el-button>
          </el-form>
        </el-main>
      </el-container>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      options: [],
      form: {
        name: "",
        monId: [],
        tueId: [],
        wedId: [],
        thuId: [],
        friId: [],
        satId: [],
        sunId: []
      }
    };
  },
  created() {
    this.index();
  },
  methods: {
    onsubmit: function() {
      if(this.form.name==="")
      {
        alert("套餐名不能为空");
      }
      else{
      let url = `http://47.107.189.55:8082/HomeCareCenter/dishSet/add`;
        axios.post(url,this.form).then(res => {
          if (res.data.code == 0) {
            this.$message({
              message: "操作成功",
              type: "success",
            });
          }
          else
          {
            alert(res.data.code );
          }
        });
      }
    },
    index: function() {
      let url = `http://47.107.189.55:8082/HomeCareCenter/dish/search`;
      axios.get(url).then(res => {
        if (res.data.code == 0) {
          this.options = res.data.data;
        } else {
          alert(res.data.code);
        }
      });
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
  background-color:white;
  color: #333;
  text-align: center;
  width: 80%;
}
.el-container {
  height: 600px;
}
el-select{
  width: 100% !important;
}
</style>