<template>
  <div>
    <ul class="list" v-if="books.length > 0">
      <li class="list__item list__item--background" v-for="book in books" :key="book.id">
        <BookCard :book="book" @deleteBook="showConfirmationDialog(book.id)" @editBook="goToEditBook(book.id)" />
      </li>
    </ul>
    <ConfirmationDialog
      v-if="isConfirmationDialogVisible"
      @handleReject="removeDialogReject"
      @handleAccept="removeDialogAccept"
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import BookCard from '@/components/BookCard/BookCard.vue'
import ConfirmationDialog from '@/components/ConfirmationDialog/ConfirmationDialog.vue'
import { DELETE_BOOK_BY_ID } from '@/store/types/actions.type'

export default {
  name: 'BooksList',
  components: {
    BookCard,
    ConfirmationDialog,
  },
  data() {
    return {
      isConfirmationDialogVisible: false,
      handleBookId: null,
    }
  },
  props: ['books'],
  methods: {
    ...mapActions('bookList', [DELETE_BOOK_BY_ID]),
    showConfirmationDialog(bookId) {
      this.isConfirmationDialogVisible = true
      this.handleBookId = bookId
    },
    goToEditBook(bookId) {
      this.$router.push({
        name: 'editBookView',
        params: { bookId: bookId },
      })
    },
    removeDialogReject() {
      this.handleBookId = null
      this.closeConfirmationDialog()
    },
    removeDialogAccept() {
      this.DELETE_BOOK_BY_ID(this.handleBookId)
      this.handleBookId = null
      this.closeConfirmationDialog()
    },
    closeConfirmationDialog() {
      this.isConfirmationDialogVisible = false
    },
  },
}
</script>

<style scoped lang="scss">
$cardBackgroundColor: #fff;
$shadowColor: rgba(0, 0, 0, 0.2);
$shadow: 0 3px 1px -2px $shadowColor, 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
.list {
  grid-gap: 10px;
  display: grid;
  grid-template-columns: 1fr;
  margin-bottom: 30px;

  &__item--background {
    background-color: $cardBackgroundColor;
    border-radius: 8px;
    box-shadow: $shadow;
  }
}
</style>
