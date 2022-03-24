const express = require("express");
const app = express();
app.use(express.json());

const convidados = ["Carlos", "Amanda", "Fernanda", "Juliana", "Lucas", "Roberto"];

//Convidados - GET
app.get("/convidados/lista", (req, res) => {
  res.json(convidados);
});

//Pesquisar Convidado - GET
app.get("/convidados", (req, res) => {
  const convidado = convidados.find(
    convidado => convidado === req.query.nome
  );
  if (convidado === undefined) {
    res.json({
      "mensagem": "O convidado buscado não está presente na lista."
    });
  } else {
    res.json({
      "mensagem": "Convidado presente."
    });
  }
})

//Adicionar um nome na lista de convidados
app.post("/convidados", (req, res) => {
  const convidado = convidados.find(
    convidado => convidado === req.body.nome
  );

  if (convidado === undefined) {
    convidados.push(req.body.nome);
    res.json({
      "mensagem": "Convidado adicionado."
    });
  } else {
    res.json({
      "mensagem": "O nome do convidado a ser adicionado já existe na lista. Caso queria adicionar outro convidado de mesmo nome, favor fornecer o sobrenome também."
    });
  }
});

//Remover um convidado da lista
app.delete("/convidados/:nomeConvidado", (req, res) => {
  const convidado = convidados.find(
    convidado => convidado === req.params.nomeConvidado
  );

  if (convidado === undefined) {
    res.json({
      "mensagem": "O nome do convidado a ser removido não existe na lista. Nenhum convidado foi removido."
    });
  } else {
    const indice = convidados.indexOf(convidado);
    convidados.splice(indice, 1);

    res.json({
      "mensagem": "Convidado removido."
    });
  }

});

app.listen(8000);