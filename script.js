const API_URL = "https://fakestoreapi.com/products";

const productsContainer = document.getElementById("products");
const loading = document.getElementById("loading");

async function fetchProducts() {
    try {
        const res = await fetch(API_URL);
        const data = await res.json();

        loading.style.display = "none";

        displayProducts(data);

    } catch (error) {
        console.log("Error fetching data:", error);
    }
}

function displayProducts(products) {
    productsContainer.innerHTML = products.map(product => `
        <div class="card">
            <img src="${product.image}" width="100">
            <h3>${product.title}</h3>
            <p>₹${product.price}</p>
        </div>
    `).join("");
}

fetchProducts();