<template>
  <header>
    <div class="layout-container">
      <div class="header">
        <router-link to="/">
          <div class="header__logo">Олнайн библиотека</div>
        </router-link>

        <div class="header__controls">
          <BaseButton class="set-data button button--outlined" type="button" border @click="SET_INITIAL_DATA"
            >Заполнить хранилище
          </BaseButton>
          <BaseButton class="set-data button button--outlined" type="button" border @click="CLEAR_STORAGE"
            >Очистить хранилище
          </BaseButton>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapActions } from 'vuex'
import BaseButton from '@/components/ui-components/BaseButton/BaseButton.vue'
import { CLEAR_STORAGE, SET_INITIAL_DATA } from '@/store/types/actions.type'

export default {
  name: 'HeaderComponent',
  components: { BaseButton },
  methods: {
    ...mapActions('bookList', [SET_INITIAL_DATA, CLEAR_STORAGE]),
  },
}
</script>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;

  &__controls {
  }
}

.button + .button {
  margin-left: 16px;
}
</style>
