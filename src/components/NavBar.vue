<script setup>
import { RouterLink } from "vue-router";
</script>
<template>
  <nav id="nav">
    <div class="container">
      <div class="navbar">
        <RouterLink to="/"><h1>數速簽</h1></RouterLink>
        <div class="links">
          <RouterLink to="/">
            <img src="@/assets/img/icon/iconUpload.png" alt="Upload" />
            上傳
          </RouterLink>
          <RouterLink to="/document">
            <img src="@/assets/img/icon/iconFile.png" alt="File" />
            文件
          </RouterLink>
          <RouterLink to="/config">
            <img src="@/assets/img/icon/iconSetting.png" alt="Setting" />
            設定
          </RouterLink>
          <RouterLink to="/pdf_edit">
            <img src="@/assets/img/icon/iconUpload.png" alt="Upload" />
            PdfEdit
          </RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>
