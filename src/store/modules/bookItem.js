import LocalStorage from "@/services/storage/LocalStorage";
import { loadingStatuses } from "@/store";
import { SET_BOOK, SET_LOADING_STATUS } from "@/store/types/mutation.type";
import {
  GET_BOOK,
  GET_EDIT_STATUS,
  GET_LOADING_STATUS,
  SET_SAVE_STATUS,
} from "@/store/types/getters.type";
import { FETCH_BOOK, SAVE_BOOK, SET_IMAGE } from "@/store/types/actions.type";

export default {
  namespaced: true,
  state: {
    book: {},
    loadingStatus: null,
    editStatus: null,
  },
  mutations: {
    [SET_BOOK](state, book) {
      state.book = { ...book };
    },
    [SET_SAVE_STATUS](state, status) {
      state.editStatus = status;
    },
    [SET_LOADING_STATUS](state, status) {
      state.loadingStatus = status;
    },
  },
  getters: {
    [GET_BOOK]: (state) => state.book,
    [GET_EDIT_STATUS]: (state) => state.editStatus,
    [GET_LOADING_STATUS]: (state) => state.loadingStatus,
  },
  actions: {
    [FETCH_BOOK]({ commit }, bookId) {
      commit(SET_LOADING_STATUS, loadingStatuses.loading);

      const response = LocalStorage.getById("books", bookId);

      if (!response.success) {
        commit(SET_LOADING_STATUS, loadingStatuses.error);
        return;
      }

      commit(SET_BOOK, response.data);
      commit(SET_LOADING_STATUS, loadingStatuses.ready);
    },
    [SAVE_BOOK]({ commit }, book) {
      LocalStorage.change("books", book);
      commit(SET_SAVE_STATUS, { success: true, message: "сохранено" });
    },
    [SET_IMAGE]({ commit, state }, image) {
      commit(SET_BOOK, {
        ...state.book,
        preview: { image, alt: `Обложка ${state.book.title}` },
      });
    },
  },
};
