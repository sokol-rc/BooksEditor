const setBooks = (state, books) => {
  state.books = books;
};

const setBooksCount = (state, booksCount) => {
  state.booksCount = booksCount;
};

const setCurrentBooksPage = (state, currentPage) => {
  state.currentBooksPage = currentPage;
};

export default {
  setBooks,
  setBooksCount,
  setCurrentBooksPage,
};
