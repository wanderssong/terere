let carrinho = [];
let total = 0;
let contador = 0;

function addToCart(produto, preco) {
    carrinho.push({ produto, preco });
    total += preco;
    contador++;
    updateCart();
}

function updateCart() {
    const itensCarrinho = document.getElementById("itensCarrinho");
    const totalElement = document.getElementById("total");
    const contadorCarrinho = document.getElementById("contadorCarrinho");

    itensCarrinho.innerHTML = "";
    carrinho.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.produto} - R$ ${item.preco}`;
        itensCarrinho.appendChild(li);
    });

    totalElement.textContent = total.toFixed(2);
    contadorCarrinho.textContent = contador;
}

// Abrir e fechar o carrinho
document.getElementById("abrirCarrinho").addEventListener("click", () => {
    document.getElementById("carrinho").classList.remove("oculto");
});

document.getElementById("fecharCarrinho").addEventListener("click", () => {
    document.getElementById("carrinho").classList.add("oculto");
});

// Finalizar compra e enviar para WhatsApp
document.getElementById("finalizarCompra").addEventListener("click", () => {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio.");
        return;
    }

    const mensagem = carrinho.map(item => `${item.produto}: R$${item.preco}).join("\n"`) + `\nTotal: R$${total.toFixed(2)}`;
    const whatsappLink = `https://wa.me/5511999999999?text=${encodeURIComponent(mensagem)}`;
    
    window.open(whatsappLink, "_blank");
});