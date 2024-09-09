// Array para armazenar os itens do carrinho
let carrinho = [];
let total = 0;
// Variável para o contador do carrinho
let cartCount = 0;

// Função para adicionar produtos ao carrinho
function addToCart(produto, preco) {
    // Adiciona o produto ao array do carrinho
    carrinho.push({ produto, preco });
    
    // Atualiza o total
    total += preco;

    // Atualiza a exibição dos itens no modal do carrinho
    updateCartDisplay();

    // Incrementa o contador do carrinho
    cartCount++;
    updateCartCounter();

    // Exibe a mensagem de "Produto adicionado ao carrinho"
    showToast('Produto adicionado ao carrinho!');
}

// Função para atualizar o contador do carrinho
function updateCartCounter() {
    const cartCounter = document.getElementById('cartCounter');
    cartCounter.textContent = cartCount;
}

// Função para exibir os itens do carrinho no modal
function updateCartDisplay() {
    const itensCarrinho = document.getElementById('itensCarrinho');
    const totalElement = document.getElementById('total');
    
    // Limpa os itens atuais do carrinho
    itensCarrinho.innerHTML = '';
    
    // Adiciona cada item do carrinho na lista
    carrinho.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.produto} - R$ ${item.preco.toFixed(2)}`;
        itensCarrinho.appendChild(li);
    });
    
    // Atualiza o total no modal
    totalElement.textContent = total.toFixed(2);
}

// Função para mostrar o modal do carrinho
const modal = document.getElementById('modalCarrinho');
const btnAbrirCarrinho = document.getElementById('abrirCarrinho');
const btnFecharCarrinho = document.getElementsByClassName('close')[0];

btnAbrirCarrinho.onclick = function() {
    modal.style.display = 'block';
}

btnFecharCarrinho.onclick = function() {
    modal.style.display = 'none';
}

// Fecha o modal quando o usuário clicar fora dele
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Função para mostrar o toast (mensagem de feedback)
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = 'toast show';

    // Após 3 segundos, esconde a mensagem
    setTimeout(function() {
        toast.className = toast.className.replace('show', '');
    }, 3000);
}

// Função para finalizar a compra e enviar para o WhatsApp
document.getElementById('finalizarCompra').onclick = function() {
    let mensagem = 'Resumo do Pedido:\n';
    carrinho.forEach(item => {
        mensagem += `${item.produto} - R$ ${item.preco.toFixed(2)}\n`;
    });
    mensagem += `Total: R$ ${total.toFixed(2)}\n`;
    mensagem += 'Entrega gratuita em Sinop!';
    
    const encodedMessage = encodeURIComponent(mensagem);
    const whatsappUrl = `https://wa.me/556696967403?text=${encodedMessage}`;
    
    // Redireciona para o WhatsApp
    window.open(whatsappUrl, '_blank');
}