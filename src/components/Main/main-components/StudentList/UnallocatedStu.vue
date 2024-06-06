<template>
  <Table border :columns="columns" :data="data">
    <template #name="{ row }">
      <strong>{{ row.name }}</strong>
    </template>
    <template #action="{ row, index }">
      <ArrangeDialog :StuId="row.id"></ArrangeDialog>
      <Button type="error" size="small" @click="remove(row.id,2,index)">删除</Button>
    </template>
  </Table><br>
  <Page ref="PageUS" @on-change="reFlash()" @on-page-size-change="reFlash()" :total="USdataLength" show-sizer/>
</template>
<script>

import myRequest from "../../../../api/request";
import ArrangeDialog from "../../tools/ArrangeDialog.vue";
let that;
export default {
  components:{
    ArrangeDialog
  },
  data () {
    return {
      columns: [
        {
          title: '姓名',
          slot: 'name',
          align: 'center'
        },
        {
          title: '学号',
          key: 'number',
          align: 'center'
        },
        {
          title: '专业名称',
          key: 'proName',
          align: 'center'
        },
        {
          title: '行动',
          slot: 'action',
          width: 150,
          align: 'center'
        }
      ],
      data: [],
      USdataLength:0
    }
  },
  mounted() {
    that=this;
    this.GetRoomData();
  },
  methods: {
    reFlash(){
      this.GetRoomData();
    },
    remove(id,flag,index) {
      console.log(flag)
      if(flag===2) this.DeleteStu(id)
      this.data.splice(index, 1);
    },
    DeleteStu(DeleteId){
      myRequest({
        url:"/Student/DelteStudent",
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
        url:"/Student/GetCStudents?type=0&condition=0&state=2",
        method:"get"
      }).then(function (response){
        const jsonData = response.data;
        const data = [];
        that.USdataLength=jsonData.length;
        for (let i = ((that.$refs.PageUS.currentPage-1)*that.$refs.PageUS.currentPageSize);
             i<that.USdataLength&&i < that.$refs.PageUS.currentPage*that.$refs.PageUS.currentPageSize;
             i++) {
          data.push({
            id:jsonData[i].id,
            name: jsonData[i].name,
            number: jsonData[i].number,
            proName:jsonData[i].proName
          });
        }
        that.data = data;
      })
    }
  }
}
</script>
