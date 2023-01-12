<template>
  <div class="book">
    <div class="book__image">
      <img
          class="image-responsive"
          :src="book.preview.image"
          :alt="book.preview.alt"
      />
    </div>
    <div class="book__info">
      <h2 class="book__title">{{ book.title }}</h2>
      <div class="book__author">{{ getAuthorsByBookId(book.id) }}</div>
    </div>
    <div class="book__info">
      <ul class="info">
        <li class="info__item" v-if="book.publisher">
          Издательство: {{ book.publisher }}
        </li>
        <li class="info__item-year" v-if="book.publishedYear">
          Год публикации: {{ book.publishedYear }}
        </li>
        <li class="info__item" v-if="book.circulationDate">
          Выход в тираж: {{ book.circulationDate }}
        </li>
        <li class="info__item" v-if="book.pages">
          Страниц: {{ book.pages }}
        </li>
      </ul>
    </div>
    <div class="book__controls">
      <button class="edit">Редактировать</button>
      <button class="remove"
              @click="removeBookById"
      >Удалить</button>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: 'BookCard',
  props: {
    book: Object
  },
  computed: {
    ...mapGetters(["getAuthorsByBookId"]),
  },
  methods: {
    removeBookById() {
      this.$emit('removeBookById')
    }
  }
}
</script>

<style scoped lang="scss">
@import "./BookCard.scss";
</style>
