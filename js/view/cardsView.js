/* VIEW — desenha o card do membro selecionado.
   Cada membro tem 3 ou mais imagens. A imagem fica fosca; ao passar o mouse
   ela fica nítida e aparecem as setas e os pontinhos para trocar de imagem. */
OP.View.Cards = {
  render: function (container, membro, imagemReserva, aoClicar, aoDestacar) {
    container.innerHTML = "";

    var imagens = membro.imagens.map(OP.Model.normalizarImagem);
    var atual = 0;

    var card = document.createElement("article");
    card.className = "card";
    card.tabIndex = 0; // permite navegar por teclado

    // Imagem nítida (por baixo)
    var real = document.createElement("img");
    real.className = "card__imagem";
    real.addEventListener("error", function () {
      if (real.getAttribute("src") !== imagemReserva) real.src = imagemReserva;
    });

    // Imagem fosca (por cima; some no hover)
    var fosca = document.createElement("img");
    fosca.className = "card__fosca";
    fosca.alt = "";
    var etapaFosca = 0;
    fosca.addEventListener("error", function () {
      etapaFosca++;
      if (etapaFosca === 1) {
        // Arquivo fosco não encontrado: usa a nítida com desfoque automático
        fosca.classList.add("card__fosca--auto");
        fosca.src = imagens[atual].imagem;
      } else if (etapaFosca === 2) {
        fosca.src = imagemReserva;
      }
    });

    var etiqueta = document.createElement("div");
    etiqueta.className = "card__etiqueta";
    etiqueta.textContent = membro.nome;

    card.appendChild(real);
    card.appendChild(fosca);
    card.appendChild(etiqueta);

    // ---- Troca de imagens (só se houver mais de uma) ----
    var pontos = [];

    function mostrar(indice) {
      atual = (indice + imagens.length) % imagens.length;
      var item = imagens[atual];

      real.alt = membro.nome + " — imagem " + (atual + 1) + " de " + imagens.length;
      real.src = item.imagem;

      etapaFosca = item.fosca ? 0 : 1;
      fosca.classList.toggle("card__fosca--auto", !item.fosca);
      fosca.src = item.fosca || item.imagem;

      real.classList.remove("card__imagem--troca");
      void real.offsetWidth; // reinicia a animação
      real.classList.add("card__imagem--troca");

      pontos.forEach(function (ponto, i) {
        ponto.setAttribute("aria-current", i === atual ? "true" : "false");
      });
    }

    if (imagens.length > 1) {
      var criarBotao = function (classe, rotulo, simbolo, passo) {
        var b = document.createElement("button");
        b.type = "button";
        b.className = "card__botao " + classe;
        b.setAttribute("aria-label", rotulo);
        b.textContent = simbolo;
        b.addEventListener("click", function (e) {
          e.stopPropagation(); // não liga/desliga o efeito de toque do card
          mostrar(atual + passo);
        });
        card.appendChild(b);
      };
      criarBotao("card__botao--esq", "Imagem anterior", "\u2039", -1);
      criarBotao("card__botao--dir", "Próxima imagem", "\u203A", 1);

      var barra = document.createElement("div");
      barra.className = "card__pontos";
      imagens.forEach(function (_, i) {
        var ponto = document.createElement("button");
        ponto.type = "button";
        ponto.className = "card__botao card__ponto";
        ponto.setAttribute("aria-label", "Ver imagem " + (i + 1));
        ponto.addEventListener("click", function (e) {
          e.stopPropagation();
          mostrar(i);
        });
        pontos.push(ponto);
        barra.appendChild(ponto);
      });
      card.appendChild(barra);
    }

    mostrar(0);

    // Toque no celular: alterna o efeito (no computador o :hover já resolve)
    // Clique na foto: o Controller mostra/esconde a descrição à direita
    card.addEventListener("click", function () {
      card.classList.toggle("ativo");
      if (aoClicar) aoClicar();
      if (aoDestacar) aoDestacar(card.classList.contains("ativo") || card.matches(":hover"));
    });

    // Mouse sobre o card: o Controller troca o fundo da página
    card.addEventListener("mouseenter", function () { if (aoDestacar) aoDestacar(true); });
    card.addEventListener("mouseleave", function () { if (aoDestacar) aoDestacar(false); });
    card.addEventListener("keydown", function (e) {
      if (e.target === card && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        card.click();
      }
    });

    container.appendChild(card);
  }
};
