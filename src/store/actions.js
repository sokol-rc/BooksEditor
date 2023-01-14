import LocalStorage from "@/services/storage/LocalStorage";
import initialData from "@/services/storage/initialData";
import {loadingStatuses} from "@/store/index";

const setInitialData = ({ dispatch }) => {
  LocalStorage.set("books", JSON.stringify(initialData));
  dispatch("getBooksByPage", 1);
};

const clearStorage = ({ dispatch }) => {
  LocalStorage.clear();
  dispatch("resetBookState");
};

const resetBookState = ({ commit }) => {
  commit("RESET_BOOKS_STATE");
  commit("SET_LOADING_STATUS", loadingStatuses.error);
};

const getBooksByPage = ({ dispatch, commit, state }, pageNumber) => {
  commit('SET_LOADING_STATUS', loadingStatuses.loading);
  const page = pageNumber || state.currentBooksPage;
  const response = LocalStorage.get("books");

  if (!response.success) {
    commit('SET_LOADING_STATUS', loadingStatuses.error);
    return;
  }

  const start = (page - 1) * state.booksPerPage;
  const end = start + state.booksPerPage;
  const books = JSON.parse(response.data).books;

  if (!books.length) {
    commit('SET_LOADING_STATUS', loadingStatuses.empty);
  } else {
    commit('SET_LOADING_STATUS', loadingStatuses.ready);
  }
  commit("SET_BOOKS", books.slice(start, end));
  commit("SET_BOOKS_COUNT", books.length)
  commit("SET_CURRENT_BOOKS_PAGE", page);
};

const removeBookById = ({ dispatch, commit }, bookId) => {

  const response = LocalStorage.get("books");
  if (!response.success) {
    //TODO: add handle error when remove book
    return;
  }
  const books = JSON.parse(response.data).books;

  const newBooks = books.filter((b) => b.id !== bookId);
  LocalStorage.set("books", JSON.stringify({ books: newBooks }));
  dispatch("getBooksByPage");
};

export default {
  setInitialData,
  getBooksByPage,
  removeBookById,
  clearStorage,
  resetBookState,
};
