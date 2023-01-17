<template>
  <div class="search">
    <div class="search__wrapper search__wrapper--background">
      <form class="search__form" @submit.prevent="handleSubmit">
        <label class="search__label visually-hidden" for="search-input"
          >Найти книгу</label
        >
        <input
          class="search__input"
          v-focus="isFocused"
          id="search-input"
          type="search"
          v-model.trim="searchQuery"
          placeholder="Найти книгу"
        />
        <ButtonIcon type="submit">
          <IconEdit />
        </ButtonIcon>
      </form>
    </div>
  </div>
</template>

<script>
import ButtonIcon from "@/components/ui-components/ButtonIcon/ButtonIcon.vue";
import IconEdit from "@/components/icons/iconEdit.vue";
import Vue from "vue";

Vue.directive("focus", {
  inserted: function (el) {
    el.focus();
  },
});

export default {
  name: "SearchForm",
  components: { IconEdit, ButtonIcon },
  data() {
    return {
      searchQuery: this.query,
      isFocused: false,
    };
  },
  props: {
    query: {
      type: String,
      default: "",
    },
  },
  computed: {
    urlQuery() {
      //need to encode string?
      return this.searchQuery;
    },
  },
  methods: {
    handleSubmit() {
      this.$emit("handleSubmit", this.urlQuery);
    },
    setFocusToInput() {
      this.isFocused = true;
    },
  },
};
</script>

<style scoped lang="scss">
$shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
$cardBackgroundColor: #fff;

.search {
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

  &__form {
    position: relative;
  }

  &__input {
    padding: 6px 10px;
  }
}
</style>
