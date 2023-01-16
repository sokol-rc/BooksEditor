const allBooks = (state) => {
  return state.books;
};
const getBookById = (state) => (bookId) => {
  return state.books.find((b) => b.id === bookId);
};

const loadingStatus = (state) => {
  return state.loadingStatus;
};

const pagesCount = (state) => {
  if (state.booksCount <= state.booksPerPage) {
    return 0;
  }
  return Math.ceil(state.booksCount / state.booksPerPage);
};

const getSortRules = (state) => {
  return state.sortRules;
};
const getCurrentSort = (state) => {
  return state.currentSort;
};

export default {
  allBooks,
  pagesCount,
  loadingStatus,
  getSortRules,
  getCurrentSort,
  getBookById,
};
