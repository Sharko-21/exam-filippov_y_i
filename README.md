# exam-filippov_y_i

Проект написан с использованием технологий docker, node.js, javascript и postgreSQL.
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
         
Добавим оффициальной GPG ключ дкокера:      

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
