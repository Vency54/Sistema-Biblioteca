"use server";

import { addEmprestimo, Situacoes } from "@/type/Emprestimo";
import { getLivros } from "@/type/Livro";
import { revalidatePath } from "next/cache";
import alterarQuantidade from "./alterarQuantidade";

export default async function criarEmprestimo(
  prevState: any,
  formdata: FormData,
) {
  const ISBN = formdata.get("ISBN") as string;
  const leitorId = formdata.get("idLeitor") as string;
  const DataEmprestimo = formdata.get("Data_Emprestimo") as string;
  const DataDevolucao = formdata.get("Data_Devolucao") as string;
  const Situacao = formdata.get("Situacao") as Situacoes;

  if (!ISBN || !leitorId || !DataEmprestimo || !DataDevolucao || !Situacao) {
    return {
      message: "Preencha todos os campos!",
    };
  }

  const livros = await getLivros();

  const livro = livros.find((l) => l.ISBN === ISBN);

  if (!livro) {
    return {
      message: "Livro não encontrado!",
    };
  }

  if (Situacao !== "RESERVADO") {
    const NovaQtde = Number(livro.Quantidade) - 1;

    if (NovaQtde < 0) {
      return {
        message: "Livro fora de estoque!",
      };
    }

    await alterarQuantidade(livro.ISBN, NovaQtde);
  }

  const EmprestimoNovo = {
    IdEmprestimo: Date.now().toString(),
    ISBN,
    leitorId,
    DataEmprestimo,
    DataDevolucao,
    Situacao,
  };

  await addEmprestimo(EmprestimoNovo);

  revalidatePath("/");

  return {
    message: "Funcionou",
  };
}
