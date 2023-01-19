import LocalStorage from '@/services/storage/LocalStorage'
import { loadingStatuses } from '@/store'
import { SET_BOOK, SET_LOADING_STATUS, SET_SAVE_STATUS } from '@/store/types/mutation.type'
import { GET_BOOK, GET_LOADING_STATUS, GET_SAVE_STATUS } from '@/store/types/getters.type'
import { CHANGE_SAVE_STATUS, FETCH_BOOK, PREPARE_NEW_BOOK, SAVE_BOOK, SAVE_NEW_BOOK } from '@/store/types/actions.type'
import { callStorage } from '@/helpers/callStorage'
import { getLastId, withImageAlt, withLastId } from '@/utils/books'

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
      try {
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
      } catch (e) {
        commit(SET_LOADING_STATUS, loadingStatuses.error)
      }
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
    [SAVE_BOOK]({ dispatch, commit }, book) {
      try {
        LocalStorage.change('books', withImageAlt(book))
        dispatch(CHANGE_SAVE_STATUS, { success: true, message: 'Сохранено' })
      } catch (e) {
        commit(SET_LOADING_STATUS, loadingStatuses.error)
      }
    },
    [CHANGE_SAVE_STATUS]({ commit }, status) {
      commit(SET_SAVE_STATUS, status)
    },
    [SAVE_NEW_BOOK]({ dispatch, commit }, book) {
      try {
        const { data } = callStorage({
          key: 'books',
          fetchMethod: 'getAll',
          fetchParam: {},
          commit,
          statusName: SET_LOADING_STATUS,
          types: [loadingStatuses.loading, loadingStatuses.error],
        })
        const { books } = data

        const lastId = getLastId(books)
        const altImageTemplate = `Обложка книги «${book.title}»`

        let prepareBook = withLastId(book, lastId + 1)
        prepareBook = withImageAlt(prepareBook, altImageTemplate)

        const response = LocalStorage.add('books', prepareBook)
        commit(SET_BOOK, response.data)
        commit(SET_LOADING_STATUS, loadingStatuses.ready)
        dispatch(CHANGE_SAVE_STATUS, { success: true, message: 'Добавлено' })
      } catch (e) {
        commit(SET_LOADING_STATUS, loadingStatuses.error)
      }
    },
  },
}
