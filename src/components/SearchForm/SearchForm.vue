<template>
  <div class="search">
    <div class="search__wrapper search__wrapper--background">
      <form class="search__form" @submit.prevent="doSearch">
        <label class="search__label visually-hidden" for="search-input"
          >Найти книгу</label
        >
        <input
          class="search__input"
          v-focus="isFocused"
          id="search-input"
          type="search"
          v-model.trim="query"
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
      query: "",
      isFocused: false,
    };
  },
  computed: {
    urlQuery() {
      //need to encode string?
      return this.query;
    },
  },
  methods: {
    doSearch() {
      if (this.query === "") {
        this.setFocusToInput();
      } else {
        this.$router.push({ name: "search", query: { q: this.urlQuery } });
      }
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
