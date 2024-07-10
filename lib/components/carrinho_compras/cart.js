document.addEventListener('DOMContentLoaded', () => {
    const cartContainer = document.getElementById('cart-items-container');
    const purchaseButton = document.getElementById('purchase-button');
    const backButton = document.getElementById('back-button');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalAmount = "0,00";

    const renderCartItems = () => {
        cartContainer.innerHTML = '';

        if (cart.length === 0) {
            cartContainer.innerHTML = '<p>Seu carrinho está vazio.</p>';
            return;
        }

        cart.forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('cart-product');

            itemDiv.innerHTML = `
                <button class="photo-button">
                    <img src="../../../assets/images/icone-adicionar-foto.jpg" alt="Adicionar Foto">
                </button>
                <div class="product-details">
                    <p class="cart-product-title">${item.name}</p>
                    <p class="cart-product-price">R$ ${parseFloat(item.price).toFixed(2)}</p>
                </div>
                <input type="number" class="product-qtd-input" value="${item.quantity}">
                <button class="remove-product-button">Remover</button>
            `;

            cartContainer.appendChild(itemDiv);
        });

        configureCartButtons();
        updateTotal();
    };

    const configureCartButtons = () => {
        const removeProductButtons = document.querySelectorAll('.remove-product-button');
        const quantityInputs = document.querySelectorAll('.product-qtd-input');
        const priceElements = document.querySelectorAll('.cart-product-price');
        const photoButtons = document.querySelectorAll('.photo-button');

        removeProductButtons.forEach((button, index) => {
            button.addEventListener('click', () => removeProduct(index));
        });

        quantityInputs.forEach((input, index) => {
            input.addEventListener('change', () => checkQuantity(input, index));
        });

        priceElements.forEach((element) => {
            element.addEventListener('click', changeProductPrice);
        });

        photoButtons.forEach((button) => {
            button.addEventListener('click', showPhotoAlert);
        });
    };

    const removeProduct = (index) => {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCartItems();
    };

    const checkQuantity = (input, index) => {
        if (input.value === "0") {
            removeProduct(index);
        } else {
            cart[index].quantity = parseInt(input.value, 10);
            localStorage.setItem('cart', JSON.stringify(cart));
            updateTotal();
        }
    };

    const changeProductPrice = (event) => {
        const newPrice = prompt("Digite o novo preço:");
        if (newPrice) {
            const newFormattedPrice = `R$ ${parseFloat(newPrice).toFixed(2).replace(".", ",")}`;
            event.target.innerText = newFormattedPrice;
            updateTotal();
        }
    };

    const showPhotoAlert = () => {
        alert("O restaurante ainda não adicionou uma foto deste produto.");
    };

    const updateTotal = () => {
        const productElements = document.querySelectorAll('.cart-product');
        let total = 0;

        productElements.forEach((product) => {
            const price = parseFloat(product.querySelector('.cart-product-price').innerText.replace("R$", "").replace(",", "."));
            const quantity = parseInt(product.querySelector('.product-qtd-input').value, 10);
            total += price * quantity;
        });

        totalAmount = total.toFixed(2).replace(".", ",");
        document.querySelector('.cart-total span').innerText = `R$ ${totalAmount}`;
    };

    const finalizePurchase = () => {
        if (totalAmount === "0,00") {
            alert("Seu carrinho está vazio!");
        } else {
            alert(`Obrigado pela sua compra!\nValor do pedido: R$${totalAmount}\nVolte sempre :)`);
            cart = [];
            localStorage.removeItem('cart');
            renderCartItems();
        }
    };

    backButton.addEventListener('click', () => {
        window.location.href = '../menu/menu.html';
    });

    purchaseButton.addEventListener('click', finalizePurchase);

    renderCartItems();
});
