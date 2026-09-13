import { supabase } from "@/src/lib/supabase";

import { db } from "@/prisma/db";

export type Livro = {
  Nome: string;
  Autor: string;
  ISBN: string;
  Ano: string;
  Quantidade: string;
  Imagem?: string;
  Genero: string;
  Sinopse: string;
};

export async function getLivros() {
  return db.orm.public.Livro.all();
}

export async function addLivros(book: Livro) {
  await db.orm.public.Livro.create({
    ISBN: book.ISBN,
    Nome: book.Nome,
    Autor: book.Autor,
    Ano: book.Ano,
    Quantidade: book.Quantidade,
    Imagem: book.Imagem ?? null,
    Genero: book.Genero,
    Sinopse: book.Sinopse,
  });

  return getLivros();
}

export async function alterarLivro(ISBNAntigo: string, book: Livro) {
  const livroAntigo = await db.orm.public.Livro.where({
    ISBN: ISBNAntigo,
  }).first();

  if (!livroAntigo) {
    return getLivros();
  }

  db.orm.public.Livro.where({ ISBN: ISBNAntigo }).update({
    ISBN: book.ISBN,
    Nome: book.Nome,
    Autor: book.Autor,
    Ano: book.Ano,
    Quantidade: book.Quantidade,
    Imagem: book.Imagem ?? livroAntigo.Imagem,
    Genero: book.Genero,
    Sinopse: book.Sinopse,
  });

  return getLivros();
}

export async function alterarQtde(ISBN: string, Qtde: number) {
  await db.orm.public.Livro.where({ ISBN: ISBN }).update({
    Quantidade: String(Qtde),
  });
}

export async function removerLivro(ISBN: string) {
  const livro = await db.orm.public.Livro.where({ ISBN }).first();

  if (!livro) {
    return;
  }

  if (livro.Imagem) {
    const url = new URL(livro.Imagem);

    const caminho = url.pathname.split("/livros/")[1];

    if (caminho) {
      await supabase.storage.from("livros").remove([caminho]);
    }
  }

  await db.orm.public.Livro.where({ ISBN }).delete();
}
