// testAddProduct.js
import dotenv from "dotenv";
dotenv.config();

// Helper function for HTTP requests
async function request(url, method = "GET", body = null) {
  const options = { method, headers: { "Content-Type": "application/json" } };
  if (body) options.body = JSON.stringify(body);
  const response = await fetch(url, options);
  const data = await response.json();
  return { status: response.status, data };
}

// Base API URL
const BASE_URL = "http://localhost:5000/api/products";

async function runCRUDTests() {
  console.log("==== STARTING CRUD TESTS ====");

  // ----- READ: show starting products -----
  console.log("\n1) Reading initial products...");
  let readAll = await request(BASE_URL);
  console.log("Initial products:", readAll.data);

  // ----- CREATE: add new product -----
  console.log("\n2) Creating a new product...");
  const newProduct = {
    name: "CRUD Test Product",
    price: 9.99,
    image: "https://example.com/crud.jpg"
  };
  const create = await request(BASE_URL, "POST", newProduct);
  console.log("Created product:", create.data);
  const createdId = create.data?._id;

  // ----- READ: confirm new product exists -----
  console.log("\n3) Reading products after creation...");
  readAll = await request(BASE_URL);
  console.log("Products:", readAll.data);

  // ----- UPDATE: modify new product -----
  console.log("\n4) Updating the new product...");
  const updatedNewProduct = {
    name: "Updated CRUD Product",
    price: 19.99,
    image: newProduct.image
  };
  const updateNew = await request(`${BASE_URL}/${createdId}`, "PUT", updatedNewProduct);
  console.log("Updated new product:", updateNew.data);

  // ----- UPDATE: modify an existing product if available -----
  if (readAll.data.length > 0) {
    // pick the first product that is NOT the newly created one
    const existingProduct = readAll.data.find(p => p._id !== createdId);
    if (existingProduct) {
      console.log("\n5) Updating an existing product...");
      const updatedExisting = {
        name: existingProduct.name + " (Edited)",
        price: existingProduct.price + 5,
        image: existingProduct.image
      };
      const updateExisting = await request(`${BASE_URL}/${existingProduct._id}`, "PUT", updatedExisting);
      console.log("Updated existing product:", updateExisting.data);
    } else {
      console.log("No other existing product found to update.");
    }
  }

  // ----- READ: confirm updates -----
  console.log("\n6) Reading products after updates...");
  readAll = await request(BASE_URL);
  console.log("Products:", readAll.data);

  // ----- DELETE: remove the new product -----
  console.log("\n7) Deleting the new product...");
  const del = await request(`${BASE_URL}/${createdId}`, "DELETE");
  console.log(del.data);

  // ----- READ: confirm deletion -----
  console.log("\n8) Reading products after deletion...");
  readAll = await request(BASE_URL);
  console.log("Products:", readAll.data);

  console.log("\n==== CRUD TESTS COMPLETE ====");
}

await runCRUDTests();
