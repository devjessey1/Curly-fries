// ================================
// ORDER CONFIRMATION
// ================================

// Get saved order
const savedOrder = JSON.parse(
    localStorage.getItem("lastOrder")
);


// ================================
// PAGE ELEMENTS
// ================================

const orderNumber = document.getElementById("orderNumber");
const customerName = document.getElementById("customerName");
const customerPhone = document.getElementById("customerPhone");
const customerEmail = document.getElementById("customerEmail");
const customerAddress = document.getElementById("customerAddress");
const deliveryNotes = document.getElementById("deliveryNotes");

const confirmationItems =
    document.getElementById("confirmationItems");

const confirmationTotal =
    document.getElementById("confirmationTotal");

const paymentMethod =
    document.getElementById("paymentMethod");


// ================================
// CHECK FOR ORDER
// ================================

if (!savedOrder) {

    // No previous order found

    orderNumber.textContent = "No order found";

    customerName.textContent = "--";
    customerPhone.textContent = "--";
    customerEmail.textContent = "--";
    customerAddress.textContent = "--";

    confirmationItems.innerHTML = `
        <p class="text-center">
            We couldn't find your order details.
        </p>
    `;

    confirmationTotal.textContent =
        "GH₵ 0.00";

    paymentMethod.textContent =
        "--";

} else {

    // ================================
    // GENERATE ORDER NUMBER
    // ================================

    const orderId =
        "CF-" +
        Math.random()
            .toString(36)
            .substring(2, 8)
            .toUpperCase();


    orderNumber.textContent = orderId;


    // ================================
    // CUSTOMER DETAILS
    // ================================

    customerName.textContent = savedOrder.customer.fullName;

    customerPhone.textContent = savedOrder.customer.phone;

    customerEmail.textContent = savedOrder.customer.email;

    customerAddress.textContent = `${savedOrder.customer.address}, ${savedOrder.customer.area}, ${savedOrder.customer.location}`;

    deliveryNotes.textContent = savedOrder.customer.notes || "No delivery notes";


    // ================================
    // PAYMENT METHOD
    // ================================

    if (savedOrder.paymentMethod === "momo") {

        paymentMethod.textContent =
            "Mobile Money";

    } else {

        paymentMethod.textContent =
            "Cash on Delivery";

    }


    // ================================
    // DISPLAY ORDER ITEMS
    // ================================

    let itemsHTML = "";


    savedOrder.items.forEach((item) => {

        const price = Number(item.price);
        const quantity = Number(item.quantity);

        const subtotal =
            price * quantity;


        itemsHTML += `
            <div class="confirmation-item">

                <img
                    src="${item.image}"
                    alt="${item.name}"
                    class="confirmation-item-img"
                >

                <div class="confirmation-item-info">

                    <h3>
                        ${item.name}
                    </h3>

                    <p>
                        GH₵ ${price.toFixed(2)}
                        × ${quantity}
                    </p>

                </div>

                <div class="confirmation-item-total">

                    GH₵ ${subtotal.toFixed(2)}

                </div>

            </div>
        `;

    });


    confirmationItems.innerHTML =
        itemsHTML;


    // ================================
    // DISPLAY TOTAL
    // ================================

    confirmationTotal.textContent =
        `GH₵ ${Number(savedOrder.total).toFixed(2)}`;

}