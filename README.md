# Fiscal do Grude
##### A Telegram bot to inspect your groups - featuring Node.js and Typescript. 
###### Here we use [node-telegram-bot-api](https://www.npmjs.com/package/node-telegram-bot-api) package.
###### And [knex.js](http://knexjs.org/) for building queries and db stuffs.

### Sobre o bot
Inicialmente vamos fiscalizar o termo 'Victor|Vitor' e cobrar uma taxa fixa dos membros que o falarem.

### Comandos
- /entrar: entrar manualmente na brincadeira
- /listar_devedores: verificar quem e quanto estão devendo!

### Todos
- Subir para um servidor
- Criar action pra moer
- Criar testes
- Comandos para cobrar manualmente
- Tratar erros devidamente

### Como ajudar

#### Basics

Abra uma **issue** com sua sugestão ou um **PR** com sua contribuição!

#### Ambiente

- Servidor local:
  - `yarn` 
  - `yarn dev`

- Bot
  - Crie seu bot de testes usando o **@BotFather** no próprio Telegram para gerar um Token e crie os comandos usados.
  
- .env
  - Crie um `.env` baseado no `.env.example` e insira o token gerado no passo anterior

- Banco de dados
  - Rode as *migrations* com `npx knex migrate:latest --env:development`

Tá pronto o sorvetinho. 🍨

#### A arquitetura

Estou testando um padrão que separa os arquivos em *useCases*, baseado no que é visto [nesse video](https://youtu.be/vAV4Vy4jfkc "Qualquer semelhança é mera coincidência").

Basicamente os casos de uso tem um 
  - Controller: 
    - trabalha diretamente com os inputs e os outputs
  - UseCase: 
    - executa a lógica entre a camada do Controller e os *providers* ou *repositories* que vierem a ser utilizados.
    - recebe interfaces dos serviços utilizados, não se importanto com qual a implementação deles.
  - Testes específicos
  - Eventuais DTOs* - *Data transfer objects*, que definem estruturam que são passadas de uma camada para a outr*

  **Estudando a necessidade*
