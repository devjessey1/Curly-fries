// ================================
// CHECKOUT
// ================================

const checkoutItems = document.getElementById("checkoutItems");
const checkoutTotal = document.getElementById("checkoutTotal");
const checkoutForm = document.getElementById("checkoutForm");

const cashPayment = document.getElementById("cashPayment");
const momoPayment = document.getElementById("momoPayment");

const momoDetails = document.getElementById("momoDetails");
const momoNetwork = document.getElementById("momoNetwork");
const momoNumber = document.getElementById("momoNumber");


// ================================
// GET CART FROM LOCAL STORAGE
// ================================

const checkoutCart = JSON.parse(
    localStorage.getItem("cart")
) || [];


// ================================
// DISPLAY CHECKOUT ITEMS
// ================================

function displayCheckoutItems() {

    if (!checkoutItems || !checkoutTotal) {
        return;
    }


    // Check if cart is empty
    if (checkoutCart.length === 0) {
        checkoutItems.innerHTML = `
            <div class="text-center py-4">

                <p>
                    Your cart is empty.
                </p>

                <a
                    href="menu.html"
                    class="back-cart-btn"
                >
                    Explore Menu
                </a>

            </div>
        `;

        checkoutTotal.textContent = "GH₵ 0.00";

        return;
    }


    let itemsHTML = "";
    let total = 0;


    // Display each cart item

    checkoutCart.forEach((item) => {
        const price = Number(item.price);
        const quantity = Number(item.quantity);

        const subtotal = price * quantity;

        total += subtotal;


        itemsHTML += `
            <div class="checkout-item">

                <img
                    src="${item.image}"
                    alt="${item.name}"
                    class="checkout-item-img"
                >

                <div class="checkout-item-info">

                    <h3>
                        ${item.name}
                    </h3>

                    <p>
                        GH₵ ${price.toFixed(2)}
                        × ${quantity}
                    </p>

                </div>

                <div class="checkout-item-total">
                    GH₵ ${subtotal.toFixed(2)}
                </div>

            </div>
        `;

    });


    // Display items

    checkoutItems.innerHTML = itemsHTML;


    // Display total

    checkoutTotal.textContent =
        `GH₵ ${total.toFixed(2)}`;

}


// ================================
// MOBILE MONEY TOGGLE
// ================================

function updatePaymentMethod() {

    if (momoPayment.checked) {

        momoDetails.style.display = "block";

        momoNetwork.required = true;
        momoNumber.required = true;

    } else {

        momoDetails.style.display = "none";

        momoNetwork.required = false;
        momoNumber.required = false;

        momoNetwork.value = "";
        momoNumber.value = "";

    }

}


cashPayment.addEventListener(
    "change",
    updatePaymentMethod
);

momoPayment.addEventListener(
    "change",
    updatePaymentMethod
);


// ================================
// FORM SUBMISSION
// ================================

checkoutForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        // Make sure cart isn't empty

        if (checkoutCart.length === 0) {

            alert(
                "Your cart is empty. Please add an item before checkout."
            );

            window.location.href = "menu.html";

            return;
        }


        // Customer information

        const customer = {

            fullName:
                document.getElementById("fullName").value.trim(),

            phone:
                document.getElementById("phone").value.trim(),

            email:
                document.getElementById("email").value.trim(),

            location:
                document.getElementById("location").value.trim(),

            area:
                document.getElementById("area").value.trim(),

            address:
                document.getElementById("address").value.trim(),

            notes:
                document.getElementById("notes").value.trim()

        };


        // Payment method

        const paymentMethod =
            document.querySelector(
                'input[name="paymentMethod"]:checked'
            ).value;


        // Calculate order total

        const total = checkoutCart.reduce(
            (sum, item) => {

                const price = Number(item.price);
                const quantity = Number(item.quantity);

                return sum + (price * quantity);

            },
            0
        );


        // Create order

        const order = {

            customer: customer,

            paymentMethod: paymentMethod,

            momoNetwork:
                paymentMethod === "momo"
                    ? momoNetwork.value
                    : "",

            momoNumber:
                paymentMethod === "momo"
                    ? momoNumber.value.trim()
                    : "",

            items: checkoutCart,

            total: total,

            orderDate: new Date().toISOString()

        };


        // Save order

        localStorage.setItem(
            "lastOrder",
            JSON.stringify(order)
        );


        // Clear cart

        localStorage.removeItem("cart");


        // Go to confirmation

        window.location.href =
            "confirmation.html";

    }
);


// ================================
// PAGE LOAD
// ================================

displayCheckoutItems();

updatePaymentMethod();