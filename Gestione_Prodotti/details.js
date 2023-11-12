const apiUrl = "https://striveschool-api.herokuapp.com/api/product/";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTRkZWMyNDI1NGU4ODAwMTgzZjE4N2IiLCJpYXQiOjE2OTk2MDU1NDAsImV4cCI6MTcwMDgxNTE0MH0.5QN2q8IadDUS-Xep8qoZyomqG2ByB9jVnaincmn8uss";
function getProductDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  fetch(`${apiUrl}/${productId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((product) => {
      const productDetails = document.getElementById("productDetails");
      productDetails.innerHTML = `
            <div class="col-md-12">
                <h2>${product.name}</h2>
                <p>${product.description}</p>
                <img src="${product.imageUrl}" alt="${product.name}" style="width:100%;">
                <p>Marca: ${product.brand}</p>
                <p>Prezzo: €${product.price}</p>
                <button id="editButton" class="btn btn-warning">Modifica</button>
                <button id="deleteButton" class="btn btn-danger">Cancella</button>
            </div>
        `;
    })
    .catch((error) => console.error("Error:", error));
}
document.getElementById("productDetails").addEventListener("click", function (event) {
  if (event.target.id === "editButton") {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");
    window.location.href = `index.html?id=${productId}`;
  }
});
document.getElementById("productDetails").addEventListener("click", function (event) {
  if (event.target.id === "deleteButton") {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");
    window.location.href = `index.html?id=${productId}`;
  }
});
getProductDetails();
