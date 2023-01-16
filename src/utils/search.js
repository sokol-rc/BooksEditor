export const searchBooks = (array, searchQuery) => {
  return array.filter((item) => {
    item.title.toLowerCase().includes(searchQuery);
  });
};
