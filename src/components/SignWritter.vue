<template>
  <div id="sign" :class="[isShow ? 'isShow' : '']" @click="hideSign">
    <div class="sign-container" @click.stop="">
      <div class="sign-header mb-2">
        <ul class="sign-header-item">
          <li
            class="btn-menu mr-1"
            :class="{ active: writeType == 'hand' }"
            @click="writeType = 'hand'"
          >
            手寫
          </li>
          <li
            class="btn-menu mr-1"
            :class="{ active: writeType == 'keyIn' }"
            @click="writeType = 'keyIn'"
          >
            打字
          </li>
          <li
            class="btn-menu"
            :class="{ active: writeType == 'image' }"
            @click="writeType = 'image'"
          >
            圖片
          </li>
        </ul>
        <div
          class="sign-header-item btn-save btn btn-big btn-primary"
          @click="saveImage"
        >
          儲存
        </div>
      </div>
      <div class="sign-body mb-2">
        <canvas
          v-if="writeType == 'hand'"
          id="sign-writter"
          :width="width"
          :height="height"
        />
        <div class="input-name" v-if="writeType == 'keyIn'">
          <input
            v-model="textSign"
            type="text"
            :width="width"
            :height="height"
            placeholder="在此輸入簽名"
          />
        </div>
        <div class="imgArea" v-if="writeType == 'image'">
          <div v-if="imgPreview == ''">
            <input
              accept="image/*"
              type="file"
              @change="onUploadImg($event)"
              id="upload-img"
              hidden
            />
            <label for="upload-img" class="btn-add">
              <img src="@/assets/img/icon/iconAdd.png" alt="add" />
              <p>新增</p>
            </label>
          </div>
          <img v-else id="imgPreview" :src="imgPreview" alt="imgPreview" />
        </div>
      </div>
      <div class="sign-footer">
        <div class="btn btn-big btn-primary" @click="clearCanvas">清除</div>
      </div>
    </div>
  </div>
</template>
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
      height: 150,
      writeType: "hand",
      imgPreview: "",
      textSign: "",
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
      vm.ctx.lineWidth = 20; // 線條寬度
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
      vm.imgPreview = "";
    },
    saveImage() {
      const vm = this;
      let newImg = null;
      if (vm.writeType == "hand") {
        newImg = vm.canvas.toDataURL("image/png");
      } else if (vm.writeType == "image") {
        newImg = vm.imgPreview;
      } else if (vm.writeType == "keyIn") {
        const vm = this;
        const canvas = document.createElement("canvas");
        canvas.width = vm.width;
        canvas.height = vm.height;

        const ctx = canvas.getContext("2d");
        ctx.strokeStyle = "#BADA55"; // 線條顏色
        ctx.textAlign = "center";
        ctx.lineWidth = 20; // 線條寬度
        ctx.font = `100px Georgia`;
        ctx.fillText(
          vm.textSign,
          canvas.width / 2,
          canvas.height / 2 + 40,
          canvas.width
        );
        newImg = canvas.toDataURL("image/png");
      }

      localStorage.setItem(vm.signer.name, newImg);
      vm.writeType = "hand";
      vm.hideSign();
    },
    onUploadImg(e) {
      const vm = this;
      const files = e.target.files || (e.dataTransfer && e.dataTransfer.files);
      console.log(files);
      const file = files[0];
      const reader = new FileReader();
      reader.addEventListener(
        "load",
        () => {
          vm.imgPreview = reader.result;
          console.log(reader.result);
        },
        false
      );

      if (file) {
        reader.readAsDataURL(file);
      }
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
      this.width = document.querySelector(".sign-body").offsetWidth;
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
