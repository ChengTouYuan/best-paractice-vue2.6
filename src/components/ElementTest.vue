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
    // HTTP("get", "http://192.168.0.74:9000/readsselection/cnrs/taskStatus/").then((res) => {
    //   console.log(res, "res");
    // });

  HTTP("get", "/raws/signals/",{
    folder: `20220728081803_LAB256V2_5K_PC28_30_B16_ET1-51-HD53-J4-A_AD3_Bacillus_subtilis_ZhangMeng_Mux`,
channel: `channel2`,
start: `288745`,
end: `384562`}).then((res) => {
      console.log(res, "res");
    });
setTimeout(()=>{
    HTTP("get", "/raws/signals/",{
    folder: `20220728081803_LAB256V2_5K_PC28_30_B16_ET1-51-HD53-J4-A_AD3_Bacillus_subtilis_ZhangMeng_Mux`,
channel: `channel2`,
start: `288745`,
end: `384562`,
headers:{showLoading:false}}).then((res) => {
      console.log(res, "res");
    });
},3000)

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
