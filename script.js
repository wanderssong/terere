let carrinho = [];
let total = 0;
// Variável para o contador do carrinho
let cartCount = 0;

let highlightNames = ['Erva', 'Garrafas', 'Bombas', 'Copos', 'Acessórios'];

let highlights = [
    ['https://scontent.fops4-1.fna.fbcdn.net/v/t39.30808-6/299876944_459074529428575_2395053108917908914_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=3a1ebe&_nc_ohc=a42lSgrrzZoQ7kNvgGMvmGS&_nc_ht=scontent.fops4-1.fna&_nc_gid=AMkRrx0K2pRdHfiwSrjY7j-&oh=00_AYDdmz1xCCxC0Z6My8roT8xPAuE8mc0rMlUMl9VmJox_WA&oe=6700D0FE','https://scontent.fops4-1.fna.fbcdn.net/v/t39.30808-6/298381921_454798293189532_6443795375996164081_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=3a1ebe&_nc_ohc=Hi0NqShZwdAQ7kNvgGQCqSG&_nc_ht=scontent.fops4-1.fna&oh=00_AYAQLpbTee1KDDST6tb3l54HSOTbG99FGxHUez8APyfD0w&oe=6700EF42', 'https://scontent.fops4-1.fna.fbcdn.net/v/t39.30808-6/301051174_463439988992029_4481920318467554080_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=3a1ebe&_nc_ohc=EWdiFGZ-jxgQ7kNvgGyas_d&_nc_ht=scontent.fops4-1.fna&oh=00_AYCc2Bs6zHt7HP3T8xR_eycRS5ktthYB-lKdK87Fgk0gpg&oe=6700EA06'], // ERVAS
    ['https://images.tcdn.com.br/img/img_prod/1197310/kit_terere_chacal_garrafa_preto_e_cuia_termica_verde_2355_2_c6900960a35627b227418f6823ba4f25.jpg','https://cdn.awsli.com.br/600x450/149/149413/produto/185680039/f036e0e138.jpg', 'https://http2.mlstatic.com/D_NQ_NP_832893-MLB48269443562_112021-O.webp'], // garrafas
    ['https://images.tcdn.com.br/img/img_prod/1197310/bomba_de_terere_chacal_achatada_inox_preta_3391_2_b8cc4d92a27fd04d7ee0b092b711df5a.jpeg','https://images.tcdn.com.br/img/img_prod/1197310/bomba_de_terere_chacal_achatada_inox_preta_3391_3_2dbcf0a591467f3206f64f006847d4aa.jpg', 'https://cdn.awsli.com.br/2512/2512424/produto/302629040/36819396-6f77-11ef-a0a9-62f9647ce288-my3uan85vf.jpeg'], // BOMBAS
    ['https://scontent.fops4-1.fna.fbcdn.net/v/t39.30808-6/420615695_877523097708419_5439552721990096985_n.jpg?stp=dst-jpg_s600x600&_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_ohc=T2X1d1mTwicQ7kNvgHTxj5R&_nc_ht=scontent.fops4-1.fna&oh=00_AYDyeTej8s9N9degA8tdL97iveP8vl7s9mYHKu90p9aYJQ&oe=6700D2B4', 'https://scontent.fops4-1.fna.fbcdn.net/v/t39.30808-6/420156626_877523131041749_2958049427807408267_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=127cfc&_nc_ohc=bpA_mUss8pYQ7kNvgGrCoFo&_nc_ht=scontent.fops4-1.fna&oh=00_AYB2pptlEO4RZaG2mFVERLS7i7xrXHTf4d1uvUup47NoLA&oe=6700D2BE','https://scontent.fops4-1.fna.fbcdn.net/v/t39.30808-6/420158458_877522984375097_8303900879425004579_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_ohc=zlBtMxf0YmQQ7kNvgE1YGcV&_nc_ht=scontent.fops4-1.fna&_nc_gid=AEbp8feoDRtVWKloyy8znob&oh=00_AYAxzb6yJMU7r4Gqf9BqaWNUL5i_kXznVbhkY7UsGBI1DA&oe=6700D687'], // COPOS
    ['https://milicopadrao.cdn.magazord.com.br/img/2022/07/produto/1023/canivete-caratuva.jpg?ims=fit-in/865x865/filters:fill(white)', 'https://cdn.awsli.com.br/600x450/1211/1211131/produto/125396484/e5dc55fdb1.jpg'], // Acessorios
];

let currentHighlight = 0;
let currentImageIndex = 0;

function openHighlight(index) {
    currentHighlight = index;
    currentImageIndex = 0;
    showImage(currentImageIndex);
    document.getElementById('highlightModal').style.display = 'flex';
}

function closeHighlight() {
    document.getElementById('highlightModal').style.display = 'none';
}

function showImage(index) {
    const imgSrc = highlights[currentHighlight][index];
    document.getElementById('highlightImage').src = imgSrc;
}

function changeImage(direction) {
    currentImageIndex += direction;
    if (currentImageIndex >= highlights[currentHighlight].length) {
        currentImageIndex = 0; // Volta para a primeira imagem
    } else if (currentImageIndex < 0) {
        currentImageIndex = highlights[currentHighlight].length - 1; // Vai para a última imagem
    }
    showImage(currentImageIndex);
}



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

const fecharModal = document.querySelector(".modal-content .close");

// Função para abrir o modal
abrirCarrinho.addEventListener('click', function() {
    modalCarrinho.style.display = "flex"; // Exibe o modal (com flexbox para manter o alinhamento)
});

// Função para fechar o modal ao clicar no botão "X"
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