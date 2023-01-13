<template>
  <div class="dialog-shadow">
    <div
      class="dialog"
      style="transform-origin: center center 0; max-width: 290px"
      tabindex="0"
    >
      <div class="card">
        <div class="card__title">Удалить эту книгу?</div>
        <slot></slot>
        <div class="card__actions">
          <button
            type="button"
            class="card__button button"
            @click="handleReject"
          >
            Отмена
          </button>
          <button
            type="button"
            class="card__button button"
            @click="handleAccept"
          >
            Подтверждаю
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ConfirmationDialog",
  methods: {
    handleReject() {
      this.$emit("handleReject");
    },
    handleAccept() {
      this.$emit("handleAccept");
    },
  },
};
</script>

<style scoped lang="scss">
@import "./ConfirmationDialog.scss";
</style>
