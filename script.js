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
    carrinho.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${item.produto} - R$ ${item.preco.toFixed(2)}`;
        
        // Botão para remover o item
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remover';
        removeButton.onclick = () => removeFromCart(index);
        li.appendChild(removeButton);

        itensCarrinho.appendChild(li);
    });
    
    // Atualiza o total no modal
    totalElement.textContent = total.toFixed(2);
}

// Função para remover produtos do carrinho
function removeFromCart(index) {
    // Remove o produto do carrinho
    const item = carrinho.splice(index, 1)[0];
    
    // Atualiza o total
    total -= item.preco;

    // Atualiza o display do carrinho
    updateCartDisplay();

    // Decrementa o contador do carrinho
    cartCount--;
    updateCartCounter();

    // Exibe mensagem de feedback
    showToast('Produto removido do carrinho!');
}

// Função para mostrar o modal do carrinho
const modalCarrinho = document.getElementById("modalCarrinho");
const abrirCarrinho = document.getElementById("abrirCarrinho");
const fecharModal = document.querySelector(".modal .close");

// Função para abrir o modal
abrirCarrinho.addEventListener('click', function() {
    modalCarrinho.style.display = "flex"; // Exibe o modal (com flexbox para manter o alinhamento)
});

// Função para fechar o modal
fecharModal.addEventListener('click', function() {
    modalCarrinho.style.display = "none"; // Oculta o modal
});

// Fecha o modal se o usuário clicar fora do conteúdo do modal
window.addEventListener('click', function(event) {
    if (event.target == modalCarrinho) {
        modalCarrinho.style.display = "none";
    }
});

// Função para mostrar o toast (mensagem de feedback)
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = 'toast show';

    // Após 2 segundos, esconde a mensagem
    setTimeout(function() {
        toast.className = toast.className.replace('show', '');
    }, 2000);
}

// Pega o modal e o elemento da imagem dentro do modal
const imageModal = document.getElementById('imageModal');
const modalImg = document.getElementById('imgModal');
const closeModal = document.querySelector('.close-image-modal');

// Função para abrir a imagem em tela cheia
function openImageModal(src) {
    imageModal.style.display = 'block';
    modalImg.src = src;
}

// Função para fechar o modal ao clicar no X ou fora da imagem
closeModal.onclick = function() {
    imageModal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == imageModal) {
        imageModal.style.display = 'none';
    }
}

// Função para finalizar a compra e enviar para o WhatsApp
document.getElementById('finalizarCompra').onclick = function() {
    const formaPagamento = document.querySelector('input[name="pagamento"]:checked');
    let mensagem = 'Resumo do Pedido:\n';
    carrinho.forEach(item => {
        mensagem += `${item.produto} - R$ ${item.preco.toFixed(2)}\n`;
    });
    mensagem += `Total: R$ ${total.toFixed(2)}\n`;
    mensagem += `Forma de Pagamento: ${formaPagamento ? formaPagamento.value : 'Não selecionada'}\n`;
    mensagem += 'Entrega gratuita em Sinop!';
    
    if (formaPagamento && formaPagamento.value === 'Cartão de Crédito 2x') {
        mensagem += '\n* Taxa da maquininha será aplicada.';
    }

    const encodedMessage = encodeURIComponent(mensagem);
    const whatsappUrl = `https://wa.me/556696967406?text=${encodedMessage}`;
    
    // Redireciona para o WhatsApp
    window.open(whatsappUrl, '_blank');
}

document.querySelectorAll('input[name="pagamento"]').forEach(input => {
    input.addEventListener('change', function() {
        if (this.value === 'Cartão de Crédito 2x') {
            alert('Uma taxa da máquina será aplicada.');
        } else {
            // Ocultar a mensagem se outra forma de pagamento for selecionada
        }
    });
});