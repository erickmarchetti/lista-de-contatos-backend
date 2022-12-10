# Lista de contatos - backend

## Sumário

- [1. Resumo](#1-resumo)
- [2. Preparativos](#2-preparativos)
- [3. Rotas](#3-rotas)
- [4. Frontend](#4-frontend)

## 1. Resumo

Essa API foi estruturada no intuito de facilitar a manipulação de contatos.

Lista de contatos é uma aplicação que contem tanto um CRUD de usuário como de contaos vinculados a esse usuário, <br/>
guardando suas informações em um banco de dados.

A aplicação possui seis tabelas:

- **users**
- **user_emails**
- **user_numbers**
- **contacts**
- **contact_emails**
- **contact_numbers**

## 2. Preparativos

### 2.1. Instale as dependências

Após fazer o clone do projeto instale  as dependências:

```shell
yarn
```

### 2.2. Crie um arquivo .env

Clone o arquivo .env.example e edite ele com os seus dados,<br/>
Em seguida renomeie a copia para .env

### 2.3. Execute as migrações para realizar a persistência de dados

```shell
yarn typeorm migration:run -d ./src/data-source.ts
```

### 2.4. Rode os testes

```shell
yarn test
```

### 2.5. Execute a aplicação

```shell
yarn dev
```

## 3. Rotas

### User

A aplicação possui nove rotas:

`POST api/users`
```json
{
  "full_name": "erick marchetti",
  "password": "1234",
  "emails": ["erick@gmail.com"],
  "numbers": ["111111111111"]
}
```

Faz a criação de um usuário, todos os campos são obrigatórios, a rota possui verificação de campos, e de tipos, não precisa de autorização

resposta:

`Created 201`
```json
{
  "id": "a817404d-510b-44f5-ae0e-563f364148ec",
  "full_name": "erick marchetti",
  "created_at": "2022-12-09T19:16:49.147Z",
  "emails": [
    {
      "id": "571eb97e-139a-4b2a-8087-93e1c02eb65d",
      "email": "erick@gmail.com"
    }
  ],
  "numbers": [
    {
      "id": "4fecc2a8-53bf-48f0-93af-290f58c81122",
      "number": "111111111111"
    }
  ]
}
```

<br/>

`POST api/login`
```json
{
  "full_name": "erick marchetti",
  "password": "1234"
}
```

Faz o login de um usuário, todos os campos são obrigatórios, a rota possui verificação de campos, e de tipos, não precisa de autorização

resposta:

`OK 200`
```json
{
  "id": "a817404d-510b-44f5-ae0e-563f364148ec",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhODE3NDA0ZC01MTBiLTQ0ZjUtYWUwZS01NjNmMzY0MTQ4ZWMiLCJpYXQiOjE2NzA2MTQzMzIsImV4cCI6MTY3MDcwMDczMn0.dZsS67gpon_UE3R3lYM6kxTZk72fhPmk6O_f11OKF8k"
}
```

<br/>

`GET api/users/:user_id`
```json
No body
```

Traz todas as informações (exceto contatos) de um usuário, precisa de autorização

resposta:

`OK 200`
```json
{
  "id": "a817404d-510b-44f5-ae0e-563f364148ec",
  "full_name": "erick marchetti",
  "created_at": "2022-12-09T19:16:49.147Z",
  "emails": [
    {
      "id": "571eb97e-139a-4b2a-8087-93e1c02eb65d",
      "email": "erick@gmail.com"
    }
  ],
  "numbers": [
    {
      "id": "4fecc2a8-53bf-48f0-93af-290f58c81122",
      "number": "111111111111"
    }
  ]
}
```

<br/>

`PATCH api/users/:user_id`
```json
{
  "full_name": "Erick Patch",
  "password": "12345",
  "emails": ["erickpatch@gmail.com"],
  "numbers": ["123456789"]
}
```

Faz a atualização de um usuário, nenhum campo é obrigatório, a rota possui verificação de tipos, precisa de autorização

resposta:

`OK 200`
```json
{
  "id": "a817404d-510b-44f5-ae0e-563f364148ec",
  "full_name": "Erick Patch",
  "created_at": "2022-12-09T19:16:49.147Z",
  "emails": [
    {
      "id": "571eb97e-139a-4b2a-8087-93e1c02eb65d",
      "email": "erickpatch@gmail.com"
    }
  ],
  "numbers": [
    {
      "id": "4fecc2a8-53bf-48f0-93af-290f58c81122",
      "number": "123456789"
    }
  ]
}
```

<br/>

`DELETE api/users/:user_id`
```json
No body
```

Faz a deleção de um usuário, precisa de autorização

resposta:

`No content 204`
```json
No content
```

### Contact

`POST api/contacts`
```json
{
  "full_name": "Victor",
  "emails": ["victor@gmail.com"],
  "numbers": ["987654321"]
}
```

Faz a criação de um contato vinculando ele ao dono do token, todos os campos são obrigatórios, a rota possui verificação de campos, e de tipos, precisa de autorização

resposta:

`Created 201`
```json
{
  "id": "f15891ec-d86c-463a-ba78-99a239684285",
  "full_name": "Victor",
  "emails": [
    {
      "id": "5eb22d33-8271-4598-9909-862edce26fd6",
      "email": "victor@email.com"
    }
  ],
  "numbers": [
    {
      "id": "6f43a939-20bf-4b9f-abcd-49892f5352e4",
      "number": "987654321"
    }
  ],
  "user": {
    "id": "a817404d-510b-44f5-ae0e-563f364148ec",
    "full_name": "Erick Patch",
    "created_at": "2022-12-09T19:16:49.147Z"
  }
}
```

<br/>

`GET api/contacts`
```json
No body
```

Traz a lista de todos os contatos vinculados ao dono do token, precisa de autorização

resposta:

`OK 200`
```json
[
  {
    "id": "f15891ec-d86c-463a-ba78-99a239684285",
    "full_name": "Victor",
    "emails": [
      {
        "id": "5eb22d33-8271-4598-9909-862edce26fd6",
        "email": "victor@email.com"
      }
    ],
    "numbers": [
      {
        "id": "6f43a939-20bf-4b9f-abcd-49892f5352e4",
        "number": "987654321"
      }
    ],
    "user": {
      "id": "a817404d-510b-44f5-ae0e-563f364148ec",
      "full_name": "Erick Patch",
      "created_at": "2022-12-09T19:16:49.147Z"
    }
  }
]
```

<br/>

`PATCH api/contacts/:contact_id`
```json
{
  "full_name": "Victor Patch",
  "emails": ["victorpatch@gmail.com"],
  "numbers": ["98765432111"]
}
```

Faz a atualização de um contato, nenhum campo é obrigatório, a rota possui verificação de tipos, precisa de autorização

resposta:

`OK 200`
```json
{
  "id": "f15891ec-d86c-463a-ba78-99a239684285",
  "full_name": "Victor Patch",
  "emails": [
    {
      "id": "5eb22d33-8271-4598-9909-862edce26fd6",
      "email": "victorpatch@gmail.com"
    }
  ],
  "numbers": [
    {
      "id": "6f43a939-20bf-4b9f-abcd-49892f5352e4",
      "number": "98765432111"
    }
  ],
  "user": {
    "id": "a817404d-510b-44f5-ae0e-563f364148ec",
    "full_name": "Erick Patch",
    "created_at": "2022-12-09T19:16:49.147Z"
  }
}
```

<br/>

`DELETE api/contacts/:contact_id`
```json
No body
```

Faz a deleção de um contato, precisa de autorização

resposta:

`No content 204`
```json
No content
```

## 4. Frontend

Para ter acessa ao front end do projeto clique <a href="https://github.com/erickmarchetti/lista-de-contatos-frontend" target="_blank">aqui</a>
