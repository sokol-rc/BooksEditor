const removeBookById = (state, bookId) => {
    state.books = state.books.filter((e)=>e.id !== bookId )
}

export default {
    removeBookById
}
