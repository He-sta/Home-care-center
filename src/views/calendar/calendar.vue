<template>
 

    <el-date-picker
      v-model="value1"
      type="week"
      format="yyyy 第 WW 周"
      placeholder="选择周">
    </el-date-picker>

</template>

  <script>
  export default {
    data() {
      return {
        value1: ''
      };
    }
  };
</script>
