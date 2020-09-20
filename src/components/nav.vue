<template>
  <div class="nav">
    <el-menu
      :default-active="activeIndex1"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-submenu index="1">
        <template slot="title">登记管理</template>
        <el-menu-item index="1-1">
          <router-link to="/register/add">入住登记</router-link>
        </el-menu-item>
        <el-menu-item index="1-2">
          <router-link to="/register/leave">外出登记</router-link>
        </el-menu-item>
        <el-menu-item index="1-3">
          <router-link to="/register/client">客户信息</router-link>
        </el-menu-item>
        
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <router-link to="/">护理管理</router-link>
        </template>
        <el-menu-item index="2-1">
          <router-link to="/">护理内容</router-link>
        </el-menu-item>
        <el-menu-item index="2-2">
          <router-link to="/nurse/NurseRecord">护理记录</router-link>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <router-link to="/">膳食管理</router-link>
        </template>
        <el-menu-item index="3-1">
          <router-link to="/nurse/dish">菜品管理</router-link>
        </el-menu-item>
        <el-menu-item index="3-2">
          <router-link to="/nurse/calender">膳食日历</router-link>
        </el-menu-item>
      </el-submenu>
      <el-menu-item index="4">
        <router-link to="/">病历管理</router-link>
      </el-menu-item>
      <el-submenu index="5">
        <template slot="title">
          <router-link to="/">人员管理</router-link>
        </template>
        <el-menu-item index="5-1">
          <router-link to="/doctor/Doctor">医生信息管理</router-link>
        </el-menu-item>
        <el-menu-item index="5-2">
          <router-link to="/nurse/Nurse">护士信息管理</router-link>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="6">
        <template slot="title">
          <router-link to="/">系统设置</router-link>
        </template>
        <el-menu-item index="6-1">
          <router-link to="/manager/init">系统初始化</router-link>
        </el-menu-item>
        <el-menu-item index="6-2">
          <router-link to="/manager/exit">退出系统</router-link>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="7">
        <template slot="title">
          <router-link to="/">医生功能</router-link>
        </template>
        <el-menu-item index="7-1">
          <router-link to="/doctor/docaddcase">病例增添</router-link>
        </el-menu-item>
        <el-menu-item index="7-2">
          <router-link to="/doctor/docsearchcase">病例查找</router-link>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="8">
        <template slot="title">
          <router-link to="/">膳食日历</router-link>
        </template>
        <el-menu-item index="8-1">
          <router-link to="/doctor/dishadd">添加菜品</router-link>
        </el-menu-item>
        <el-menu-item index="8-2">
          <router-link to="/doctor/dishesset">设置套餐</router-link>
        </el-menu-item>
        <el-menu-item index="8-3">
          <router-link to="/doctor/dishessetforold">为老人设定套餐</router-link>
        </el-menu-item>
        <el-menu-item index="8-4">
          <router-link to="/doctor/dishescalenshow">为老人套餐展示</router-link>
        </el-menu-item>
        <el-menu-item index="8-5">
          <router-link to="/doctor/dishescalenmanage">更改套餐</router-link>
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
  position: fixed;
  top: 0px;
  width: 100%;
  left: 0px;
}
router-link {
  color: #e6dfdf;
  text-decoration: none;
}
</style>