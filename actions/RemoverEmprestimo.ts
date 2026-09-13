"use server";
import { removerEmprestimo } from "@/type/Emprestimo";
import { revalidatePath } from "next/cache";

export default async function RemoverEmprestimo(id: string) {
  await removerEmprestimo(id);
  revalidatePath("/");
}
