<template>
  <button :class="['button', border ? 'button--border' : '']" :type="type" @click="click($event)">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    type: {
      type: String,
      required: false,
      default: 'button',
    },
    border: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    click(e) {
      this.$emit('click', e)
    },
  },
}
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
  border: none;
}

.button--border {
  border: thin solid;
}

.button::before {
  content: '';
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
.button:disabled {
  color: rgba(0, 0, 0, 0.26);
  box-shadow: none;
  background-color: rgba(0, 0, 0, 0.12);
  pointer-events: none;
  cursor: default;
}
</style>
