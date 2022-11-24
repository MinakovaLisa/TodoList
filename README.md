# TODO
 Internship test project with **React(Create-React_App)**, **TypeScript**, **Less**,**Firebase**.
 
LiveDemo:
https://tododatabase-acb1e.web.app

## Installing
 


```javascript
$ yarn install
````
## Starting the development server

```javascript
$ yarn start
````
Runs the app in the development mode.

Open http://localhost:1234 to view it in the browser.


## Задание
Что нужно сделать:
- написать todo-лист
Функционал:
- создание, просмотр, редактирование (изменение полей или то, что задача выполнена) и удаление задачи
- возможность прикрепления файлов к записи
- поля в задаче: заголовок, описание, дата завершения, прикрепленные файлы
- если дата завершения истекла или задача выполнена, это должно быть визуально отмечено

- откомментировать код в JSDoc и выложить на github.

Нужно обязательно:
- написать код самому, а не скопировать с stackoverflow;
- использовать React;
- использовать компоненты как функции, а не как классы;
- использовать хуки;
- использовать github для “выкладки”.

Желательно:
- использовать dayjs для работы с датами;
- использовать firebase.google.com как Back-end;
- использовать firebase.google.com или now.sh как хостинг клиенской части;
- использовать less, если потребуется писать стили;
- постараться не использовать никаких библиотек, кроме необходимых для общения с Back-end.

Не требуется делать супер-красивый UI и функции не описанные в задании.

## Planned fix:
- [ ] clean up less style
- [ ] err on data updating with fire store ?
- [ ] err handling
- [ ] add test (jest)

