"use server";

import { getLeitor } from "@/type/Leitores";
export async function buscarLeitor() {
  return getLeitor();
}
