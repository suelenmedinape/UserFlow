# UserFlow

Aplicação Angular de listagem e gerenciamento de usuários, desenvolvida como desafio técnico.

## Stack

- **Angular 21** com Standalone Components e Signals
- **Angular Material** para componentes de UI
- **RxJS** para gerenciamento de fluxos assíncronos
- **Vitest** para testes unitários
- **JSON Server** como API mockada
- **Docker** para containerização

---

## Rodando localmente (sem Docker)

### 1. Instalar dependências

```bash
npm install
```

### 2. Subir a API mockada

```bash
npx json-server --watch db.json --port 3000
```

A API estará disponível em `http://localhost:3000/users`.

### 3. Subir a aplicação Angular

```bash
ng serve
```

Acesse `http://localhost:4200`.

---

## Rodando com Docker

### Qualquer pessoa — comando único

```bash
docker compose up --build
```

Não precisa ter Node.js instalado. Apenas Docker.

| Serviço      | URL                          |
|--------------|------------------------------|
| Angular app  | http://localhost:4200        |
| JSON Server  | http://localhost:3000/users  |

### Desenvolvimento local (com hot reload)

Para quem quer editar o código e ver mudanças em tempo real:

```bash
docker compose --profile dev up
```

> Requer a porta 4200 livre. Mudanças nos arquivos são refletidas automaticamente.

---

## Testes

```bash
ng test
```

Cobertura mínima: **60%**, utilizando [Vitest](https://vitest.dev/).

---

## Endpoints da API mockada

| Método   | Rota            | Descrição              |
|----------|-----------------|------------------------|
| `GET`    | `/users`        | Lista todos os usuários |
| `GET`    | `/users/:id`    | Busca usuário por ID   |
| `POST`   | `/users`        | Cria novo usuário      |
| `PUT`    | `/users/:id`    | Atualiza usuário       |
| `DELETE` | `/users/:id`    | Remove usuário         |

---

## Build para produção

```bash
ng build
```

Os artefatos são gerados em `dist/UserFlow/browser/`.
