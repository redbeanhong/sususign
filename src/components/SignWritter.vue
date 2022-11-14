<template>
  <div id="sign" :class="[isShow ? 'isShow' : '']" @click="hideSign">
    <div class="sign-container" @click.stop="">
      <div class="sign-header">
        <button>手寫</button>
        <button>打字</button>
        <button>圖片</button>
        <button @click="saveImage">保存</button>
      </div>
      <div class="sign-body">
        <canvas id="sign-writter" :width="width" :height="height" />
      </div>
      <div class="sign-footer">
        <button @click="clearCanvas">清除</button>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scope>
#sign {
  top: 0;
  left: 0;
  position: absolute;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  display: none;
  background-color: rgba(203, 201, 201, 0.7);

  &.isShow {
    display: flex;
    z-index: 99;
  }
}
.sign-container {
  width: 100%;
  max-width: 600px;
  padding: 15px;
  background-color: white;
  .sign-body {
    width: 100%;
    min-height: 100px;
  }
}

#sign-writter {
  background-color: antiquewhite;
  border: 1px solid gray;
}
</style>
<script>
export default {
  props: {
    isShow: Boolean,
    signer: Object,
  },
  data() {
    return {
      canvas: null,
      ctx: null,
      width: 200,
      height: 200,
    };
  },
  methods: {
    render() {
      const vm = this;
      vm.canvas = document.getElementById("sign-writter");
      vm.ctx = vm.canvas.getContext("2d");

      vm.ctx.strokeStyle = "#BADA55"; // 線條顏色
      vm.ctx.lineJoin = "round"; // 線條連接樣式（轉角）
      vm.ctx.lineCap = "round"; // 線條結束樣式
      vm.ctx.lineWidth = 5; // 線條寬度
      let isDrawing = false; // 判斷是否執行畫圖中
      let lastX = 0;
      let lastY = 0;
      // let direction = true; // 判斷粗細增減用

      function draw(e) {
        // 判斷是否`isDrawing`，`false`則`return`不觸發此function
        if (!isDrawing) {
          return;
        }
        vm.ctx.beginPath();
        vm.ctx.moveTo(lastX, lastY);
        vm.ctx.lineTo(e.offsetX, e.offsetY);
        vm.ctx.stroke();
        [lastX, lastY] = [e.offsetX, e.offsetY];
      }

      vm.canvas.addEventListener("mousedown", (e) => {
        isDrawing = true;
        [lastX, lastY] = [e.offsetX, e.offsetY];
      });
      vm.canvas.addEventListener("mousemove", draw);
      vm.canvas.addEventListener("mouseup", () => (isDrawing = false));
      vm.canvas.addEventListener("mouseout", () => (isDrawing = false));
    },
    clearCanvas() {
      const vm = this;
      var w = vm.canvas.width;
      var h = vm.canvas.height;
      vm.ctx.clearRect(0, 0, w, h);
    },
    saveImage() {
      const vm = this;
      const newImg = vm.canvas.toDataURL("image/png");
      localStorage.setItem(vm.signer.name, newImg);
      vm.hideSign();
    },
    changeColor() {
      const vm = this;
      const color = document.querySelector("#color").value;
      vm.ctx.strokeStyle = color; // 線條顏色
    },
    hideSign() {
      this.$emit("hideSign");
    },
    updateWritter() {
      const vm = this;
      this.width = this.canvas.parentElement.offsetWidth;
      if (vm.signer.imgUrl) {
        const img = new Image(); // Create new img element
        img.src = vm.signer.imgUrl;
        vm.ctx.drawImage(img, 0, 0);
      }
    },
  },
  mounted() {
    this.render();
  },
  updated() {
    this.updateWritter();
  },
  watch: {
    isShow() {},
  },
};
</script>
