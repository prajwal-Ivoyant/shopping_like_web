// product list arr->obj
const products = [
    { id: 1, name: "Iphone 15", price: 75000 },
    { id: 2, name: "Airpods pro", price: 15000 },
    { id: 3, name: "Apple smart watch", price: 35000 }
    
];


function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}


function addToCart(id) {
    let cart = getCart();
    let item = cart.find(p => p.id === id);

    if (item) {
        item.qty += 1;
    } else {
        const product = products.find(p => p.id === id);
        cart.push({ ...product, qty: 1 });
    }

    saveCart(cart);
    updateButtons();
}

function removeItem(id) {
    let cart = getCart();
    cart = cart.filter(p => p.id !== id);
    saveCart(cart);
    displayCart();
    updateButtons();
}

function increaseQty(id) {
    let cart = getCart();
    let item = cart.find(p => p.id === id);
    item.qty++;
    saveCart(cart);
    displayCart();
}

function decreaseQty(id) {
    let cart = getCart();
    let item = cart.find(p => p.id === id);

    if (item.qty > 1) item.qty--;
    saveCart(cart);
    displayCart();
}

function displayCart() {
    if (!document.querySelector(".cart-left")) return;

    let cart = getCart();
    let left = "";
    let right = "";
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.qty;

        left += `
    <div class="cart-row">
        <h3>${item.name}</h3>

        

        <div class="qty-box">

            <img 
            src="https://img.icons8.com/pulsar-gradient/48/delete-trash.png" 
            alt="delete-trash"
            width="28"
            height="28"
            class="delete-icon"
            onclick="removeItem(${item.id})"
        />



            <button onclick="increaseQty(${item.id})">+</button>
            <span>${item.qty}</span>
            <button onclick="decreaseQty(${item.id})">-</button>

            
        </div>
    </div>
   
`;

        right += `
            <div class="rc-item">
                <span>${item.name} x ${item.qty}</span>
                <span>${item.price * item.qty}</span>
            </div>
        `;
    });

    document.querySelector(".cart-left").innerHTML = left;
    document.querySelector("#rightCartItems").innerHTML = right;
    document.querySelector("#totalAmount").innerText = total;
}

function updateButtons() {
    if (!document.querySelector(".grid")) return;

    let cart = getCart();
    const cards = document.querySelectorAll(".card");

    cards.forEach((card, index) => {
        let btn = card.querySelector(".btn");
        let product = products[index];

        if (cart.find(p => p.id === product.id)) {
            btn.innerText = "✔ Added";
            btn.classList.add("added");
        } else {
            btn.innerText = "+ BUY";
            btn.classList.remove("added");
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {

    const buttons = document.querySelectorAll(".btn");
    buttons.forEach((btn, index) => {
        btn.addEventListener("click", () => {
            addToCart(products[index].id);
        });
    });

    updateButtons();
    displayCart();
});
