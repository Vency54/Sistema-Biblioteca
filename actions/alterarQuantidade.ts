"use server";

import { alterarQtde } from "@/type/Livro";
import { revalidatePath } from "next/cache";

export default async function alterarQuantidade(
  id: string,
  quantidade: number,
) {
  await alterarQtde(id, quantidade);
  revalidatePath("/");
}
