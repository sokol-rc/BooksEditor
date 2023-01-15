<template>
  <div>
<SortForm/>
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
                <ButtonComponent
                    :class="[page === currentPage ? 'current-page' : '','pagination__item',]"
                    :disabled="page === currentPage"
                    @click="paginate(page)"
                >{{ page }}
                </ButtonComponent>
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
import {bookImageBase64} from "@/assets/bookImage";
import {mapActions, mapGetters} from "vuex";
import BookCard from "@/components/BookCard/BookCard.vue";
import ConfirmationDialog from "@/components/ConfirmationDialog/ConfirmationDialog.vue";
import ContentLoader from "@/components/ContentLoader/ContentLoader.vue";
import ButtonComponent from "@/components/ui-components/ButtonComponent/ButtonComponent.vue";
import SortForm from "@/components/SortForm/SortForm.vue";

export default {
  name: "BooksList",
  components: {ButtonComponent, ContentLoader, BookCard, ConfirmationDialog, SortForm},
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
      loadingStatus: "loadingStatus",
    }),
    currentPage() {
      return parseFloat(this.page) || 1;
    }
  },
  created() {
    this.GET_BOOKS_BY_PAGE(Number(this.currentPage));
  },
  beforeDestroy() {
    this.RESET_BOOKS_STATE();
  },
  watch: {
    currentPage() {
      this.GET_BOOKS_BY_PAGE(Number(this.currentPage));
    },
  },
  methods: {
    ...mapActions([
      "GET_BOOKS_BY_PAGE",
      "DELETE_BOOK_BY_ID",
      "RESET_BOOKS_STATE",
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
      this.DELETE_BOOK_BY_ID(this.handleBookId);
      this.handleBookId = null;
      this.closeConfirmationDialog();
    },
    closeConfirmationDialog() {
      this.isConfirmationDialogVisible = false;
    },
    paginate(pageTo) {
      this.$router.push({name: "booksCatalog", params: {page: pageTo}});
    },
  },
};
</script>

<style scoped lang="scss">
@import "./BooksList.scss";
</style>
