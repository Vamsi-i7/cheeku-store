const API_URL = "https://fakestoreapi.com/products";

const productsContainer = document.getElementById("products");
const loading = document.getElementById("loading");
const searchInput = document.getElementById("search");
const categorySelect = document.getElementById("category");
const sortSelect = document.getElementById("sort");

let allProducts = [];

// Fetch Products
async function fetchProducts() {
    try {
        const res = await fetch(API_URL);
        const data = await res.json();

        allProducts = data;

        loading.style.display = "none";
        displayProducts(allProducts);
        populateCategories(allProducts);

    } catch (error) {
        console.log("Error fetching data:", error);
    }
}

// Display Products
function displayProducts(products) {
    productsContainer.innerHTML = products.map(product => `
        <div class="card">
            <img src="${product.image}" width="100">
            <h3>${product.title}</h3>
            <p>₹${product.price}</p>
        </div>
    `).join("");
}

// Populate Categories
function populateCategories(products) {
    const categories = [...new Set(products.map(p => p.category))];

    categorySelect.innerHTML += categories.map(cat =>
        `<option value="${cat}">${cat}</option>`
    ).join("");
}

// Debounce Function
function debounce(func, delay) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => func.apply(this, args), delay);
    };
}

// Search with Debouncing
const handleSearch = debounce(function () {
    const value = searchInput.value.toLowerCase();

    const filtered = allProducts.filter(product =>
        product.title.toLowerCase().includes(value)
    );

    displayProducts(filtered);
}, 300);

searchInput.addEventListener("input", handleSearch);

// Category Filter
categorySelect.addEventListener("change", function () {
    const value = this.value;

    let filtered = allProducts;

    if (value !== "all") {
        filtered = allProducts.filter(product =>
            product.category === value
        );
    }

    displayProducts(filtered);
});

// Sorting
sortSelect.addEventListener("change", function () {
    const value = this.value;

    let sorted = [...allProducts];

    if (value === "low") {
        sorted.sort((a, b) => a.price - b.price);
    } else if (value === "high") {
        sorted.sort((a, b) => b.price - a.price);
    }

    displayProducts(sorted);
});

// Initial Call
fetchProducts();