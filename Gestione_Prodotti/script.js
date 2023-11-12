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
document.getElementById("updateButton").addEventListener("click", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");
  if (!productId) {
    alert("Nessun prodotto selezionato per la modifica.");
    return;
  }

  const updatedProduct = {
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    brand: document.getElementById("brand").value,
    imageUrl: document.getElementById("imageUrl").value,
    price: document.getElementById("price").value,
  };

  fetch(`${apiUrl}/${productId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedProduct),
  })
    .then((response) => response.json())
    .then((data) => {
      alert("Prodotto modificato con successo!");
    })
    .catch((error) => {
      console.error("Errore:", error);
    });
});

document.getElementById("deleteButton").addEventListener("click", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");
  if (!productId) {
    alert("Nessun prodotto selezionato per la cancellazione.");
    return;
  }

  if (confirm("Sei sicuro di voler cancellare questo prodotto?")) {
    fetch(`${apiUrl}/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        alert("Prodotto cancellato con successo!");
      })
      .catch((error) => {
        console.error("Errore:", error);
      });
  }
});

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");
if (productId) {
  fetch(`${apiUrl}/${productId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((product) => {
      document.getElementById("name").value = product.name;
      document.getElementById("description").value = product.description;
      document.getElementById("brand").value = product.brand;
      document.getElementById("imageUrl").value = product.imageUrl;
      document.getElementById("price").value = product.price;
      document.getElementById("updateButton").style.display = "block";
      document.getElementById("deleteButton").style.display = "block";
    })
    .catch((error) => console.error("Error:", error));
}
