# Desafio Técnico Tasken

## Processo de Desenvolvimento

### Banco de dados utilizado

`MySQL`

### Dependências utilizadas

`body-parser`

`express`

`mysql`

`nodemon` (dependência de desenvolvimento)

### DB

`tasken-api.sql`

### Sripts

`"start" : "start node server"`

`"server": "nodemon server"`

### Resumo

1. `npm init`

2. Alteração do `"main"` em `package.json` de `"index.js"` para `"server.js"`

3. Criação do arquivo `server.js` na raiz do projeto, junto com seu BoilerPlate

4. Escrita do arquivo de de configuração e conexão do banco de dados, junto com o script de criar a tabela (caso não haja)

5. Criação do modelo de `'produtos'` com o construtor e as queries

6. Criação das rotas de `'produtos'` com os métodos para utilização das queries
