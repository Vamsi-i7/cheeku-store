const API_URL = "https://fakestoreapi.com/products";

async function fetchProducts() {
    try {
        const res = await fetch(API_URL);  //Calls API
        const data = await res.json();  //Converts response to json

        console.log(data); // check data first
    } catch (error) {
        console.log("Error fetching data:", error);  //Error handling
    }
}

fetchProducts();