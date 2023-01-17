<template>
  <div class="book">
    <h1>Редактирование книги: {{ book.title }}</h1>
    <div class="form">
      <div class="form__wrapper form__wrapper--background">
        <div class="form__left-side">
          <div class="form__group">
            <UploadInput
              :preview="book.preview.image"
              :alt="book.preview.alt"
              @getImage="setLoadedImage"
            />
          </div>
        </div>
        <div class="form__right-side">
          <div class="form__group">
            <BaseInput
              v-model="book.title"
              label="Заголовок"
              type="text"
              required
            />
          </div>
          <div class="form__group">
            <BaseInput
              v-model="book.authors"
              label="Фамилия автора(ов) через запятую"
              type="text"
              required
            />
          </div>
          <div class="form__group">
            <BaseInput
              v-model="book.pages"
              label="Количество страниц"
              type="text"
              required
            />
          </div>
          <div class="form__group">
            <BaseInput
              v-model="book.publishedYear"
              label="Год публикации"
              type="text"
            />
          </div>
          <div class="form__group">
            <BaseInput
              v-model="book.publisher"
              label="Название издательства"
              type="text"
            />
          </div>
          <div class="form__group">
            <BaseInput
              v-model="book.circulationDate"
              label="Дата выхода в тираж"
              type="text"
            />
          </div>
        </div>
        <div class="form__controls">
          <ButtonComponent class="save" @click="saveBook"
            >Сохранить
          </ButtonComponent>
          <div
            :class="[
              'edit-status',
              editStatus.success
                ? 'edit-status--success'
                : 'edit-status--error',
            ]"
            v-if="editStatus"
          >
            {{ editStatus?.message }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseInput from "@/components/ui-components/BaseInput/BaseInput.vue";
import { mapActions, mapGetters } from "vuex";
import UploadInput from "@/components/ui-components/UploadInput/UploadInput.vue";
import ButtonComponent from "@/components/ui-components/ButtonComponent/ButtonComponent.vue";
import { GET_BOOK, GET_EDIT_STATUS } from "@/store/types/getters.type";
import { FETCH_BOOK, SAVE_BOOK, SET_IMAGE } from "@/store/types/actions.type";

export default {
  name: "EditBookView",
  components: { ButtonComponent, UploadInput, BaseInput },
  // почему не [String, Number]?
  props: ["bookId"],
  computed: {
    ...mapGetters("bookItem", {
      book: GET_BOOK,
      editStatus: GET_EDIT_STATUS,
    }),
  },
  created() {
    this.FETCH_BOOK(parseFloat(this.bookId));
  },
  methods: {
    ...mapActions("bookItem", [FETCH_BOOK, SAVE_BOOK, SET_IMAGE]),
    saveBook() {
      this.SAVE_BOOK(this.book);
    },
    setLoadedImage(value) {
      this.SET_IMAGE(value);
    },
  },
};
</script>

<style lang="scss" scoped>
$success: #008000;
$error: #ff0000;
.form {
  &__wrapper {
    padding: 24px 16px;
    grid-gap: 10px;
    display: grid;
    grid-template-columns: minmax(100px, 300px) 1fr;
    margin-bottom: 30px;
  }

  &__group {
    margin-bottom: 14px;
  }

  &__wrapper--background {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
  }

  &__controls {
    grid-column: span 2;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}

.save {
  margin-bottom: 10px;
}

.edit-status {
  display: flex;
  justify-content: center;
}

.edit-status--success {
  color: $success;
}

.edit-status--error {
  color: $error;
}
</style>