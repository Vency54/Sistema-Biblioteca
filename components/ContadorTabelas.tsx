import { Emprestimos } from "@/type/Emprestimo";
import { Leitores } from "@/type/Leitores";
import { Livro } from "@/type/Livro";

type props = {
  element: Livro[] | Leitores[] | Emprestimos[];
};

export default async function Contador({ element }: props) {
  let contagem = 0;

  element.forEach((l) => {
    contagem++;
  });

  return contagem;
}
