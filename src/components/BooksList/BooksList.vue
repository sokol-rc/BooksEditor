<template>
  <div>
    <SearchForm />
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
              @showConfirmationDialog="showConfirmationDialog(book.id)"
            />
          </li>
        </ul>
        <div class="list__pagination" v-if="pages > 0">
          <nav aria-label="Навигация по страницам">
            <ul class="pagination">
              <li v-for="page in pages" :key="page">
                <ButtonComponent
                  :class="[
                    page === currentPage ? 'current-page' : '',
                    'pagination__item',
                  ]"
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
import ButtonComponent from "@/components/ui-components/ButtonComponent/ButtonComponent.vue";
import SortForm from "@/components/SortForm/SortForm.vue";
import SearchForm from "@/components/SearchForm/SearchForm.vue";

export default {
  name: "BooksList",
  components: {
    ButtonComponent,
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
  props: ["page"],
  computed: {
    ...mapGetters({
      books: "allBooks",
      pages: "pagesCount",
      loadingStatus: "loadingStatus",
      currentSort: "getCurrentSort",
    }),
    currentPage() {
      return parseFloat(this.page) || 1;
    },
  },
  created() {
    //
    console.log(this.$route.query.q);
    this.CHANGE_SEARCH_QUERY(this.$route.query.q);
    this.GET_BOOKS({ pageNumber: this.currentPage });
  },
  beforeDestroy() {
    this.RESET_BOOKS_STATE();
  },
  watch: {
    currentPage(newPage) {
      this.CHANGE_CURRENT_PAGE(newPage);
      this.GET_BOOKS({ pageNumber: newPage });
    },
  },
  methods: {
    ...mapActions([
      "GET_BOOKS",
      "DELETE_BOOK_BY_ID",
      "RESET_BOOKS_STATE",
      "CHANGE_CURRENT_SORT",
      "CHANGE_CURRENT_PAGE",
      "CHANGE_SEARCH_QUERY",
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
    setSortValue(sortValue) {
      this.CHANGE_CURRENT_SORT(sortValue);
      this.GET_BOOKS({ pageNumber: this.currentPage });
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
