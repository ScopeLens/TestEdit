<template>
  <MenuItem name="4" @click="value = true" type="primary">
    <Icon type="ios-analytics"></Icon>
    新增考场
  </MenuItem>
  <Drawer
      title="新增考场"
      v-model="value"
      width="720"
      :mask-closable="false"
      :styles="styles"
  >
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
      <FormItem label="课程编码" prop="name">
        <Input v-model="formValidate.name" placeholder="请填入课程编码"></Input>
      </FormItem>
      <FormItem label="机房位置" prop="address">
        <SelectComputer v-model="formValidate.address" placeholder="请选择使用机房"></SelectComputer>
      </FormItem>
      <FormItem label="开始时间">
        <Row>
          <Col span="11">
            <FormItem prop="StartDate">
              <DatePicker type="date" placeholder="选择日期" v-model="formValidate.StartDate"></DatePicker>
            </FormItem>
          </Col>
          <Col span="2" style="text-align: center">-</Col>
          <Col span="11">
            <FormItem prop="StartTime">
              <TimePicker type="time" placeholder="选择时间" v-model="formValidate.StartTime"></TimePicker>
            </FormItem>
          </Col>
        </Row>
      </FormItem>
      <FormItem label="结束时间">
        <Row>
          <Col span="11">
            <FormItem prop="EndDate">
              <DatePicker type="date" placeholder="选择日期" v-model="formValidate.EndDate"></DatePicker>
            </FormItem>
          </Col>
          <Col span="2" style="text-align: center">-</Col>
          <Col span="11">
            <FormItem prop="EndTime">
              <TimePicker type="time" placeholder="选择时间" v-model="formValidate.EndTime"></TimePicker>
            </FormItem>
          </Col>
        </Row>
      </FormItem>
      <FormItem label="休息时间" prop="restTime">
        <Input v-model="formValidate.restTime" placeholder="请填入休息时间"></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
        <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
      </FormItem>
    </Form>
  </Drawer>
</template>
<script>
import SelectComputer from "../../tools/SelectComputer.vue";
import myRequest from "../../../../api/request";
let that;
export default {
  components:{
    SelectComputer
  },
  data () {
    return {
      value: false,
      styles: {
        height: 'calc(100% - 55px)',
        overflow: 'auto',
        paddingBottom: '53px',
        position: 'static'
      },
      formValidate: {
        name: '',
        address:'',
        StartDate: '',
        StartTime: '',
        EndDate: '',
        EndTime: '',
        restTime:''
      },
      ruleValidate: {
        name: [
          { required: true, message: '课程编码不可为空', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '考场地址不可为空', trigger: 'blur' }
        ],
        StartDate: [
          { required: true, type: 'date', message: '请选择日期', trigger: 'change' }
        ],
        StartTime: [
          { required: true, type: 'string', message: '请选择时间', trigger: 'change' }
        ],
        EndDate: [
          { required: true, type: 'date', message: '请选择日期', trigger: 'change' }
        ],
        EndTime: [
          { required: true, type: 'string', message: '请选择时间', trigger: 'change' }
        ],
        restTime: [
          { required: true, message: '休息时间不可为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          that=this;
          let ExamData={
            classname:this.formValidate.name,
            roomid: this.formValidate.address,
            start:this.formatDate(this.formValidate.StartDate,this.formValidate.StartTime),
            end:this.formatDate(this.formValidate.EndDate,this.formValidate.EndTime),
            rest:Number(this.formValidate.restTime)
          }
          console.log(ExamData)
          this.CERoom(ExamData);
        } else {
          this.$Message.error('新增失败!');
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields();
    },
    CERoom(ExamData){
      myRequest({
        url:"/ExRoom/AddExRoom",
        params:ExamData,
        method:"post"
      }).then(function (){
        that.$Message.success('新增成功!');
      })
    },
    formatDate (d,t) {
      var date = new Date(d);
      var YY = date.getFullYear();
      var MM =
          (date.getMonth() + 1 < 10
              ? '0' + (date.getMonth() + 1)
              : date.getMonth() + 1);
      var DD = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
      return MM+'/'+DD+'/'+YY+' '+t;
    },
  }
}
</script>
<style>
</style>
