<template>
  <button class="button"
          :class="className"
          :type="type"
          @click="click($event)"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    className: {
      type: String,
      required: false,
      default: 'button'
    },
    type: {
      type: String,
      required: false,
      default: 'button'
    }
  },
  methods: {
    click(e) {
      this.$emit('click', e);
    }
  }


}
</script>

<style lang="scss" scoped>

</style>
