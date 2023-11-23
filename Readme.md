# Server Project

## Описание

Этот сервер предназначен для аутентификации пользователей и управления результатами тестирования. Сервер использует MongoDB для хранения данных и реализует REST API для взаимодействия с клиентским приложением.

## Основные функции

- Аутентификация пользователя.
- Запись результатов тестов для пользователей.
- Получение результатов тестов пользователя.

## Технологии

- ASP.NET Core
- MongoDB

## API Endpoints

### POST /Auth/login

Аутентифицирует пользователя. Возвращает имя пользователя и сообщение о состоянии.

Тело запроса:
```json
{
  "username": "string",
  "password": "string"
}

Ответ:
{
    "username": "string",
    "message": "string"
}

POST /Auth/recordTestResult
Записывает результаты теста пользователя.

Тело запроса:
{
    "testId": "string",
    "score": "int",
    "username": "string"
}
Ответ:
{
    "message": "Test result recorded successfully"
}
GET /Auth/getCompletedTests
Получает результаты тестов для конкретного пользователя.

Параметры запроса:

username: Имя пользователя

Ответ:
{
    "testId1": {
    "isCompleted": true,
    "score": 5
},
    "testId2": {
    "isCompleted": false,
    "score": null
}
}

