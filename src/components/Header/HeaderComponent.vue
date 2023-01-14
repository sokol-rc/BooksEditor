<template>
  <header>
    <div class="layout-container">
      <div class="header">
        <div class="header__logo">Олнайн библиотека</div>
        <div class="header__controls">
          <ButtonComponent
            class-name="set-data button button--outlined"
            type="button"
            @click="setInitialData"
            >Заполнить хранилище
          </ButtonComponent>
          <ButtonComponent
            class-name="set-data button button--outlined"
            type="button"
            @click="clearStorage"
            >Очистить хранилище
          </ButtonComponent>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapActions } from "vuex";
import ButtonComponent from "@/components/ui-components/ButtonComponent/ButtonComponent.vue";

export default {
  name: "HeaderComponent",
  components: { ButtonComponent },
  methods: {
    ...mapActions(["setInitialData", "clearStorage"]),
  },
};
</script>

<style scoped lang="scss">
@import "./HeaderComponent.scss";
</style>
