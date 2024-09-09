// Array para armazenar os itens do carrinho
let cartItems = [];
let total = 0;

// Função para adicionar o produto ao carrinho
function addToCart(produto, preco) {
    // Lógica para adicionar ao carrinho
    let item = {
        nome: produto,
        valor: preco
    };
    cartItems.push(item);
    total += preco;
    updateCart();

    // Exibir a mensagem de feedback
    showToast("Produto adicionado ao carrinho!");
}

// Função para atualizar o carrinho (contador e total)
function updateCart() {
    let contadorCarrinho = document.getElementById("contadorCarrinho");
    let totalElement = document.getElementById("total");
    
    contadorCarrinho.textContent = cartItems.length;
    totalElement.textContent = total.toFixed(2); // Atualiza o total com duas casas decimais
    
    // Atualiza a lista de itens no carrinho (modal)
    let itensCarrinho = document.getElementById("itensCarrinho");
    itensCarrinho.innerHTML = ''; // Limpa a lista atual
    
    cartItems.forEach(function(item) {
        let li = document.createElement('li');
        li.textContent = `${item.nome} - R$ ${item.valor.toFixed(2)}`;
        itensCarrinho.appendChild(li);
    });
}

// Função para exibir a mensagem rápida (toast)
function showToast(message) {
    var toast = document.getElementById("toast");
    toast.textContent = message; // Define a mensagem do toast
    toast.className = "toast show"; // Adiciona a classe que mostra o toast
    
    // Após 3 segundos, remover a classe "show" para esconder a mensagem
    setTimeout(function() {
        toast.className = toast.className.replace("show", "");
    }, 3000);
}

// Função para abrir o modal do carrinho
function openCart() {
    document.getElementById("modalCarrinho").style.display = "block";
}

// Função para fechar o modal do carrinho
function closeCart() {
    document.getElementById("modalCarrinho").style.display = "none";
}

// Evento para fechar o modal ao clicar no "X"
document.querySelector(".close").addEventListener("click", closeCart);

// Evento para abrir o carrinho ao clicar no botão flutuante
document.getElementById("abrirCarrinho").addEventListener("click", openCart);

// Evento para finalizar a compra (redirecionar para o WhatsApp com os itens do carrinho)
document.getElementById("finalizarCompra").addEventListener("click", function() {
    let mensagem = "Resumo do Pedido:\n";
    cartItems.forEach(function(item) {
        mensagem += `${item.nome} - R$ ${item.valor.toFixed(2)}\n`;
    });
    mensagem += `Total: R$ ${total.toFixed(2)}\nEntrega gratuita em Sinop!`;

    // Redireciona para o WhatsApp com a mensagem
    window.open(`https://wa.me/556696967403?text=${encodeURIComponent(mensagem)}`, '_blank');
});