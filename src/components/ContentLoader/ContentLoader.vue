<template>
  <div>
    <slot v-if="status === loadingStatuses.loading" name="loading">
      <div class="loader">Загрузка...</div>
    </slot>
    <slot v-else-if="status === loadingStatuses.ready" name="content"></slot>
    <slot v-else-if="status === loadingStatuses.empty" name="empty"> Ваша библиотека пуста. Пора добавить книг! </slot>
    <slot v-else-if="status === loadingStatuses.searchResultsEmpty" name="searchResultsEmpty"> Не найдено. </slot>
    <slot v-else-if="status === loadingStatuses.error" name="error"> Произошла ошибка при загрузке данных. </slot>
  </div>
</template>

<script>
import { loadingStatuses } from '@/store'

export default {
  name: 'ContentLoader',
  props: {
    status: {
      type: String,
      required: true,
      validator(value) {
        return Object.values(loadingStatuses).includes(value)
      },
    },
  },
  data() {
    return {
      loadingStatuses,
    }
  },
}
</script>

<style lang="scss" scoped></style>
