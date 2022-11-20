<template>
  <div class="card-temp">
    <div class="card-title">
      <slot name="title"></slot>
    </div>
    <div class="card-content" :class="{ 'card-content-center': isCenter }">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isCenter: { type: Boolean, default: false },
  },
};
</script>
