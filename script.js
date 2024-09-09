let carrinho = [];
let total = 0;

function addToCart(produto, preco) {
    carrinho.push({ produto, preco });
    total += preco;
    updateCart();
    updateCartCounter();
}

function updateCart() {
    const itensCarrinho = document.getElementById("itensCarrinho");
    const totalElement = document.getElementById("total");

    itensCarrinho.innerHTML = "";
    carrinho.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.produto} - R$ ${item.preco}`;
        itensCarrinho.appendChild(li);
    });

    totalElement.textContent = total.toFixed(2);
}

function updateCartCounter() {
    const contadorCarrinho = document.getElementById("contadorCarrinho");
    contadorCarrinho.textContent = carrinho.length;
}

// Função para abrir e fechar o modal do carrinho
const modal = document.getElementById("modalCarrinho");
const abrirCarrinhoBtn = document.getElementById("abrirCarrinho");
const closeBtn = document.getElementsByClassName("close")[0];

// Abre o modal
abrirCarrinhoBtn.onclick = function() {
    modal.style.display = "block";
}

// Fecha o modal ao clicar no X
closeBtn.onclick = function() {
    modal.style.display = "none";
}

// Fecha o modal ao clicar fora da área do modal
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

document.getElementById("finalizarCompra").addEventListener("click", () => {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio.");
        return;
    }

    const mensagem = carrinho.map(item => `${item.produto}: R$${item.preco}).join("\n"`) + `\nTotal: R$${total.toFixed(2)}`;
    const whatsappLink = `https://wa.me/5511999999999?text=${encodeURIComponent(mensagem)}`;
    
    window.open(whatsappLink, "_blank");
});