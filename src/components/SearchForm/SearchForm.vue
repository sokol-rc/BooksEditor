<template>
  <div class="search">
    <div class="search__wrapper search__wrapper--background">
      <form class="search__form" @submit.prevent="doSearch">
        <label class="search__label visually-hidden" for="search-input"
          >Найти книгу</label
        >
        <input
          class="search__input"
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

export default {
  name: "SearchForm",
  components: { IconEdit, ButtonIcon },
  data() {
    return {
      query: "",
    };
  },
  computed: {
    urlQuery() {
      return new URLSearchParams({ q: this.query }).toString();
    },
  },
  methods: {
    doSearch() {
      this.$router.push({ name: "search", query: { q: this.urlQuery } });
    },
  },
};
</script>

<style scoped lang="scss">
@import "./SearchForm.scss";
</style>
