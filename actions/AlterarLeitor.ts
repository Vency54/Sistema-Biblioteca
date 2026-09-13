"use server";

import { supabase } from "@/src/lib/supabase";
import { alterarLeitor } from "@/type/Leitores";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function AlterarLeitor(
  prevState: any,
  formdata: FormData,
) {
  const IdLeitorOriginal = formdata.get("IdLeitorOriginal") as string;

  const Nome = formdata.get("Nome") as string;
  const Cpf = formdata.get("Cpf") as string;
  const Idade = formdata.get("Idade") as string;
  const Email = formdata.get("Email") as string;
  const Telefone = formdata.get("Telefone") as string;

  const arquivo = formdata.get("Imagem");

  if (!IdLeitorOriginal || !Nome || !Cpf || !Idade) {
    return { message: "Preencha todos os campos!" };
  }

  let Imagem: string | undefined = undefined;

  if (arquivo instanceof File && arquivo.size > 0) {
    const extensao = arquivo.name.split(".").pop();

    const nomeArquivo = `${IdLeitorOriginal}-${crypto.randomUUID()}.${extensao}`;

    const { error } = await supabase.storage
      .from("leitores")
      .upload(nomeArquivo, arquivo, {
        contentType: arquivo.type,
      });

    if (error) {
      console.error("ERRO SUPABASE:", error);
      return { message: "Erro ao enviar a imagem!" };
    }

    const { data } = supabase.storage
      .from("leitores")
      .getPublicUrl(nomeArquivo);

    Imagem = data.publicUrl;
  }

  const novoLeitor = {
    IdLeitor: IdLeitorOriginal,
    Nome,
    Cpf,
    Idade,
    Email,
    Telefone,
    Imagem,
  };

  await alterarLeitor(IdLeitorOriginal, novoLeitor);

  revalidatePath("/leitor", "page");
  revalidatePath(`/leitor/${IdLeitorOriginal}`, "page");

  redirect(`/leitor/${IdLeitorOriginal}`);
}
