import { getInitialState } from "@/store/index";

export const mutationTypes = {
  SET_BOOKS: "SET_BOOKS",
  SET_BOOKS_COUNT: "SET_BOOKS_COUNT",
  SET_LOADING_STATUS: "SET_LOADING_STATUS",
  RESET_BOOKS_STATE: "RESET_BOOKS_STATE",
  SET_CURRENT_SORT: "SET_CURRENT_SORT",
  SET_CURRENT_PAGE: "SET_CURRENT_PAGE",
};

const mutations = {
  [mutationTypes.SET_BOOKS](state, books) {
    state.books = books;
  },
  [mutationTypes.SET_BOOKS_COUNT](state, booksCount) {
    state.booksCount = booksCount;
  },
  [mutationTypes.SET_LOADING_STATUS](state, status) {
    state.loadingStatus = status;
  },
  [mutationTypes.RESET_BOOKS_STATE](state) {
    Object.assign(state, getInitialState());
  },
  [mutationTypes.SET_CURRENT_SORT](state, newSort) {
    state.currentSort = newSort;
  },
  [mutationTypes.SET_CURRENT_PAGE](state, newPage) {
    state.currentPage = newPage;
  },
};

export default mutations;
