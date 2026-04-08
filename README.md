# UserFlow
Uma aplicação front-end de alta performance para gerenciamento e listagem de usuários. Desenvolvida com Angular 21, focada em gerenciamento de estado reativo utilizando Signals, manipulação de fluxos assíncronos com RxJS e interface acessível com Angular Material.

## 🐳 Rodando com Docker

Esta aplicação está preparada para rodar em qualquer ambiente utilizando Docker. Siga os passos abaixo:

### Pré-requisitos
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Como executar

1. **Inicie a aplicação**:
   ```bash
   docker compose up -d
   ```

2. **Acesse a aplicação**:
   Abra seu navegador em [http://localhost:8080](http://localhost:8080).

### Rodando Testes (Docker)

Para rodar os testes sem precisar configurar dependências de navegador na sua máquina local:

```bash
docker compose -f docker-compose.test.yml run test
```
Este comando baixa a imagem oficial do Playwright, instala as dependências e executa o Vitest em modo headless.

### Comandos úteis

- **Parar a aplicação**: `docker compose down`
- **Reconstruir a imagem**: `docker compose build --no-cache`
- **Ver logs**: `docker compose logs -f`

## 🛠️ Desenvolvimento Local (sem Docker)

1. Instale as dependências:
   ```bash
   cd UserFlow
   npm install
   ```

2. Inicie o servidor de desenvolvimento:
   ```bash
   npm start
   ```
   Acesse em [http://localhost:4200](http://localhost:4200).
