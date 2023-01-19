<template>
  <div>
    <section class="search-panel card-background">
      <div class="card-background__wrapper card-background__wrapper--background">
        <SearchForm :query="query" class="search-form" @handleSubmit="doSearch" />
        <BaseButton class="add-button button--outlined" type="button" border @click="goToCreateNewBook"
          >Добавить книгу
        </BaseButton>
      </div>
    </section>
    <section class="sort-panel card-background">
      <div class="card-background__wrapper card-background__wrapper--background">
        <SortForm @setSortValue="setSortValue" />
      </div>
    </section>

    <ContentLoader :status="loadingStatus">
      <template #content>
        <BooksList :books="books"></BooksList>
        <div class="list__pagination" v-if="pages > 0">
          <nav aria-label="Навигация по страницам">
            <ul class="pagination">
              <li v-for="page in pages" :key="page">
                <BaseButton
                  :class="[page === currentPage ? 'current-page' : '', 'pagination__item']"
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
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ContentLoader from '@/components/ContentLoader/ContentLoader.vue'
import BaseButton from '@/components/ui-components/BaseButton/BaseButton.vue'
import SortForm from '@/components/SortForm/SortForm.vue'
import SearchForm from '@/components/SearchForm/SearchForm.vue'
import BooksList from '@/components/BooksList/BooksList.vue'
import { GET_BOOKS, GET_CURRENT_SORT, GET_LOADING_STATUS, GET_PAGES_COUNT } from '@/store/types/getters.type'
import {
  CHANGE_CURRENT_PAGE,
  CHANGE_CURRENT_SORT,
  CHANGE_SEARCH_QUERY,
  DELETE_BOOK_BY_ID,
  FETCH_BOOKS,
  RESET_BOOKS_STATE,
} from '@/store/types/actions.type'

export default {
  name: 'CatalogView',
  components: {
    BaseButton,
    ContentLoader,
    SortForm,
    SearchForm,
    BooksList,
  },

  props: ['page', 'query'],
  computed: {
    ...mapGetters('bookList', {
      books: GET_BOOKS,
      pages: GET_PAGES_COUNT,
      loadingStatus: GET_LOADING_STATUS,
      currentSort: GET_CURRENT_SORT,
    }),
    currentPage() {
      return parseFloat(this.page) || 1
    },
  },
  created() {
    this.CHANGE_SEARCH_QUERY(this.query)
    this.FETCH_BOOKS({ pageNumber: this.currentPage })
  },
  beforeDestroy() {
    this.RESET_BOOKS_STATE()
  },
  watch: {
    currentPage(newPage) {
      this.CHANGE_CURRENT_PAGE(newPage)
      this.FETCH_BOOKS({ pageNumber: newPage })
    },
    query(newQuery) {
      this.CHANGE_SEARCH_QUERY(newQuery)
      this.FETCH_BOOKS()
    },
  },
  methods: {
    ...mapActions('bookList', [
      FETCH_BOOKS,
      CHANGE_SEARCH_QUERY,
      CHANGE_CURRENT_PAGE,
      RESET_BOOKS_STATE,
      DELETE_BOOK_BY_ID,
      CHANGE_CURRENT_SORT,
    ]),
    showConfirmationDialog(bookId) {
      this.isConfirmationDialogVisible = true
      this.handleBookId = bookId
    },
    goToEditBook(bookId) {
      this.$router.push({
        name: 'editBookView',
        params: { bookId: bookId },
      })
    },
    doSearch(query) {
      if (query !== '') {
        this.CHANGE_SEARCH_QUERY(query)
        this.$router.push({ name: 'search', query: { q: query } })
      }
    },
    removeDialogReject() {
      this.handleBookId = null
      this.closeConfirmationDialog()
    },
    removeDialogAccept() {
      this.DELETE_BOOK_BY_ID(this.handleBookId)
      this.handleBookId = null
      this.closeConfirmationDialog()
    },
    closeConfirmationDialog() {
      this.isConfirmationDialogVisible = false
    },
    setSortValue(sortValue) {
      this.CHANGE_CURRENT_SORT(sortValue)
      this.FETCH_BOOKS({ pageNumber: this.currentPage })
    },
    goToCreateNewBook() {
      this.$router.push({
        name: 'createBookView',
      })
    },
    paginate(pageTo) {
      if (this.query) {
        this.$router.push({ name: 'search', query: { q: this.query, page: pageTo } })
      } else {
        this.$router.push({ name: 'booksCatalog', params: { page: pageTo } })
      }
    },
  },
}
</script>

<style scoped lang="scss">
$cardBackgroundColor: #fff;
$shadowColor: rgba(0, 0, 0, 0.2);
$shadow: 0 3px 1px -2px $shadowColor, 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
$paginationActivePageBackgroundColor: #1867c0;
$paginationActivePageColor: #fff;

.card-background {
  margin-bottom: 10px;

  &__wrapper {
    display: flex;
    padding: 16px;
  }

  &__wrapper--background {
    background-color: $cardBackgroundColor;
    border-radius: 8px;
    box-shadow: $shadow;
  }
}

.search-form {
  flex: 1 0 auto;
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

.add-button {
  align-self: end;
}

.current-page {
  color: $paginationActivePageColor;
  background-color: $paginationActivePageBackgroundColor;
  border-color: $paginationActivePageBackgroundColor;
}
</style>
