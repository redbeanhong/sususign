<template>
  <div>
    <canvas :id="name" />
  </div>
</template>
<script>
export default {
  props: {
    page: Object,
    name: String,
  },
  methods: {
    render: async function render() {
      const desiredWidth = 300;
      const vm = this;
      const id = await vm.name;
      const canvas = document.getElementById(id);
      console.log(canvas);
      const _page = await vm.page;
      const context = canvas.getContext("2d");
      let viewport = _page.getViewport({ scale: 1 });
      const scale = desiredWidth / viewport.width;
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
      await _page.render(renderContext).promise;
    },
  },
  created() {
    this.render();
  },
};
</script>
