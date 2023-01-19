import {
  RESET_BOOKS_STATE,
  SET_BOOKS,
  SET_BOOKS_COUNT,
  SET_CURRENT_PAGE,
  SET_CURRENT_SORT,
  SET_LOADING_STATUS,
  SET_SEARCH_QUERY,
} from '@/store/types/mutation.type'
import LocalStorage from '@/services/storage/LocalStorage'
import initialData from '@/services/storage/initialData'
import { loadingStatuses } from '@/store'
import { searchBooks, sortBooks } from '@/utils/books'
import {
  CHANGE_CURRENT_PAGE,
  CHANGE_CURRENT_SORT,
  CHANGE_SEARCH_QUERY,
  CLEAR_STORAGE,
  DELETE_BOOK_BY_ID,
  FETCH_BOOKS,
  SET_INITIAL_DATA,
} from '@/store/types/actions.type'
import {
  GET_BOOK_BY_ID,
  GET_BOOKS,
  GET_CURRENT_SORT,
  GET_LOADING_STATUS,
  GET_PAGES_COUNT,
  GET_SEARCH_QUERY,
  GET_SORT_RULES,
} from '@/store/types/getters.type'
import { callStorage } from '@/helpers/callStorage'

export const getInitialState = () => {
  return {
    books: [],
    booksCount: 0,
    booksPerPage: 4,
    currentPage: 1,
    currentSort: 'title:asc',
    searchQuery: '',
    sortRules: [
      { key: 'title:asc', title: 'По заголовку А-Я' },
      { key: 'title:desc', title: 'По заголовку Я-А' },
      { key: 'publishedYear:asc', title: 'По году публикации Стрелочка вверх' },
      { key: 'publishedYear:desc', title: 'По году публикации Стрелочка вниз' },
    ],
    loadingStatus: null,
  }
}

const initialState = getInitialState()

export default {
  namespaced: true,
  state: initialState,
  mutations: {
    [SET_BOOKS](state, books) {
      state.books = books
    },
    [SET_BOOKS_COUNT](state, booksCount) {
      state.booksCount = booksCount
    },
    [SET_LOADING_STATUS](state, status) {
      state.loadingStatus = status
    },
    [RESET_BOOKS_STATE](state) {
      Object.assign(state, getInitialState())
    },
    [SET_CURRENT_SORT](state, newSort) {
      state.currentSort = newSort
    },
    [SET_CURRENT_PAGE](state, newPage) {
      state.currentPage = newPage
    },
    [SET_SEARCH_QUERY](state, newQuery) {
      state.searchQuery = newQuery
    },
  },
  getters: {
    [GET_BOOKS]: (state) => state.books,
    [GET_BOOK_BY_ID]: (state) => (bookId) => state.books.find((b) => b.id === bookId),
    [GET_LOADING_STATUS]: (state) => state.loadingStatus,
    [GET_PAGES_COUNT]: (state) => {
      if (state.booksCount <= state.booksPerPage) {
        return 0
      }
      return Math.ceil(state.booksCount / state.booksPerPage)
    },
    [GET_SORT_RULES]: (state) => state.sortRules,
    [GET_CURRENT_SORT]: (state) => state.currentSort,
    [GET_SEARCH_QUERY]: (state) => state.searchQuery,
  },
  actions: {
    [SET_INITIAL_DATA]({ dispatch }) {
      LocalStorage.set('books', initialData)
      dispatch(FETCH_BOOKS, { pageNumber: 1 })
    },
    [CLEAR_STORAGE]({ dispatch }) {
      LocalStorage.clear()
      dispatch(RESET_BOOKS_STATE)
    },
    [RESET_BOOKS_STATE]({ commit }) {
      commit(RESET_BOOKS_STATE)
      commit(SET_LOADING_STATUS, loadingStatuses.error)
    },
    [FETCH_BOOKS]({ commit, state }, { pageNumber } = { pageNumber: 1 }) {
      const { data } = callStorage({
        key: 'books',
        fetchMethod: 'getAll',
        fetchParam: {},
        commit,
        statusName: SET_LOADING_STATUS,
        types: [loadingStatuses.loading, loadingStatuses.error],
      })
      if (state.loadingStatus === loadingStatuses.error) {
        return
      }

      const start = (pageNumber - 1) * state.booksPerPage
      const end = start + state.booksPerPage
      let { books } = data

      if (state.searchQuery !== '') {
        books = searchBooks(books, state.searchQuery)
      }

      const [sortKey, sortDir] = state.currentSort.split(':')
      books = sortBooks(books, sortKey, sortDir)

      if (state.searchQuery !== '' && !books.length) {
        commit(SET_LOADING_STATUS, loadingStatuses.searchResultsEmpty)
      } else if (!books.length) {
        commit(SET_LOADING_STATUS, loadingStatuses.empty)
      } else {
        commit(SET_LOADING_STATUS, loadingStatuses.ready)
      }

      commit(SET_BOOKS, books.slice(start, end))
      commit(SET_BOOKS_COUNT, books.length)
    },
    [DELETE_BOOK_BY_ID]({ dispatch, commit, state }, bookId) {
      let { data } = callStorage({
        key: 'books',
        fetchMethod: 'getAll',
        fetchParams: {},
        commit,
        statusName: SET_LOADING_STATUS,
        types: [loadingStatuses.loading, loadingStatuses.error],
      })
      const newBooks = data.books.filter((b) => b.id !== bookId)

      LocalStorage.set('books', { books: newBooks })

      dispatch(FETCH_BOOKS, { pageNumber: state.currentPage })
    },
    [CHANGE_CURRENT_SORT]({ commit }, newSort) {
      commit(SET_CURRENT_SORT, newSort)
    },
    [CHANGE_CURRENT_PAGE]({ commit }, newPage) {
      commit(SET_CURRENT_PAGE, newPage)
    },
    [CHANGE_SEARCH_QUERY]({ commit }, newQuery) {
      const queryString = newQuery || ''
      commit(SET_SEARCH_QUERY, queryString)
    },
  },
}
