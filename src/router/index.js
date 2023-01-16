import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const lazyLoad = (componentName, folder) => {
  return () => import(`@/${folder}/${componentName}/${componentName}.vue`);
};

//TODO: добавить обработку возврата по истории

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: { name: "booksCatalog", params: { page: 1 } },
    },
    {
      path: "/catalog/",
      component: lazyLoad("BooksList", "components"),
      props: true,
      children: [
        {
          path: "/catalog/:page",
          name: "booksCatalog",
          component: lazyLoad("BooksList", "components"),
          props: true,
        },
      ],
    },
    {
      path: "/catalog/book/:bookId",
      name: "editBookView",
      component: lazyLoad("EditBookView", "views"),
      props: true,
    },
    {
      name: "search",
      path: "/search/",
      component: lazyLoad("BooksList", "components"),
      props: true,
    },
    {
      path: "*",
      component: { render: (h) => h("div", ["404! Страница не найдена."]) },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.name === "booksCatalog" && parseFloat(to.params.page) === 1) {
    router.push({ path: "/catalog/" });
  } else {
    next();
  }
});

router.beforeResolve((to, from, next) => {
  console.log(to);
  console.log(from);
  next();
});

export default router;
