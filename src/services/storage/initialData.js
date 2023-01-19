import { programmistPragmatic } from '@/assets/programmistPragmatic'
import { cleanCode } from '@/assets/cleanCode'
import { codeComplete } from '@/assets/codeComplete'
import { algorithms } from '@/assets/algorithms'
import { prokectCost } from '@/assets/projectCost'
import { headFirst } from '@/assets/headFirst'

export default {
  books: [
    {
      id: 1,
      title: 'Программист-прагматик',
      preview: {
        image: programmistPragmatic,
        alt: 'Обожка книги «Программист-прагматик»',
      },
      authorFirstName: 'Эндрю',
      authorLastName: 'Хант',
      publisher: 'Вильямс',
      publishedYear: 2020,
      circulationDate: '2020-01-01',
      pages: 368,
    },
    {
      id: 2,
      title: 'Чистый код',
      preview: {
        image: cleanCode,
        alt: 'Обожка книги «Чистый код»',
      },
      authorFirstName: 'Роберт',
      authorLastName: 'Мартин',
      publisher: 'Питер',
      publishedYear: 2018,
      circulationDate: '2018-07-22',
      pages: 464,
    },
    {
      id: 3,
      title: 'Мастер-класс. Совершенный код.',
      preview: {
        image: codeComplete,
        alt: 'Обожка книги «Мастер-класс. Совершенный код.»',
      },
      authorFirstName: 'Стив',
      authorLastName: 'Макконнелл',
      publisher: 'БХВ',
      publishedYear: 2017,
      circulationDate: '2017-07-22',
      pages: 896,
    },
    {
      id: 4,
      title: 'Алгоритмы: построение и анализ',
      preview: {
        image: algorithms,
        alt: 'Обожка книги «Алгоритмы: построение и анализ»',
      },
      authorFirstName: 'Томас Х.',
      authorLastName: 'Кормен',
      publisher: 'Диалектика',
      publishedYear: 2018,
      circulationDate: '2018-07-22',
      pages: 1328,
    },
    {
      id: 5,
      title: 'Сколько стоит программный проект',
      preview: {
        image: prokectCost,
        alt: 'Обожка книги «Сколько стоит программный проект»',
      },
      authorFirstName: 'Стив',
      authorLastName: 'Макконнелл',
      publisher: 'Руская редакция',
      publishedYear: 2007,
      circulationDate: '2007-01-01',
      pages: 297,
    },
    {
      id: 6,
      title: 'Head First. Паттерны проектирования',
      preview: {
        image: headFirst,
        alt: 'Обожка книги «Head First. Паттерны проектирования»',
      },
      authorFirstName: 'Эрик',
      authorLastName: 'Фримен',
      publisher: 'Питер',
      publishedYear: 2018,
      circulationDate: '2018-01-01',
      pages: 656,
    },
  ],
}
