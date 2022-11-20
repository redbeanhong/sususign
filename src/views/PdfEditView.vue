<script setup>
import CardTemp from "../components/CardTemp.vue";
import PdfEditItem from "../components/PdfEditItem.vue";
import SignWritter from "../components/SignWritter.vue";
import jsPDF from "jspdf";
</script>
<template>
  <div id="pdf">
    <div class="container wrap-padding">
      <div class="row">
        <nav class="col-12 pdfEdit-nav mb-5">
          <h2>
            {{ pdfTitle }}
          </h2>
          <div class="btn-group">
            <div class="btn btn-big btn-primary mr-2">重新</div>
            <div class="btn btn-big btn-primary" @click="downloadPdf">完成</div>
          </div>
        </nav>
      </div>
      <div class="row">
        <div class="col-3">
          <aside>
            <CardTemp class="mb-4">
              <template v-slot:title>到期日</template>
              <template v-slot:content>
                <div class="input-date">
                  <input
                    v-model="dateLine"
                    type="date"
                    name="dateline"
                    id="dateline"
                  />
                  <label for="dateline">
                    <img
                      class="icon"
                      src="@/assets/img/icon/iconCalendar.png"
                      alt="search"
                    />
                  </label>
                </div>
              </template>
            </CardTemp>
            <CardTemp>
              <template v-slot:title>工具</template>
              <template v-slot:content>
                <ul>
                  <li
                    class="sign-item"
                    v-for="(sign, index) in editSignList"
                    :key="index"
                  >
                    <img
                      class="mr-2"
                      src="@/assets/img/icon/iconSign.png"
                      alt="sign"
                    />
                    <div class="sign-item-img" @dragstart="addImageToPdf(sign)">
                      <img :src="sign.imgUrl" alt="sign" />
                    </div>
                    <img
                      class="icon"
                      src="@/assets/img/icon/iconEdit.png"
                      alt="edit"
                      @click.prevent="openSign(sign)"
                    />
                    <img
                      class="icon"
                      src="@/assets/img/icon/iconDelete.png"
                      alt="delete"
                      @click="deleteSign(sign.name)"
                    />
                  </li>
                  <li v-if="addSignList.length > 0">
                    <div class="tool-btn" @click="openSign(addSignList[0])">
                      <img src="@/assets/img/icon/iconSign.png" alt="sign" />
                      新增簽名
                    </div>
                  </li>
                  <li>
                    <div class="tool-btn">
                      <img
                        src="@/assets/img/icon/iconAddText.png"
                        alt="addText"
                      />
                      新增文字
                    </div>
                  </li>
                  <li>
                    <div class="tool-btn">
                      <img
                        src="@/assets/img/icon/iconAddTime.png"
                        alt="addTime"
                      />
                      新增時間
                    </div>
                  </li>
                </ul>
              </template>
            </CardTemp>
          </aside>
        </div>
        <div class="col-9">
          <SignWritter
            :isShow="isWritter"
            :signer="signer"
            @hideSign="hideSign"
          />
          <div id="main-pdf">
            <PdfEditItem
              v-for="(page, index) in pages"
              :index="index"
              :page="page.data"
              :image="page.image"
              :key="index"
              :name="'pdf' + index"
              :images="pagesImages[index]"
              :pageScale="pagesScale[index]"
              :width="pdfWindowWidth"
              @drop="addImage(index)"
              @update="updateCanvas"
              class="mb-2"
            />
          </div>
        </div>
        <div class="col-3"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: { pdfId: String },
  data() {
    return {
      pdfTitle: "檔案標題",
      pdfName: "",
      pdfWindowWidth: 0,
      pages: [],
      pagesImages: [],
      pagesScale: [],
      pagesCanvas: [],
      dateLine: "",
      isWritter: false,
      signer: "",
      signs: [
        { name: "user1_sign", imgUrl: "" },
        { name: "user2_sign", imgUrl: "" },
        { name: "user3_sign", imgUrl: "" },
      ],
      image: {},
    };
  },
  methods: {
    addPDF: async function addPDF() {
      const vm = this;
      try {
        const pdf = await vm.readAsPDF();
        console.log(pdf);
        vm.pdfWindowWidth =
          document.querySelector("#main-pdf").offsetWidth - 60;
        const numPages = pdf.numPages;
        vm.pages = Array(numPages)
          .fill()
          .map((_, i) => {
            let page = {};
            page.data = pdf.getPage(i + 1);
            page.image = [];
            return page;
          });
        vm.pagesImages = vm.pages.map(() => []);
        vm.pagesCanvas = vm.pages.map(() => {});
        vm.pagesScale = Array(numPages).fill(1);
        console.log("suscess");
      } catch (e) {
        console.log("Failed to add pdf.");
        throw e;
      }
    },
    readAsPDF: async function readAsPDF() {
      const pdfData = localStorage.getItem(this.pdfId);
      const Base64Prefix = "data:application/pdf;base64,";
      const data = atob(pdfData.substring(Base64Prefix.length));
      const pdfjs = await import("pdfjs-dist/build/pdf");
      const pdfjsWorker = await import("pdfjs-dist/build/pdf.worker.entry");
      pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;
      return pdfjs.getDocument({ data }).promise;
    },
    addImage(index) {
      if (this.image == {}) return;
      this.pagesImages[index].push(this.image);
      this.image = {};
    },
    addImageToPdf: async function addImageToPdf(sign) {
      this.image = sign;
    },
    getSignUrl() {
      this.signs.forEach((e) => {
        if (localStorage.getItem(e.name)) {
          e.imgUrl = localStorage.getItem(e.name);
        } else {
          e.imgUrl = "";
        }
      });
    },
    hideSign() {
      this.isWritter = false;
      this.getSignUrl();
    },
    openSign(user) {
      const vm = this;
      vm.isWritter = true;
      vm.signer = user;
    },
    deleteSign(user) {
      const vm = this;
      if (localStorage.getItem(user)) {
        localStorage.removeItem(user);
        vm.getSignUrl();
      }
    },
    downloadPdf: async function downloadPdf() {
      const pdf = new jsPDF("p", "pt", "a4", true);
      this.pagesCanvas.forEach((canvas, index) => {
        const image = canvas.toDataURL("image/png");

        // 設定背景在 PDF 中的位置及大小
        const width = pdf.internal.pageSize.width;
        const height = pdf.internal.pageSize.height;
        pdf.addImage(image, "png", 0, 0, width, height);
        if (index < this.pagesCanvas.length - 1) pdf.addPage();
      });

      const pdfBlob = pdf.output("blob");
      const data = await this.readBlob(pdfBlob);
      localStorage.setItem(this.pdfId, data);
      const pdfData = JSON.parse(localStorage.getItem("userPdfs")).map((e) => {
        if (e.id == this.pdfId) {
          e.dateLine = this.dateLine;
          return e;
        } else {
          return e;
        }
      });
      localStorage.setItem("userPdfs", JSON.stringify(pdfData));
      console.log(pdfBlob);
      this.downloadBlobPdf(pdfBlob);
      this.$router.push({ path: `/pdf_download/${this.pdfId}` });
    },
    downloadBlobPdf: async function downloadBlobPdf(blob) {
      const aTag = document.createElement("a");
      const blobPdf = new Blob([blob], { type: "application/pdf" });
      aTag.download = "download.pdf";
      aTag.href = URL.createObjectURL(blobPdf);
      aTag.click();
    },
    updateCanvas(canvasData) {
      this.pagesCanvas[canvasData.index] = canvasData.canvas;
    },
    getPdfData() {
      const vm = this;
      const pdfData = JSON.parse(localStorage.getItem("userPdfs"));
      for (let i = 0; i < pdfData.length; i++) {
        const e = pdfData[i];
        if (e.id == vm.pdfId) {
          vm.pdfTitle = e.title;
          vm.dateLine = e.dateLine;
          break;
        }
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
  computed: {
    addSignList() {
      return this.signs.filter((e) => e.imgUrl == "");
    },
    editSignList() {
      return this.signs.filter((e) => e.imgUrl != "");
    },
  },
  created() {
    this.getSignUrl();
    this.getPdfData();
  },
  mounted() {
    this.addPDF();
  },
};
</script>
