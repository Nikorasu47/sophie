const addToBackend = document.getElementById("add-button")
const errorMessage = document.getElementById("error-message")
const titleInput = document.getElementById("title");
const picture = document.getElementById("img-picture");



function checkFormValidity() {
  const isFormValid = titleInput.value.trim() !== "" && categoryInput.value !== "" && openFile.files.length > 0;
  addToBackend.disabled = !isFormValid;
  addToBackend.classList.toggle("disabled-btn", !isFormValid);
}

// verif changements de chaque champ
titleInput.addEventListener("input", checkFormValidity);
categoryInput.addEventListener("input", checkFormValidity);
openFile.addEventListener("change", checkFormValidity);

// Appel initial

checkFormValidity();


addToBackend.addEventListener("click", (e) => {
  e.preventDefault(); // évite le rechargement
  
  errorMessage.style.display = "none";
  errorMessage.textContent = "";

 
  // Crée la demande
  const formData = new FormData();
  formData.append("image", openFile.files[0]);
  formData.append("title", titleInput.value.trim());
  formData.append("category", categoryInput.value);

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
      return response.json(); // On récupère les infos du nouveau travail
    } else {
      throw new Error("Erreur lors de l'ajout du travail.");
    }
  })
  .then((newWork) => {
    //  Ajout dynamique à la galerie
     const figure = document.createElement("figure");
  
    figure.innerHTML = `
      <img src="${newWork.imageUrl}" alt="${newWork.title}">
      <figcaption>${newWork.title}</figcaption>
    `;
  
    gallery.appendChild(figure);
  
    //  Reset des champs
    titleInput.value = "";
    categoryInput.value = "";
    openFile.value = "";
    picture.innerHTML = `<i class="fa-solid fa-image"></i>`;
  
    errorMessage.style.color = "green";
    errorMessage.textContent = "Travail ajouté avec succès !";
    errorMessage.style.display = "block";
  
    
  })
  .catch((error) => {
    console.error("Erreur réseau :", error);
    errorMessage.textContent = error.message || "Erreur réseau, veuillez réessayer.";
    errorMessage.style.display = "block";
  });
});


