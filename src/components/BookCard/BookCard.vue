<template>
  <div class="book">
    <div class="book__image">
      <img
        class="image-responsive"
        :src="book.preview.image"
        :alt="book.preview.alt"
      />
    </div>
    <div class="book__info">
      <h2 class="book__title">{{ book.title }}</h2>
      <div class="book__author">{{ authorsByBookId(book.id) }}</div>
    </div>
    <div class="book__info">
      <ul class="info">
        <li class="info__item" v-if="book.publisher">
          Издательство: {{ book.publisher }}
        </li>
        <li class="info__item-year" v-if="book.publishedYear">
          Год публикации: {{ book.publishedYear }}
        </li>
        <li class="info__item" v-if="book.circulationDate">
          Выход в тираж: {{ book.circulationDate }}
        </li>
        <li class="info__item" v-if="book.pages">Страниц: {{ book.pages }}</li>
      </ul>
    </div>
    <div class="book__controls">
      <ButtonIcon>
        <IconEdit />
      </ButtonIcon>
      <ButtonIcon @click.prevent="showConfirmationDialog">
        <IconDelete />
      </ButtonIcon>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import IconDelete from "@/components/icons/IconDelete.vue";
import ButtonIcon from "@/components/ui-components/ButtonIcon/ButtonIcon.vue";
import IconEdit from "@/components/icons/iconEdit.vue";
import Button from "@/components/ui-components/ButtonComponent/ButtonComponent.vue";

export default {
  name: "BookCard",
  components: { IconEdit, IconDelete, ButtonIcon, Button },
  props: {
    book: Object,
  },
  computed: {
    ...mapGetters(["authorsByBookId"]),
  },
  methods: {
    showConfirmationDialog() {
      this.$emit("showConfirmationDialog");
    },
  },
};
</script>

<style scoped lang="scss">
@import "./BookCard.scss";
</style>
