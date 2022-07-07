# demo-social

- тестовое задание:

```
...
```

## 1 итерация

### используемый стек

- Frontend
  - React & Redux
    - React-hooks-form
    - React-router-dom
    - Prop-types
  - MaterialUI
  - Eslint (google-config)
  - Express (for deploy)
- Backend
  - express (express-validator)
  - jsonwebtoken, bcript, multer
  - Eslint (google-config)
  - Mongoose (ODM Mongodb)

### deploy

- данное приложение задеплоено с помощью [heroku](https://mini-social-project.herokuapp.com/)
- к сожалению, из-за бесплатной версии хранилище регулярно очищается, загруженные изображения в качестве аватарок будут доступны в течении нескольких минут
  > при самостоятельной сборке проекта важно обратить внимание на ключевые моменты. Фронтенд: указать адрес сервера ( _config.js_ ). Сервер: указать строку подключения к БД( _process.env.DB_STRING_ )

## 2 итерация

#### Полученные рекомендации

- Не хранить пол юзера в String (+, добавлен enum)
- При загрузке нового изображения удалять старое (+)
- Использование шаблона DTO (+)
- При регистрации проверять существования email, а затем загружать изображение (+)

<!-- myInfo
- SERVER

. env
accessToken & refreshToken (httpOnly cookie) + store refreshTokens from DB
+ /refresh endpoint (generate new Access token)
+ /activate enpoint (activate account for mail)
+ /logout endpoint (delete token from DB)
DTO-pattern for data
add Services - layout
add ApiError (extends default Error Class) with errorMiddleware
fixed myLogger (add RestOperator for many arguments)
setup cors (only current client_url, and allow credintals)

- CLIENT

axios.js - insance Axios with interceptors
service layout (-)


 -->

<!-- ### deploy -->
