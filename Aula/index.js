const express = require("express");
const app = express();
app.use(express.json());

//GET /instrutores
//GET /instrutores/5
//POST, PATCH, PUT, DELETE

const listaDeInstrutores = [
  {
    id: 1,
    nome: "Junior",
    idade: 29,
    areaDeAtuacao: "Logica",
  },
  {
    id: 2,
    nome: "Dina",
    idade: 19,
    areaDeAtuacao: "Back-end",
  },
  {
    id: 3,
    nome: "Guido Cerqueira",
    idade: 30,
    areaDeAtuacao: "Full-stack",
  },
  {
    id: 4,
    nome: "Victor Magalhães",
    idade: 28,
    areaDeAtuacao: "Front-end",
  }
];

let proximoId = 5;

//Listar todos os Instrutores
app.get("/instrutores", (req, res) => {
  res.json(listaDeInstrutores); //res.json é o padrão das API REST
});

//Mostrar UM instrutor em específico
app.get("/instrutores/:idConsultado", (req, res) => {
  //Achar um instrutor em específico
  const instrutor = listaDeInstrutores.find(
    instrutor => instrutor.id === Number(req.params.idConsultado)
  );
  res.json(instrutor);
});

//Criar um instrutor
app.post("/instrutores", (req, res) => {
  const novoInstrutor = {
    id: proximoId,
    nome: req.body.nome,
    idade: req.body.idade,
    areaDeAtuacao: req.body.areaDeAtuacao
  }

  //Adicionando ao final do array
  listaDeInstrutores.push(novoInstrutor);
  proximoId++;

  res.json(novoInstrutor);
});

// Editar um elemento que já existe
app.patch("/instrutores/:idConsultado", (req, res) => {
  const instrutor = listaDeInstrutores.find(
    instrutor => instrutor.id === Number(req.params.idConsultado)
  );

  //Editando algum elemento
  if (req.body.nome !== undefined) {
    instrutor.nome = req.body.nome;
  }

  if (req.body.idade !== undefined) {
    instrutor.idade = req.body.idade;
  }

  if (req.body.areaDeAtuacao !== undefined) {
    instrutor.areaDeAtuacao = req.body.areaDeAtuacao;
  }

  res.json(instrutor);
})

//Substituir um elemento da coleção (Substituir um instrutor)
//Se o ider que eu quero manipular substitui, se não existe ele cria.
app.put("/instrutores/:idConsultado", (req, res) => {
  const instrutor = listaDeInstrutores.find(
    instrutor => instrutor.id === Number(req.params.idConsultado)
  );

  if (instrutor) {
    //Substituir o existente
    instrutor.nome = req.body.nome;
    instrutor.idade = req.body.idade;
    instrutor.areaDeAtuacao = req.body.areaDeAtuacao;
    res.json(instrutor);
  } else {
    //Inserir um novo
    const novoInstrutor = req.body;
    listaDeInstrutores.push(novoInstrutor);
    res.json(novoInstrutor);
  }
});

//Excluir um instrutor
app.delete("/instrutores/:idConsultado", (req, res) => {
  const instrutor = listaDeInstrutores.find(
    instrutor => instrutor.id === Number(req.params.idConsultado)
  );

  const indice = listaDeInstrutores.indexOf(instrutor);

  listaDeInstrutores.splice(indice, 1);

  res.json(instrutor);
});

app.listen(8000);