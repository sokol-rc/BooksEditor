<template>
  <div>
    <ul class="list"
        v-if="books.length > 0"
    >
      <li
          class="list__item list__item--background"
          v-for="book in books"
          :key="book.id"
      >
        <book-card
            :book="book"
            @showConfirmationDialog="showConfirmationDialog(book.id)"
        />
      </li>
    </ul>
    <div class="empty-data"
         v-else
    >
    {{ emptyMessage }}
    </div>
    <div class="list__pagination"
         v-if="pages > 0"
    >
      <nav role="navigation" aria-label="Навигация по страницам">
        <ul class="pagination">
          <li v-for="page in pages" :key="page">
            <button
                :class="[
                page === currentPage ? 'current-page' : '',
                'pagination__item',
              ]"
                @click="changeBooksPage(page)"
            >
              {{ page }}
            </button>
          </li>
        </ul>
      </nav>
    </div>

    <confirmation-dialog
        v-if="isConfirmationDialogVisible"
        @handleReject="removeDialogReject"
        @handleAccept="removeDialogAccept"
    />
  </div>
</template>

<script>
import {bookImageBase64} from "@/assets/bookImage";
import "./BooksList.scss";
import {mapActions, mapGetters} from "vuex";
import BookCard from "@/components/BookCard/BookCard.vue";
import ConfirmationDialog from "@/components/ConfirmationDialog/ConfirmationDialog.vue";

export default {
  name: "BooksList",
  components: {BookCard, ConfirmationDialog},
  data() {
    return {
      name: "BooksList",
      bookImageBase64,
      isConfirmationDialogVisible: false,
      handleBookId: null,
      emptyMessage: 'Ваша библиотека пуста. Пора добавить книг!'
    };
  },
  computed: {
    ...mapGetters({
      books: "getAllBooks",
      pages: "getPagesCount",
      currentPage: "getCurrentBooksPage",
    }),
  },
  methods: {
    ...mapActions(["setInitialData", "getBooksByPage", "removeBookById"]),
    showConfirmationDialog(bookId) {
      this.isConfirmationDialogVisible = true;
      this.handleBookId = bookId;
    },
    removeDialogReject() {
      this.handleBookId = null;
      this.closeConfirmationDialog();
    },
    removeDialogAccept() {
      this.handleBookId = null;
      this.removeBookById(this.handleBookId);
      this.closeConfirmationDialog();
    },
    closeConfirmationDialog() {
      this.isConfirmationDialogVisible = false;
    },
    changeBooksPage(pageNumber) {
      this.getBooksByPage(pageNumber);
    },
  },
};
</script>

<style scoped lang="scss">
@import "./BooksList.scss";
</style>
