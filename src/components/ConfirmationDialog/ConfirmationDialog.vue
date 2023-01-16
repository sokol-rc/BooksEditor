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
$modalColor: rgb(25, 118, 210);
$cardBackgroundColor: #fff;
$cardColor: #000;
$modalShadowColor: rgba(0, 0, 0, 0.5);
$shadow: 0 11px 15px -7px rgba(0, 0, 0, 0.2),
  0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.12);

.dialog-shadow {
  display: flex;
  background-color: $modalShadowColor;
  align-items: center;
  height: 100%;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 6;
}

.dialog {
  border-radius: 4px;
  margin: 24px;
  overflow-y: auto;
  pointer-events: auto;
  width: 100%;
  z-index: inherit;
  outline: none;
  box-shadow: $shadow;
}

.card {
  width: 100%;
  border-radius: 4px;
  background-color: $cardBackgroundColor;
  color: $cardColor;
  box-shadow: $shadow;

  &__title {
    font-size: 20px;
    font-weight: 500;
    padding: 16px 24px 10px;
    align-items: center;
    display: flex;
  }

  &__actions {
    display: flex;
    align-items: center;
    padding: 8px;
    justify-content: flex-end;
    flex: 0 0 auto;
  }
}

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: transparent;
  outline: 0;
  border: 0 none;
  margin: 0;
  cursor: pointer;
  user-select: none;
  vertical-align: middle;
  appearance: none;
  text-decoration: none;
  text-transform: uppercase;
  min-width: 64px;
  padding: 6px 8px;
  border-radius: 4px;
  color: $modalColor;
}

.button::before {
  background-color: currentColor;
  bottom: 0;
  content: "";
  left: 0;
  opacity: 0;
  pointer-events: none;
  position: absolute;
  right: 0;
  top: 0;
  transition: opacity 0.2s cubic-bezier(0.4, 0, 0.6, 1);
}

.button:hover::before {
  opacity: 0.1;
}
</style>
