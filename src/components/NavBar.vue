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
            <a href="#">
              <img src="@/assets/img/icon/iconUpload.png" alt="Upload" />
              <label for="navUploadPDF">上傳</label>
            </a>
            <RouterLink to="/document">
              <img src="@/assets/img/icon/iconFile.png" alt="File" />
              文件
            </RouterLink>
            <RouterLink to="/config/signs">
              <img src="@/assets/img/icon/iconSetting.png" alt="Setting" />
              設定
            </RouterLink>
          </div>
        </div>
        <div class="links">
          <input
            accept=".pdf"
            type="file"
            id="navUploadPDF"
            @change="onUploadPDF($event)"
            hidden
          />
          <a href="#">
            <img src="@/assets/img/icon/iconUpload.png" alt="Upload" />
            <label for="navUploadPDF">上傳</label>
          </a>
          <RouterLink to="/document">
            <img src="@/assets/img/icon/iconFile.png" alt="File" />
            文件
          </RouterLink>
          <RouterLink to="/config/signs">
            <img src="@/assets/img/icon/iconSetting.png" alt="Setting" />
            設定
          </RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  methods: {
    onUploadPDF: async function onUploadPDF(e) {
      const files = e.target.files || (e.dataTransfer && e.dataTransfer.files);
      const file = files[0];
      const id = "pdf" + Date.now();
      if (!file || file.type !== "application/pdf") {
        alert("只支援上傳PDF檔案類型");
        return;
      }
      if (file.size > 5000000) {
        alert("檔案不可超過5M!");
        return;
      }
      const pdfBlob = await this.readBlob(file);

      const userPdfs = {
        tags: [],
        title: "",
        id,
      };
      try {
        if (JSON.parse(localStorage.getItem("userPdfs")) !== null) {
          localStorage.setItem(
            "userPdfs",
            JSON.stringify([
              ...JSON.parse(localStorage.getItem("userPdfs")),
              userPdfs,
            ])
          );
        } else {
          localStorage.setItem("userPdfs", JSON.stringify([userPdfs]));
        }

        localStorage.setItem(id, pdfBlob);
        this.$router.push(`/pdf_edit/${id}`);
      } catch (e) {
        alert("上傳失敗");
      }
    },
    readBlob(blob) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.addEventListener("load", () => resolve(reader.result));
        reader.addEventListener("error", reject);
        reader.readAsDataURL(blob);
      });
    },
  },
};
</script>
