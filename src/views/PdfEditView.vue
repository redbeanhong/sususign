<script setup>
import PdfEditItem from "../components/PdfEditItem.vue";
import SignWritter from "../components/SignWritter.vue";
import jsPDF from "jspdf";
</script>
<template>
  <div class="container">
    <nav class="pdfEdit-nas">
      <h2>
        {{ pdfTitle }}
        <input
          accept=".pdf"
          type="file"
          id="uploadPDF"
          @change="onUploadPDF($event)"
        />
      </h2>
      <div class="btn-group">
        <div class="btn">重新</div>
        <div class="btn" @click="downloadPdf">完成</div>
      </div>
    </nav>
    <div class="row">
      <div class="col-3">
        <aside>
          <div class="card">
            <div class="card-head">到期日</div>
            <div class="card-body">
              <input type="date" name="dateline" id="dateline" />
            </div>
          </div>
          <div class="card">
            <div class="card-head">工具</div>
            <div class="card-body">
              <ul>
                <li v-for="(sign, index) in editSignList" :key="index">
                  <a href="#" @click="deleteSign(sign.name)">刪除</a>
                  <a href="#" @click="openSign(sign)">修改</a>
                  <div class="btn" @dragstart="addImageToPdf(sign)">
                    <img :src="sign.imgUrl" alt="sign" style="width: 100%" />
                  </div>
                </li>
                <li v-if="addSignList.length > 0">
                  <div class="btn" @click="openSign(addSignList[0])">
                    新增簽名
                  </div>
                </li>
                <li><div class="btn">新增文字</div></li>
                <li><div class="btn">新增時間</div></li>
              </ul>
            </div>
          </div>
        </aside>
      </div>
      <div class="col-6">
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
            @drop="addImage(index)"
            @update="updateCanvas"
          />
        </div>
      </div>
      <div class="col-3"></div>
    </div>
  </div>
</template>
<style lang="scss">
$default_color: #323232;
.pdfEdit-nas {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.btn {
  display: inline-block;
  padding: 10px 20px;
  border: 1px solid $default_color;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    color: white;
    background-color: $default_color;
  }
}
</style>
<script>
export default {
  data() {
    return {
      pdfTitle: "檔案標題",
      pdfFile: null,
      pdfName: "",
      pages: [],
      pagesImages: [],
      pagesScale: [],
      pagesCanvas: [],
      selectedPageIndex: -1,
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
    onUploadPDF: async function onUploadPDF(e) {
      const vm = this;
      const files = e.target.files || (e.dataTransfer && e.dataTransfer.files);
      const file = files[0];
      if (!file || file.type !== "application/pdf") return;
      vm.selectedPageIndex = -1;
      try {
        await vm.addPDF(file);
        vm.selectedPageIndex = 0;
      } catch (e) {
        console.log(e);
      }
    },
    addPDF: async function addPDF(file) {
      const vm = this;
      try {
        const pdf = await vm.readAsPDF(file);
        console.log(pdf);
        vm.pdfName = file.name;
        vm.pdfFile = file;
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
    readAsPDF: async function readAsPDF(file) {
      const blob = new Blob([file]);
      const url = window.URL.createObjectURL(blob);
      const pdfjs = await import("pdfjs-dist/build/pdf");
      const pdfjsWorker = await import("pdfjs-dist/build/pdf.worker.entry");
      pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;
      return pdfjs.getDocument(url).promise;
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
      const pdf = new jsPDF();
      this.pagesCanvas.forEach((canvas, index) => {
        console.log("頁面");
        const image = canvas.toDataURL("image/png");

        // 設定背景在 PDF 中的位置及大小
        const width = pdf.internal.pageSize.width;
        const height = pdf.internal.pageSize.height;
        pdf.addImage(image, "png", 0, 0, width, height);
        if (index < this.pagesCanvas.length - 1) pdf.addPage();
      });

      // 將檔案取名並下載
      pdf.save("download.pdf");
    },
    updateCanvas(canvasData) {
      this.pagesCanvas[canvasData.index] = canvasData.canvas;
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
  },
};
</script>
