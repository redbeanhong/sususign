<script setup>
import PdfEditItem from "../components/PdfEditItem.vue";
</script>

<template>
  <main>
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
          <div class="btn">完成</div>
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
                  <li><div class="btn">簽名區域</div></li>
                  <li><div class="btn">顏色</div></li>
                  <li><div class="btn">新增文字</div></li>
                  <li><div class="btn">新增時間</div></li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
        <div class="col-6">
          <div id="main-pdf">
            <PdfEditItem
              v-for="(page, index) in pages"
              :page="page"
              :key="index"
              :name="'pdf' + index"
            />
          </div>
        </div>
        <div class="col-3"></div>
      </div>
    </div>
  </main>
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
      selectedPageIndex: -1,
      allObjects: [],
      pagesScale: [],
    };
  },
  methods: {
    onUploadPDF: async function onUploadPDF(e) {
      const vm = this;
      const files = e.target.files || (e.dataTransfer && e.dataTransfer.files);
      console.log(files);
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
          .map((_, i) => pdf.getPage(i + 1));
        vm.allObjects = vm.pages.map(() => []);
        vm.pagesScale = Array(numPages).fill(1);
        console.log("suscess");
        // vm.renderPdf(pdf);
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

    renderPdf: function renderPdf(pdf) {
      (async () => {
        const page = await pdf.getPage(1);
        const outputScale = window.devicePixelRatio || 1;
        const desiredWidth = 300;
        let viewport = page.getViewport({ scale: 1 });
        const scale = desiredWidth / viewport.width;
        viewport = page.getViewport({ scale });

        const canvas = document.getElementById("the-canvas");
        const context = canvas.getContext("2d");

        canvas.width = Math.floor(viewport.width * outputScale);
        canvas.height = Math.floor(viewport.height * outputScale);
        canvas.style.width = Math.floor(viewport.width) + "px";
        canvas.style.height = Math.floor(viewport.height) + "px";

        const transform =
          outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : null;

        const renderContext = {
          canvasContext: context,
          transform,
          viewport,
        };
        page.render(renderContext);
      })();
    },
  },
};
</script>
