<script setup>
import { RouterLink } from "vue-router";
</script>
<template>
  <nav id="nav">
    <div class="container">
      <div class="navbar">
        <RouterLink to="/"><h1>數速簽</h1></RouterLink>
        <div class="hamburger">
          <img src="@/assets/img/icon/iconMenu.png" alt="Menu" />
          <div class="links-phone">
            <RouterLink to="/pdf_edit">
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
          </div>
        </div>
        <div class="links">
          <RouterLink to="/pdf_edit">
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
        </div>
      </div>
    </div>
  </nav>
</template>
