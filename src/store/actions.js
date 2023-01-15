import LocalStorage from "@/services/storage/LocalStorage";
import initialData from "@/services/storage/initialData";
import {loadingStatuses} from "@/store/index";
import {mutationTypes} from "@/store/mutations";

const actionTypes = {
    SET_INITIAL_DATA: 'SET_INITIAL_DATA',
    CLEAR_STORAGE: 'CLEAR_STORAGE',
    RESET_BOOKS_STATE: 'RESET_BOOKS_STATE',
    GET_BOOKS_BY_PAGE: 'GET_BOOKS_BY_PAGE',
    DELETE_BOOK_BY_ID: 'DELETE_BOOK_BY_ID',
    DO_SORT: 'DO_SORT'
}

const actions = {
    [actionTypes.SET_INITIAL_DATA]({dispatch}) {
        LocalStorage.set("books", JSON.stringify(initialData));
        dispatch(actionTypes.GET_BOOKS_BY_PAGE, 1);
    },
    [actionTypes.CLEAR_STORAGE]({dispatch}) {
        LocalStorage.clear();
        dispatch(actionTypes.RESET_BOOKS_STATE);
    },
    [actionTypes.RESET_BOOKS_STATE]({commit}) {
        commit(mutationTypes.RESET_BOOKS_STATE);
        commit(mutationTypes.SET_LOADING_STATUS, loadingStatuses.error);
    },
    [actionTypes.GET_BOOKS_BY_PAGE]({commit, state}, pageNumber = 1) {
        commit(mutationTypes.SET_LOADING_STATUS, loadingStatuses.loading);
        const response = LocalStorage.get("books");

        if (!response.success) {
            commit(mutationTypes.SET_LOADING_STATUS, loadingStatuses.error);
            return;
        }

        const start = (pageNumber - 1) * state.booksPerPage;
        const end = start + state.booksPerPage;
        const books = JSON.parse(response.data).books;

        if (!books.length) {
            commit(mutationTypes.SET_LOADING_STATUS, loadingStatuses.empty);
        } else {
            commit(mutationTypes.SET_LOADING_STATUS, loadingStatuses.ready);
        }
        commit(mutationTypes.SET_BOOKS, books.slice(start, end));
        commit(mutationTypes.SET_BOOKS_COUNT, books.length);
    },
    [actionTypes.DELETE_BOOK_BY_ID]({dispatch}, bookId) {
        const response = LocalStorage.get("books");

        if (!response.success) {
            //TODO: add handle error when remove book
            return;
        }
        const books = JSON.parse(response.data).books;
        const newBooks = books.filter((b) => b.id !== bookId);

        LocalStorage.set("books", JSON.stringify({books: newBooks}));

        dispatch(actionTypes.GET_BOOKS_BY_PAGE);
    },
    [actionTypes.DO_SORT]({dispatch, commit}, newSort) {
        dispatch(actionTypes.GET_BOOKS_BY_PAGE)
        commit('SET_CURRENT_SORT', newSort);

        const [sortKey, sortDir] = newSort.split(':')




    }
}


export default actions;
