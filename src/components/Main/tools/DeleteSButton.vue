<template>
  <MenuItem name="1" type="primary" @click="modal = true">
    <Icon type="ios-navigate"></Icon>
    清空学生
  </MenuItem>
  <Modal
      v-model="modal"
      title="提醒！！！"
      :loading="loading"
      @on-ok="asyncOK">
    <p>此操作为删除所有学生数据且无法复原</p>
  </Modal>
</template>
<script>
import myRequest from "../../../api/request";

export default {
  data () {
    return {
      modal: false,
      loading: true
    }
  },
  methods: {
    asyncOK () {
      setTimeout(() => {
        this.modal = false;
      }, 2000);
      this.ResetERoom();
    },
    ResetERoom(){
      myRequest({
        url:"/Student/DelteAllStudents",
        method:"delete"
      })
    }
  },
}
</script>
