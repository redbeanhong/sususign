<template>
  <div>
    <canvas :id="name" />
  </div>
</template>
<script>
export default {
  props: {
    index: Number,
    page: Object,
    name: String,
    images: Array,
    pageScale: Object,
    width: Number,
  },
  data() {
    return {
      canvas: {},
    };
  },
  methods: {
    render: async function render() {
      const vm = this;
      const windowWith = await vm.width;
      const id = await vm.name;
      const canvas = document.createElement("canvas");
      const _page = await vm.page;
      const context = canvas.getContext("2d");
      let viewport = _page.getViewport({ scale: 1 });
      const scale = windowWith / viewport.width;
      viewport = _page.getViewport({ scale });

      const outputScale = window.devicePixelRatio || 1;

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
      const { fabric } = await import("fabric");
      const canvas2 = new fabric.Canvas(id);
      vm.canvas = canvas2;
      canvas2.requestRenderAll();
      const renderTask = _page.render(renderContext);
      const pdfData = await renderTask.promise.then(() => canvas);
      const pdfImage = await vm.pdfToImage(pdfData);

      // 透過比例設定 canvas2 尺寸
      canvas2.setWidth(pdfImage.width / window.devicePixelRatio);
      canvas2.setHeight(pdfImage.height / window.devicePixelRatio);

      // 將 PDF 畫面設定為背景
      canvas2.setBackgroundImage(pdfImage, canvas2.renderAll.bind(canvas2));
    },
    pdfToImage: async function pdfToImage(pdfData) {
      // 設定 PDF 轉為圖片時的比例
      const scale = 1 / window.devicePixelRatio;
      const { fabric } = await import("fabric");
      // 回傳圖片
      return new fabric.Image(pdfData, {
        id: "renderPDF",
        scaleX: scale,
        scaleY: scale,
      });
    },
    addImage: async function addImage(imageUrl) {
      const vm = this;

      const { fabric } = await import("fabric");
      fabric.Image.fromURL(imageUrl, function (image) {
        // 設定簽名出現的位置及大小，後續可調整
        image.top = 100;
        image.scaleX = 1;
        image.scaleY = 1;
        vm.canvas.add(image);
      });
    },
    updateCanvas() {
      const vm = this;

      const canvasData = {
        index: vm.index,
        canvas: vm.canvas,
      };
      console.log(canvasData);
      this.$emit("update", canvasData);
    },
  },
  created() {
    this.render();
  },
  watch: {
    images: {
      handler: function (val) {
        if (val.length > 0) {
          this.addImage(val[val.length - 1].imgUrl);
        }
      },
      deep: true,
    },
    canvas: {
      handler: function () {
        this.updateCanvas();
      },
      deep: true,
    },
  },
};
</script>
