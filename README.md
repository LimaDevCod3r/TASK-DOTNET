# TASK.NET - Fullstack Project

Este é um projeto Fullstack de gerenciamento de tarefas (To-Do List) desenvolvido com **React (Frontend)** e **.NET 10 (Backend)**, utilizando **PostgreSQL** como banco de dados.

O projeto foi projetado para ser fácil de rodar e testar, utilizando **Docker** para orquestrar todos os serviços.

---

## 🚀 Como Rodar com Docker (Recomendado)

Para rodar o projeto completo (Frontend, API e Banco de Dados) sem precisar configurar nada localmente, você só precisa ter o **Docker** e o **Docker Compose** instalados.

1. Navegue até a pasta raiz do projeto (onde está o arquivo `docker-compose.yml`).
2. Execute o comando:
   ```bash
   docker-compose up --build
   ```
3. Aguarde o build e a inicialização.
4. Acesse as aplicações:
   - **Frontend:** [http://localhost:3000](http://localhost:3000)
   - **Backend (Swagger):** [http://localhost:5226/swagger](http://localhost:5226/swagger)

---

## 🛠️ Endpoints da API

A API segue o padrão REST e todos os endpoints (exceto Login e Registro) exigem um **Token JWT** no Header (`Authorization: Bearer <token>`).

### 🔐 Autenticação & Usuários

| Método   | Endpoint             | Descrição                                              |
| :------- | :------------------- | :----------------------------------------------------- |
| `POST`   | `/api/user/register` | Cria uma nova conta de usuário.                        |
| `POST`   | `/api/auth/login`    | Autentica o usuário e retorna o Token JWT.             |
| `GET`    | `/api/user`          | Lista todos os usuários (Requer Auth).                 |
| `GET`    | `/api/user/{id}`     | Obtém detalhes de um usuário específico (Requer Auth). |
| `DELETE` | `/api/user/{id}`     | Remove um usuário (Requer Auth).                       |

### 📝 Tarefas (Tasks)

| Método   | Endpoint         | Descrição                                                       |
| :------- | :--------------- | :-------------------------------------------------------------- |
| `GET`    | `/api/task`      | Lista todas as tarefas do usuário logado.                       |
| `GET`    | `/api/task/{id}` | Obtém uma tarefa específica pelo ID.                            |
| `POST`   | `/api/task`      | Cria uma nova tarefa.                                           |
| `PATCH`  | `/api/task/{id}` | Atualiza parcialmente uma tarefa (Título, Descrição ou Status). |
| `DELETE` | `/api/task/{id}` | Remove uma tarefa permanentemente.                              |

---

## 💻 Tecnologias Utilizadas

### Frontend

- **React 19** com **TypeScript**
- **TailwindCSS** (Estilização Moderna)
- **Lucide React** (Ícones)
- **Axios** (Consumo de API)
- **React Router 7** (Navegação)

### Backend

- **.NET 10** (C#)
- **Entity Framework Core** (ORM)
- **PostgreSQL** (Banco de Dados)
- **JWT (JSON Web Token)** (Segurança)
- **Docker & Docker Compose** (Containerização)

---

## 📦 Estrutura do Projeto

- `/TaskReact`: Código fonte do Frontend em React.
- `/TaskManager.Api`: Código fonte do Backend em .NET.
- `docker-compose.yml`: Configuração para rodar todo o ecossistema.
