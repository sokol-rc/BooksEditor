# BooksEditor

Небольшое одностраничное веб-приложение – редактор книг

## Установка

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

# Задача

Написать небольшое одностраничное веб-приложение – редактор книг.

Цель: продемонстрировать знание JavaScript и SPA фреймворка VueJS, HTML/CSS

Оценивается: полнота реализации требований, модульность и архитектура приложения, простота и читабельность кода, следование принципам KISS/DRY

Функциональные требования:

Отображать список книг со следующими параметрами:

- заголовок (обязательный параметр, не более 30 символов)- имя автора (обязательный параметр, не более 20 символов)

- фамилия автора (обязательный параметр, не более 20 символов)

- количество страниц (обязательный параметр, больше 0 и не более 10000)

- название издательства (опциональный параметр, не более 30 символов)

- год публикации (опциональный параметр, не раньше 1800)

- дата выхода в тираж (опциональный параметр, не раньше 01.01.1800)

- изображение (опциональный параметр)

Возможность добавлять, удалять и редактировать существующие книги.

Возможность сортировать по заголовку и году публикации

Возможность загружать изображение

Нефункциональные требования:

Технологии – JavaScript и VueJS с использованием Vuex

Хранение данных – в localStorage

Клиентская валидация

Клиентский роутинг
