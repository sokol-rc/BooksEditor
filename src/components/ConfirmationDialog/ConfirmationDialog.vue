<template>
  <div class="dialog-shadow" @click="handleReject">
    <div class="dialog" @click.stop style="max-width: 290px" tabindex="0">
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
  mounted() {
    document.addEventListener("keydown", this.handleEscape);
  },
  beforeDestroy() {
    document.removeEventListener("keydown", this.handleEscape);
  },
  methods: {
    handleReject() {
      this.$emit("handleReject");
    },
    handleAccept() {
      this.$emit("handleAccept");
    },
    handleEscape(e) {
      if (e.code === "Escape") {
        this.handleReject();
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "./ConfirmationDialog.scss";
</style>
