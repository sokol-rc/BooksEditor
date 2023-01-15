<template>
  <header>
    <div class="layout-container">
      <div class="header">
        <div class="header__logo">Олнайн библиотека</div>
        <div class="header__controls">
          <ButtonComponent
            class="set-data button button--outlined"
            type="button"
            @click="SET_INITIAL_DATA"
            >Заполнить хранилище
          </ButtonComponent>
          <ButtonComponent
            class="set-data button button--outlined"
            type="button"
            @click="CLEAR_STORAGE"
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
    ...mapActions(["SET_INITIAL_DATA", "CLEAR_STORAGE"]),
  },
};
</script>

<style scoped lang="scss">
@import "./HeaderComponent.scss";
</style>
