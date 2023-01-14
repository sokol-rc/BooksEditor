import { getInitialState } from "@/store/index";

const SET_BOOKS = (state, books) => {
  state.books = books;
};

const SET_BOOKS_COUNT = (state, booksCount) => {
  state.booksCount = booksCount;
};

const SET_CURRENT_BOOKS_PAGE = (state, currentPage) => {
  state.currentBooksPage = currentPage;
};
const RESET_BOOKS_STATE = (state) => {
  console.log(getInitialState());
  Object.assign(state, getInitialState());
};

export default {
  SET_BOOKS,
  SET_BOOKS_COUNT,
  SET_CURRENT_BOOKS_PAGE,
  RESET_BOOKS_STATE,
};
