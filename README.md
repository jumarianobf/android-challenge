
# 🦷 Parrot Tech — Backend API

API REST para gerenciamento odontológico, desenvolvida em Spring Boot, responsável por gerenciar dados de usuários, atendimentos, clínicas, dentistas e imagens.

---

## 👥 **Integrantes do Grupo**

- **Julia Mariano Barsotti Ferreira - RM552713**
- **Leonardo Gaspar Saheb - RM553383**
- **Caio Eduardo Nascimento Martins - RM554025**

---

## 🔗 **Frontend (Mobile App)**

O app mobile que consome esta API está disponível em:  
👉 [parrot-tech-app](https://github.com/seu-user/parrot-tech-app)

---

## 🏗️ **Tecnologias Utilizadas**

- Java 17
- Spring Boot
- Spring Data JPA
- Spring Security (JWT)
- Lombok
- PostgreSQL ou Oracle (dependendo da configuração)
- Upload de Imagens (via API REST)
- RabbitMQ (Mensageria)
- Framework Spring AI (AzureOpenAiChatModel)

---

## 🗺️ **Diagrama da Solução**

🔗 [Acesse o diagrama no Excalidraw](https://excalidraw.com/#json=3MFUGxGc3uiOip-2LvJ2p,RvmWaDGcUM_MzYEL-Yagxw)

---

## 🚀 **Como Rodar o Projeto Backend**

### ✅ Pré-requisitos

- Java 17 instalado
- Maven ou sua IDE (IntelliJ, Eclipse ou Spring Tool Suite)
- Banco de dados rodando (PostgreSQL, Oracle ou H2)
- RabbitMQ (se desejar testar mensageria)

---

### 🔧 Passos para executar:

1. Clone o projeto:
```bash
git clone https://github.com/seu-user/parrot-tech-backend.git
```

2. Acesse a pasta:
```bash
cd parrot-tech-backend
```

3. Configure o banco de dados em:
```plaintext
src/main/resources/application.properties
```
Exemplo de configuração:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/parrottech
spring.datasource.username=seu_usuario
spring.datasource.password=sua_senha
spring.jpa.hibernate.ddl-auto=update
```

4. Execute o projeto:
- ✅ Pela sua IDE: Rode a classe `ChallengeApplication.java`
- ✅ Pelo terminal:
```bash
./mvnw spring-boot:run
```

---

## 🔗 **Endpoints principais da API**

| Método | Endpoint                          | Descrição                         |
|--------|------------------------------------|------------------------------------|
| GET    | /api/usuarios                      | Listar usuários                   |
| POST   | /api/usuarios                      | Criar usuário                     |
| GET    | /api/atendimentos/usuario/{id}     | Listar atendimentos por usuário   |
| POST   | /api/atendimentos/upload           | Criar atendimento com imagem      |
| GET    | /api/imagens/usuario/{usuarioId}   | Listar imagens do usuário         |
| POST   | /api/imagens/upload                | Upload de imagem para usuário     |

---

## 🧠 **Funcionalidades Implementadas**

- ✅ CRUD completo de Usuários
- ✅ CRUD completo de Clínicas
- ✅ CRUD completo de Dentistas
- ✅ CRUD completo de Atendimentos
- ✅ Upload e gerenciamento de imagens
- ✅ Mensageria com RabbitMQ (Logs de ações)
- ✅ Autenticação com Spring Security (JWT)
- ✅ Framework Spring AI (AzureOpenAiChatModel)

---

## ⚠️ **Observação**

- As imagens são armazenadas em uma pasta local `/uploads` na raiz do projeto.
- Se quiser, pode integrar com serviços externos como AWS S3 no futuro.

---

## 📜 **Licença**

- 📝 Este projeto é de uso acadêmico — **FIAP (Faculdade de Informática e Administração Paulista)**.
