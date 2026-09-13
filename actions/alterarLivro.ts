"use server";
import { addLivros, alterarLivro, getLivros } from "@/type/Livro";
import { revalidatePath } from "next/cache";

export default async function AlterarLivro(prevState: any, formdata: FormData) {
  const ISBNOriginal = formdata.get("ISBNOriginal") as string;
  const Nome = formdata.get("Nome") as string;
  const Autor = formdata.get("Autor") as string;
  const ISBN = formdata.get("ISBN") as string;
  const Ano = formdata.get("Ano") as string;
  const Quantidade = formdata.get("Quantidade") as string;

  if (!Nome || !Autor || !ISBN || !Ano || !Quantidade) {
    return { message: "Preencha todos os campos!" };
  }

  const novoLivro = {
    id: Date.now().toString(),
    Nome,
    Autor,
    ISBN,
    Ano,
    Quantidade,
  };
  await alterarLivro(ISBNOriginal, novoLivro);
  revalidatePath("/");
  return { message: "Funcionou" };
}
