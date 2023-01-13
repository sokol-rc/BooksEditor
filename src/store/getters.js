const getAllBooks = (state) => {
  return state.books;
};
const getCurrentBooksPage = (state) => {
  return state.currentBooksPage;
};
const getAuthorsByBookId = (state) => (bookId) => {
  const currentBook = state.books.find((b) => b.id === bookId);
  if (!currentBook) {
    throw Error("Книга не найдена");
  }
  const { authors } = currentBook;
  return `${authors.length > 1 ? "Авторы" : "Автор"}: ${authors
    .map((a) => a.lastName)
    .join(", ")}`;
};

const getPagesCount = (state) => {
  if (state.booksCount <= state.booksPerPage) {
    return 0;
  }
  return Math.ceil(state.booksCount / state.booksPerPage);
};

export default {
  getAllBooks,
  getAuthorsByBookId,
  getPagesCount,
  getCurrentBooksPage,
};
