/* VIEW — mostra o nome e a descrição à direita, ao clicar na foto */
OP.View.Descricao = {
  render: function (elemento, membro, aberta) {
    elemento.innerHTML = "";

    var nome = document.createElement("h2");
    nome.className = "descricao__nome";
    nome.textContent = membro.nome;

    var texto = document.createElement("p");
    texto.className = "descricao__texto";
    texto.textContent = membro.descricao;

    elemento.appendChild(nome);
    elemento.appendChild(texto);
    elemento.classList.toggle("aberta", aberta);
  }
};
