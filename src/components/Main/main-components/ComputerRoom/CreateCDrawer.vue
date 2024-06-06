<template>
  <MenuItem name="5" @click="value = true" type="primary">
    <Icon type="ios-analytics"></Icon>
    添加机房
  </MenuItem>
  <Drawer
      title="添加机房"
      v-model="value"
      width="720"
      :mask-closable="false"
      :styles="styles"
  >
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="校区" prop="campus">
          <RadioGroup v-model="border">
            <Radio label="赭山校区" border></Radio>
            <Radio label="花津校区" border></Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="机房位置" prop="address">
          <Input v-model="formValidate.address" placeholder="请填入考场地址"></Input>
        </FormItem>
        <FormItem label="容量" prop="capacity">
          <Input v-model="formValidate.capacity" placeholder="请填入考场容量"></Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
          <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
        </FormItem>
      </Form>
  </Drawer>
</template>
<script>
import myRequest from "../../../../api/request";
let that;
export default {
  components:{
    myRequest,
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
        address:'',
        capacity: '',
      },
      ruleValidate: {
        address: [
          { required: true, message: '机房地址不可为空', trigger: 'blur' }
        ],
        capacity: [
          { required: true, message: '机房容量不可为空', trigger: 'blur' }
        ],
      },
      border: '赭山校区'
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          that=this;
          let NCampus=1;
          if(this.border==="赭山校区")NCampus=1;
          if(this.border==="花津校区")NCampus=2;
          let CData={
            address:this.formValidate.address,
            campus: NCampus,
            capacity:Number(this.formValidate.capacity)
          }
          this.CRoom(CData);
        } else {
          this.$Message.error('添加失败!');
        }
      })
    },
    CRoom(CData){
      myRequest({
        url:"/Room/AddRoom",
        params:CData,
        method:"post"
      }).then(function (){
        that.$Message.success('添加成功!');
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields();
    }
  }
}
</script>
<style>
.demo-drawer-footer{
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  border-top: 1px solid #e8e8e8;
  padding: 10px 16px;
  text-align: right;
  background: #fff;
}
</style>
