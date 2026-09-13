"use server";

import { supabase } from "@/src/lib/supabase";
import { alterarLivro } from "@/type/Livro";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function AlterarLivro(prevState: any, formdata: FormData) {
  const ISBNOriginal = formdata.get("ISBNOriginal") as string;

  const Nome = formdata.get("Nome") as string;
  const Autor = formdata.get("Autor") as string;
  const ISBN = formdata.get("ISBN") as string;
  const Ano = formdata.get("Ano") as string;
  const Genero = formdata.get("Genero") as string;
  const Sinopse = formdata.get("Sinopse") as string;
  const Quantidade = formdata.get("Quantidade") as string;
  const arquivo = formdata.get("Imagem");

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
    Nome,
    Autor,
    ISBN,
    Ano,
    Genero,
    Sinopse,
    Quantidade,
    Imagem,
  };

  await alterarLivro(ISBNOriginal, novoLivro);

  revalidatePath("/livros", "page");
  revalidatePath(`/livros/${ISBNOriginal}`, "page");
  revalidatePath(`/livros/${ISBN}`, "page");

  redirect(`/livros/${ISBN}`);
}
