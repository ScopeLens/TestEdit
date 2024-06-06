<template>
  <MenuItem name="1" type="primary" @click="modal = true">
    <Icon type="ios-navigate"></Icon>
    重置考场
  </MenuItem>
  <Modal
      v-model="modal"
      title="提醒！！！"
      :loading="loading"
      @on-ok="asyncOK">
    <p>此操作为重置所有考场且无法复原</p>
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
        url:"/Arrange/DelteAllArrange",
        method:"delete"
      })
    }
  },
}
</script>
