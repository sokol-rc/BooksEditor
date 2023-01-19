<template>
  <div class="search">
    <form class="search__form" @submit.prevent="handleSubmit">
      <label class="search__label visually-hidden" for="search-input">Найти книгу</label>
      <input
        class="search__input"
        v-focus="isFocused"
        id="search-input"
        type="search"
        v-model.trim="searchQuery"
        placeholder="Найти книгу"
      />
      <ButtonIcon type="submit">
        <IconSearch />
      </ButtonIcon>
    </form>
  </div>
</template>

<script>
import ButtonIcon from '@/components/ui-components/ButtonIcon/ButtonIcon.vue'
import IconEdit from '@/components/Icons/iconEdit.vue'
import Vue from 'vue'
import IconSearch from '@/components/Icons/IconSearch.vue'

Vue.directive('focus', {
  inserted: function (el) {
    el.focus()
  },
})

export default {
  name: 'SearchForm',
  components: { IconSearch, IconEdit, ButtonIcon },
  data() {
    return {
      searchQuery: this.query,
      isFocused: false,
    }
  },
  props: {
    query: {
      type: String,
      default: '',
    },
  },
  computed: {
    urlQuery() {
      //need to encode string?
      return this.searchQuery
    },
  },
  methods: {
    handleSubmit() {
      this.$emit('handleSubmit', this.urlQuery)
    },
    setFocusToInput() {
      this.isFocused = true
    },
  },
}
</script>

<style scoped lang="scss">
.search {
  display: flex;
  align-items: center;
  &__form {
    position: relative;
  }

  &__input {
    height: 36px;
    padding: 6px 10px;
    margin-right: 10px;
  }
}
</style>
