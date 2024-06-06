<template>
  <Table border :columns="columns" :data="data">
    <template #name="{ row }">
      <strong>{{ row.name }}</strong>
    </template>
    <template #action="{ row, index }">
      <Button type="primary" size="small" style="margin-right: 5px" @click="show(row.id)">详情</Button>
      <Button type="error" size="small" @click="remove(row.id,index)">删除</Button>
    </template>
  </Table><br>
  <Page ref="PageER" @on-change="reFlash()" @on-page-size-change="reFlash()" :total="dataLength" show-sizer/>
</template>
<script>

import myRequest from "../../../../api/request";
let that;
export default {
  data () {
    return {
      columns: [
        {
          title: '课程编码',
          slot: 'name',
          align: 'center'
        },
        {
          title: '考场编号',
          key: 'number',
          align: 'center',
          sortable: true
        },
        {
          title: '容量',
          key: 'size',
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
          width: 150,
          align: 'center'
        }
      ],
      data: []
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
    show(index) {
      this.$router.push({path:'detail',query:{id:index}});
    },
    remove(id,index) {
      this.DeleteUE(id);
      this.data.splice(index, 1);
    },
    DeleteUE(DeleteId){
      myRequest({
        url:"/ExRoom/DelteExRoom",
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
        url:"/ExRoom/GetExRoom",
        method:"get"
      }).then(function (response){
        console.log(response)
        const jsonData = response.data;
        const data = [];
        that.dataLength=jsonData.length;
        for (let i = ((that.$refs.PageER.currentPage-1)*that.$refs.PageER.currentPageSize);
             i<that.dataLength&&i < that.$refs.PageER.currentPage*that.$refs.PageER.currentPageSize;
             i++) {
          if(jsonData[i].count<jsonData[i].room.capacity)data.push({
            id:jsonData[i].id,
            name: jsonData[i].className,
            number:jsonData[i].number,
            size: jsonData[i].count+"/"+jsonData[i].room.capacity,
            address:jsonData[i].room.address
          });
        }
        that.data = data;
      })
    }
  }
}
</script>
