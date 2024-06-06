<template>
  <el-button plain @click="dialogFormVisible = true;GetStuData(this.StuData)"
             type="primary"
             size="small"
             style="margin-right: 4px"
  >编辑
  </el-button>
  <el-dialog v-model="dialogFormVisible" title="学生信息" width="500">
    <Form label-width="80">
    <FormItem label="校区">
      <RadioGroup v-model="border">
        <Radio label="赭山校区" border></Radio>
        <Radio label="花津校区" border></Radio>
      </RadioGroup>
    </FormItem>
    <FormItem label="学号">
        <Input v-model="number" placeholder="请填入考生学号"></Input>
      </FormItem>
    <FormItem label="姓名">
        <Input v-model="name" placeholder="请填入考生姓名"></Input>
      </FormItem>
    <FormItem label="专业名称">
        <Input v-model="proName" placeholder="请填入专业名称"></Input>
      </FormItem>
    <FormItem label="教师姓名">
      <Input v-model="techerName" placeholder="请填入教师姓名"></Input>
    </FormItem>
    <FormItem label="课程编号">
      <Input v-model="className" placeholder="请填入课程编号"></Input>
    </FormItem>
    <FormItem label="专业类型">
        <Input v-model="type" placeholder="请填入专业类型"></Input>
      </FormItem>
  </Form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">返回</el-button>
        <el-button type="primary" @click="dialogFormVisible = false;editStuData()">保存</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script>
import myRequest from "../../../api/request";
import { ref } from 'vue'
let that;
export default {
  props:['StuData'],
  data () {
    return {
      dialogFormVisible : ref(false),
      formLabelWidth : '140px',
      NowValue:'',
      number:this.StuData.number,
      name: this.StuData.name,
      proName: this.StuData.proName,
      techerName: this.StuData.teacherName,
      className:this.StuData.className,
      type: this.StuData.type,
      arranged:this.StuData.BooleanArranged,
      id:this.StuData.id,
      border: this.StuData.campus,
    }
  },
  mounted() {
    that=this;
  },
  methods:{
    editStuData(){
      let NumberCampus;
      if(this.border==='赭山校区'){
        NumberCampus=1;
      }
      else {
        NumberCampus=2;
      }
      let data= {
        id:this.id,
        number:this.number,
        name:this.name,
        proName:this.proName,
        techerName:this.techerName,
        className:this.className,
        type:this.type,
        campus:NumberCampus,
        arranged:this.arranged
      }
      console.log(data)
      myRequest({
        method:"put",
        url:"/Student/UpdateStudent",
        params:data,
        data:data,
        headers:{'Content-Type':"application/json"},
      }).then(function (){
        console.log("更新成功")
      }).catch(e=>{
        console.log(e)
      })
    },
    GetStuData(StuId){
      myRequest({
        url:"/Student/GetCStudents?type=0&condition=0&state=0",
        method:"get"
      }).then(function (response){
        var jsonData=response.data;
        that.dataLength=jsonData.length;
        for (let i = 0; i<that.dataLength; i++) {
          if(StuId===jsonData[i].id){
            that.id=jsonData[i].id;
            that.campus=jsonData[i].campus;
            that.number=jsonData[i].number;
            that.name=jsonData[i].name;
            that.proName=jsonData[i].proName;
            that.techerName=jsonData[i].techerName;
            that.className=jsonData[i].className;
            that.type=jsonData[i].type;
            that.arranged=jsonData[i].arranged;
          }
        }
      })
    },
  }
}
</script>
