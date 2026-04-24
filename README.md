# 🎉 FestApp — Frontend

Interface web do **FestApp**, um sistema SaaS para gerenciamento de locações de itens para festas e eventos. Desenvolvido com React 18 e Vite.

---

## 🖥️ Tecnologias

- [React 18](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [React Router DOM](https://reactrouter.com/)
- [Axios](https://axios-http.com/)
- [TailwindCSS](https://tailwindcss.com/) *(ou CSS Modules, ajuste conforme o seu projeto)*

---

## 📁 Estrutura do Projeto

```
festapp-frontend/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── services/       # Configuração do Axios / chamadas à API
│   ├── routes/
│   ├── App.jsx
│   └── main.jsx
├── .env.example
├── index.html
├── package.json
└── vite.config.js
```

---

## ⚙️ Configuração e Instalação

### Pré-requisitos

- Node.js 18+
- npm ou yarn
- Backend do FestApp rodando localmente ou em produção

### 1. Clone o repositório

```bash
git clone https://github.com/weslleysantos01/festapp-frontend.git
cd festapp-frontend
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_BASE_URL=http://localhost:8080
```

> Ajuste a URL conforme o endereço do backend.

### 4. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

Acesse em: [http://localhost:5173](http://localhost:5173)

---

## 🔐 Autenticação

O sistema utiliza **JWT (JSON Web Token)**. O token é armazenado no `localStorage` e enviado automaticamente nas requisições via interceptor do Axios.

Fluxo:
1. Usuário faz login → backend retorna o token JWT
2. Token é salvo no `localStorage`
3. Cada requisição protegida envia o header `Authorization: Bearer <token>`
4. Em caso de token expirado, o usuário é redirecionado para o login

---

## 📦 Build para Produção

```bash
npm run build
```

Os arquivos estarão na pasta `dist/`, prontos para deploy em qualquer servidor estático (Netlify, Vercel, Nginx, etc.).

---

## 🌐 Integração com o Backend

Este frontend consome a API REST do [FestApp Backend](https://github.com/weslleysantos01/festapp-backend).

Certifique-se de que o backend está rodando e que o CORS está configurado para aceitar requisições da origem do frontend.

---

---

## 📄 Licença

Este projeto é **proprietário e confidencial**. Todos os direitos reservados © Weslley Santos.

É **estritamente proibido** copiar, modificar, distribuir, sublicenciar ou utilizar este código, no todo ou em parte, sem autorização prévia e expressa do autor.

---

> Desenvolvido por [Weslley Santos](https://github.com/weslleysantos01)
