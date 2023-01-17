export const searchBooks = (array, searchQuery) =>
  array.filter((item) => item.title.toLowerCase().includes(searchQuery));
