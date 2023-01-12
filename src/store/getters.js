export const getAllBooks = (state) => {
    return state.books;
}
export const getAuthorsByBookId = (state) => (bookId) => {
    const currentBook = state.books.find((b) => b.id === bookId);
    if (!currentBook) {
        throw Error("Книга не найдена");
    }
    const {authors} = currentBook;
    return `${authors.length > 1 ? "Авторы" : "Автор"}: ${authors
        .map((a) => a.lastName)
        .join(", ")}`;
}
