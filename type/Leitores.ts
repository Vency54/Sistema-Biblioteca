import { Emprestimo } from "./Emprestimo";
import { db } from "@/prisma/db";

export type Leitor = {
  IdLeitor: string;
  Cpf: string;
  Nome: string;
  Idade: string;
  Email: string;
  Telefone: string;
  Imagem?: string;
  emprestimos: Emprestimo[];
};

export async function getLeitor() {
  return db.orm.public.Leitor.all();
}

export async function addLeitor(user: Leitor) {
  await db.orm.public.Leitor.create({
    IdLeitor: user.IdLeitor,
    Cpf: user.Cpf,
    Nome: user.Nome,
    Idade: user.Idade,
    Email: user.Email,
    Telefone: user.Telefone,
    Imagem: user.Imagem ?? null,
  });
}

export async function removerLeitor(IdLeitor: string) {
  await db.orm.public.Leitor.where({ IdLeitor }).delete();
}
