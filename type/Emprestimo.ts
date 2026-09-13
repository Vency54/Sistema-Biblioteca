import { db } from "@/prisma/db";

export type Situacoes = "RESERVADO" | "EMPRESTADO" | "DEVOLVIDO" | "ATRASADO";

export type Emprestimo = {
  IdEmprestimo: string;
  ISBN: string;
  leitorId: string;
  DataEmprestimo: string;
  DataDevolucao: string;
  Situacao: Situacoes;
};

export type EmprestimoDados = {
  ISBN: string;
  leitorId: string;
  DataEmprestimo: string;
  DataDevolucao: string;
  Situacao: Situacoes;
};

export async function getEmprestimo() {
  const emprestimos = await db.orm.public.Emprestimo.all();

  const resultado = await Promise.all(
    emprestimos.map(async (emprestimo) => {
      const livro = await db.orm.public.Livro.where({
        ISBN: emprestimo.ISBN,
      }).first();

      const leitor = await db.orm.public.Leitor.where({
        IdLeitor: emprestimo.leitorId,
      }).first();

      return {
        ...emprestimo,
        livro,
        leitor,
      };
    }),
  );

  return resultado;
}

export async function addEmprestimo(loan: Emprestimo) {
  await db.orm.public.Emprestimo.create({
    IdEmprestimo: loan.IdEmprestimo,
    ISBN: loan.ISBN,
    leitorId: loan.leitorId,
    DataEmprestimo: loan.DataEmprestimo,
    DataDevolucao: loan.DataDevolucao,
    Situacao: loan.Situacao,
  });
}

export async function alterarEmprestimo(
  IdEmprestimoAntigo: string,
  emprestimo: EmprestimoDados,
) {
  const emprestimoAntigo = await db.orm.public.Emprestimo.where({
    IdEmprestimo: IdEmprestimoAntigo,
  }).first();

  if (!IdEmprestimoAntigo) {
    return getEmprestimo();
  }

  await db.orm.public.Emprestimo.where({
    IdEmprestimo: IdEmprestimoAntigo,
  }).update({
    ISBN: emprestimo.ISBN,
    leitorId: emprestimo.leitorId,
    DataEmprestimo: emprestimo.DataEmprestimo,
    DataDevolucao: emprestimo.DataDevolucao,
    Situacao: emprestimo.Situacao,
  });
  getEmprestimo();
}

export async function alterarSit(IdEmprestimo: string, situacao: Situacoes) {
  await db.orm.public.Emprestimo.where({ IdEmprestimo }).update({
    Situacao: situacao,
  });
}

export async function removerEmprestimo(IdEmprestimo: string) {
  await db.orm.public.Emprestimo.where({ IdEmprestimo }).delete();
}
