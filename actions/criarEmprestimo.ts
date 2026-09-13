"use server";
import { addEmprestimo, Situacoes } from "@/type/Emprestimo";
import { addLeitor } from "@/type/Leitores";
import { getLivros } from "@/type/Livro";
import { revalidatePath } from "next/cache";
import alterarQuantidade from "./alterarQuantidade";

export default async function criarEmprestimo(
  prevState: any,
  formdata: FormData,
) {
  const book = await getLivros();

  const NomeLivro = formdata.get("IdentLivro") as string;
  const ISBN = formdata.get("ISBN") as string;
  const NomeLeitor = formdata.get("IdentLeitor") as string;
  const leitorId = formdata.get("idLeitor") as string;
  const DataEmprestimo = formdata.get("Data_Emprestimo") as string;
  const DataDevolucao = formdata.get("Data_Devolucao") as string;
  const Situacao = formdata.get("Situacao") as Situacoes;

  if (!NomeLivro || !NomeLeitor || !Situacao) {
    return { message: "Preencha todos os campos!" };
  }

  const livro = book.find((l) => l.ISBN === ISBN);

  if (Situacao !== "Reservado") {
    const livro = book.find((l) => l.ISBN === ISBN);

    if (livro) {
      let NovaQtde = Number(livro.Quantidade) - 1;
      alterarQuantidade(livro.ISBN, NovaQtde);
    }
  }

  const EmprestimoNovo = {
    IdEmprestimo: Date.now().toString(),
    NomeLivro,
    ISBN,
    NomeLeitor,
    leitorId,
    DataEmprestimo,
    DataDevolucao,
    Situacao,
  };
  await addEmprestimo(EmprestimoNovo);
  revalidatePath("/");
  return { message: "Funcionou" };
}
