const addPicture = document.querySelector(".addPictureButton");
const addWindow = document.getElementById("add-picture");
const modalAcceuil = document.querySelector(".modal-wrapper");
const returnModal = document.getElementById("returnModal")

addPicture.addEventListener("click", () => {
  addWindow.style.display = "flex"
  modalAcceuil.style.display = "none";
  

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



const categoryInput = document.getElementById("category");

// Fonction pour récupérer et afficher les catégories
async function loadCategories() {
  
  try {
    const response = await fetch("http://localhost:5678/api/categories");
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des catégories");
    }
    const categories = await response.json();

    // Insérer les catégories dans la liste déroulante
    categories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category.id;
      option.textContent = category.name;
      categoryInput.appendChild(option);
    });
  } catch (error) {
    console.error("Erreur lors du chargement des catégories :", error);
  }
}
loadCategories();