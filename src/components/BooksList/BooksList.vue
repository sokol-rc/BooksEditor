<template>
  <div>
    <SearchForm :query="query" @handleSubmit="doSearch" />
    <SortForm @setSortValue="setSortValue" />
    <ContentLoader :status="loadingStatus">
      <template #content>
        <ul class="list" v-if="books.length > 0">
          <li
            class="list__item list__item--background"
            v-for="book in books"
            :key="book.id"
          >
            <BookCard
              :book="book"
              @deleteBook="showConfirmationDialog(book.id)"
              @editBook="goToEditBook(book.id)"
            />
          </li>
        </ul>
        <div class="list__pagination" v-if="pages > 0">
          <nav aria-label="Навигация по страницам">
            <ul class="pagination">
              <li v-for="page in pages" :key="page">
                <BaseButton
                  :class="[
                    page === currentPage ? 'current-page' : '',
                    'pagination__item',
                  ]"
                  :disabled="page === currentPage"
                  @click="paginate(page)"
                  >{{ page }}
                </BaseButton>
              </li>
            </ul>
          </nav>
        </div>
      </template>
    </ContentLoader>

    <ConfirmationDialog
      v-if="isConfirmationDialogVisible"
      @handleReject="removeDialogReject"
      @handleAccept="removeDialogAccept"
    />
  </div>
</template>

<script>
import { bookImageBase64 } from "@/assets/bookImage";
import { mapActions, mapGetters } from "vuex";
import BookCard from "@/components/BookCard/BookCard.vue";
import ConfirmationDialog from "@/components/ConfirmationDialog/ConfirmationDialog.vue";
import ContentLoader from "@/components/ContentLoader/ContentLoader.vue";
import BaseButton from "@/components/ui-components/BaseButton/BaseButton.vue";
import SortForm from "@/components/SortForm/SortForm.vue";
import SearchForm from "@/components/SearchForm/SearchForm.vue";
import {
  GET_BOOKS,
  GET_CURRENT_SORT,
  GET_LOADING_STATUS,
  GET_PAGES_COUNT,
} from "@/store/types/getters.type";
import {
  CHANGE_CURRENT_PAGE,
  CHANGE_CURRENT_SORT,
  CHANGE_SEARCH_QUERY,
  DELETE_BOOK_BY_ID,
  FETCH_BOOKS,
  RESET_BOOKS_STATE,
} from "@/store/types/actions.type";

export default {
  name: "BooksList",
  components: {
    BaseButton,
    ContentLoader,
    BookCard,
    ConfirmationDialog,
    SortForm,
    SearchForm,
  },
  data() {
    return {
      name: "BooksList",
      bookImageBase64,
      isConfirmationDialogVisible: false,
      handleBookId: null,
    };
  },
  props: ["page", "query"],
  computed: {
    ...mapGetters("bookList", {
      books: GET_BOOKS,
      pages: GET_PAGES_COUNT,
      loadingStatus: GET_LOADING_STATUS,
      currentSort: GET_CURRENT_SORT,
    }),
    currentPage() {
      return parseFloat(this.page) || 1;
    },
  },
  created() {
    this.CHANGE_SEARCH_QUERY(this.query);
    this.FETCH_BOOKS({ pageNumber: this.currentPage });
  },
  beforeDestroy() {
    this.RESET_BOOKS_STATE();
  },
  watch: {
    currentPage(newPage) {
      this.CHANGE_CURRENT_PAGE(newPage);
      this.FETCH_BOOKS({ pageNumber: newPage });
    },
    query(newQuery) {
      this.CHANGE_SEARCH_QUERY(newQuery);
      this.FETCH_BOOKS();
    },
  },
  methods: {
    ...mapActions("bookList", [
      FETCH_BOOKS,
      DELETE_BOOK_BY_ID,
      RESET_BOOKS_STATE,
      CHANGE_CURRENT_SORT,
      CHANGE_CURRENT_PAGE,
      CHANGE_SEARCH_QUERY,
    ]),
    showConfirmationDialog(bookId) {
      this.isConfirmationDialogVisible = true;
      this.handleBookId = bookId;
    },
    goToEditBook(bookId) {
      console.log(bookId);
      this.$router.push({
        name: "editBookView",
        params: { bookId: bookId },
      });
    },
    doSearch(query) {
      if (query !== "") {
        this.CHANGE_SEARCH_QUERY(query);
        this.$router.push({ name: "search", query: { q: query } });
      }
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
    setSortValue(sortValue) {
      this.CHANGE_CURRENT_SORT(sortValue);
      this.FETCH_BOOKS({ pageNumber: this.currentPage });
    },

    paginate(pageTo) {
      this.$router.push({ name: "booksCatalog", params: { page: pageTo } });
    },
  },
};
</script>

<style scoped lang="scss">
$cardBackgroundColor: #fff;
$shadowColor: rgba(0, 0, 0, 0.2);
$shadow: 0 3px 1px -2px $shadowColor, 0 2px 2px 0 rgba(0, 0, 0, 0.14),
  0 1px 5px 0 rgba(0, 0, 0, 0.12);
$paginationActivePageBackgroundColor: #1867c0;
$paginationActivePageColor: #fff;

.list {
  grid-gap: 10px;
  display: grid;
  grid-template-columns: 1fr;
  margin-bottom: 30px;

  &__item--background {
    background-color: $cardBackgroundColor;
    border-radius: 8px;
    box-shadow: $shadow;
  }
}

.pagination {
  align-items: center;
  display: flex;
  list-style-type: none;
  justify-content: center;
  margin: 0;
  max-width: 100%;
  width: 100%;

  &__item {
    border-radius: 8px;
    font-size: 18px;
    height: 34px;
    margin: 4px;
    min-width: 34px;
    padding: 0 5px;
    box-shadow: $shadow;
    text-align: center;
    background: #fff;
    border-style: none;
    cursor: pointer;
  }
}

.current-page {
  color: $paginationActivePageColor;
  background-color: $paginationActivePageBackgroundColor;
  border-color: $paginationActivePageBackgroundColor;
}
</style>
