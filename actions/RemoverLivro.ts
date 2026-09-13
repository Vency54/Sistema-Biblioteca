"use server";
import { removerLivro } from "@/type/Livro";
import { revalidatePath } from "next/cache";

export default async function RemoverLivro(ISBN: string) {
  await removerLivro(ISBN);
  revalidatePath("/");
}
