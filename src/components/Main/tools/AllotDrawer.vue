<template>
  <MenuItem name="2" @click="value = true" type="primary">
    <Icon type="ios-analytics"></Icon>
    批量分配
  </MenuItem>
  <Drawer
      title="批量分配"
      v-model="value"
      width="720"
      :mask-closable="false"
      :styles="styles"
  >
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
      <FormItem label="课程编号" prop="classId">
        <Input v-model="formValidate.classId" placeholder="请填入课程编号"></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
        <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
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
      formValidate: {
        classId:''
      },
      ruleValidate: {
        classId: [
          {required: true, message: '课程编号不可为空', trigger: 'blur'}
        ],
      },
    }
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          that = this;
          this.allotStu(this.formValidate.classId);
        } else {
          this.$Message.error('分配失败!');
        }
      })
    },
    allotStu(classId) {
      myRequest({
        url: "/Arrange/Arrange",
        params: {
          classname:classId
        },
        method: "post"
      }).then(function () {
        that.$Message.success('分配完成');
      })
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    }
  }
}
</script>
<style>
.demo-drawer-footer {
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
