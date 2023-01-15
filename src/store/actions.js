import LocalStorage from "@/services/storage/LocalStorage";
import initialData from "@/services/storage/initialData";
import { loadingStatuses } from "@/store/index";
import { mutationTypes } from "@/store/mutations";
import { sortBooks } from "@/utils/sort";

const actionTypes = {
  SET_INITIAL_DATA: "SET_INITIAL_DATA",
  CLEAR_STORAGE: "CLEAR_STORAGE",
  RESET_BOOKS_STATE: "RESET_BOOKS_STATE",
  GET_BOOKS: "GET_BOOKS",
  DELETE_BOOK_BY_ID: "DELETE_BOOK_BY_ID",
  CHANGE_CURRENT_SORT: "CHANGE_CURRENT_SORT",
  CHANGE_CURRENT_PAGE: "CHANGE_CURRENT_PAGE",
};

const actions = {
  [actionTypes.SET_INITIAL_DATA]({ dispatch }) {
    LocalStorage.set("books", JSON.stringify(initialData));
    dispatch(actionTypes.GET_BOOKS, { pageNumber: 1 });
  },
  [actionTypes.CLEAR_STORAGE]({ dispatch }) {
    LocalStorage.clear();
    dispatch(actionTypes.RESET_BOOKS_STATE);
  },
  [actionTypes.RESET_BOOKS_STATE]({ commit }) {
    commit(mutationTypes.RESET_BOOKS_STATE);
    commit(mutationTypes.SET_LOADING_STATUS, loadingStatuses.error);
  },
  [actionTypes.GET_BOOKS]({ commit, state }, { pageNumber }) {
    commit(mutationTypes.SET_LOADING_STATUS, loadingStatuses.loading);
    const response = LocalStorage.get("books");

    if (!response.success) {
      commit(mutationTypes.SET_LOADING_STATUS, loadingStatuses.error);
      return;
    }

    const start = (pageNumber - 1) * state.booksPerPage;
    const end = start + state.booksPerPage;
    const [sortKey, sortDir] = state.currentSort.split(":");
    let books = JSON.parse(response.data).books;
    books = sortBooks(books, sortKey, sortDir);

    if (!books.length) {
      commit(mutationTypes.SET_LOADING_STATUS, loadingStatuses.empty);
    } else {
      commit(mutationTypes.SET_LOADING_STATUS, loadingStatuses.ready);
    }

    commit(mutationTypes.SET_BOOKS, books.slice(start, end));
    commit(mutationTypes.SET_BOOKS_COUNT, books.length);
  },
  [actionTypes.DELETE_BOOK_BY_ID]({ dispatch }, bookId) {
    const response = LocalStorage.get("books");

    if (!response.success) {
      //TODO: add handle error when remove book
      return;
    }
    const books = JSON.parse(response.data).books;
    const newBooks = books.filter((b) => b.id !== bookId);

    LocalStorage.set("books", JSON.stringify({ books: newBooks }));

    dispatch(actionTypes.GET_BOOKS);
  },
  [actionTypes.CHANGE_CURRENT_SORT]({ commit }, newSort) {
    commit("SET_CURRENT_SORT", newSort);
  },
  [actionTypes.CHANGE_CURRENT_PAGE]({ commit }, newPage) {
    commit("SET_CURRENT_PAGE", newPage);
  },
};

export default actions;
