// Selección de elementos y configuración del carrito
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cart = [];
const cartModal = document.getElementById('cart-modal');
const openCartButton = document.getElementById('open-cart');
const closeCartButton = document.getElementById('close-cart');
const cartItemsList = document.getElementById('cart-items');
const cartCountDisplay = document.getElementById('open-cart');
const checkoutButton = document.getElementById('checkout');
const paymentMethodSelect = document.getElementById('payment-method');

// Agregar productos al carrito
addToCartButtons.forEach((button, index) => {
    button.addEventListener('click', () => addToCart(index));
});

function addToCart(index) {
    const product = {
        id: index,
        name: document.querySelectorAll('.product-card h3')[index].textContent,
        price: document.querySelectorAll('.product-card span')[index].textContent,
    };

    cart.push(product);
    updateCartCount();
    alert(`${product.name} ha sido agregado al carrito.`);
}

function updateCartCount() {
    cartCountDisplay.textContent = `Carrito (${cart.length})`;
}

// Mostrar el carrito en una ventana emergente (modal)
openCartButton.addEventListener('click', () => {
    displayCartItems();
    cartModal.style.display = 'block';
});

closeCartButton.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

window.onclick = (event) => {
    if (event.target === cartModal) {
        cartModal.style.display = 'none';
    }
};

// Función para mostrar los elementos del carrito
function displayCartItems() {
    cartItemsList.innerHTML = ''; // Limpia el contenido
    cart.forEach((product, index) => {
        const item = document.createElement('li');
        item.innerHTML = `
            ${product.name} - ${product.price}
            <button onclick="removeFromCart(${index})">Eliminar</button>
        `;
        cartItemsList.appendChild(item);
    });
}

// Eliminar un producto del carrito
function removeFromCart(index) {
    cart.splice(index, 1); // Elimina el producto
    updateCartCount();
    displayCartItems(); // Actualiza la vista del carrito
}

// Finalizar compra y vaciar carrito
checkoutButton.addEventListener('click', () => {
    if (cart.length === 0) {
        alert("El carrito está vacío. Agrega productos antes de finalizar la compra.");
        return;
    }

    const paymentMethod = paymentMethodSelect.value;
    alert(`Has seleccionado ${paymentMethod} como método de pago. Gracias por tu compra!`);

    cart.length = 0; // Vaciar carrito
    updateCartCount(); // Actualizar el contador del carrito
    cartModal.style.display = 'none'; // Cerrar el modal del carrito
});
