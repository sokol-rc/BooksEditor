<template>
  <ButtonComponent
    class="button-icon"
    :type="type"
    :aria-label="ariaLabel"
    @click="click($event)"
  >
    <slot></slot>
  </ButtonComponent>
</template>

<script>
import ButtonComponent from "@/components/ui-components/ButtonComponent/ButtonComponent.vue";

export default {
  name: "ButtonIcon",
  components: { ButtonComponent },
  props: {
    ariaLabel: {
      type: String,
    },
    type: {
      type: String,
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

<style scoped lang="scss">
@import "ButtonIcon.scss";
</style>
