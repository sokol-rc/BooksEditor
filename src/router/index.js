import Vue from 'vue'
import VueRouter from 'vue-router'
import { isNavigationFailure, NavigationFailureType } from 'vue-router/src/util/errors'

Vue.use(VueRouter)

const lazyLoad = (componentName, folder) => {
  return () => import(`@/${folder}/${componentName}/${componentName}.vue`)
}

//TODO: добавить обработку возврата по истории

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: { name: 'booksCatalog', params: { page: 1 } },
    },
    {
      path: '/catalog/',
      component: lazyLoad('CatalogView', 'views'),
      props: true,
      meta: {
        title: 'Каталог книг',
      },
      children: [
        {
          path: '/catalog/:page',
          name: 'booksCatalog',
          component: lazyLoad('CatalogView', 'views'),
          props: true,
          meta: {
            title: 'Каталог книг',
          },
        },
      ],
    },
    {
      path: '/catalog/book/new',
      name: 'createBookView',
      component: lazyLoad('EditBookView', 'views'),
      meta: {
        title: 'Добавление книги',
      },
    },
    {
      path: '/catalog/book/:bookId',
      name: 'editBookView',
      component: lazyLoad('EditBookView', 'views'),
      props: true,
      meta: {
        title: 'Редактирование книги',
      },
    },

    {
      name: 'search',
      path: '/search/',
      component: lazyLoad('CatalogView', 'views'),
      props: (route) => ({ query: route.query.q, page: route.query.page }),
      meta: {
        title: 'Поиск...',
      },
    },
    {
      path: '*',
      component: { render: (h) => h('div', ['404! Страница не найдена.']) },
      meta: {
        title: 'Страница не найдена',
      },
    },
  ],
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  originalPush.call(this, location).catch((error) => {
    if (!isNavigationFailure(error, NavigationFailureType.duplicated)) {
      throw Error(error)
    }
  })
}

router.beforeEach((to, from, next) => {
  document.title = to.meta.title

  if (to.name === 'booksCatalog' && parseFloat(to.params.page) === 1) {
    router.push({ path: '/catalog/' })
  } else {
    next()
  }
})

export default router
