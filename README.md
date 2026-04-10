# 🚀 UserFlow — Gerenciamento de Usuários

![Angular](https://img.shields.io/badge/Angular-19+-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Material_Design](https://img.shields.io/badge/Material_Design-747474?style=for-the-badge&logo=materialdesign&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)

Uma aplicação front-end de alta performance para gerenciamento de usuários, desenvolvida como solução para um desafio técnico. O projeto foca em reatividade moderna, performance e experiência do usuário premium.

---

## ✨ Funcionalidades

- **Listagem Dinâmica:** Visualização de usuários com suporte a paginação.
- **Busca Reativa:** Filtro por nome com *debounce* de 300ms para otimização de requisições.
- **Gestão de Usuários (CRUD):** Criar e editar informações através de modais intuitivos.
- **Validações Robustas:** Padrões rigorosos para CPF, E-mail e Telefone, utilizando validação reativa e integração com lógica de erros personalizada.
- **Feedback ao Usuário:** Estados de carregamento (*spinners*), mensagens de erro amigáveis e notificações (*snackbars*).

---

## 🏗️ Arquitetura e Tech Stack

O projeto utiliza o que há de mais moderno no ecossistema Angular:

- **Standalone Components:** Arquitetura sem módulos para menor *boilerplate* e carregamento mais rápido.
- **Signals:** Gerenciamento de estado fino e performático.
- **RxJS:** Fluxos assíncronos complexos gerenciados de forma declarativa.
- **Change Detection OnPush:** Otimização máxima de renderização.
- **Zod Patterns:** Estrutura preparada para extração e tratamento de erros de validação.
- **Vitest:** Suite de testes unitários moderna e rápida (substituindo o Karma/Jasmine).

---

## 🚀 Como Executar

### 🐳 Via Docker (Recomendado)

O projeto está totalmente containerizado e pronto para rodar com um único comando:

```bash
cd UserFlow
```

```bash
docker compose up --build
```

- **Aplicação:** [http://localhost:8080](http://localhost:8080)
- **API Mockada (JSON Server):** [http://localhost:3000/users](http://localhost:3000/users)

#### Perfis de Execução:
- **Desenvolvimento (Hot Reload):** `docker compose --profile dev up`
- **Testes com Cobertura:** `docker compose run --rm test`

---

### 🛠️ Manualmente (Node.js)

1. **Instalar dependências:**
   ```bash
   cd UserFlow
   npm install
   ```
2. **Subir API Mockada:**
   ```bash
   npx json-server --watch db.json --port 3000
   ```
3. **Iniciar Angular:**
   ```bash
   npm start
   ```

---

## 🧪 Testes e Qualidade

Para garantir a confiabilidade, o projeto conta com cobertura de testes unitários superior a **60%**.

```bash
# Rodar testes
npm test

# Ver cobertura detalhada
npx vitest run --coverage
```

---

## 📁 Estrutura do Projeto

```text
src/app/
├── components/        # Componentes UI e Features (Standalone)
├── core/              # Utilitários globais e validações
├── enum/              # Tipagens enumeradas (ex: tipos de telefone)
├── models/            # Interfaces de dados (DTOs e Models)
├── services/          # Lógica de comunicação com API (RxJS)
└── app.routes.ts      # Configuração de rotas
```

---

Desenvolvido com 💙 por [Suelen Medina](https://github.com/suelenmedinape)
