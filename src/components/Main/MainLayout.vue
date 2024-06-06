<style>
.layout{
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-logo{
  width: 200px;
  height: 30px;
  background: white;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
}
.layout-nav{
  width: 720px;
  margin: 0 auto;
  margin-right: 10px;
}
.logoTitle{
  width: 200px;
  height: 34px;
  text-align: center;
}
</style>
<template>
  <div class="layout">
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark">
          <div class="layout-logo">
            <img class="logoTitle" src="../../assets/icons/iconLogo.png" alt="">
          </div>
          <div class="layout-nav">
            <DeleteSButton></DeleteSButton>
            <ResetERButton></ResetERButton>
            <AllotDrawer></AllotDrawer>
            <ExportDrawer></ExportDrawer>
            <CreateEDrawer></CreateEDrawer>
            <CreateCDrawer></CreateCDrawer>
          </div>
        </Menu>
      </Header>
      <Layout>
        <Sider hide-trigger :style="{background: '#fff'}" >
          <Menu theme="light" width="auto" defa>
            <Submenu name="1">
              <template #title>
                <Icon type="ios-navigate"></Icon>
                考场
              </template>
              <MenuItem name="1-1" @click="GetMenuItem('1_1')">考场信息</MenuItem>
              <MenuItem name="1-3" @click="GetMenuItem('1_2')">未满员考场</MenuItem>
            </Submenu>
            <Submenu name="2">
              <template #title>
                <Icon type="ios-keypad"></Icon>
                学生
              </template>
              <MenuItem name="2-1" @click="GetMenuItem('2_1')">学生信息</MenuItem>
              <MenuItem name="2-2" @click="GetMenuItem('2_2')">未分配学生</MenuItem>
            </Submenu>
            <Submenu name="3">
              <template #title>
                <Icon type="ios-keypad"></Icon>
                机房
              </template>
              <MenuItem name="3-1" @click="GetMenuItem('3_1')">机房信息</MenuItem>
            </Submenu>
            <Submenu name="4">
              <template #title>
                <Icon type="ios-analytics"></Icon>
                Excel表格
              </template>
              <MenuItem name="4-2" @click="GetMenuItem('4_2')">导入Excel</MenuItem>
            </Submenu>
          </Menu>
        </Sider>
        <Layout :style="{padding: '0 24px 24px',margin: '24px 0'}">
          <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
            <RoomData v-if="item==='1_1'"></RoomData>
            <Detail v-else-if="item==='1_2'"></Detail>
            <StudentData v-else-if="item==='2_1'"></StudentData>
            <UnallocatedStu v-else-if="item==='2_2'"></UnallocatedStu>
            <CRoomData v-else-if="item==='3_1'"></CRoomData>
            <Export v-else-if="item==='4_1'"></Export>
            <Upload v-else-if="item==='4_2'"></Upload>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>
<script>
import Drawer from "./main-components/ComputerRoom/CreateCDrawer.vue";
import Export from "./main-components/excel/Export.vue";
import Upload from "./main-components/excel/Upload.vue";
import RoomData from "./main-components/ExaminationRoom/ERoomData.vue";
import Detail from "./main-components/ExaminationRoom/UExam.vue";
import StudentData from "./main-components/StudentList/StudentData.vue";
import UnallocatedStu from "./main-components/StudentList/UnallocatedStu.vue";
import CRoomData from "./main-components/ComputerRoom/CRoomData.vue";
import CreateCDrawer from "./main-components/ComputerRoom/CreateCDrawer.vue";
import CreateEDrawer from "./main-components/ExaminationRoom/CreateEDrawer.vue";
import ResetERButton from "./tools/ResetERButton.vue";
import AllotDrawer from "./tools/AllotDrawer.vue";
import ExportDrawer from "./tools/ExportDrawer.vue";
import DeleteSButton from "./tools/DeleteSButton.vue";
export default {
  components: {
    DeleteSButton,
    ExportDrawer,
    AllotDrawer,
    ResetERButton,
    CreateEDrawer,
    CreateCDrawer,
    Drawer,
    Upload,
    Export,
    RoomData,
    Detail,
    StudentData,
    UnallocatedStu,
    CRoomData
  },
  data(){
    return{
      value: false,
      styles: {
        height: 'calc(100% - 55px)',
        overflow: 'auto',
        paddingBottom: '53px',
        position: 'static'
      },
      item:""
    }
  },
  methods:{
    GetMenuItem(index){
      this.item=index;
    }
}
}

</script>
