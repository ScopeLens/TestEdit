<template>
  <el-button plain @click="dialogFormVisible = true"
             type="primary"
             size="small"
             style="margin-right: 4px"
  >编辑
  </el-button>
  <el-dialog v-model="dialogFormVisible" title="考场安排" width="500">
    <Form label-width="80">
    <FormItem label="校区">
      <RadioGroup v-model="border">
        <Radio label="赭山校区" border></Radio>
        <Radio label="花津校区" border></Radio>
      </RadioGroup>
    </FormItem>
    <FormItem label="机房位置">
      <Input v-model="address" placeholder="请填入考场地址"></Input>
    </FormItem>
    <FormItem label="容量">
      <Input v-model="capacity" placeholder="请填入考场容量"></Input>
    </FormItem>
  </Form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">返回</el-button>
        <el-button type="primary" @click="dialogFormVisible = false;editERData()">保存</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script>
import myRequest from "../../../api/request";
import { ref } from 'vue'
let that;
export default {
  props:['CRoomData'],
  data () {
    return {
      dialogFormVisible : ref(false),
      formLabelWidth : '140px',
      NowValue:'',
      id:this.CRoomData.id,
      address:this.CRoomData.address,
      capacity: this.CRoomData.capacity,
      border: this.CRoomData.name,
      ruleValidate: {
        address: [
          { required: true, message: '机房地址不可为空', trigger: 'blur' }
        ],
        capacity: [
          { required: true, message: '机房容量不可为空', trigger: 'blur' }
        ],
      },
    }
  },
  mounted() {
    that=this;
  },
  methods:{
    editERData(){
      let NumberCampus;
      if(this.border==='赭山校区'){
        NumberCampus=1;
      }
      else {
        NumberCampus=2;
      }
      let data= {
        id:this.id,
        capacity:Number(this.capacity),
        address:this.address,
        campus:NumberCampus,
      }
      console.log(data)
      myRequest({
        method:"put",
        url:"/Room/UpdateRoom",
        params:data,
        data:data,
        headers:{'Content-Type':"application/json"},
      }).then(function (){
        console.log("更新成功")
      }).catch(e=>{
        this.$Message.error('输入错误');
        console.log(e)
      })
    },
  }
}
</script>
