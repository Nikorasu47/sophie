const addToBackend = document.getElementById("add-button")
const errorMessage = document.getElementById("error-message")
const titleInput = document.getElementById("title");


addToBackend.addEventListener("click", (e) => {
  e.preventDefault(); // évite le rechargement

  errorMessage.style.display = "none";
  errorMessage.textContent = "";

  // Vérifie que tous les champs sont remplis
  if (!titleInput.value.trim() || !categoryInput.value.trim() || openFile.files.length === 0) {
    errorMessage.textContent = "Veuillez remplir tous les champs et ajouter une image.";
    errorMessage.style.display = "block";
    return;
  }

  // Crée le FormData
  const formData = new FormData();
  formData.append("image", openFile.files[0]);
  formData.append("title", titleInput.value.trim());
  formData.append("category", categoryInput.value.trim());

  // Envoi du formulaire
  fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        // Reset des champs après succès
        titleInput.value = "";
        categoryInput.value = "";
        openFile.value = "";
        picture.innerHTML = `<i class="fa-solid fa-image"></i>`; // Remettre l'icône image

        errorMessage.style.color = "green";
        errorMessage.textContent = "Travail ajouté avec succès !";
        errorMessage.style.display = "block";

        
      } else {
        errorMessage.textContent = "Erreur lors de l'ajout du travail.";
        errorMessage.style.display = "block";
      }
    })
    .catch((error) => {
      console.error("Erreur réseau :", error);
      errorMessage.textContent = "Erreur réseau, veuillez réessayer.";
      errorMessage.style.display = "block";
    });
});