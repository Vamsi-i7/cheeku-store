const API_URL = "https://fakestoreapi.com/products";

const productsContainer = document.getElementById("products");
const loading = document.getElementById("loading");
const searchInput = document.getElementById("search");

let allProducts = [];

async function fetchProducts() {
    try {
        const res = await fetch(API_URL);
        const data = await res.json();

        allProducts = data;

        loading.style.display = "none";
        displayProducts(allProducts);

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

// Debounce function
function debounce(func, delay) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => func.apply(this, args), delay);
    };
}

// Debounced search handler
const handleSearch = debounce(function () {
    const value = searchInput.value.toLowerCase();

    const filtered = allProducts.filter(product =>
        product.title.toLowerCase().includes(value)
    );

    displayProducts(filtered);
}, 300);

// Attach event
searchInput.addEventListener("input", handleSearch);

fetchProducts();