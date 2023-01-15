export const sortBooks = (array, key, dir = "asc") => {
  return array.sort((a, b) => {
    if (typeof a[key] === "string" && typeof b[key] === "string") {
      if (dir === "desc") {
        return b[key].toLowerCase().localeCompare(a[key].toLowerCase());
      }
      return a[key].toLowerCase().localeCompare(b[key].toLowerCase());
    } else if (typeof a[key] === "number" && typeof b[key] === "number") {
      if (dir === "desc") {
        return b[key] - a[key];
      }
      return a[key] - b[key];
    }

    return 0;
  });
};
