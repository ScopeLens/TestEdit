<template>
  <Table border :columns="columns" :data="data">
    <template #name="{ row }">
      <strong>{{ row.name }}</strong>
    </template>
    <template #action="{ row, index }">
      <EditExam :CRoomData="sendData(row.id)"></EditExam>
      <Button type="error" size="small" @click="remove(row.id,index)">删除</Button>
    </template>
  </Table><br>
    <Page ref="PageCR" @on-change="reFlash()" @on-page-size-change="reFlash()" :total="dataLength" show-sizer/>
</template>
<script>

import myRequest from "../../../../api/request";
import EditExam from "../../tools/EditExam.vue";
let that;
export default {
  components:{
    EditExam
  },
  data () {
    return {
      columns: [
        {
          title: '校区',
          slot: 'name',
          sortable: true,
          align: 'center'
        },
        {
          title: '容量',
          key: 'capacity',
          sortable: true,
          align: 'center'
        },
        {
          title: '地址',
          key: 'address',
          align: 'center'
        },
        {
          title: '行动',
          slot: 'action',
          width: 200,
          align: 'center'
        }
      ],
      data: [],
      dataLength:0
    }
  },
  mounted() {
    that=this;
    this.GetRoomData();
  },
  methods: {
    sendData(id){
      let i;
      for(i=0;i<this.data.length;i++){
        if(this.data[i].id===id){
          break;
        }
      }
      return this.data[i];
    },
    reFlash(){
          this.GetRoomData();
    },
    remove(id,index) {
      console.log(id)
      this.DeleteCRoom(id);
      this.data.splice(index, 1);
    },
    DeleteCRoom(DeleteId){
      myRequest({
        url:"/Room/DelteRoom",
        params:{
          id:DeleteId
        },
        method:"delete"
      }).then(function(){
        this.GetRoomData();
      })
    },
    GetRoomData(){
      myRequest({
        url:"/Room/GetAllRoom",
        method:"get"
      }).then(function (response){
        var jsonData=response.data;
        const data = [];
        that.dataLength=jsonData.length;
        for (let i = ((that.$refs.PageCR.currentPage-1)*that.$refs.PageCR.currentPageSize);
             i<that.dataLength&&i < that.$refs.PageCR.currentPage*that.$refs.PageCR.currentPageSize;
             i++) {
          let SCampus
          if(jsonData[i].campus===1)SCampus='赭山校区'
          if(jsonData[i].campus===2)SCampus='花津校区'
          data.push({
            name: SCampus,
            id:jsonData[i].id,
            capacity: jsonData[i].capacity,
            address:jsonData[i].address
          });
        }
        that.data = data;
      })
    }
  }
}
</script>
