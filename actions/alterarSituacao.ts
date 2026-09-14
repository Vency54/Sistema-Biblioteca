"use server";

import { alterarSit, Situacoes } from "@/type/Emprestimo";
import { revalidatePath } from "next/cache";

export default async function alterarSituacao(id: string, situacao: Situacoes) {
  await alterarSit(id, situacao);
  revalidatePath("/");
}
