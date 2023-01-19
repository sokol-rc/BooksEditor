<template>
  <BaseButton class="button-icon" :type="type" :aria-label="ariaLabel" @click="click($event)">
    <slot></slot>
  </BaseButton>
</template>

<script>
import BaseButton from '@/components/ui-components/BaseButton/BaseButton.vue'

export default {
  name: 'ButtonIcon',
  components: { BaseButton },
  props: {
    ariaLabel: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      required: false,
      default: 'button',
    },
  },
  methods: {
    click(e) {
      this.$emit('click', e)
    },
  },
}
</script>
