<template>
  <div id="home">
    <div class="container wrap-padding">
      <div class="row home-content">
        <ul class="col-12 col-xl-6">
          <li class="card">
            <img src="@/assets/img/home/step1.png" alt="step1" />
            <p>
              Step 1. <br /><br />
              上傳需要添加簽名的PDF或JPG檔案。
            </p>
          </li>
          <li class="card">
            <img src="@/assets/img/home/step2.png" alt="step1" />
            <p>
              Step 2.<br /><br />
              利用數速簽線上簽名，手寫、打字輸入及圖片的方式完成。
            </p>
          </li>
          <li class="card">
            <img src="@/assets/img/home/step3.png" alt="step1" />
            <p>
              Step 3. <br /><br />
              簽名完成！即可立即下載，傳送檔案給對方。
            </p>
          </li>
        </ul>
        <div class="col-12 col-xl-6">
          <div
            class="upload mb-2"
            @drop.prevent="onUploadPDF($event)"
            @dragover.prevent
          >
            <img src="@/assets/img/home/upload.png" alt="upload" />
            <input
              accept=".pdf"
              type="file"
              id="uploadPDF"
              @change="onUploadPDF($event)"
              hidden
            />
            <label for="uploadPDF" class="btn btn-primary mb-1">選取檔案</label>
            <p>拖曳上傳</p>
          </div>
          <p class="limit">僅支援pdf檔, 最大5MB</p>
        </div>
      </div>
    </div>
  </div>
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
        title: file.name,
        dateLine: "",
        status: "sign",
        id,
      };
      try {
        localStorage.setItem(id, pdfBlob);
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
        this.$router.push(`/pdf_edit/${id}`);
      } catch (e) {
        alert(e);
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
