<template>
  <MenuItem name="3" @click="value = true" type="primary">
    <Icon type="ios-analytics"></Icon>
    选择导出
  </MenuItem>
  <Drawer
      title="选择导出"
      v-model="value"
      width="720"
      :mask-closable="false"
      :styles="styles"
  >
    <Form label-width="80" v-model="EDForm" :rules="rules" ref="EDForm">
      <FormItem label="导出类型" prop="border">
        <RadioGroup v-model="EDForm.border" @change="changeItem()">
          <Radio label="全部" border></Radio>
          <Radio label="课程代码" border></Radio>
          <Radio label="考场编号" border></Radio>
        </RadioGroup>
      </FormItem>
      <FormItem prop="condition">
        <Input placeholder="请填入对应信息" ref="TypeCondition" v-bind:disabled="result" v-model="EDForm.condition"></Input>
      </FormItem>
      <FormItem prop="myButton">
        <Button type="primary" @click="handleSubmit()">提交</Button>
        <Button @click="handleReset()" style="margin-left: 8px">重置</Button>
      </FormItem>
    </Form>
  </Drawer>
</template>
<script>
import myRequest from "../../../api/request";
let that;
export default {
  components: {
    myRequest,
  },
  data() {
    return {
      value: false,
      styles: {
        height: 'calc(100% - 55px)',
        overflow: 'auto',
        paddingBottom: '53px',
        position: 'static'
      },
      result:true,
      EDForm:{
        condition:0,
        border: '全部',
      },
      rules:{
        condition: [
          { validator: this.checkCondition, trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    changeItem(){
      if(this.EDForm.border==='全部'){
        this.EDForm.condition=0;
        this.result =true;
      }
      else{
        this.result=false;
        this.EDForm.condition=''
      }
    },
    checkCondition(rule, value, callback){
      let judge=0;
      if(this.border!=='全部'&&this.EDForm.condition===''){
        callback(new Error("请输入相关条件"))
      }
      else {
        callback();
        judge=1;
      }
      return judge;
    },
    handleSubmit() {
      console.log("正在运行1")
      if(this.EDForm.border==='全部'||this.EDForm.condition!==''){
        let type;
        switch (this.EDForm.border){
          case '全部':
            type=0;
            break;
          case '课程代码':
            type=1;
            break;
          case '考场编号':
            type=2;
            break;
        }
        this.ExportData(type,this.EDForm.condition);
      }
      else {
        that.$Message.success('导出失败!');
      }
    },
    ExportData(type,condition) {
      window.open(
          'http://localhost:5172/Arrange/Download?type='+type+'&condition='+condition
      );
    },
    handleReset() {
      this.EDForm.condition=''
    }
  }
}
</script>
<style>
</style>
