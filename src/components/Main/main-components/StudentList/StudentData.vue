<template>
  <Table border :columns="columns" :data="data">
    <template #name="{ row }">
      <strong>{{ row.name }}</strong>
    </template>
    <template #action="{ row, index }">
      <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">详情</Button>
      <editStudent :StuData="sendData(row.id)"></editStudent>
      <Button type="error" size="small" @click="remove(row.id,index)">删除</Button>
    </template>
  </Table><br>
  <Page ref="PageCR" @on-change="reFlash()" @on-page-size-change="reFlash()" :total="SdataLength" show-sizer/>
</template>
<script>

import myRequest from "../../../../api/request";
import editStudent from "../../tools/EditStudent.vue";
let that;
export default {
  components:{
    editStudent
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
          width: 190,
          align: 'center'
        }
      ],
      data: [],
      SdataLength:0
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
    show(index) {
      this.$Modal.info({
        title: '详细信息',
        content: `学号：${this.data[index].number}<br>
                  姓名：${this.data[index].name}<br>
                  专业：${this.data[index].proName}<br>
                  授课老师：${this.data[index].teacherName}<br>
                  课程编码：${this.data[index].className}<br>
                  学科：${this.data[index].type}<br>
                  校区：${this.data[index].campus}<br>
                  是否被安排考场：${this.data[index].arranged}`
      })
    },
    remove(id,index) {
      this.DeleteStu(id)
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
        url:"/Student/GetCStudents?type=0&condition=0&state=0",
        method:"get"
      }).then(function (response){
        const jsonData = response.data;
        const data = [];
        that.SdataLength=jsonData.length;
        for (let i = ((that.$refs.PageCR.currentPage-1)*that.$refs.PageCR.currentPageSize);
             i<that.SdataLength&&i < that.$refs.PageCR.currentPage*that.$refs.PageCR.currentPageSize;
             i++) {
          let StrCampus=jsonData[i]===1?'赭山校区':'花津校区'
          let StrArranged=jsonData[i].arranged?'已分配':'未分配'
          data.push({
            id:jsonData[i].id,
            number: jsonData[i].number,
            name: jsonData[i].name,
            proName:jsonData[i].proName,
            teacherName:jsonData[i].techerName,
            className:jsonData[i].className,
            type:jsonData[i].type,
            campus:StrCampus,
            arranged:StrArranged,
            BooleanArranged:jsonData[i].arranged
          });
        }
        that.data = data;
      })
    }
  }
}
</script>
