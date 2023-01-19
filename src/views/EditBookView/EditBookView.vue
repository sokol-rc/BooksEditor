<template>
  <transition name="fade" mode="out-in">
    <ContentLoader :status="loadingStatus" :key="$route.path">
      <template #content>
        <div class="book">
          <h1>{{ isNewBook ? 'Добавление книги: ' : 'Редактирование книги: ' }}{{ toucheBook.title }}</h1>
          <form class="form" @submit.prevent="saveBook">
            <div class="form__wrapper form__wrapper--background">
              <div class="form__left-side">
                <div class="form__group">
                  <UploadInput
                    :preview="toucheBook.preview?.image"
                    :alt="toucheBook.preview?.alt"
                    @getImage="setLoadedImage"
                  />
                </div>
              </div>
              <div class="form__right-side">
                <div class="form__group">
                  <BaseInput
                    v-model="toucheBook.title"
                    name="title"
                    label="Заголовок"
                    type="text"
                    :pattern="getValidationConfig('title').pattern"
                    @validate="onValidate"
                    required
                  />
                  <div class="input-error" v-if="validationErrors.title">
                    {{ validationErrors.title }}
                  </div>
                </div>
                <div class="form__group">
                  <BaseInput
                    v-model="toucheBook.authorFirstName"
                    name="authorFirstName"
                    label="Имя автора"
                    type="text"
                    :pattern="getValidationConfig('authorFirstName').pattern"
                    @validate="onValidate"
                    required
                  />
                  <div class="input-error" v-if="validationErrors.authorFirstName">
                    {{ validationErrors.authorFirstName }}
                  </div>
                </div>
                <div class="form__group">
                  <BaseInput
                    v-model="toucheBook.authorLastName"
                    name="authorLastName"
                    label="Фамилия автора"
                    type="text"
                    :pattern="getValidationConfig('authorLastName').pattern"
                    @validate="onValidate"
                    required
                  />
                  <div class="input-error" v-if="validationErrors.authorLastName">
                    {{ validationErrors.authorLastName }}
                  </div>
                </div>
                <div class="form__group">
                  <BaseInput
                    v-model="toucheBook.pages"
                    name="pages"
                    label="Количество страниц"
                    type="text"
                    :pattern="getValidationConfig('pages').pattern"
                    @validate="onValidate"
                    required
                  />
                  <div class="input-error" v-if="validationErrors.pages">
                    {{ validationErrors.pages }}
                  </div>
                </div>
                <div class="form__group">
                  <BaseInput
                    v-model="toucheBook.publishedYear"
                    name="publishedYear"
                    label="Год публикации"
                    type="text"
                    :pattern="getValidationConfig('publishedYear').pattern"
                    @validate="onValidate"
                  />
                  <div class="input-error" v-if="validationErrors.publishedYear">
                    {{ validationErrors.publishedYear }}
                  </div>
                </div>
                <div class="form__group">
                  <BaseInput
                    v-model="toucheBook.publisher"
                    name="publisher"
                    label="Название издательства"
                    type="text"
                    :pattern="getValidationConfig('publisher').pattern"
                    @validate="onValidate"
                  />
                  <div class="input-error" v-if="validationErrors.publisher">
                    {{ validationErrors.publisher }}
                  </div>
                </div>
                <div class="form__group">
                  <BaseInput
                    v-model="toucheBook.circulationDate"
                    name="circulationDate"
                    label="Дата выхода в тираж"
                    type="date"
                    min="1800-01-01"
                    :pattern="getValidationConfig('circulationDate').pattern"
                    @validate="onValidate"
                  />
                  <div class="input-error" v-if="validationErrors.circulationDate">
                    {{ validationErrors.circulationDate }}
                  </div>
                </div>
              </div>
              <div class="form__controls">
                <BaseButton class="save" type="submit" border :disabled="Object.keys(validationErrors).length > 0"
                  >Сохранить
                </BaseButton>
                <div
                  :class="['edit-status', saveStatus.success ? 'edit-status--success' : 'edit-status--error']"
                  v-if="saveStatus"
                >
                  {{ saveStatus?.message }}
                </div>
              </div>
            </div>
          </form>
        </div>
      </template>
    </ContentLoader>
  </transition>
</template>

<script>
import BaseInput from '@/components/ui-components/BaseInput/BaseInput.vue'
import { mapActions, mapGetters } from 'vuex'
import UploadInput from '@/components/ui-components/UploadInput/UploadInput.vue'
import BaseButton from '@/components/ui-components/BaseButton/BaseButton.vue'
import { GET_BOOK, GET_LOADING_STATUS, GET_SAVE_STATUS } from '@/store/types/getters.type'
import { CHANGE_SAVE_STATUS, FETCH_BOOK, PREPARE_NEW_BOOK, SAVE_BOOK, SAVE_NEW_BOOK } from '@/store/types/actions.type'
import ContentLoader from '@/components/ContentLoader/ContentLoader.vue'
import { getValidationConfig } from '@/utils/validation'

export default {
  name: 'EditBookView',
  components: { ContentLoader, BaseButton, UploadInput, BaseInput },
  data() {
    return {
      isNewBook: false,
      validationErrors: {},
      toucheBook: {},
    }
  },
  props: ['bookId'],
  computed: {
    ...mapGetters('bookItem', {
      book: GET_BOOK,
      saveStatus: GET_SAVE_STATUS,
      loadingStatus: GET_LOADING_STATUS,
    }),
  },
  created() {
    if (this.bookId) {
      this.FETCH_BOOK(parseFloat(this.bookId))
    } else {
      this.isNewBook = true
      this.PREPARE_NEW_BOOK()
    }
  },
  mounted() {
    this.toucheBook = this.book
  },
  beforeDestroy() {
    this.CHANGE_SAVE_STATUS(null)
  },
  watch: {
    saveStatus() {
      if (this.saveStatus.success && this.isNewBook) {
        this.isNewBook = false
        this.$router.push({
          name: 'editBookView',
          params: { bookId: this.book.id },
        })
      }
    },
  },
  methods: {
    getValidationConfig,
    ...mapActions('bookItem', [FETCH_BOOK, SAVE_BOOK, PREPARE_NEW_BOOK, SAVE_NEW_BOOK, CHANGE_SAVE_STATUS]),
    saveBook() {
      if (this.isNewBook) {
        this.SAVE_NEW_BOOK(this.toucheBook)
      } else {
        this.SAVE_BOOK(this.toucheBook)
      }
    },
    setLoadedImage(value) {
      this.toucheBook = { ...this.toucheBook, preview: { image: value } }
    },
    onValidate({ name, isValid }) {
      const newValidationErrors = {
        [name]: getValidationConfig(name).error,
      }
      if (!isValid) {
        this.validationErrors = {
          ...this.validationErrors,
          ...newValidationErrors,
        }
      } else {
        const withErrors = this.validationErrors
        delete withErrors[name]
        this.validationErrors = { ...withErrors }
      }
    },
  },
}
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

.input-error {
  color: $error;
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

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
