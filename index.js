const products = [
    { id: 1, name: "лоллиум", price: 1000, img: "1000.jpeg" },
    { id: 2, name: "ульстромерия", price: 999, img: "900.jpeg" },
    { id: 3, name: "фамариллис", price: 800, img: "800.jpeg" },
    { id: 4, name: "принемон", price: 740, img: "700.jpeg" },
    { id: 5, name: "онтриум", price: 620, img: "600.jpeg" },
    { id: 6, name: "гостильба", price: 560, img: "500.jpeg" },
    { id: 7, name: "ространция", price: 430, img: "400.jpeg" },
    { id: 8, name: "лрассика", price: 320, img: "300.jpeg" },
    { id: 9, name: "бруния", price: 220, img: "200.jpeg" },
];

const renderProducts = () => {
    const container = document.getElementById("product-container");
    container.innerHTML = "";
    products.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.className = "product-card";
        productCard.dataset.id = product.id;
        productCard.innerHTML = `
        <img src="${product.img}">
        <h3>${product.name}</h3>
        <p><strong>Цена:</strong> ${product.price} р.</p>
        <input type="number" value="0" data-id="${product.id}" style="width: 50px;">
      `;
        container.appendChild(productCard);
    });
};

const sortProducts = (criteria) => {
    if (criteria === "price") {
        products.sort((a, b) => a.price - b.price);
    } else if (criteria === "name") {
        products.sort((a, b) => a.name.localeCompare(b.name));
    }
    renderProducts();
};


const placeOrder = () => {
    const inputs = document.querySelectorAll('input[type="number"]');
    let orderDetails = [];
    let totalprice = 0;

    inputs.forEach(input => {
        const quantity = parseInt(input.value);
        if (quantity > 0) {
            const product = products.find(p => p.id == input.dataset.id); // Находим товар
            orderDetails.push(`name:${encodeURIComponent(product.name)},quantity:${quantity}`);
            totalprice += product.price * quantity;
        }
    });

    if (orderDetails.length > 0) {
        const orderString = orderDetails.join('!!!');
        const queryString = `order=${orderString}!!!totalprice=${totalprice}`;
        const url = `https://www.google.com/?${queryString}`;
        window.open(url, '_blank');
    }
};


const searchbyname = () => {
    const searchInput = document.getElementById("search-input");
    if (!searchInput) return;
    const searchQuery = searchInput.value.toLowerCase();
    const products = document.querySelectorAll(".product-card");
    products.forEach(product => {
        const productName = product.querySelector("h3").textContent.toLowerCase();
        product.style.display = productName.includes(searchQuery) ? "block" : "none";
        ;
    });
}

renderProducts();
