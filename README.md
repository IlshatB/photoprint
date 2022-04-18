** Деплой проекта: **
https://photoprint-node.herokuapp.com

# Структура
*Приложение состоит из двух частей*

- Клиент (React)
- Сервер Node.js (Express)

# Работа с приложением (клиент-сервер одновременно)
**Для запуска обоих серверов локально перейдите в терминал и введите следующие команды:**
```
git checkout master
git pull origin master
cd client
npm i
cd ../
npm i
npm run dev
```
*Замечание: для взаимодействия с базой данных MongoDB требуется добавить MONGO_URI в файл ./config/dev.js, его можно получить у разработчика*

*Замечание 2: также вам стоит дублировать поля конфига из ./config/prod.js в ./config/dev.js и задать им значения*

# Работа с клиентом
**Для запуска CRA сервера локально перейдите в терминал и введите следующие команды:**
```
git checkout master
git pull origin master
cd client
npm i
npm start
```

# Работа с сервером
**Для запуска Node.js сервера локально перейдите в терминал и введите следующие команды:**
```
git checkout master
git pull origin master
npm i
npm run server
```
