import Vue from "vue";
import Vuex from "vuex";
import getters from "@/store/getters";
import mutations from "@/store/mutations";
import actions from "@/store/actions";
import modules from "@/store/modules";

Vue.use(Vuex);

export const loadingStatuses = {
  loading: "LOADING",
  ready: "READY",
  empty: "EMPTY",
  error: "ERROR",
};
export const getInitialState = () => {
  return {
    books: [],
    booksCount: 0,
    booksPerPage: 4,
    currentPage: 1,
    currentSort: "title:asc",
    searchQuery: "",
    sortRules: [
      { key: "title:asc", title: "По заголовку А-Я" },
      { key: "title:desc", title: "По заголовку Я-А" },
      { key: "publishedYear:asc", title: "По году публикации Стрелочка вверх" },
      { key: "publishedYear:desc", title: "По году публикации Стрелочка вниз" },
    ],
    loadingStatus: null,
  };
};
const initialState = getInitialState();

export default new Vuex.Store({
  modules,
  state: initialState,
  getters,
  mutations,
  actions,
});
