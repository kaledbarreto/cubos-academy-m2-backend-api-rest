const express = require("express");
const app = express();
app.use(express.json());

const livros = [
  {
    id: 1,
    titulo: "A Odisséia de Jonas",
    autor: "Thomas Crawling",
    ano: 2001,
    numPaginas: 197
  },
  {
    id: 2,
    titulo: "Jonas e a sociedade escondida",
    autor: "Claire Crawling",
    ano: 2004,
    numPaginas: 158
  }
];

let proximoId = livros.length + 1;

//Lista de Livros - GET
app.get("/livros", (req, res) => {
  res.json(livros);
});

//Buscar Livro - GET
app.get("/livros/:idLivro", (req, res) => {
  const livro = livros.find(
    livro => livro.id === Number(req.params.idLivro)
  );
  if (livro === undefined) {
    res.json({
      "mensagem": "O valor do parâmetro ID da URL não é um número válido."
    });
  } else {
    res.json(livro);
  }
});

//Adicionar um livro - POST
app.post("/livros", (req, res) => {
  const novoLivro = {
    id: proximoId,
    titulo: req.body.titulo,
    autor: req.body.autor,
    ano: req.body.ano,
    numPaginas: req.body.numPaginas
  }

  livros.push(novoLivro);
  proximoId++;

  res.json(novoLivro);
});

//Substituindo um livro - PUT
app.put("/livros/:idLivro", (req, res) => {
  const livro = livros.find(
    livro => livro.id === Number(req.params.idLivro)
  );

  if (livro) {
    livro.titulo = req.body.titulo;
    livro.autor = req.body.autor;
    livro.ano = req.body.ano;
    livro.numPaginas = req.body.numPaginas;
    res.json({
      "mensagem": "Livro substituído."
    });
  } else {
    res.json({
      "mensagem": "Não existe livro a ser substituído para o ID informado."
    });
  }
});

//Alterando um livro - PATCH
app.patch("/livros/:idLivro", (req, res) => {
  const livro = livros.find(
    livro => livro.id === Number(req.params.idLivro)
  );

  let alterar;

  if (livro !== undefined) {
    res.json({
      "mensagem": "Livro alterado."
    });
    alterar = true;
  } else {
    alterar = false;
    res.json({
      "mensagem": "Não existe livro a ser alterado para o ID informado."
    });
  }

  if (alterar) {
    if (req.body.titulo !== undefined) {
      livro.titulo = req.body.titulo;
    }

    if (req.body.autor !== undefined) {
      livro.autor = req.body.autor;
    }

    if (req.body.ano !== undefined) {
      livro.ano = req.body.ano;
    }
    if (req.body.numPaginas !== undefined) {
      livro.numPaginas = req.body.numPaginas;
    }
  }
});

//Excluir um Livro - DELETE
app.delete("/livros/:idConsultado", (req, res) => {
  const livro = livros.find(
    livro => livro.id === Number(req.params.idConsultado)
  );

  if (livro === undefined) {
    res.json({
      "mensagem": "Não existe livro a ser removido para o ID informado."
    });
  } else {
    const indice = livros.indexOf(livro);
    livros.splice(indice, 1);

    res.json({
      "mensagem": "Livro removido."
    });
  }
});

app.listen(8000);