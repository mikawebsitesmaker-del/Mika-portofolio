const cartBtn = document.getElementById("cartBtn");
const closeCart = document.getElementById("closeCart");
const cart = document.getElementById("cart");
const overlay = document.getElementById("overlay");
const items = document.getElementById("items");
const empty = document.getElementById("empty");
const count = document.getElementById("count");
const total = document.getElementById("total");
const checkout = document.getElementById("checkout");
const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");
const orderItems = document.getElementById("orderItems");
const orderTotal = document.getElementById("orderTotal");
const form = document.getElementById("form");
const message = document.getElementById("message");
const price = document.getElementById("price");
const addBuild = document.getElementById("addBuild");
const products = [];

function money(number) {
return "$" + number.toLocaleString("en-US");
}

function openCart() {
cart.classList.add("active");
overlay.classList.add("active");
}

function close() {
cart.classList.remove("active");
overlay.classList.remove("active");
}

cartBtn.addEventListener("click", openCart);
closeCart.addEventListener("click", close);
overlay.addEventListener("click", close);

document.querySelectorAll(".add").forEach(button => {
button.addEventListener("click", () => {
products.push({
name: button.dataset.name,
price: Number(button.dataset.price),
image: button.dataset.image
});
updateCart();
openCart();
});
});

function updateCart() {
items.innerHTML = "";
count.textContent = products.length;
if (products.length === 0) {
empty.style.display = "flex";
items.style.display = "none";
checkout.disabled = true;
} else {
empty.style.display = "none";
items.style.display = "block";
checkout.disabled = false;
products.forEach((product, index) => {
const row = document.createElement("div");
row.className = "cart-row";
row.innerHTML = `
<img src="${product.image}" alt="${product.name}">
<div>
<h4>${product.name}</h4>
<p>${money(product.price)}</p>
</div>
<button class="remove" data-index="${index}">
🗑
</button>
`;
items.appendChild(row);
});
document.querySelectorAll(".remove").forEach(button => {
button.addEventListener("click", () => {
products.splice(Number(button.dataset.index), 1);
updateCart();
});
});
}
let all = 0;
products.forEach(product => {
all = all + product.price;
});
total.textContent = money(all);
}

function getPrice() {
let base = 1250;
let cpu = Number(document.getElementById("cpu").value);
let gpu = Number(document.getElementById("gpu").value);
let ram = Number(document.getElementById("ram").value);
let storage = Number(document.getElementById("storage").value);
let pcCase = Number(document.getElementById("case").value);
return base + cpu + gpu + ram + storage + pcCase;
}

function updateBuild() {
let newPrice = getPrice();
price.textContent = money(newPrice);
document.getElementById("cpuName").textContent =
document.getElementById("cpu").selectedOptions[0].dataset.name;
document.getElementById("gpuName").textContent =
document.getElementById("gpu").selectedOptions[0].dataset.name;
document.getElementById("ramName").textContent =
document.getElementById("ram").selectedOptions[0].dataset.name;
document.getElementById("storageName").textContent =
document.getElementById("storage").selectedOptions[0].dataset.name;
document.getElementById("caseName").textContent =
document.getElementById("case").selectedOptions[0].dataset.name;
}

document.querySelectorAll(".part select").forEach(select => {
select.addEventListener("change", updateBuild);
});

addBuild.addEventListener("click", () => {
products.push({
name: "Custom Nexus Build",
price: getPrice(),
image: "https://cdn.discordapp.com/attachments/1391178102272426007/1536108175827140638/image.png?ex=6a7a33b8&is=6a78e238&hm=a7871974b1e15d12e70aa164fa40f9a8a3d914bd1bec96519b99c0a0701df70e&"
});
updateCart();
openCart();
});

checkout.addEventListener("click", () => {
if (products.length === 0) {
return;
}
orderItems.innerHTML = "";
products.forEach(product => {
const row = document.createElement("div");
row.className = "checkout-item";
row.innerHTML = `
<img src="${product.image}" alt="${product.name}">
<div>
<h4>${product.name}</h4>
<span>${money(product.price)}</span>
</div>
`;
orderItems.appendChild(row);
});
let all = 0;
products.forEach(product => {
all = all + product.price;
});
orderTotal.textContent = money(all);
modal.classList.add("active");
});

closeModal.addEventListener("click", () => {
modal.classList.remove("active");
});

modal.addEventListener("click", event => {
if (event.target === modal) {
modal.classList.remove("active");
}
});

form.addEventListener("submit", event => {
event.preventDefault();
const name = document.getElementById("name").value;
message.textContent =
"Thanks " + name + "! Your order has been received.";
form.reset();
products.length = 0;
updateCart();
setTimeout(() => {
modal.classList.remove("active");
close();
message.textContent = "";
}, 2500);
});

updateBuild();
updateCart();