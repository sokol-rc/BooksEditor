import LocalStorage from '@/services/storage/LocalStorage'
import { loadingStatuses } from '@/store'
import { SET_BOOK, SET_LOADING_STATUS, SET_SAVE_STATUS } from '@/store/types/mutation.type'
import { GET_BOOK, GET_LOADING_STATUS, GET_SAVE_STATUS } from '@/store/types/getters.type'
import { CHANGE_SAVE_STATUS, FETCH_BOOK, PREPARE_NEW_BOOK, SAVE_BOOK, SAVE_NEW_BOOK } from '@/store/types/actions.type'
import { callStorage } from '@/helpers/callStorage'
import { withImageAlt } from '@/utils/books'

export default {
  namespaced: true,
  state: {
    book: {},
    loadingStatus: null,
    saveStatus: null,
  },
  mutations: {
    [SET_BOOK](state, book) {
      state.book = { ...book }
    },
    [SET_SAVE_STATUS](state, status) {
      state.saveStatus = status
    },
    [SET_LOADING_STATUS](state, status) {
      state.loadingStatus = status
    },
  },
  getters: {
    [GET_BOOK]: (state) => state.book,
    [GET_SAVE_STATUS]: (state) => state.saveStatus,
    [GET_LOADING_STATUS]: (state) => state.loadingStatus,
  },
  actions: {
    [FETCH_BOOK]({ commit }, bookId) {
      const { data } = callStorage({
        key: 'books',
        fetchMethod: 'getById',
        fetchParam: bookId,
        commit,
        statusName: SET_LOADING_STATUS,
        types: [loadingStatuses.loading, loadingStatuses.error],
      })
      commit(SET_BOOK, data)
      commit(SET_LOADING_STATUS, loadingStatuses.ready)
    },
    [PREPARE_NEW_BOOK]({ commit }) {
      commit(SET_LOADING_STATUS, loadingStatuses.ready)
      commit(SET_BOOK, {
        title: '',
        publisher: '',
        circulationDate: '',
        authorFirstName: '',
        authorLastName: '',
        preview: {
          image: '',
          alt: '',
        },
        pages: 0,
        id: 0,
      })
    },
    [SAVE_BOOK]({ dispatch }, book) {
      LocalStorage.change('books', withImageAlt(book))
      dispatch(CHANGE_SAVE_STATUS, { success: true, message: 'Сохранено' })
    },
    [CHANGE_SAVE_STATUS]({ commit }, status) {
      commit(SET_SAVE_STATUS, status)
    },
    [SAVE_NEW_BOOK]({ dispatch, commit }, book) {
      const response = LocalStorage.add('books', withImageAlt(book))
      commit(SET_BOOK, response.data)
      dispatch(CHANGE_SAVE_STATUS, { success: true, message: 'Добавлено' })
    },
  },
}
