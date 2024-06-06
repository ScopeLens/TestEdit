<template>
  <el-upload
      class="upload-demo"
      drag
      action="http://localhost:5172/Student/UploadStudents"
      multiple
  >
    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
    <div class="el-upload__text">
      选择excel文件并<em>上传</em>
    </div>
    <template #tip>
      <div class="el-upload__tip">
        文件大小限制为30MB以下
      </div>
    </template>
  </el-upload>
</template>

<script setup lang="ts">
import { UploadFilled } from '@element-plus/icons-vue'

</script>
