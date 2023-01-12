<template>
  <div>
    <ul class="list">
      <li
          class="list__item list__item--background"
          v-for="book in getAllBooks"
          :key="book.id"
      >
        <book-card :book="book"/>
      </li>
    </ul>
  </div>
</template>

<script>
import {bookImageBase64} from "@/assets/bookImage";
import "./BooksList.scss";
import {mapGetters} from "vuex";
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
};
</script>

<style scoped lang="scss">
@import "./BooksList.scss";
</style>
