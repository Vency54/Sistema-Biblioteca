"use server";

import { alterarEmprestimo, Situacoes } from "@/type/Emprestimo";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function AlterarEmprestimo(
  prevState: any,
  formdata: FormData,
) {
  const IdEmprestimoOriginal = formdata.get("IdEmprestimoOriginal") as string;

  const ISBN = formdata.get("ISBN") as string;

  const leitorId = formdata.get("idLeitor") as string;

  const DataEmprestimo = formdata.get("Data_Emprestimo") as string;

  const DataDevolucao = formdata.get("Data_Devolucao") as string;

  const Situacao = formdata.get("Situacao") as Situacoes;

  if (
    !IdEmprestimoOriginal ||
    !ISBN ||
    !leitorId ||
    !DataEmprestimo ||
    !DataDevolucao ||
    !Situacao
  ) {
    return {
      message: "Preencha todos os campos!",
    };
  }

  await alterarEmprestimo(IdEmprestimoOriginal, {
    ISBN,
    leitorId,
    DataEmprestimo,
    DataDevolucao,
    Situacao,
  });

  revalidatePath("/emprestimo", "page");
  revalidatePath(`/emprestimo/${IdEmprestimoOriginal}`, "page");

  redirect(`/emprestimo/${IdEmprestimoOriginal}`);
}
