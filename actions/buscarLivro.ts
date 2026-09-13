"use server";

import { getLivros } from "@/type/Livro";

export async function buscarLivros() {
  return getLivros();
}
