<template>
  <div id="document" @click="editItem = ''">
    <div class="container wrap-padding">
      <div class="doc-head row mb-2">
        <ul>
          <li class="btn-menu active mr-3">已建立(0)</li>
          <li class="btn-menu mr-3">已簽核(0)</li>
          <li class="btn-menu">已完成(0)</li>
        </ul>
        <!-- <div>
          <input accept=".pdf" type="file" id="uploadPDF" hidden />
          <label for="uploadPDF" class="btn-add">
            <img src="@/assets/img/icon/iconAdd.png" alt="add" />
            <p>新增</p>
          </label>
        </div> -->
      </div>
      <div class="doc-filters row mb-2">
        <ul class="filter-tags">
          <li class="tag mr-2 active">全部</li>
        </ul>
        <div class="doc-tool">
          <input
            v-model="filterName"
            type="text"
            id="input-search"
            placeholder="搜尋"
            class="mr-2"
          />
          <label for="input-search">
            <img
              class="icon"
              src="@/assets/img/icon/iconSearch.png"
              alt="search"
            />
          </label>
          <div>
            <img
              class="icon"
              src="@/assets/img/icon/iconHorizontal.png"
              alt="horizontal"
            />
          </div>
        </div>
      </div>
      <ul class="row">
        <li
          class="doc mb-2"
          v-for="(pdf, docIndex) in filterPdfData"
          :key="docIndex"
        >
          <div class="doc-head">
            <img class="mr-2" src="@/assets/img/Mask group.png" alt="test" />
            <div class="doc-head-content">
              <h3 class="mb-1">{{ pdf.title }}</h3>
              <p class="mb-1">
                <small>
                  {{ pdf.dateLine == "" ? "尚未設定到期日" : pdf.dateLine }}
                </small>
              </p>
              <ul>
                <li
                  class="tag disabled mr-2"
                  v-if="
                    checkDateLine(pdf.dateLine) &&
                    checkDateLine(pdf.dateLine) < 0
                  "
                >
                  已過期
                </li>
                <li
                  class="tag disabled mr-2"
                  v-else-if="
                    checkDateLine(pdf.dateLine) &&
                    checkDateLine(pdf.dateLine) < 24
                  "
                >
                  即將到期
                </li>
                <li
                  class="tag disabled mr-2"
                  v-for="(tag, tagIndex) in pdf.tags"
                  :key="tagIndex"
                >
                  {{ tag }}
                </li>
              </ul>
            </div>
          </div>
          <ul class="doc-status">
            <li
              class="doc-status-tag"
              :class="{ active: pdf.status == 'upload' }"
            >
              上傳檔案
            </li>
            <li
              class="doc-status-tag"
              :class="{ active: pdf.status == 'sign' }"
            >
              簽核中
            </li>
            <li
              class="doc-status-tag last"
              :class="{ active: pdf.status == 'finished' }"
            >
              完成!
            </li>
          </ul>
          <div class="btn-edit" @click.stop="editItem = docIndex">
            <img class="icon" src="@/assets/img/icon/iconEdit.png" alt="edit" />
            編輯
          </div>
          <ul class="edit-tool" :class="{ active: editItem === docIndex }">
            <li @click="downloadPdf(pdf.id)">
              <img src="@/assets/img/icon/iconDownload.png" alt="download" />
              下載
            </li>
            <li @click="deletePdf(pdf.id)">
              <img src="@/assets/img/icon/iconDelete.png" alt="delete" />
              刪除
            </li>
            <li @click="editPdf(pdf.id)">
              <img src="@/assets/img/icon/iconEdit.png" alt="sign" />
              簽核
            </li>
            <!-- <li>
              <img src="@/assets/img/icon/iconTag.png" alt="tag" />
              標籤
            </li> -->
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pdfData: [],
      editItem: "",
      filterName: "",
    };
  },
  methods: {
    getPdfData() {
      this.pdfData = JSON.parse(localStorage.getItem("userPdfs"));
      console.log(this.pdfData);
    },
    checkDateLine(toTime) {
      if (toTime == "") return false;
      const a1 = new Date();
      const a2 = new Date(toTime);
      const total = (a2.getTime() - a1.getTime()) / 1000;
      const endTime = parseInt(total / (60 * 60));

      return endTime;
    },
    downloadPdf: async function downloadPdf(pdfId) {
      const blob = await localStorage.getItem(pdfId);
      const aTag = document.createElement("a");
      const blobPdf = new Blob([blob], { type: "application/pdf" });
      aTag.download = "download.pdf";
      aTag.href = URL.createObjectURL(blobPdf);
      aTag.click();
      URL.revokeObjectURL(blobPdf);
    },
    deletePdf(pdfId) {
      const index = this.pdfData.findIndex((e) => e.id == pdfId);
      localStorage.removeItem(pdfId);
      this.pdfData.splice(index, 1);
      localStorage.setItem("userPdfs", JSON.stringify(this.pdfData));
    },
    editPdf(pdfId) {
      this.$router.push(`/pdf_edit/${pdfId}`);
    },
  },
  computed: {
    filterPdfData() {
      if (this.filterName == "") {
        return this.pdfData;
      } else {
        return this.pdfData.filter((pdf) => {
          return pdf.title.includes(this.filterName);
        });
      }
    },
  },
  created() {
    this.getPdfData();
  },
};
</script>
