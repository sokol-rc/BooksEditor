import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const lazyLoad = (componentName) => {
  return () => import(`@/components/${componentName}/${componentName}.vue`);
};

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: { name: "booksCatalog", params: { page: 1 } },
    },
    {
      path: "/catalog/",
      component: lazyLoad("BooksList"),
      props: true,
      children: [
        {
          path: "/catalog/:page",
          name: "booksCatalog",
          component: lazyLoad("BooksList"),
          props: true,
        },
      ],
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

console.log(router);

export default router;
