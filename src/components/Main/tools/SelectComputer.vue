<template>
  <Select v-model="model" style="width:320px" @click="GetRoomData">
    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
  </Select>
</template>
<script>
import myRequest from "../../../api/request";
let that;
export default {
  data () {
    return {
      cityList: [
      ],
      model: ''
    }
  },
  mounted() {
    that=this;
  },
  methods:{
    GetRoomData(){
      myRequest({
        url:"/Room/GetAllRoom",
        method:"get"
      }).then(function (response){
        var jsonData=response.data;
        const data = [];
        that.dataLength=jsonData.length;
        for (let i = 0; i<that.dataLength;i++) {
          data.push({
            value:jsonData[i].id,
            label:jsonData[i].address,
          });
        }
        that.cityList = data;
      })
    }
  }
}
</script>
