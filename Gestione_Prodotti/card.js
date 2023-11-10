const apiUrl = "https://striveschool-api.herokuapp.com/api/product/";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTRkZWMyNDI1NGU4ODAwMTgzZjE4N2IiLCJpYXQiOjE2OTk2MDU1NDAsImV4cCI6MTcwMDgxNTE0MH0.5QN2q8IadDUS-Xep8qoZyomqG2ByB9jVnaincmn8uss";

function loadProducts() {
  fetch(apiUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const productsContainer = document.getElementById("productsContainer");
      productsContainer.innerHTML = "";
      data.forEach((product) => {
        const productDiv = document.createElement("div");
        productDiv.className = "col-md-4 mb-3";
        productDiv.innerHTML = `
                <div class="card">
                    <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">${product.description}</p>
                        <p class="card-text"><small class="text-muted">Marca: ${product.brand}</small></p>
                        <p class="card-text">Prezzo: €${product.price}</p>
                        <a href="./details.html?id=${product._id}" class="btn btn-primary">Scopri di più</a>
                    </div>
                </div>
            `;
        productsContainer.appendChild(productDiv);
      });
    })
    .catch((error) => console.error("Error:", error));
}

loadProducts();
