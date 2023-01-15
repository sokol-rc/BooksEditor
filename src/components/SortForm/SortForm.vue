<template>
    <div class="sort">
      <div class="sort__wrapper sort__wrapper--background">
        <div class="sort__label">Сортировка:</div>
        <select class="activity-overview__select" v-model="selectSort">
          <option v-for="rule in sortRules" :key="rule.key" :value="rule.key">{{ rule.title }}</option>
        </select>
      </div>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'SortForm',
  data() {
    return {
      selected: ''
    }
  },
  computed: {
    ...mapGetters({
      sortRules: 'getSortRules',
      currentSort: 'getCurrentSort'
    }),
    selectSort: {
      get() {
        return this.currentSort;
      },
      set(value) {
        this.DO_SORT(value);
      }
    }
  },
  methods: {
    ...mapActions(['DO_SORT'])
  }

}
</script>

<style lang="scss" scoped>

</style>
