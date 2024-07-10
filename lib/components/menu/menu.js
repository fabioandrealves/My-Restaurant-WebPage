document.addEventListener("DOMContentLoaded", () => {
    const restaurantName = getRestaurantNameFromURL();
    if (restaurantName) {
        renderMenu(restaurantName);
    } else {
        alert("Restaurante não encontrado!");
    }

    document.getElementById("Carrinho").addEventListener("click", function (event) {
        event.preventDefault();
        window.location.href = "../CarrinhoDeCompras/cart.html";
    });

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function () {
            const productName = this.getAttribute('data-product');
            const productPrice = parseFloat(this.getAttribute('data-price'));

            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            let existingProduct = cart.find(product => product.name === productName);

            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                cart.push({ name: productName, price: productPrice, quantity: 1 });
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            alert(`${productName} foi adicionado ao carrinho!`);
        });
    });
});
