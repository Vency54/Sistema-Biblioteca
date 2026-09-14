// Indica que este componente será executado no lado do cliente.
// É necessário porque o Recharts utiliza recursos do navegador.
"use client";

// Importa o tipo Emprestimos do seu projeto.
// Ele define a estrutura de cada empréstimo.
import { Emprestimo } from "@/type/Emprestimo";

// Importa os componentes necessários da biblioteca Recharts
// para construir o gráfico de barras.
import {
  BarChart, // Componente principal do gráfico de barras
  Bar, // Representa as barras do gráfico
  XAxis, // Eixo horizontal (X)
  YAxis, // Eixo vertical (Y)
  CartesianGrid, // Grade de fundo do gráfico
  Tooltip, // Mostra informações ao passar o mouse
  ResponsiveContainer, // Faz o gráfico se adaptar ao tamanho disponível
} from "recharts";

// Define as propriedades (props) que o componente irá receber.
type Props = {
  // Recebe um array contendo todos os empréstimos.
  emprestimo: Emprestimo[];
};

// Componente responsável por criar o gráfico de situação dos empréstimos.
export default function Grafico({ emprestimo }: Props) {
  // Conta quantos empréstimos possuem a situação "Reservado".
  //
  // filter() cria um novo array contendo apenas os empréstimos
  // que atendem à condição.
  //
  // length retorna a quantidade de elementos encontrados.
  let qtdeReservado = emprestimo.filter(
    (e) => e.Situacao === "RESERVADO",
  ).length;

  // Conta quantos empréstimos possuem a situação "Emprestado".
  let qtdeEmprestado = emprestimo.filter(
    (e) => e.Situacao === "EMPRESTADO",
  ).length;

  // Conta quantos empréstimos possuem a situação "Atrasado".
  let qtdeAtrasado = emprestimo.filter((e) => e.Situacao === "ATRASADO").length;

  // Conta quantos empréstimos possuem a situação "Entregue".
  let qtdeDevolvido = emprestimo.filter(
    (e) => e.Situacao === "DEVOLVIDO",
  ).length;

  // Cria os dados que serão utilizados pelo gráfico.
  //
  // Cada objeto representa uma barra.
  //
  // "nome" será utilizado no eixo X.
  // "quantidade" será utilizada para definir o tamanho da barra.
  const dados = [
    {
      nome: "Reservado",
      quantidade: qtdeReservado,
    },

    {
      nome: "Emprestado",
      quantidade: qtdeEmprestado,
    },

    {
      nome: "Atrasado",
      quantidade: qtdeAtrasado,
    },

    {
      nome: "Devolvido",
      quantidade: qtdeDevolvido,
    },
  ];

  // Retorna o HTML/JSX que será exibido na página.
  return (
    // Define uma área para o gráfico.
    //
    // width: "100%" → ocupa toda a largura disponível.
    // height: 400 → define uma altura de 400 pixels.
    <div style={{ width: "100%", height: 300, minWidth: 500 }}>
      {/* 
                ResponsiveContainer faz o gráfico se adaptar
                automaticamente ao tamanho da div.
            */}
      <ResponsiveContainer>
        {/*
                    BarChart é o componente principal do gráfico.

                    data={dados} informa quais dados serão
                    utilizados para construir o gráfico.
                */}
        <BarChart data={dados}>
          {/*
                        Adiciona uma grade ao fundo do gráfico.

                        strokeDasharray="3 3" deixa as linhas
                        da grade tracejadas.
                    */}
          <CartesianGrid strokeDasharray="3 3" />

          {/*
                        Configura o eixo X.

                        dataKey="nome" indica que o eixo X deve
                        utilizar o campo "nome" dos objetos
                        dentro de "dados".
                    */}
          <XAxis dataKey="nome" />

          {/*
                        Configura o eixo Y.

                        Como não foi definido nenhum dataKey,
                        o Recharts utiliza automaticamente os
                        valores numéricos encontrados nos dados.
                    */}
          <YAxis />

          {/*
                        Exibe uma pequena caixa com informações
                        quando o usuário passa o mouse sobre uma barra.
                    */}
          <Tooltip />

          {/*
                        Define as barras do gráfico.

                        dataKey="quantidade" indica que o tamanho
                        de cada barra será baseado no valor
                        armazenado em "quantidade".
                    */}
          <Bar dataKey="quantidade" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
