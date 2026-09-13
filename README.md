# 📚 Sistema de Biblioteca

Aplicação web para gerenciamento de uma biblioteca, permitindo cadastrar livros e leitores, controlar empréstimos e acompanhar as informações do acervo.

## 🚀 Tecnologias

* Next.js
* React
* TypeScript
* Prisma ORM
* PostgreSQL
* Supabase Storage
* Tailwind CSS

## ⚙️ Funcionalidades

* Cadastro, edição e exclusão de livros
* Cadastro e gerenciamento de leitores
* Controle de empréstimos
* Controle da quantidade de livros disponíveis
* Upload de capas dos livros
* Consulta das informações do acervo
* Dashboard com informações da biblioteca

## 📦 Instalação

Clone o repositório:

```bash
git clone URL_DO_REPOSITORIO
```

Entre na pasta:

```bash
cd biblioteca
```

Instale as dependências:

```bash
npm install
```

Configure as variáveis de ambiente no arquivo `.env`:

```env
DATABASE_URL="sua_url_do_banco"
```

Depois, gere o Prisma Client:

```bash
npx prisma generate
```

Execute o projeto:

```bash
npm run dev
```

A aplicação estará disponível em:

```text
http://localhost:3000
```

## 🗄️ Banco de dados

O projeto utiliza **PostgreSQL** para armazenar os dados da aplicação e **Prisma ORM** para comunicação com o banco.

As principais entidades são:

* **Livro**
* **Leitor**
* **Empréstimo**

## 📁 Estrutura básica

```text
biblioteca/
├── app/
├── components/
├── prisma/
├── public/
├── .env
├── package.json
└── README.md
```

## 📝 Status

🚧 Projeto em desenvolvimento.
