"use server";

import { addLivros } from "@/type/Livro";
import { revalidatePath } from "next/cache";
import { supabase } from "@/src/lib/supabase";

export default async function CriarLivro(prevState: any, formdata: FormData) {
  const Nome = formdata.get("Nome") as string;
  const Autor = formdata.get("Autor") as string;
  const ISBN = formdata.get("ISBN") as string;
  const Ano = formdata.get("Ano") as string;
  const Quantidade = formdata.get("Quantidade") as string;
  const arquivo = formdata.get("Imagem");
  const Genero = formdata.get("Genero") as string;
  const Sinopse = formdata.get("Sinopse") as string;

  if (!Nome || !Autor || !ISBN || !Ano || !Quantidade) {
    return { message: "Preencha todos os campos!" };
  }

  let Imagem: string | undefined = undefined;

  if (arquivo instanceof File && arquivo.size > 0) {
    console.log("Nome:", arquivo.name);
    console.log("Tamanho:", arquivo.size);
    console.log("Tipo:", arquivo.type);

    const extensao = arquivo.name.split(".").pop();
    const nomeArquivo = `${ISBN}-${crypto.randomUUID()}.${extensao}`;

    const { error } = await supabase.storage
      .from("livros")
      .upload(nomeArquivo, arquivo, {
        contentType: arquivo.type,
      });

    if (error) {
      console.error("ERRO SUPABASE:", error);
      return { message: "Erro ao enviar a imagem!" };
    }

    const { data } = supabase.storage.from("livros").getPublicUrl(nomeArquivo);

    Imagem = data.publicUrl;

    console.log("URL DA IMAGEM:", Imagem);
  }

  const novoLivro = {
    id: Date.now().toString(),
    Nome,
    Autor,
    ISBN,
    Ano,
    Quantidade,
    Imagem,
    Genero,
    Sinopse,
  };

  await addLivros(novoLivro);

  revalidatePath("/");

  return { message: "Funcionou" };
}
