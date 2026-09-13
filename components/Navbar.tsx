import Link from "next/link";

export default function Navbar() {
  return (
    <div className="flex items-center bg-gray-900 px-6 py-3 text-white">
      <div>
        <Link href="/" className="text-xl font-bold">
          Biblioteca Acervo+
        </Link>
      </div>

      <div className="flex-1"></div>

      <ul className="flex gap-4">
        <li>
          <Link href="/livros">Livros</Link>
        </li>

        <li>
          <Link href="/leitor">Leitores</Link>
        </li>

        <li>
          <Link href="/emprestimo">Empréstimos</Link>
        </li>
      </ul>
    </div>
  );
}
