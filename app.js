
function addItems(button) {
    const card = button.closest(".card");
    const name = card.querySelector("h3").innerText;
    const price = parseInt(card.querySelector("p").innerText.replace("Price : ", "").trim());

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push({ name, price, qty: 1 });

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${name} added to cart!`);
}



document.addEventListener("DOMContentLoaded", () => {
    loadCart();
});

function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const leftBox = document.getElementById("leftCartItems");
    const rightBox = document.getElementById("rightCartItems");
    const totalAmount = document.getElementById("totalAmount");

    leftBox.innerHTML = "";
    rightBox.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.qty;

        // LEFT SIDE LAYOUT
        leftBox.innerHTML += `
            <div class="item-row">
                <div>
                    <h3>${item.name}</h3>
                </div>

                <div class="item-controls">
                    <button class="remove-btn" onclick="removeItem(${index})">remove</button>

                    <div class="qty-box">
                        <button onclick="decreaseQty(${index})">-</button>
                        <span>${item.qty}</span>
                        <button onclick="increaseQty(${index})">+</button>
                    </div>
                </div>
            </div>
        `;

        // RIGHT SIDE SUMMARY
        rightBox.innerHTML += `
            <div class="summary-item">
                <span>${item.name} x ${item.qty}</span>
                <span>${item.price * item.qty}</span>
            </div>
        `;
    });

    totalAmount.innerText = total;
}

// FUNCTIONS ------------------------------------------------

function increaseQty(i) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart[i].qty++;
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

function decreaseQty(i) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (cart[i].qty > 1) {
        cart[i].qty--;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

function removeItem(i) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart.splice(i, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}
