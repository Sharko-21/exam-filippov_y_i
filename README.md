# exam-filippov_y_i

## Оглавление
0. [Установка docker](#Установка-docker)
1. [Установка docker-compose](#Установка-docker-compose) 
1. [Запуск](#Запуск) 
2. [Структура проекта](#Структура-проекта)
3. [Как попасть в бд?](#Как-попасть-в-бд)

Проект написан для экзамена с использованием технологий docker, node.js, javascript и postgreSQL.

Для того, чтобы упростить процесс развертывания при процессе проверки экзаминационного задания в репозиторий будет также закоммичена папка с базой и node_modules (прости господи)

Для запуска проекта требуется установленный docker и docker-compose. 

### Установка docker 
Установка docker будет рассмотрена на примере ubuntu (в случае каких-то других ОС или дистрибутивов можно воспользоваться) поиском.

 Первым делом установим дополнительные пакеты, которые потребуются в процессе установки докера:

     $ sudo apt-get update
     
     $ sudo apt-get install \
         apt-transport-https \
         ca-certificates \
         curl \
         gnupg-agent \
         software-properties-common
         
Добавим оффициальный GPG ключ докера:      

     curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
        
Добавим репозиторий в котором находится докер:

    sudo add-apt-repository \
       "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
       $(lsb_release -cs) \
       stable"
       
Установим docker engine:

     $ sudo apt-get update
     $ sudo apt-get install docker-ce docker-ce-cli containerd.io
     
Проверим, что докер успешно установлен:

    sudo docker run hello-world
    
### Установка docker-compose
Скачаем последний релиз docker-compose:

    sudo curl -L "https://github.com/docker/compose/releases/download/1.27.4/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    
Выдадим права для запуска установочного файла:
    
    sudo chmod +x /usr/local/bin/docker-compose
    
Установим docker-compose:
    
    sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
    
Проверим, что все успешно установилось:

    $ docker-compose --version
    docker-compose version 1.27.4, build 1110ad01

### Запуск
Для запуска достаточно просто выполнить в директории проекта команду (необходим запущенный докер)

    docker-compose up

### Структура проекта
1. app - здесь находится код сервера написанный на node.js
2. app/index.js - индексный файл через который запускается сервер
3. app/api - включает в себя эндпоинты для обработки запросов.
4. app/lib - либный код упрощающий некоторые штуки
5. migrations - папка с миграциями
6. sql - sql файлы, которые используются в проекте для обращения к бд (чтобы не разбрасывать запросы непосредственно во всем коде проекта)
7. static - различная статика

### Структура проекта
Чтобы попасть в базу данных необходимо запустить сервер и выполнить команду

    docker exec -it ws-db psql music_shop -Ufilippov