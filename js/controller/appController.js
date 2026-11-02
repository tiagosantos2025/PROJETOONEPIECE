/* CONTROLLER — liga o Model às Views e cuida da navegação */
OP.Controller = {
  indiceAtual: 0,
  descricaoAberta: false,

  iniciar: function () {
    var self = this;

    document.getElementById("anterior").addEventListener("click", function () { self.andar(-1); });
    document.getElementById("proximo").addEventListener("click", function () { self.andar(1); });

    // Setas do teclado também navegam
    document.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") self.andar(-1);
      if (e.key === "ArrowRight") self.andar(1);
    });

    OP.View.Fundo.render(document.getElementById("fundo"), OP.Model.fundo);
    OP.View.Video.render(document.getElementById("video"), OP.Model.video);

    this.mostrar(0);
  },

  alternarDescricao: function () {
    this.descricaoAberta = !this.descricaoAberta;
    OP.View.Descricao.render(
      document.getElementById("descricao"),
      OP.Model.membros[this.indiceAtual],
      this.descricaoAberta
    );
  },

  andar: function (passo) {
    this.mostrar(OP.Model.vizinho(this.indiceAtual, OP.Model.membros.length, passo));
  },

  mostrar: function (indice) {
    var self = this;
    this.indiceAtual = indice;
    OP.View.Fundo.voltar();

    OP.View.Menu.render(
      document.getElementById("menu"),
      OP.Model.membros,
      indice,
      function (novoIndice) { self.mostrar(novoIndice); }
    );
    OP.View.Cards.render(
      document.getElementById("vitrine"),
      OP.Model.membros[indice],
      OP.Model.imagemReserva,
      function () { self.alternarDescricao(); },
      function (ligado) {
        if (ligado) OP.View.Fundo.mostrarPersonagem(OP.Model.membros[indice].fundo);
        else OP.View.Fundo.voltar();
      }
    );
    OP.View.Descricao.render(
      document.getElementById("descricao"),
      OP.Model.membros[indice],
      this.descricaoAberta
    );
  }
};
