<template>
  <header>
    <div class="layout-container">
      <div class="header">
        <div class="header__logo">Олнайн библиотека</div>
        <div class="header__controls">
          <button class="set-data button button--outlined" type="button" @click="setInitialData">Добавить много книг</button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: 'Header',
  methods: {
    ...mapActions(["setInitialData"]),
  }
}
</script>

<style scoped lang="scss">
@import "./Header.scss";
</style>
