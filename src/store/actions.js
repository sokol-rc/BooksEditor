import LocalStorage from "@/services/storage/LocalStorage";
import initialData from "@/services/storage/initialData";

const setInitialData = ({ dispatch }) => {
  LocalStorage.set("books", JSON.stringify(initialData));
  dispatch("getBooksByPage", 1);
};

const clearStorage = ({dispatch}) => {
  LocalStorage.clear();
  dispatch('resetBookState');
}

const resetBookState = ({commit}) => {
  commit('resetBookState');
}

const getBooksByPage = ({ dispatch, commit, state }, pageNumber) => {
  const page = pageNumber || state.currentBooksPage;
  const response = LocalStorage.get("books");

  if (!response.success) {
    dispatch('resetBookState');
    return;
  }

  const start = (page - 1) * state.booksPerPage;
  const end = start + state.booksPerPage;
  const books = JSON.parse(response.data).books;

  dispatch("getBooksCount");
  commit("setBooks", books.slice(start, end));
  commit("setCurrentBooksPage", page);
};

const getBooksCount = ({ commit }) => {
  const response = LocalStorage.get("books");

  if (!response.success) {
    commit("setBooksCount", 0);
    return;
  }
  console.log(JSON.parse(response.data));
  const booksCount = JSON.parse(response.data).books.length;
  commit("setBooksCount", booksCount);
};

const removeBookById = ({ dispatch, commit }, bookId) => {
  const response = LocalStorage.get("books");

  if (!response.success) {
    commit("setBooks", null);
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
  resetBookState
};
