<template>
  <div>
    <ContentLoader :status="loadingStatus">
      <template #content>
        <ul class="list" v-if="books.length > 0">
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
        <div class="list__pagination" v-if="pages > 0">
          <nav aria-label="Навигация по страницам">
            <ul class="pagination">
              <li v-for="page in pages" :key="page">
                <button
                  :class="[
                    page === currentPage ? 'current-page' : '',
                    'pagination__item',
                  ]"
                  :disabled="page === currentPage"
                  @click="paginate(page)"
                >
                  {{ page }}
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </template>
    </ContentLoader>

    <confirmation-dialog
      v-if="isConfirmationDialogVisible"
      @handleReject="removeDialogReject"
      @handleAccept="removeDialogAccept"
    />
  </div>
</template>

<script>
import "./BooksList.scss";
import { bookImageBase64 } from "@/assets/bookImage";
import { mapActions, mapGetters } from "vuex";
import BookCard from "@/components/BookCard/BookCard.vue";
import ConfirmationDialog from "@/components/ConfirmationDialog/ConfirmationDialog.vue";
import ContentLoader from "@/components/ContentLoader/ContentLoader.vue";

export default {
  name: "BooksList",
  components: { ContentLoader, BookCard, ConfirmationDialog },
  data() {
    return {
      name: "BooksList",
      bookImageBase64,
      isConfirmationDialogVisible: false,
      handleBookId: null,
    };
  },
  props: ["page"],
  computed: {
    ...mapGetters({
      books: "allBooks",
      pages: "pagesCount",
      currentPage: "currentBooksPage",
      loadingStatus: "loadingStatus",
    }),
  },
  beforeMount() {
    if (!this.loadingStatus && this.loadingStatus !== "LOADING") {
      this.getBooksByPage(this.currentPage);
    }
  },
  created() {
    this.setCurrentPage(Number(this.page) || 1);
  },
  beforeDestroy() {
    this.resetBookState();
  },
  watch: {
    currentPage() {
      this.getBooksByPage(this.currentPage);
    },
    page() {
      this.setCurrentPage(Number(this.page) || 1);
    },
  },
  methods: {
    ...mapActions([
      "setInitialData",
      "getBooksByPage",
      "removeBookById",
      "resetBookState",
      "setCurrentPage",
    ]),
    showConfirmationDialog(bookId) {
      this.isConfirmationDialogVisible = true;
      this.handleBookId = bookId;
    },
    removeDialogReject() {
      this.handleBookId = null;
      this.closeConfirmationDialog();
    },
    removeDialogAccept() {
      this.removeBookById(this.handleBookId);
      this.handleBookId = null;
      this.closeConfirmationDialog();
    },
    closeConfirmationDialog() {
      this.isConfirmationDialogVisible = false;
    },
    paginate(pageTo) {
      this.$router.push({ name: "booksCatalog", params: { page: pageTo } });
    },
  },
};
</script>

<style scoped lang="scss">
@import "./BooksList.scss";
</style>
