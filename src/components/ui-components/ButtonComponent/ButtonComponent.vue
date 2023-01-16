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
.button {
  height: 36px;
  min-width: 64px;
  padding: 0 16px;
  color: #3f51b5;
  background-color: transparent;
  border-radius: 4px;
  outline: 0;
  text-decoration: none;
  text-transform: uppercase;
  vertical-align: middle;
  cursor: pointer;
  position: relative;
  border: thin solid;
}

.button::before {
  content: "";
  background-color: currentColor;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0;
  transition: opacity 0.2s cubic-bezier(0.4, 0, 0.6, 1);
}

.button:hover::before {
  opacity: 0.1;
}
</style>
