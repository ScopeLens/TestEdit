<template>
  <el-button plain @click="dialogFormVisible = true;GetERData()"
             type="primary"
             size="small"
             style="margin-right: 4px"
  >安排
  </el-button>
  <el-dialog v-model="dialogFormVisible" title="考场安排" width="500">
    <el-form>
      <el-form-item label="考场：" :label-width="formLabelWidth">
          <el-select
              v-model="NowValue"
              placeholder="请选择考场"
              size="large"
              style="width: 240px"
          >
            <el-option
                v-for="item in options"
                :key="item.label"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">返回</el-button>
        <el-button type="primary" @click="dialogFormVisible = false;setERoom()">保存</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script>
import myRequest from "../../../api/request";
import { ref } from 'vue'
let that;
export default {
  props:['StuId'],
  data () {
    return {
      dialogFormVisible : ref(false),
      formLabelWidth : '140px',
      NowValue:'',
      options : this.GetERData()
    }
  },
  methods:{
    setERoom(){
      myRequest({
        url:"/Arrange/AddArrange",
        params:{
          exrid:this.NowValue,
          sid:this.StuId,
        },
        method:"post"
      }).then(function (){
        this.GetERData();
      })
    },
    GetERData(){
      const data = [];
      myRequest({
        url:"/ExRoom/GetExRoom",
        method:"get"
      }).then(function (response){
        var jsonData=response.data;
        for (let i = 0; i<jsonData.length;i++) {
          if(jsonData[i].count<jsonData[i].room.capacity)
            data.push({
              value:jsonData[i].id,
              label:jsonData[i].room.address,
            });
        }
      })
      return data;
    }
  }
}
</script>
