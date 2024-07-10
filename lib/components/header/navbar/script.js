document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("cart-icon").addEventListener("click", function(event) {
      event.preventDefault();
      window.location.href = "../../carrinho_compras/cart.html";
    });
  });