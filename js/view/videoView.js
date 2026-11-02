/* VIEW — desenha o vídeo do topo e o player (tocar/pausar, reiniciar, som).
   Os navegadores só deixam o vídeo tocar sozinho se estiver SEM som;
   por isso ele começa mudo e o som liga pelo botão (ou no primeiro clique). */
OP.View.Video = {
  render: function (container, video) {
    container.innerHTML = "";

    var tela = document.createElement("div");
    tela.className = "video__tela";

    var player = document.createElement("video");
    player.className = "video__player";
    player.src = video.arquivo;
    player.loop = true;
    player.muted = true;
    player.defaultMuted = true;
    player.playsInline = true;
    player.setAttribute("aria-label", "Vídeo de One Piece");
    tela.appendChild(player);

    // ---- Barra do player ----
    var controles = document.createElement("div");
    controles.className = "video__controles";
    controles.setAttribute("role", "group");
    controles.setAttribute("aria-label", "Controles do vídeo");

    function criarBotao() {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "video__botao";
      controles.appendChild(b);
      return b;
    }

    var botaoTocar = criarBotao();
    var botaoReiniciar = criarBotao();
    var botaoSom = criarBotao();
    botaoReiniciar.textContent = "Voltar ao começo";

    function atualizar() {
      var tocando = !player.paused;
      botaoTocar.textContent = tocando ? "Pausar" : "Tocar";
      botaoTocar.setAttribute("aria-label", tocando ? "Pausar o vídeo" : "Tocar o vídeo");

      var comSom = !player.muted;
      botaoSom.textContent = comSom ? "Desligar som" : "Ativar som";
      botaoSom.setAttribute("aria-pressed", comSom ? "true" : "false");
    }

    function tocar() {
      var tentativa = player.play();
      if (tentativa && tentativa.catch) tentativa.catch(function () {});
    }

    botaoTocar.addEventListener("click", function () {
      if (player.paused) tocar(); else player.pause();
    });
    botaoReiniciar.addEventListener("click", function () {
      player.currentTime = 0;
      tocar();
    });
    botaoSom.addEventListener("click", function () { player.muted = !player.muted; });

    player.addEventListener("play", atualizar);
    player.addEventListener("pause", atualizar);
    player.addEventListener("volumechange", atualizar);
    atualizar();

    // ---- Começa a tocar sozinho (sem som) ----
    var reduzirMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduzirMovimento) {
      player.autoplay = true;
      tocar();
    }

    // ---- Som no primeiro clique ou tecla em qualquer lugar da página ----
    if (video.somAoInteragir && !reduzirMovimento) {
      var ligarUmaVez = function (evento) {
        document.removeEventListener("pointerdown", ligarUmaVez);
        document.removeEventListener("keydown", ligarUmaVez);
        if (controles.contains(evento.target)) return; // os botões cuidam de si mesmos
        player.muted = false;
        if (player.paused) tocar();
      };
      document.addEventListener("pointerdown", ligarUmaVez);
      document.addEventListener("keydown", ligarUmaVez);
    }

    // ---- Arquivo não encontrado ----
    player.addEventListener("error", function () {
      tela.innerHTML = "";
      var aviso = document.createElement("p");
      aviso.className = "video__aviso";
      aviso.textContent = "Coloque seu vídeo em " + video.arquivo;
      tela.appendChild(aviso);
      Array.prototype.forEach.call(controles.children, function (b) { b.disabled = true; });
    });

    container.appendChild(tela);
    container.appendChild(controles);
  }
};
