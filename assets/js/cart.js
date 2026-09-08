// ================================
// SHOPPING CART
// ================================

let cart = JSON.parse(localStorage.getItem("cart")) || [];


// ================================
// ADD TO CART
// ================================

const addCartButtons = document.querySelectorAll(".add-cart-btn");

addCartButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const name = button.dataset.name;
        const price = Number(button.dataset.price);
        const image = button.dataset.image;

        const existingItem = cart.find(
            (item) => item.name === name
        );

        if (existingItem) {

            existingItem.quantity += 1;

        } else {

            cart.push({
                name: name,
                price: price,
                image: image,
                quantity: 1
            });

        }

        saveCart();

        updateCartCount();

        button.textContent = "Added ✓";

        setTimeout(() => {
            button.textContent = "Add to Cart";
        }, 1000);

    });

});


// ================================
// SAVE CART
// ================================

function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

}


// ================================
// CART COUNT
// ================================

function updateCartCount() {
    const cartCounts = document.querySelectorAll(".cart-count");

    const totalItems = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    cartCounts.forEach((count) => {
        count.textContent = totalItems;
    });
}


// ================================
// DISPLAY CART
// ================================

function displayCart() {

    const cartContainer =
        document.getElementById("cartContainer");

    if (!cartContainer) return;


    // Empty cart

    if (cart.length === 0) {

        cartContainer.innerHTML = `
            <div class="empty-cart text-center">
                <h2>Your cart is empty</h2>

                <p>
                    Looks like you haven't added anything yet.
                </p>

                <a
                    href="menu.html"
                    class="btn view"
                >
                    Explore Menu
                </a>
            </div>
        `;

        return;
    }


    let cartHTML = "";

    let total = 0;


    // Create cart items

    cart.forEach((item, index) => {

        const subtotal =
            item.price * item.quantity;

        total += subtotal;


        cartHTML += `
            <div class="cart-item">

                <img
                    src="${item.image}"
                    alt="${item.name}"
                    class="cart-item-img"
                >

                <div class="cart-item-info">

                    <h3>${item.name}</h3>

                    <p>
                        GH₵ ${item.price.toFixed(2)}
                    </p>

                </div>


                <div class="quantity-control">

                    <button
                        type="button"
                        class="quantity-btn"
                        onclick="decreaseQuantity(${index})"
                    >
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        type="button"
                        class="quantity-btn"
                        onclick="increaseQuantity(${index})"
                    >
                        +
                    </button>

                </div>


                <div class="cart-subtotal">

                    GH₵ ${subtotal.toFixed(2)}

                </div>


                <button
                    type="button"
                    class="remove-btn"
                    onclick="removeItem(${index})"
                >
                    Remove
                </button>

            </div>
        `;

    });


    // Cart total

    cartHTML += `
        <div class="cart-summary">

            <div>
                <span>Total</span>

                <strong>
                    GH₵ ${total.toFixed(2)}
                </strong>
            </div>


            <div class="cart-actions">

                <a
                    href="menu.html"
                    class="btn continue-btn"
                >
                    Continue Shopping
                </a>

                <a
                    href="checkout.html"
                    class="btn checkout-btn"
                >
                    Checkout
                </a>

            </div>

        </div>
    `;


    cartContainer.innerHTML = cartHTML;

}


// ================================
// INCREASE QUANTITY
// ================================

function increaseQuantity(index) {

    cart[index].quantity += 1;

    saveCart();

    displayCart();

    updateCartCount();

}


// ================================
// DECREASE QUANTITY
// ================================

function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity -= 1;

    } else {

        cart.splice(index, 1);

    }

    saveCart();

    displayCart();

    updateCartCount();

}


// ================================
// REMOVE ITEM
// ================================

function removeItem(index) {

    cart.splice(index, 1);

    saveCart();

    displayCart();

    updateCartCount();

}


// ================================
// PAGE LOAD
// ================================

updateCartCount();

displayCart();