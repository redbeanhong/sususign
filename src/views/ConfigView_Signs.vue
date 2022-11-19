<script setup>
import CardTemp from "../components/CardTemp.vue";
</script>
<template>
  <div class="row">
    <div class="col-12 col-sm-6">
      <CardTemp :isCenter="true">
        <template v-slot:title> 簽名2 </template>
        <template v-slot:content>
          <div class="btn-add">
            <img src="@/assets/img/icon/iconAdd.png" alt="add" />
            <p>新增</p>
          </div>
        </template>
      </CardTemp>
    </div>
  </div>
</template>
