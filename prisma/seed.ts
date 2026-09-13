import "dotenv/config";

import pg from "pg";

const { Client } = pg;

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

const leitores = [
  {
    IdLeitor: "1",
    Cpf: "12345678901",
    Nome: "João Silva",
    Idade: "20",
    Email: "joao@email.com",
    Telefone: "13999999999",
    Imagem: "https://i.pravatar.cc/300?img=12",
  },
  {
    IdLeitor: "2",
    Cpf: "98765432100",
    Nome: "Maria Santos",
    Idade: "22",
    Email: "maria@email.com",
    Telefone: "13988888888",
    Imagem: "https://i.pravatar.cc/300?img=47",
  },
  {
    IdLeitor: "3",
    Cpf: "45678912300",
    Nome: "Pedro Oliveira",
    Idade: "19",
    Email: "pedro@email.com",
    Telefone: "13977777777",
    Imagem: "https://i.pravatar.cc/300?img=11",
  },
  {
    IdLeitor: "4",
    Cpf: "32165498700",
    Nome: "Ana Costa",
    Idade: "25",
    Email: "ana@email.com",
    Telefone: "13966666666",
    Imagem: "https://i.pravatar.cc/300?img=44",
  },
  {
    IdLeitor: "5",
    Cpf: "74185296300",
    Nome: "Lucas Souza",
    Idade: "21",
    Email: "lucas@email.com",
    Telefone: "13955555555",
    Imagem: null,
  },
];

async function main() {
  await client.connect();

  for (const leitor of leitores) {
    await client.query(
      `
      INSERT INTO leitor
      ("IdLeitor", "Cpf", "Nome", "Idade", "Email", "Telefone", "Imagem")
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      ON CONFLICT ("IdLeitor") DO NOTHING
      `,
      [
        leitor.IdLeitor,
        leitor.Cpf,
        leitor.Nome,
        leitor.Idade,
        leitor.Email,
        leitor.Telefone,
        leitor.Imagem,
      ],
    );
  }

  await client.end();

  console.log("Leitores inseridos com sucesso!");
}

main().catch(async (erro) => {
  console.error(erro);
  await client.end();
  process.exit(1);
});
