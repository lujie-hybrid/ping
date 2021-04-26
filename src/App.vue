<template>
  <div id="app" class="wrap">
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  methods: {}
};
</script>

<style lang="scss">
@import "@/assets/scss/common.scss";
@import "@/assets/scss/elementui.scss";
.wrap {
  overflow-x: hidden;
}
</style>
