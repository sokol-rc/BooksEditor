<template>
  <div>
    <ul class="list">
      <li
          class="list__item list__item--background"
          v-for="book in getAllBooks"
          :key="book.id"
      >
        <book-card :book="book" @removeBookById="removeBookById(book.id)"/>
      </li>
    </ul>
  </div>
</template>

<script>
import {bookImageBase64} from "@/assets/bookImage";
import "./BooksList.scss";
import {mapGetters, mapMutations} from "vuex";
import BookCard from "@/components/BookCard/BookCard.vue";

export default {
  name: 'BooksList',
  components: {BookCard},
  data() {
    return {
      name: "BooksList",
      bookImageBase64,
    };
  },
  computed: {
    ...mapGetters(["getAllBooks"]),
  },
  methods: {
    ...mapMutations([
      'removeBookById',
    ]),
  }
}
;
</script>

<style scoped lang="scss">
@import "./BooksList.scss";
</style>
