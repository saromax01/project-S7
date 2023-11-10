const apiUrl = "https://striveschool-api.herokuapp.com/api/product/";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTRkZWMyNDI1NGU4ODAwMTgzZjE4N2IiLCJpYXQiOjE2OTk2MDU1NDAsImV4cCI6MTcwMDgxNTE0MH0.5QN2q8IadDUS-Xep8qoZyomqG2ByB9jVnaincmn8uss";

document.getElementById("productForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const product = {
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    brand: document.getElementById("brand").value,
    imageUrl: document.getElementById("imageUrl").value,
    price: document.getElementById("price").value,
  };

  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(product),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Prodotto aggiunto:", data);
      alert("Prodotto aggiunto con successo!");
      document.getElementById("productForm").reset();
    })
    .catch((error) => {
      console.error("Errore:", error);
    });
});
