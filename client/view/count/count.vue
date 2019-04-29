<template>
    <el-card>
      <el-date-picker
        v-model="date"
        type="datetime" size="small"
        placeholder="选择日期时间">
      </el-date-picker>
      <el-button @click="sub" size="small">计算</el-button>
      <div v-show="result != ''">
        {{result}}
      </div>
    </el-card>
</template>

<script>
  export default {
    data(){
      return {
        date: "",
        result:"",
      }
    },
    mounted(){
      let date = new Date();
      this.date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " 15:00:00";
      console.log(this.date)
    },
    methods:{
      sub(){
        if(this.date == ""){
          this.$message.error("请选择时间");
          return;
        }
        let now = new Date().getTime();
        let target = new Date(this.date).getTime();
        let result = Math.ceil(Number((((target - now) / 1000) / 60)));
        this.result = result;
      }
    }
  }
</script>

<style scoped>

</style>
