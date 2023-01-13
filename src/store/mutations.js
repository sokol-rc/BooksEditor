import {getInitialState} from "@/store/index";

const setBooks = (state, books) => {
    state.books = books;
};

const setBooksCount = (state, booksCount) => {
    state.booksCount = booksCount;
};

const setCurrentBooksPage = (state, currentPage) => {
    state.currentBooksPage = currentPage;
};
const resetBookState = (state) => {
    console.log(getInitialState())
    Object.assign(state, getInitialState())
};

export default {
    setBooks,
    setBooksCount,
    setCurrentBooksPage,
    resetBookState
};
