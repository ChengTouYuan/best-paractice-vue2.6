<template>
  <div class="ele-box">
    <span>test</span>
     <el-button type="success">主要按钮</el-button>
     <el-input v-model="value"></el-input>
     <span>{{value | capAmountToString}}</span>
  </div>
</template>

<script>
import HTTP from "../service/axios-http";
import Tools from "../utils/tools";
import Pipe from "../pipe/pipe.service"
export default {
  name: "ElementTest",
  data(){
      return{
          value:""
      }
  },
  watch:{
      value:(newV,oldV)=>{
          Tools.debounce(()=>{
              console.log(newV,oldV);
          },3000)
          
      }
  },
   filters: {
       transfromNum:Pipe.transfromNum,
       capAmountToString:Pipe.capAmountToString
      },
  created() {
    HTTP("get", "/api/xxxxxx").then((res) => {
      console.log(res, "res");
    });


    let source=[1,2,3,4]
    
      let target=Tools.deepClone(source);
      target.push("cxy")
      console.log(source,target)
  },
};
</script>

<style scoped lang="scss">
$color:red;
.ele-box {
  > span {
    background: $color;
  }
}
</style>
