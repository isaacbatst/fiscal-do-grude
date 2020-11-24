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

### Como ajudar

#### Basics

Abra uma **issue** com sua sugestão ou um **PR** com sua contribuição!

#### Ambiente

- Servidor local:
  - `yarn` 
  - `yarn dev`

- Bot
  - Crie seu bot de testes usando o **@BotFather** no próprio Telegram para gerar um Token.

- Banco de dados
  - Rode as *migrations* com `npx knex migrate:latest --env:development`

Tá pronto o sorvetinho. 🍨