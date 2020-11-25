<template>
  <div>
    comingsoon
    <ul>
      <li v-for="data in datalist" :key="data.id">{{ data.nm }}</li>
    </ul>
    <el-button>123</el-button>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      datalist: null
    };
  },
  asyncData(data) {
    // console.log();
    return axios({
      url:process.server?"http://m.maoyan.com/ajax/movieOnInfoList?token=":"/ajax/movieOnInfoList?token=",
    }).then(res=>{
      console.log(res.data);
      return {
        datalist:res.data.movieList
      }// 状态
    })
  }
};
</script>

<style></style>
