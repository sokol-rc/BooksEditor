import LocalStorage from "@/services/storage/LocalStorage";
import { loadingStatuses } from "@/store";

const mutationTypes = {
  SET_BOOK: "SET_BOOK",
  SET_LOADING_STATUS: "SET_LOADING_STATUS",
};
const gettersTypes = {
  GET_BOOK: "GET_BOOK",
};
const actionTypes = {
  FETCH_BOOK: "FETCH_BOOK",
  SAVE_BOOK: "SAVE_BOOK",
  SET_IMAGE: "SET_IMAGE",
};
export default {
  namespaced: true,
  state: {
    book: {},
    loadingStatus: null,
  },
  mutations: {
    [mutationTypes.SET_BOOK](state, book) {
      console.log(book);
      state.book = { ...book };
    },
  },
  getters: {
    [gettersTypes.GET_BOOK]: (state) => state.book,
  },
  actions: {
    [actionTypes.FETCH_BOOK]({ commit }, bookId) {
      commit(mutationTypes.SET_LOADING_STATUS, loadingStatuses.loading, {
        root: true,
      });

      const response = LocalStorage.getById("books", bookId);

      if (!response.success) {
        commit(mutationTypes.SET_LOADING_STATUS, loadingStatuses.error);
        return;
      }

      commit(mutationTypes.SET_BOOK, response.data);
    },
    [actionTypes.SAVE_BOOK]({ commit }, book) {
      LocalStorage.change("books", book);
    },
    [actionTypes.SET_IMAGE]({ commit, state }, image) {
      commit(mutationTypes.SET_BOOK, {
        ...state.book,
        preview: { image, alt: `Обложка ${state.book.title}` },
      });
    },
  },
};
