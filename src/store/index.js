import Vue from "vue";
import Vuex from "vuex";
import getters from "@/store/getters";
import mutations from "@/store/mutations";
import actions from "@/store/actions";

Vue.use(Vuex);

export const loadingStatuses = {
  loading: 'LOADING',
  ready: 'READY',
  empty: 'EMPTY',
  error: 'ERROR'
}
export const getInitialState = () => {
  return {
    books: [],
    booksCount: 0,
    booksPerPage: 4,
    currentBooksPage: 1,
    loadingStatus: null
  };
};
const initialState = getInitialState();

export default new Vuex.Store({
  state: initialState,
  getters,
  mutations,
  actions,
});
