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
      <div class="book__author">Автор: {{ book.authors }}</div>
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
      <ButtonIcon ariaLabel="редактировать" @click.prevent="editBook">
        <IconEdit />
      </ButtonIcon>
      <ButtonIcon ariaLabel="удалить" @click.prevent="deleteBook">
        <IconDelete />
      </ButtonIcon>
    </div>
  </div>
</template>

<script>
import IconDelete from "@/components/icons/IconDelete.vue";
import ButtonIcon from "@/components/ui-components/ButtonIcon/ButtonIcon.vue";
import IconEdit from "@/components/icons/iconEdit.vue";

export default {
  name: "BookCard",
  components: { IconEdit, IconDelete, ButtonIcon },
  props: {
    book: Object,
  },
  methods: {
    deleteBook() {
      this.$emit("deleteBook");
    },
    editBook() {
      this.$emit("editBook");
    },
  },
};
</script>

<style scoped lang="scss">
.image-responsive {
  width: 100%;
}

.book {
  grid-gap: 12px 0;
  display: grid;
  grid-template-columns: auto minmax(200px, 1fr) minmax(200px, 1fr) 100px;
  padding: 24px 16px;

  &__image {
    max-width: 100px;
    margin-right: 32px;
    flex: 1 0 auto;
  }

  &__title {
    align-self: flex-start;
  }

  &__info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-width: 360px;
    padding-bottom: 30px;
  }

  &__author {
    padding-bottom: 12px;
  }

  &__controls {
    max-width: 100px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }
}

.info {
  margin-right: 32px;
}
</style>
