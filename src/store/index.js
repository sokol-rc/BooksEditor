import Vue from "vue";
import Vuex from "vuex";
import { bookImageBase64 } from "@/assets/bookImage";
import getters from "@/store/getters";
import mutations from "@/store/mutations";

Vue.use(Vuex);

const initialState = {
  books: [
    {
      id: 1,
      title: "Эта книга самая лучшая книга н",
      preview: {
        image: bookImageBase64,
        alt: "Обожка книги Эта книга самая лучшая книга н",
      },
      authors: [
        {
          id: 1,
          lastName: "Иванов",
        },
      ],
      publisher: "КнигаКнигаКнига",
      published: 1,
      publishedYear: 2022,
      circulationDate: "01.12.2022",
      pages: 1234,
    },
    {
      id: 2,
      title: "Гарри Поттер",
      preview: {
        image: bookImageBase64,
        alt: "Обожка книги Гарри Поттер",
      },
      authors: [
        {
          id: 1,
          lastName: "Иванов",
        },
        {
          id: 2,
          lastName: "Петров",
        },
      ],
      publisher: "Другое издательство",
      published: 1,
      publishedYear: 2021,
      circulationDate: "01.12.2021",
      pages: 122,
    },
    {
      id: 3,
      title: "Гарри Поттер 2",
      preview: {
        image: bookImageBase64,
        alt: "Обожка книги Гарри Поттер 2",
      },
      authors: [
        {
          id: 1,
          lastName: "Сидоров",
        },
      ],
      publisher: "",
      published: 1,
      circulationDate: "01.12.2021",
      pages: 122,
    },
  ],
};
console.log(getters)
export default new Vuex.Store({
  state: initialState,
  getters,
  mutations
});
