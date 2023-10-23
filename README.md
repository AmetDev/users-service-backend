Главная ссылка на проект:
https://users-service-backend.vercel.app/

Формат даты в таблицах: MM-DD-YYYY

Для GET-запроса (получение данных полльзователя по nickname): https://users-service-backend.vercel.app//auth/getonehistory
1. В Headers должен быть Key - Autorization
2. В Value - Bearer <jwt token>

Для GET-запроса (получение всей истории): https://users-service-backend.vercel.app//auth/getallhistory
1. В Headers должен быть Key - Autorization
2. В Value - Bearer <jwt token>

Для POST-запроса (регистрация): https://users-service-backend.vercel.app//auth/registration
1. В Body выбрать raw - JSON
2. Прописать данные в формате JSON:
{
    "name": "Amet",
    "lastname": "Seidaliev",
    "fathername": "Enver",
    "date_of_birth": "05-15-2005",
    "nickname": "Asmex8jd3",
    "password": "Amet24354",
    "admin": true
}

Для POST-запроса (авторизация): https://users-service-backend.vercel.app//auth/login
1. В Body выбрать raw - JSON
2. Прописать данные в формате JSON:
{
    "nickname": "Asmex8jd3",
    "password": "Amet24354"
}

Для PUT-запроса (редактирование пользователя): https://users-service-backend.vercel.app//auth/putusers
1. В Body выбрать raw - JSON
2. Прописать данные в формате JSON:
{
    "name": "Ametka",
    "nickname": "Asmex8jd3",
    "password": "Amet24354
}

Для POST-запроса (получение пользователей): https://users-service-backend.vercel.app//auth/users
1. В Headers должен быть Key - Autorization
2. В Value - Bearer <jwt token>

Для запуска сервера на Docker:

1. docker build .
2. docker run -p 4000:4000 -d <IMAGE_ID>
