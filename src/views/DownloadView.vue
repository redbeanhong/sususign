<template>
  <div id="download">
    <div class="container wrap-padding">
      <div class="download-content">
        <div class="sign-suscess mb-4">
          <img src="@/assets/img/home/signFinished.png" alt="sign-suscess" />
          <p>簽名完成!</p>
        </div>
        <div class="btn btn-big btn-primary mb-4" @click="downloadBlobPdf">
          下載
        </div>
        <RouterLink to="/">回首頁</RouterLink>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: { pdfId: String },
  methods: {
    downloadBlobPdf: async function downloadBlobPdf() {
      const blob = await localStorage.getItem(this.pdfId);
      var aTag = document.createElement("a");
      var blobPdf = new Blob([blob], { type: "application/pdf" });
      aTag.download = "download.pdf";
      aTag.href = URL.createObjectURL(blobPdf);
      aTag.click();
      URL.revokeObjectURL(blobPdf);
    },
  },
};
</script>
