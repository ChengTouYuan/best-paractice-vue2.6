<template>
  <div class="ele-box">
    <span>test</span>
     <el-button type="success">主要按钮</el-button>
  </div>
</template>

<script>
import HTTP from "../service/axios-http";
export default {
  name: "ElementTest",
  created() {
    console.log(HTTP, "a");
    HTTP("get", "http://192.168.0.74:9000/readsselection/cnrs/taskStatus/").then((res) => {
      console.log(res, "res");
    });
  },
};
</script>

<style scoped lang="scss">
.ele-box {
  > span {
    background: red;
  }
}
</style>
