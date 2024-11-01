# 2nd-stage-nFactorial
## Система управления мероприятиями

Этот репозиторий представляет документацию для веб-приложения, которое разработано для управления мероприятиями в городе Алматы. Пользователи могут просматривать предстоящие события, регистрироваться на них и управлять своими бронированиями. В данном руководстве вы найдете инструкции по установке, описание процесса разработки и некоторые детали с которыми я столкнулся при разработке

### Установка и настройка

Прежде чем начать работу с приложением, убедитесь, что у вас установлены следующие компоненты:

- Angular JS 17.3.2
- Python Django 5.0.3
- SQLite3

#### Шаги по установке:

1. **Склонируйте репозиторий**:

```bash
git clone https://github.com/abdusss111/2nd-stage-nFactorial.git
```

2. **Установите зависимости для фронтенда (AngularJS) и запустите сервер**:

```bash
cd front
npm install
ng serve
```
Фронтенд теперь доступен по адресу http://localhost:4200/

3. **Установите зависимости для бэкенда (Django)**:

```bash
cd ../back
pip install -r requirements.txt
python manage.py migrate 
```

4. **Запустите Django сервер**:

```bash
python manage.py runserver
```
Теперь серверная часть приложения доступна по адресу http://localhost:8000/


### Процесс проектирования и разработки

При проектировании и разработке "Системы управления мероприятиями" я использовал AngularJS для разработки фронтенд-части приложения и Python Django для бэкенд-части.
Не создавал отдельную модель пользователя на бэкенде, использовал уже готовую базовую модель (до этого опыт создания кастомного юзера был немного с костылями, поэтому попытался ограничиться базовым юзером), для ивентов создал новую модель. При построении отношений между мероприятиями и пользователями использовал ManyToManyField из Django, которое дает возможность работать с данными в ManyToMany отношении. В ходе разработки покрыл все уровни требований представленные в Notion. Добавил два тестовых мероприятия. Имеются функции регистрации и авторизации.
Кстати, добавлять новые мероприятия можно несколькими способами:
- Панель администратора в Django доступная по адресу http://localhost:8000/admin
- Непосредственно через базу данных как через графический интерфейс, так и через query запросы
- Используя аккаунт с данными username - 'admin', password - 'admin', на странице "Мероприятия", доступной по адресу http://localhost:4200/events


### Компромиссы, проблемы и некоторые детали

В ходе разработки столкнулся с некоторыми проблемами и компромиссами:

- В начале не понимал как надо интегрировать внешние календарные сервисы, но после 1.5 дней изучения, проб и ошибок все таки достиг желаемого результата.
- Думал что буду интегрировать Google Calendar через эндпоинт на серверной части, но потом понял что это будет не совсем корректным решением, так как по сути тут особого участия бэкенда не нужно, по итоге реализовал всю интеграцию с календарем на Фронтенде, используя простой сервис сначала для авторизации, а затем автоматического добавления Ивента в календарь
- В целом кроме интеграции с календарем, больше ничего не вызвало особых осложнений
- Так как пока приложение находится в тестовом режиме, авторизацию через OAuth смогут пройти только пользователи добавленные в перечень тестовых пользователей, а я собственно не знаю кто будет проверять мою работу, создал новый Google аккаунт предназначенный для тестов с такими данными и добавил его в перечень:
email - "test.event.nfactorial@gmail.com"
password -  "nFactorial123A@"
дабы менторы в достаточной мере смогли проверить работоспособность интеграции с календарем.
- В ходе тестирования ошибок не заметил


# nFactorial-2
# nFactorial-2
