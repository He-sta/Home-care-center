<template>
  <div class="nav">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-submenu index="1" text-color="#fff">
        <template slot="title">登记管理</template>
        <el-menu-item index="1-1">
          <router-link to="/register/add">
            <div style="color: #ffffff">入住登记</div>
          </router-link>
        </el-menu-item>
        <el-menu-item index="1-2">
          <router-link to="/register/leave">
            <div style="color: #ffffff">外出登记</div>
          </router-link>
        </el-menu-item>
        <el-menu-item index="1-3">
          <router-link to="/register/client">
            <div style="color: #ffffff">客户信息</div>
          </router-link>
        </el-menu-item>
        
      </el-submenu>
      <el-menu-item index="4">
       <router-link to="/nurse/NurseRecord">
            <div style="color: #ffffff">护理记录</div>
          </router-link>
      </el-menu-item>
      <el-submenu index="5">
        <template slot="title">人员管理</template>
        <el-menu-item index="5-1">
          <router-link to="/doctor/Doctor">
            <div style="color: #ffffff">医生信息管理</div>
          </router-link>
        </el-menu-item>
        <el-menu-item index="5-2">
          <router-link to="/nurse/Nurse">
            <div style="color: #ffffff">护士信息管理</div>
          </router-link>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">医生功能</template>
        <el-menu-item index="4-1">
          <router-link to="/doctor/docaddcase">
            <div style="color: #ffffff">病例增添</div>
          </router-link>
        </el-menu-item>
        <el-menu-item index="4-2">
          <router-link to="/doctor/docsearchcase">
            <div style="color: #ffffff">病例查找</div>
          </router-link>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">膳食日历</template>
        <el-menu-item index="3-1">
          <router-link to="/doctor/dishadd">
            <div style="color: #ffffff">添加菜品</div>
          </router-link>
        </el-menu-item>
        <el-menu-item index="3-2">
          <router-link to="/doctor/dishesset">
            <div style="color: #ffffff">设置套餐</div>
          </router-link>
        </el-menu-item>
        <el-menu-item index="3-3">
          <router-link to="/doctor/dishessetforold">
            <div style="color: #ffffff">为老人设定套餐</div>
          </router-link>
        </el-menu-item>
        <el-menu-item index="3-4">
          <router-link to="/doctor/dishescalenshow">
            <div style="color: #ffffff">为老人套餐展示</div>
          </router-link>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="6">
        <template slot="title">系统设置</template>
        <el-menu-item index="6-1">
          <router-link to="/login/login">
            <div style="color: #ffffff">退出系统</div>
          </router-link>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeIndex: "1"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
<style scoped>
.nav {
  position: absolute;
  top: 0px;
  width: 100%;
  left: 0px;
}
.router-link {
  color: #ffffff;
  text-decoration: none;
}
el-menu-item{
  top: 60px;
}
.el-menu--horizontal>.el-submenu .el-submenu__title {
    height: 54px !important;
    line-height: 54px !important;
}
</style>