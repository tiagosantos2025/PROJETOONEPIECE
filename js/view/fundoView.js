/* VIEW — imagem de fundo, transparente, atrás de toda a página.
   Também troca por uma foto específica do personagem enquanto o mouse está no card.
   Se um arquivo não existir, aquele fundo simplesmente não aparece. */
OP.View.Fundo = {
  padrao: null,
  personagem: null,
  opacidade: 0.25,
  opacidadePersonagem: 0.35,
  padraoPronto: false,
  personagemVisivel: false,
  pedido: 0,

  render: function (elemento, fundo) {
    var self = this;
    this.padrao = elemento;
    this.opacidade = fundo.opacidade;
    this.opacidadePersonagem = fundo.opacidadePersonagem || fundo.opacidade;

    // Segunda camada, por cima da primeira, para o fundo do personagem
    this.personagem = document.createElement("div");
    this.personagem.className = "fundo fundo--personagem";
    this.personagem.setAttribute("aria-hidden", "true");
    elemento.parentNode.insertBefore(this.personagem, elemento.nextSibling);

    var teste = new Image();
    teste.onload = function () {
      elemento.style.backgroundImage = 'url("' + fundo.imagem + '")';
      self.padraoPronto = true;
      if (!self.personagemVisivel) elemento.style.opacity = self.opacidade;
    };
    teste.src = fundo.imagem;
  },

  mostrarPersonagem: function (imagem) {
    var self = this;
    if (!imagem || !this.personagem) return;
    var meu = ++this.pedido;

    var teste = new Image();
    teste.onload = function () {
      if (meu !== self.pedido) return; // o mouse já saiu ou mudou de card
      self.personagem.style.backgroundImage = 'url("' + imagem + '")';
      self.personagem.style.opacity = self.opacidadePersonagem;
      self.padrao.style.opacity = 0;
      self.personagemVisivel = true;
    };
    teste.src = imagem;
  },

  voltar: function () {
    if (!this.personagem) return;
    this.pedido++;
    this.personagemVisivel = false;
    this.personagem.style.opacity = 0;
    if (this.padraoPronto) this.padrao.style.opacity = this.opacidade;
  }
};
