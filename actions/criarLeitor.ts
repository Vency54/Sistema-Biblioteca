"use server";
import { addLeitor } from "@/type/Leitores";
import { revalidatePath } from "next/cache";
import { supabase } from "@/src/lib/supabase";

export default async function CriarLeitor(prevState: any, formdata: FormData) {
  const Nome = formdata.get("Nome") as string;

  const Cpf = formdata.get("Cpf") as string;

  const Idade = formdata.get("Idade") as string;

  const Email = formdata.get("Email") as string;

  const Telefone = formdata.get("Telefone") as string;

  const arquivo = formdata.get("Imagem");

  if (!Nome || !Idade) {
    return { message: "Preencha todos os campos!" };
  }

  let Imagem: string | undefined = undefined;

  if (arquivo instanceof File && arquivo.size > 0) {
    console.log("Nome:", arquivo.name);
    console.log("Tamanho:", arquivo.size);
    console.log("Tipo:", arquivo.type);

    const extensao = arquivo.name.split(".").pop();
    const nomeArquivo = `${Cpf}-${crypto.randomUUID()}.${extensao}`;

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

    console.log("URL DA IMAGEM:", Imagem);
  }

  const novoLeitor = {
    IdLeitor: Date.now().toString(),
    Nome,
    Cpf,
    Idade,
    Email,
    Telefone,
    Imagem,
  };
  await addLeitor(novoLeitor);
  revalidatePath("/");
  return { message: "Funcionou" };
}
