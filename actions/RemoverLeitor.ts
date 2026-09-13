"use server";
import { removerLeitor } from "@/type/Leitores";
import { revalidatePath } from "next/cache";

export default async function RemoverLeitor(id: string) {
  await removerLeitor(id);
  revalidatePath("/");
}
