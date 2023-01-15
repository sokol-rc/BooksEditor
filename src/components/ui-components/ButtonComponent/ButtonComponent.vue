<template>
  <button class="button" :type="type" @click="click($event)">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "ButtonComponent",
  props: {
    type: {
      type: String,
      required: false,
      default: "button",
    },
  },
  methods: {
    click(e) {
      this.$emit("click", e);
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
