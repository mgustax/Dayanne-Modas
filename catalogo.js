// Edite este arquivo para alterar contato, produtos, preços e opções do catálogo.
const CATALOGO = {
  loja: {
    nome: "Dayanne Modas",
    whatsapp: "5581985939691"
  },
  // Altere somente os IDs desta lista para trocar as peças do carrossel principal.
  destaques: [
    "look-assimetrico",
    "macacao-rosa",
    "conjunto-brisa",
    "blazer-lumiere",
    "biquini-azul"
  ],
  produtos: [
    {
      id: "look-assimetrico",
      nome: "Look Assimétrico Noir",
      categoria: "feminina",
      categoriaLabel: "Moda feminina",
      preco: "R$ 189,90",
      imagem: "imagens/look-assimetrico.jpeg",
      imagens: ["imagens/look-assimetrico.jpeg", "imagens/look-assimetrico-noite.jpeg"],
      imagemAlt: "Modelo usando look preto assimétrico",
      cardPosition: "center 32%",
      tamanhos: ["P", "M", "G"],
      cores: ["Preto"]
    },
    {
      id: "conjunto-areia",
      nome: "Conjunto Fluido Areia",
      categoria: "feminina",
      categoriaLabel: "Moda feminina",
      preco: "R$ 219,90",
      imagem: "imagens/conjunto-areia.jpeg",
      imagens: ["imagens/conjunto-areia.jpeg", "imagens/conjunto-areia-externo.jpeg"],
      imagemAlt: "Modelo usando conjunto de top e calça pantalona em tom areia",
      cardPosition: "center 42%",
      tamanhos: ["P", "M", "G"],
      cores: ["Areia", "Off-white"]
    },
    {
      id: "macacao-rosa",
      nome: "Macacão Aurora",
      categoria: "feminina",
      categoriaLabel: "Moda feminina",
      preco: "R$ 199,90",
      imagem: "imagens/macacao-rosa.jpeg",
      imagens: ["imagens/macacao-rosa.jpeg", "imagens/macacao-offwhite.jpeg", "imagens/macacao-verde.jpeg"],
      imagemAlt: "Modelo usando Macacão Aurora em diferentes cores",
      cardPosition: "center 18%",
      tamanhos: ["P", "M", "G", "GG"],
      cores: ["Rosa", "Verde sálvia", "Off-white"]
    },
    {
      id: "conjunto-preto",
      nome: "Conjunto Serena",
      categoria: "feminina",
      categoriaLabel: "Moda feminina",
      preco: "R$ 229,90",
      imagem: "imagens/conjunto-preto.jpeg",
      imagens: ["imagens/conjunto-preto.jpeg", "imagens/conjunto-preto-estudio.jpeg"],
      imagemAlt: "Modelo usando conjunto preto longo com recortes",
      cardPosition: "center 38%",
      tamanhos: ["P", "M", "G"],
      cores: ["Preto"]
    },
    {
      id: "conjunto-brisa",
      nome: "Conjunto Brisa Off-white",
      categoria: "feminina",
      categoriaLabel: "Moda feminina",
      preco: "R$ 209,90",
      imagem: "imagens/conjunto-brisa-offwhite.jpeg",
      imagemAlt: "Modelo usando conjunto off-white com blusa de mangas amplas e short",
      cardPosition: "center 40%",
      tamanhos: ["P", "M", "G"],
      cores: ["Off-white"]
    },
    {
      id: "blazer-lumiere",
      nome: "Blazer Lumière",
      categoria: "feminina",
      categoriaLabel: "Moda feminina",
      preco: "R$ 249,90",
      imagem: "imagens/blazer-paete.jpeg",
      imagemAlt: "Modelo usando blazer dourado com paetês",
      cardPosition: "center 20%",
      tamanhos: ["P", "M", "G"],
      cores: ["Dourado"]
    },
    {
      id: "biquini-vermelho",
      nome: "Biquíni Solar",
      categoria: "praia",
      categoriaLabel: "Moda praia",
      preco: "R$ 139,90",
      imagem: "imagens/biquini-vermelho.jpeg",
      imagemAlt: "Modelo usando biquíni vermelho",
      cardPosition: "center 28%",
      tamanhos: ["P", "M", "G"],
      cores: ["Vermelho", "Preto"]
    },
    {
      id: "biquini-cobre",
      nome: "Biquíni Brisa com Saída",
      categoria: "praia",
      categoriaLabel: "Moda praia",
      preco: "R$ 169,90",
      imagem: "imagens/biquini-cobre.jpeg",
      imagemAlt: "Modelo usando biquíni e saída de praia em tom cobre",
      cardPosition: "center 26%",
      tamanhos: ["P", "M", "G"],
      cores: ["Cobre", "Preto"]
    },
    {
      id: "biquini-azul",
      nome: "Biquíni Oceano",
      categoria: "praia",
      categoriaLabel: "Moda praia",
      preco: "R$ 139,90",
      imagem: "imagens/biquini-azul.jpeg",
      imagemAlt: "Modelo usando biquíni azul",
      cardPosition: "center 30%",
      tamanhos: ["P", "M", "G"],
      cores: ["Azul"]
    },
    {
      id: "biquini-oliva",
      nome: "Biquíni Enseada",
      categoria: "praia",
      categoriaLabel: "Moda praia",
      preco: "R$ 149,90",
      imagem: "imagens/biquini-oliva.jpeg",
      imagemAlt: "Modelo usando biquíni verde-oliva na praia",
      cardPosition: "center 28%",
      tamanhos: ["P", "M", "G"],
      cores: ["Verde-oliva"]
    },
    {
      id: "biquini-offwhite",
      nome: "Biquíni Pérola",
      categoria: "praia",
      categoriaLabel: "Moda praia",
      preco: "R$ 159,90",
      imagem: "imagens/biquini-offwhite.jpeg",
      imagemAlt: "Modelo usando biquíni off-white",
      cardPosition: "center 25%",
      tamanhos: ["P", "M", "G"],
      cores: ["Off-white"]
    }
  ]
};
