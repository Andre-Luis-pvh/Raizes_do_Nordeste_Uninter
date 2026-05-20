// LOGIN

function fazerLogin(){

  let usuario = document.getElementById("usuario").value;
  let senha = document.getElementById("senha").value;

  let mensagem = document.getElementById("mensagemLogin");

  if(usuario === "admin" && senha === "1234"){

    mensagem.innerHTML = "✅ Login realizado com sucesso!";
    mensagem.style.color = "green";

  }else{

    mensagem.innerHTML = "❌ Usuário ou senha incorretos!";
    mensagem.style.color = "red";
  }
}

// CARRINHO

let carrinho = [];
let total = 0;
let pontos = 0;

// ADICIONAR ITEM

function adicionarCarrinho(nome, preco){

  carrinho.push({
    nome:nome,
    preco:preco
  });

  total += preco;

  atualizarCarrinho();
}

// ATUALIZAR CARRINHO

function atualizarCarrinho(){

  let lista = document.getElementById("listaCarrinho");

  lista.innerHTML = "";

  carrinho.forEach(item => {

    lista.innerHTML += `
      <div class="cart-item">
        <span>${item.nome}</span>
        <span>R$ ${item.preco.toFixed(2)}</span>
      </div>
    `;
  });

  document.getElementById("total").innerText =
    total.toFixed(2);
}

// FINALIZAR PEDIDO

function finalizarPedido(){

  if(carrinho.length === 0){

    alert("Seu carrinho está vazio!");
    return;
  }

  // 1 ponto a cada R$10 gastos
  let pontosGanhos = Math.floor(total / 10);

  pontos += pontosGanhos;

  document.getElementById("pontos").innerText = pontos;

  alert(
    `Pedido finalizado!\nVocê ganhou ${pontosGanhos} pontos ⭐`
  );

  carrinho = [];
  total = 0;

  atualizarCarrinho();
}