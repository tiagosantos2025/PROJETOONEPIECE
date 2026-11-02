/* ===========================================================
   MODEL — aqui ficam os textos, imagens e o vídeo da página.
   Para personalizar, edite só este arquivo.

   IMAGENS DE CADA MEMBRO (coloque os arquivos na pasta img/):
   "imagens" é uma lista. Coloque 3 ou mais. Cada imagem pode ser:
     - só o caminho:   "img/luffy-1.jpg"
         → a imagem fica fosca (desfoque automático) até passar o mouse
     - ou um par:      { imagem: "img/luffy-1.jpg", fosca: "img/luffy-1-fosca.jpg" }
         → você mesmo escolhe a imagem fosca que aparece antes

   Ao passar o mouse, a imagem fica nítida e aparecem as setas
   (e os pontinhos) para trocar entre as imagens do personagem.
   FUNDO DE CADA PERSONAGEM: o campo "fundo" de cada membro é a foto que
   vira o fundo da página enquanto o mouse está sobre o card dele.
   Se o arquivo não existir, o fundo normal continua.
   A ordem da lista de membros é a ordem do menu e das setas.
   =========================================================== */

window.OP = window.OP || { Model: {}, View: {}, Controller: {} };

OP.Model.imagemReserva = "img/placeholder.svg"; // aparece se a imagem não for encontrada

/* Imagem de fundo da página: coloque o arquivo na pasta img/.
   opacidade: de 0 (invisível) a 1 (total). Quanto menor, mais transparente. */
OP.Model.fundo = {
  imagem: "img/fundo.jpg",
  opacidade: 0.25,
  opacidadePersonagem: 0.35   // transparência do fundo que aparece ao passar o mouse no card
};

/* Vídeo do topo da página: coloque o arquivo na pasta video/ */
OP.Model.video = {
  arquivo: "video/video.mp4",
  somAoInteragir: true   // true: o som liga no primeiro clique/tecla na página; false: só pelo botão
};

OP.Model.membros = [
  {
    nome: "Monkey D. Luffy",
    descricao: "Capitão do bando e um dos Quatro Imperadores do Mar (Yonko); consome a Gomu Gomu no Mi (Hito Hito no Mi, Modelo: Nika).",
    imagens: ["img/luffy-1.jpg", "img/luffy-2.jpg", "img/luffy-3.jpg"],
    fundo: "img/fundo-luffy.jpg"
  },
  {
    nome: "Roronoa Zoro",
    descricao: "Imediato e espadachim que luta com o estilo de três espadas (Santoryu).",
    imagens: ["img/zoro-1.jpg", "img/zoro-2.jpg", "img/zoro-3.jpg"],
    fundo: "img/fundo-zoro.jpg"
  },
  {
    nome: "Nami",
    descricao: "Navegadora e cartógrafa responsável pelo rumo do navio.",
    imagens: ["img/nami-1.jpg", "img/nami-2.jpg", "img/nami-3.jpg"],
    fundo: "img/fundo-nami.jpg"
  },
  {
    nome: "Usopp",
    descricao: "Atirador e inventor da tripulação.",
    imagens: ["img/usopp-1.jpg", "img/usopp-2.jpg", "img/usopp-3.jpg"],
    fundo: "img/fundo-usopp.jpg"
  },
  {
    nome: "Sanji (Vinsmoke Sanji)",
    descricao: "Cozinheiro do bando, especialista em combates com as pernas.",
    imagens: ["img/sanji-1.jpg", "img/sanji-2.jpg", "img/sanji-3.jpg"],
    fundo: "img/fundo-sanji.jpg"
  },
  {
    nome: "Tony Tony Chopper",
    descricao: "Médico da tripulação, uma rena que comeu a Hito Hito no Mi.",
    imagens: ["img/chopper-1.jpg", "img/chopper-2.jpg", "img/chopper-3.jpg"],
    fundo: "img/fundo-chopper.jpg"
  },
  {
    nome: "Nico Robin",
    descricao: "Arqueóloga e historiadora que busca o Poneglyph verdadeiro; usa os poderes da Hana Hana no Mi.",
    imagens: ["img/robin-1.jpg", "img/robin-2.jpg", "img/robin-3.jpg"],
    fundo: "img/fundo-robin.jpg"
  },
  {
    nome: "Franky (Cutty Flam)",
    descricao: "Carpinteiro e ciborgue responsável pelo navio Thousand Sunny.",
    imagens: ["img/franky-1.jpg", "img/franky-2.jpg", "img/franky-3.jpg"],
    fundo: "img/fundo-franky.jpg"
  },
  {
    nome: "Brook",
    descricao: "Músico e espadachim esqueleto que comeu a Yomi Yomi no Mi.",
    imagens: ["img/brook-1.jpg", "img/brook-2.jpg", "img/brook-3.jpg"],
    fundo: "img/fundo-brook.jpg"
  },
  {
    nome: "Jinbe",
    descricao: "Timoneiro experiente, mestre do Karatê dos Homens-Peixe e ex-Shichibukai.",
    imagens: ["img/jinbe-1.jpg", "img/jinbe-2.jpg", "img/jinbe-3.jpg"],
    fundo: "img/fundo-jinbe.jpg"
  }
];

/* Regra do Model: índice vizinho, dando a volta no fim da lista */
OP.Model.vizinho = function (indice, total, passo) {
  return (indice + passo + total) % total;
};

/* Regra do Model: aceita "img/a.jpg" ou { imagem, fosca } e devolve sempre { imagem, fosca } */
OP.Model.normalizarImagem = function (item) {
  if (typeof item === "string") return { imagem: item, fosca: null };
  return { imagem: item.imagem, fosca: item.fosca || null };
};
