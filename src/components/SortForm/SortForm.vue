<template>
  <div class="sort">
    <div class="sort__wrapper sort__wrapper--background">
      <div class="sort__label">Сортировка:</div>
      <select class="activity-overview__select" v-model="selectSort">
        <option v-for="rule in sortRules" :key="rule.key" :value="rule.key">
          {{ rule.title }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { GET_CURRENT_SORT, GET_SORT_RULES } from "@/store/types/getters.type";

export default {
  name: "SortForm",
  data() {
    return {
      selected: "",
    };
  },
  computed: {
    ...mapGetters("bookList", {
      sortRules: GET_SORT_RULES,
      currentSort: GET_CURRENT_SORT,
    }),
    selectSort: {
      get() {
        return this.currentSort;
      },
      set(value) {
        this.setSortValue(value);
      },
    },
  },
  methods: {
    setSortValue(sortValue) {
      return this.$emit("setSortValue", sortValue);
    },
  },
};
</script>

<style lang="scss" scoped>
$shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
$cardBackgroundColor: #fff;
.sort {
  margin-bottom: 10px;

  &__wrapper {
    display: flex;
    padding: 16px;
  }

  &__wrapper--background {
    background-color: $cardBackgroundColor;
    border-radius: 8px;
    box-shadow: $shadow;
  }

  &__label {
    margin-right: 10px;
  }
}
</style>
