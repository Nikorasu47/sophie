const addPicture = document.querySelector(".addPictureButton");
const addWindow = document.getElementById("add-picture");
const modalAcceuil = document.querySelector(".modal-wrapper");
const returnModal = document.getElementById("returnModal")

addPicture.addEventListener("click", () => {
  modalAcceuil.style.display = "none";
  addWindow.style.display = "flex"

});

returnModal.addEventListener("click", () => {
  modalAcceuil.style.display = "flex";
  addWindow.style.display = "none"

});

const openFile = document.getElementById("trigger-file")
const buttonOpenFile = document.getElementById("trigger-button")
const divPicture = document.querySelector(".div-pict")
const imageAjout =document.getElementById("img-picture")

buttonOpenFile.addEventListener("click", () => {
  
  openFile.click();
 
  openFile.addEventListener("change", function(event){

    const imgFile = event.target.files[0];
    divPicture.style.display= "none";
    imageAjout.style.display ="flex"
    
    if (openFile.files && openFile.files[0]) {

      const reader = new FileReader();
      

      reader.onload = function (e){
        imageAjout.src = e.target.result;
      };
      

      reader.readAsDataURL(imgFile);
    };
  });
});


imageAjout.addEventListener("click", () => {
  
  openFile.click();
});


const chevronDown = document.querySelector(".fa-chevron-down");
const categoryInput = document.getElementById("category");
let dropdown; // Pour stocker la liste déroulante

// Clique sur l'icône chevron
chevronDown.addEventListener("click", async () => {
  // Si déjà ouvert, on ne refait pas
  if (dropdown) {
    dropdown.remove();
    dropdown = null;
    return;
  }

  try {
    const response = await fetch("http://localhost:5678/api/categories");
    const categories = await response.json();

    // Création du dropdown
    dropdown = document.createElement("div");
    dropdown.classList.add("dropdown-categories");

    categories.forEach((cat) => {
      const option = document.createElement("div");
      option.classList.add("dropdown-option");
      option.textContent = cat.name;
      option.dataset.id = cat.id;

      option.addEventListener("click", () => {
        categoryInput.value = cat.name;
        // Cache le menu après sélection
        dropdown.remove();
        dropdown = null;
      });

      dropdown.appendChild(option);
    });

    // Ajoute le dropdown sous l'input catégorie
    const categoryContainer = document.querySelector(".div-category");
    categoryContainer.appendChild(dropdown);

  } catch (error) {
    console.error("Erreur lors du chargement des catégories :", error);
  }
});