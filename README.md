
# 🦷 Parrot Tech - Mobile

## ✅ Descrição

Aplicativo mobile desenvolvido para gerenciamento de atendimentos odontológicos, utilizando React Native com Expo.

> ⚠️ **Atenção:** Este aplicativo **necessita do backend rodando** para funcionar corretamente. O backend está disponível no repositório:  
👉 [Link do Backend](https://github.com/jumarianobf/Backend-mobile)

---

## 👥 Integrantes do Grupo

- **Julia Mariano Barsotti Ferreira - RM552713**  
- **Leonardo Gaspar Saheb - RM553383**  
- **Caio Eduardo Nascimento Martins - RM554025**  

---

## 🗺️ Diagramas

👉 [Link do Diagrama no Excalidraw](https://excalidraw.com/#json=3MFUGxGc3uiOip-2LvJ2p,RvmWaDGcUM_MzYEL-Yagxw)

---

## 🚀 Tecnologias Utilizadas

- React Native
- Expo
- Axios
- TypeScript
- API REST (Backend Spring Boot)
- Context API para autenticação

---

## 🏗️ Pré-requisitos

- Node.js instalado
- Expo CLI instalado globalmente (`npm install -g expo-cli`)
- Backend rodando localmente ou hospedado

---

## 💻 Como rodar o projeto

1. **Clone o repositório:**
```bash
git clone https://github.com/seu-usuario/seu-repositorio-mobile.git
```

2. **Entre na pasta do projeto:**
```bash
cd challenge-java-master-mobile
```

3. **Instale as dependências:**
```bash
npm install
```

4. **Inicie o Expo:**
```bash
npx expo start
```

5. **Aponte o aplicativo para o backend:**
- Verifique e altere o IP no arquivo `/services/api.ts` para o IP local onde o backend está rodando.

Exemplo:
```ts
const api = axios.create({
  baseURL: 'http://192.168.xx.xx:8080/api'
});
```

---

## ⚙️ Funcionalidades

- CRUD completo de Atendimentos
- Upload de imagem no cadastro do atendimento
- Feedback de erros e validações
- Opção de **"Tentar Novamente"** em caso de falhas
- Aplicação fluída e responsiva

---

## 📜 Licença

Projeto desenvolvido para fins acadêmicos na **FIAP** - 2024.
