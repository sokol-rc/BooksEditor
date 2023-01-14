<template>
  <div>
    <slot v-if="status === $options.loadingStatuses.loading" name="loading">
      <div class="loader">Загрузка...</div>
    </slot>
    <slot v-else-if="status === $options.loadingStatuses.ready" name="content"></slot>
    <slot v-else-if="status === $options.loadingStatuses.empty" name="empty">
      Ваша библиотека пуста. Пора добавить книг!
    </slot>
    <slot v-else-if="status === $options.loadingStatuses.error" name="error">
      Произошла ошибка при загрузке данных.
    </slot>
  </div>
</template>

<script>
import {loadingStatuses} from "@/store";

export default {
  name: 'ContentLoader',
  props: {
    status: {
      type: String,
      required: true,
      validator(value) {
        return Object.values(loadingStatuses).includes(value);
      }
    }
  },
  loadingStatuses
}
</script>

<style lang="scss" scoped>

</style>
