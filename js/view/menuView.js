/* VIEW — desenha o menu com os nomes dos membros */
OP.View.Menu = {
  render: function (container, membros, indiceAtivo, aoSelecionar) {
    container.innerHTML = "";
    membros.forEach(function (membro, indice) {
      var botao = document.createElement("button");
      botao.type = "button";
      botao.className = "menu__item";
      botao.textContent = membro.nome.split(" (")[0]; // "Sanji (Vinsmoke Sanji)" → "Sanji"
      botao.setAttribute("aria-current", indice === indiceAtivo ? "true" : "false");
      botao.addEventListener("click", function () { aoSelecionar(indice); });
      container.appendChild(botao);
    });
  }
};
