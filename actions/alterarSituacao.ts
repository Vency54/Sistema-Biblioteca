"use server";

import { alterarSit } from "@/type/Emprestimo";
import { revalidatePath } from "next/cache";

export default async function alterarSituacao(id: string, situacao: string) {
  await alterarSit(id, situacao);
  revalidatePath("/");
}
