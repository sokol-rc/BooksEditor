import Vue from "vue";
import Vuex from "vuex";
import getters from "@/store/getters";
import mutations from "@/store/mutations";
import actions from "@/store/actions";

Vue.use(Vuex);

const initialState = {
  books: null,
  booksCount: 0,
  booksPerPage: 4,
  currentBooksPage: 1,
};
console.log(getters);
export default new Vuex.Store({
  state: initialState,
  getters,
  mutations,
  actions,
});
