<template>
  <Table :columns="columns" :data="data" border height="750" @on-row-click="ResetE"@click="modal=true"></Table>
  <Modal
      v-model="modal"
      title="提醒！！！"
      @on-ok="asyncOK">
    <p>是否需要重新安排此学生</p>
  </Modal>
</template>
<script>
import myRequest from "../../api/request";
import editStudent from "./tools/EditStudent.vue";
let that;
export default {
  components: {editStudent},
  data () {
    return {
      modal:false,
      NowId:'',
      columns: [
        {
          title: '姓名',
          key: 'name',
          align: 'center',
          width: 150,
          fixed: 'left',
        },
        {
          title: '学生详情',
          align: 'center',
          children: [
            {
              title: '学号',
              key: 'id',
              align: 'center',
              width: 200,
              sortable: true
            },
            {
              title: '准考证号',
              key: 'testId',
              align: 'center',
              width: 200,
              sortable: true
            },
            {
              title: '班级',
              key: 'classId',
              align: 'center',
              width: 150,
            },
          ]
        },
        {
          title: '考场详情',
          align: 'center',
          children: [
            {
              title: '考场批号',
              key: 'examId',
              align: 'center',
              width: 130,
              sortable: true
            },
            {
              title: '考试课程',
              key: 'subject',
              align: 'center',
              width: 150
            },
            {
              title: '监考老师',
              key: 'teacher',
              align: 'center',
              width: 150
            },
          ]
        },
        {
          title: '考试时间',
          align: 'center',
          children: [
            {
              title: '开始时间',
              key: 'startTime',
              align: 'center',
              width: 200,
              sortable: true
            },
            {
              title: '结束时间',
              key: 'endTime',
              align: 'center',
              width: 200,
              sortable: true
            }
          ]
        },
        {
          title: '考场地址',
          key: 'examAddress',
          align: 'center',
          width: 200,
          fixed: 'right'
        }
      ],
      data: [
        {
          name:"test",
          id: "test",
          testId: "test",
          classId:"test",
          examId: "test",
          subject: "test",
          teacher: "test",
          startTime: "test",
          endTime:"test",
          examAddress: "test",
        }
      ]
    }
  },
  mounted () {
    that=this;
    this.GetData();
  },
  methods:{
    asyncOK () {
      myRequest({
        url:"/Student/DelteStudent",
        params:{
           id:this.NowId,
        },
        method:"delete"
      })
      this.$Message.info("重置成功")
      this.GetData();
    },
    ResetE(event){
      this.NowId=event.StuId;
    },
    GetData(){
      myRequest({
        url:"/Arrange/GetArrange",
        params:{
          type:4,
          condition:this.$route.query.id
        },
        method:"get"
      }).then(function (response){
        const jsonData = response.data;
        const data = [];
        that.dataLength=jsonData.length;
        for (let i = 0; i<that.dataLength; i++) {
          let SCampus
          if(jsonData[i].exRoom.room.campus===1)SCampus='赭山校区'
          if(jsonData[i].exRoom.room.campus===2)SCampus='花津校区'
          data.push({
            StuId:jsonData[i].student.id,
            name:jsonData[i].student.name,
            id: jsonData[i].student.number,
            testId: jsonData[i].admission,
            classId: jsonData[i].student.proName,
            examId: jsonData[i].exRoom.number,
            subject: jsonData[i].student.className,
            teacher: jsonData[i].student.techerName,
            startTime: jsonData[i].exRoom.start.replace("T"," "),
            endTime: jsonData[i].exRoom.end.replace("T"," "),
            examAddress: SCampus+jsonData[i].exRoom.room.address,
          });
        }
        that.data = data;
      })
    }
  }
}
</script>
