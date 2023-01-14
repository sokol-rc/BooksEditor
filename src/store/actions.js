import LocalStorage from "@/services/storage/LocalStorage";
import initialData from "@/services/storage/initialData";

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
};

const getBooksByPage = ({ dispatch, commit, state }, pageNumber) => {
  const page = pageNumber || state.currentBooksPage;
  const response = LocalStorage.get("books");

  if (!response.success) {
    dispatch("resetBookState");
    return;
  }

  const start = (page - 1) * state.booksPerPage;
  const end = start + state.booksPerPage;
  const books = JSON.parse(response.data).books;

  dispatch("getBooksCount");
  commit("SET_BOOKS", books.slice(start, end));
  commit("SET_CURRENT_BOOKS_PAGE", page);
};

const getBooksCount = ({ commit }) => {
  const response = LocalStorage.get("books");

  if (!response.success) {
    //TODO: add handle error
    commit("SET_BOOKS_COUNT", 0);
    return;
  }
  console.log(JSON.parse(response.data));
  const booksCount = JSON.parse(response.data).books.length;
  commit("SET_BOOKS_COUNT", booksCount);
};

const removeBookById = ({ dispatch, commit }, bookId) => {
  const response = LocalStorage.get("books");

  if (!response.success) {
    //TODO: add handle error when remove book
    //commit("setBooks", null);
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
  getBooksCount,
  removeBookById,
  clearStorage,
  resetBookState,
};
