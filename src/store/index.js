import Vue from 'vue'
import Vuex from 'vuex'
import modules from '@/store/modules'

Vue.use(Vuex)

export const loadingStatuses = {
  loading: 'LOADING',
  ready: 'READY',
  empty: 'EMPTY',
  searchResultsEmpty: 'SEARCH_RESULTS_EMPTY',
  error: 'ERROR',
}

export default new Vuex.Store({
  modules,
})
