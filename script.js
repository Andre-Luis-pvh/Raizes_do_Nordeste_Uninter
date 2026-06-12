let cart = [];
let total = 0;
let points = 0;

/* LOJA */

function selecionarLoja(loja){
  localStorage.setItem("loja", loja);

  document.getElementById("storeName").innerText = loja;

  document.getElementById("storePage").style.display = "none";
  document.getElementById("appPage").style.display = "block";
}

/* LOGIN */

function login() {
  const user = document.getElementById("user").value;
  const pass = document.getElementById("pass").value;
  const lgpd = document.getElementById("lgpd").checked;
  const msg = document.getElementById("msg");

  if (user === "" || pass === "") {
    msg.innerHTML = "Preencha usuário e senha.";
    return;
  }

  if (!lgpd) {
    msg.innerHTML = "Você precisa aceitar a LGPD.";
    return;
  }

  msg.innerHTML = "";

  // vai para seleção de loja após login
  document.getElementById("loginPage").style.display = "none";
  document.getElementById("storePage").style.display = "flex";
}

/* CADASTRO */

function register() {
alert("Tela de cadastro em desenvolvimento.");
}

/* TROCAR TELAS */

function showScreen(screenId){

  const screens = document.querySelectorAll(".screen");

  screens.forEach(screen => {
    screen.classList.remove("show");
    screen.style.display = "none";
  });

  const target = document.getElementById(screenId);

  target.style.display = "block";
  target.classList.add("show");
}

/* ADICIONAR ITEM */

function addItem(name, price){

cart.push({ name, price });
total += price;

updateCart();
showToast(`${name} adicionado ao carrinho`);
}

/* ATUALIZA CARRINHO */

function updateCart(){

const cartList = document.getElementById("cartList");
const totalElement = document.getElementById("total");

cartList.innerHTML = "";

if(cart.length === 0){
cartList.innerHTML = `       <p class="empty">Seu carrinho está vazio</p>
    `;
} else {
cart.forEach(item=>{
cartList.innerHTML += `         <div class="cart-item">           <span>${item.name}</span>           <strong>R$ ${item.price.toFixed(2)}</strong>         </div>
      `;
});
}

let payment = document.querySelector('input[name="payment"]:checked')?.value || "credito";

let finalTotal = total;

if(payment === "pix"){
finalTotal = total - (total * 0.05);
}

totalElement.innerHTML = finalTotal.toFixed(2);
}

/* ALTERA PAGAMENTO */

function changePayment(){

const payment = document.querySelector('input[name="payment"]:checked').value;
const pixArea = document.getElementById("pixArea");

if(payment === "pix"){
pixArea.style.display = "block";
showToast("PIX selecionado • 5% OFF aplicado");
} else {
pixArea.style.display = "none";
}

updateCart();
}

/* FINALIZAR PEDIDO */

function checkout(){

if(cart.length === 0){
alert("Seu carrinho está vazio.");
return;
}

const payment = document.querySelector('input[name="payment"]:checked').value;

let finalTotal = total;

if(payment === "pix"){
finalTotal = total - (total * 0.05);
}

const confirmOrder = confirm(
`Confirmar pedido?\n\nForma de pagamento: ${payment.toUpperCase()}\nTotal: R$ ${finalTotal.toFixed(2)}`
);

if(!confirmOrder) return;

const earnedPoints = Math.floor(finalTotal / 10);
points += earnedPoints;

document.getElementById("points").innerHTML = points;

showToast(`Pedido confirmado! Você ganhou ${earnedPoints} pontos ⭐`);

startOrderStatus();
goToStatusScreen();

cart = [];
total = 0;

updateCart();
}

/* STATUS DO PEDIDO */

function startOrderStatus(){

resetSteps();

document.getElementById("step1").classList.add("active");

setTimeout(()=>{
document.getElementById("step2").classList.add("active");
},3000);

setTimeout(()=>{
document.getElementById("step3").classList.add("active");
showToast("Pedido pronto para entrega!");
},6000);
}

/* RESET STATUS */

function resetSteps(){

const steps = document.querySelectorAll(".step");

steps.forEach(step=>{
step.classList.remove("active");
});
}

/* TOAST */

function showToast(message){

const toast = document.getElementById("toast");

toast.innerHTML = message;
toast.classList.add("show-toast");

setTimeout(()=>{
toast.classList.remove("show-toast");
},3000);
}

/* LOGOUT */

function logout(){

  localStorage.removeItem("loja");

  document.getElementById("appPage").style.display = "none";
  document.getElementById("loginPage").style.display = "flex";
}

/* IR PARA TELA DE STATUS */
function goToStatusScreen(){
  document.querySelectorAll(".screen").forEach(s => {
    s.style.display = "none";
  });

  document.getElementById("statusPage").style.display = "block";
}

/* INICIALIZAÇÃO DO SISTEMA */

window.addEventListener("load", () => {

  const loja = localStorage.getItem("loja");

  // SEMPRE começa no login
  document.getElementById("loginPage").style.display = "flex";
  document.getElementById("storePage").style.display = "none";
  document.getElementById("appPage").style.display = "none";

  // se já tem loja salva (opcional)
  if (loja) {
    document.getElementById("storeName").innerText = loja;
  }
});
