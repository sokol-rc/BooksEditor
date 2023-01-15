const allBooks = (state) => {
  return state.books;
};

const loadingStatus = (state) => {
  return state.loadingStatus;
};
const authorsByBookId = (state) => (bookId) => {
  const currentBook = state.books.find((b) => b.id === bookId);
  if (!currentBook) {
    throw Error("Книга не найдена");
  }
  const { authors } = currentBook;
  return `${authors.length > 1 ? "Авторы" : "Автор"}: ${authors
    .map((a) => a.lastName)
    .join(", ")}`;
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
  authorsByBookId,
  pagesCount,
  loadingStatus,
  getSortRules,
  getCurrentSort,
};
