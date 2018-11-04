---
layout: post
title:  "Configurar ambiente PHP usando Docker em poucos minutos"
date:   2018-07-07 09:31:12 -0300
categories: [blog, travel]
tags: [hot, summer]
---

## 1 minuto de contextualização

Usaremos o [Laradock](https://laradock.io/), que é um conjunto de containers Docker (nginx, php, composer, mysql, phpmyadmin etc.) que provê um ambiente completo para desenvolvimento usando PHP.

O projeto Laradock começou com foco no Laravel, mas contempla outros projetos em PHP, como Symfony, CodeIgniter, Wordpress, Drupal. Você pode usar até Python, Node.js e muito mais.

Para esse tutorial, estou considerando que você já instalou o Docker, Docker Compose e o git.

A maioria dos passos a seguir devem servir para outros sistemas operacionais, mas eu só testei no Linux (Ubuntu 16.04, Ubuntu 17.10 e Ubuntu 18.04).

## Instale o Laradock
Clone o projeto laradock na sua máquina. Minha pasta raiz é `~/Workspace`:

    $ cd ~/Workspace
    $ git clone https://github.com/Laradock/laradock.git
 
Entre na pasta laradock e renomeie o arquivo `env-example` para `.env`:

    $ cd laradock/
    $ cp env-example .env

Execute os containers básicos para começar a brincadeira:

    $ docker-compose up -d nginx

## Onde moram os projetos?
Usaremos uma imagem chamada `workspace` para executar a maioria dos comandos e mapear as pastas dos nossos projetos.

Por padrão, a pasta `/var/www` da `workspace` está mapeada para a pasta pai da `laradock/` na máquina host — no meu caso, a pasta pai é `Workspace/`.

**Logo, as pastas dos seus projetos devem ficar no mesmo nível da pasta do laradock na máquina host.** E assim, estarão disponíveis dentro de `/var/www` quando você executar o container. Ou seja, esta deve ser a estrutura de pastas da sua máquina host:

    .../Workspace/
        laradock/
        projeto-1/
        projeto-2/
        ...

## Crie um projeto Laravel

Liste os containers em execução e confira o `NAME` do container `workspace` — pode ser algo como `laradock_workspace_1` :

    $ docker container ls
    
Execute o aplicativo bash do container `laradock_workspace_1` :

    $ docker container exec -it laradock_workspace_1 bash
    
Use o composer no workspace para criar um projeto Laravel:

    # composer create-project laravel/laravel meu-blog “5.4.*”
    
Configure as permissões das pastas storage e bootstrap/cache:

    # cd meu-blog
    # chmod -R 755 storage bootstrap/cache
    
Saia do bash e configure o dono da pasta do projeto. No exemplo a seguir, thiago é o nome do meu usuário na máquina host:

    $ sudo chown -R thiago:www-data meu-blog/
    
> **To Do:** o ideal seria usar executar os comandos a seguir com o usuário thiago dentro do container. Até o momento da escrita desse artigo, ainda não resolvi essa questão. Por causa disso, as operações de scaffolding, por exemplo, criarão arquivos do root. E por isso, será necessário mudar as propriedades constantemente. Assim que eu resolver, atualizo o artigo.

Projeto criado!


## Configure DNS local para o projeto Laravel

Vamos criar um arquivo de configuração para acessar seu projeto pelo navegador com um DNS local:

    // na máquina host
    $ cd ~/Workspace/laradock/nginx/sites/
    $ cp laravel.conf.example meu-blog.conf

Edite o arquivo `meu-blog.conf`:

    $ vim meu-blog.conf
    
As únicas informações que atualizaremos são server_name e root —note que root refere-se ao caminho dentro do container.

No arquivo `meu-blog.conf`:

    server {
        listen 80;
        listen [::]:80;
        server_name meu-blog.test;
        root /var/www/meu-blog/public;
        index index.php index.html index.htm;
        ...

Na máquina host, reinicie os containers para que a mudança faça refeito:

    $ cd ~/Workspace/laradock/
    $ docker-compose restart
    
Adicione uma linha com o `server_name` no arquivo hosts da máquina host e salve o arquivo.

    $ sudo vim /etc/hosts

No arquivo `/etc/hosts`:

    ...
    127.0.1.1       meu-blog.test
    
Pronto! Acesse http://meu-blog.test:

![Hello World Laravel](/assets/img/2018-07-07-php/laravel-hw.png)

# Configure o MySQL

> **Observação:** Usaremos o usuário root / senha root no phpMyAdmin, pois ele tem permissão para criar tabelas e bancos! Não precisa configurar isso no `.env`. Caso você queira saber onde ficam asconfigurações no `.env`:

    $ cd ~/Workspace/laradock/
    $ vim .env
    ...
    ### PHP MY ADMIN ##########################################
    # Accepted values: mariadb - mysql
    PMA_DB_ENGINE=mysql
    # Credentials/Port:
    PMA_USER=default
    PMA_PASSWORD=secret
    PMA_ROOT_PASSWORD=secret
    PMA_PORT=8080
    ...
    
Caso você não tenha executado os containers mysql e phpmyadmin, execute:

Na pasta `~/Workspace/laradock/`:

    $ docker-compose up -d mysql phpmyadmin
    
Acesse http://localhost:8080/index.php:

![Hello World PhpMyAdmin](/assets/img/2018-07-07-php/phpmyadmin-hw.png)

## Faça login no phpMyAdmin

### Qual é o endereço do servidor MySQL?
Resposta rápida: geralmente `laradock_mysql_1`.

### Como descobrir esse endereço?

O Docker estabelece redes virtuais por meio das quais os containers se comunicam. Use o comando a seguir para listar as redes existentes.

Para aprofundar os conhecimentos sobre Docker, recomendo o livro brasileiro "Descomplicando o Docker", do amigo Jeferson Fernando e Marcus André Nunes Castro. Um outro amigo, Rafael Gomes, também escreveu um livro muito legal "Docker para desenvolvedores".

    $ docker network ls   
    NETWORK ID          NAME                DRIVER              SCOPE
    a56c16bf096d        bridge              bridge              local
    b8f8b11e2ade        host                host                local
    ff5d088c14ea        laradock_backend    bridge              local
    f9db169dba82        laradock_default    bridge              local
    a4c5b86826de        laradock_frontend   bridge              local
    92002c764c13        none                null                local

Nossa rede de interesse é laradock_backend., criada pelo Laradock.

O comando a seguir lista todos os containers que estão conectados a essa rede. Dentre os vários containers conectados, note `laradock_workspace_1` , `laradock_phpmyadmin_1`  e `laradock_mysql_1`. Que por estarem na mesma rede virtual, conseguem se enxergar:

    $ docker network inspect laradock_backend

    
{% highlight json %}
"1837239460e3eccb30e3b9...": {
    "Name": "laradock_workspace_1",
    "EndpointID": "2bc8d2855fac318...",
    "MacAddress": "02:4...",
    "IPv4Address": "172.19.0.3/16",
    "IPv6Address": ""
},
"8e85e8e83108...": {
    "Name": "laradock_phpmyadmin_1",
    "EndpointID": "e931d3c7aafadd99ab...",
    "MacAddress": "02:4...",
    "IPv4Address": "172.19.0.7/16",
    "IPv6Address": ""
},
"99a1588813cda4c16ad6a0...": {
    "Name": "laradock_mysql_1",
    "EndpointID": "39e847ef32ba8...",
    "MacAddress": "02:4...",
    "IPv4Address": "172.19.0.6/16",
    "IPv6Address": ""
},
{% endhighlight %}


Então, `laradock_mysql_1` é o nome do container que o container `laradock_phpmyadmin_1` enxergará a imagem a seguir. Usuário root, senha root:

![PhpMyAdmin Login](/assets/img/2018-07-07-php/phpmyadmin-login.png)

### Erro de conexão?
Se você experimentou o erro abaixo, tente os passos a seguir.

    mysqli_real_connect(): The server requested authentication method unknown to the client [caching_sha2_password]
    mysqli_real_connect(): (HY000/2054): The server requested authentication method unknown to the client
    
Pare todos os serviços (containers em execução são serviços, no final das contas):

    $ cd ~/Workspace/laradock/
    $ docker-compose down
    
Edite o arquivo `.env`, preencha a versão `5.7` no `MYSQL_VERSION` e salve:

    $ vim .env
    ...
    ### MYSQL #################################################
    MYSQL_VERSION=5.7
    ...

Remova o banco de dados MySQL na máquina host:

    $ rm -rf ~/.laradock/data/mysql

Faça um novo build:

    $ docker-compose build mysql
    
Tente novamente:

    $ docker-compose up -d nginx mysql phpmyadmin
    
Sucesso! Acesse http://localhost:8080/index.php novamente:

![PhpMyAdmin Dashboard](/assets/img/2018-07-07-php/phpmyadmin-dashboard.png)

## Configure o MySQL no Laravel

Acesse o `.env` do projeto meu-blog (não é do Laradock!) e atualize os dados de acesso ao MySQL.

Mais uma vez, lembre-se de que estamos falando de "DNSs" na rede virtual laradock_backend do Docker. Por isso, `DB_HOST=laradock_mysql_1`:

    $ cd ~/Workspace/meu-blog
    $ vim .env
    ...
    DB_CONNECTION=mysql
    DB_HOST=laradock_mysql_1
    DB_PORT=3306
    DB_DATABASE=meu-blog
    DB_USERNAME=root
    DB_PASSWORD=root

Acesse http://localhost:8080/index.php e crie um banco chamado meu-blog.

![PhpMyAdmin Databases](/assets/img/2018-07-07-php/phpmyadmin-db.png)

Execute o aplicativo bash do container `laradock_workspace_1` novamente:

    $ docker container exec -it laradock_workspace_1 bash

Observação: existem várias maneiras de se executar esse comando no bash com o Docker. Descubra a sua, crie receitas com Makefile :)

Execute o comando a seguir:

    # cd meu-blog
    # php artisan migrate
    
![Laravel Artisan](/assets/img/2018-07-07-php/laravel-artisan.png)

Ou seja, o Laravel agora enxerga o MySQL! Tabelas criadas!

![PhpMyAdmin tables](/assets/img/2018-07-07-php/phpmyadmin-tables.png)

## Conclusão

Você estabeleceu um ambiente completo PHP, nginx, MySQL, PhpMyAdmin para desenvolver projetos em Laravel, Synforny, Wordpress etc. em poucos minutos!
   
Note que o Laradock é extremamente configurável e vem com muitas outras ferramentas que podem ser úteis. Explore o arquivo `.env` para habilitar coisas como Node.JS, npm, YARN, Xdebug, mongo, Python, redis etc.
   
Leia mais para saber como fazer deploy do mesmo contexto em produção. Ou como se inspirar para criar suas próprias imagens.
   
Fique à vontade para colaboar com dúvidas, correções ou sugestões.