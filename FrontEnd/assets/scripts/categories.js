// récupération des catégories et création des boutons
fetch("http://localhost:5678/api/categories")
  .then((response) => response.json())
  .then((categories) => {
    creeButtonsCategorie(categories);
  })
  .catch((error) => {
    console.error("Erreur lors du chargement des catégories :", error);
  });

// création des boutons de catégories
function creeButtonsCategorie(categories) {
  const container = document.querySelector(".tri");

  // Bouton "Tous"
  const allBtn = document.createElement("button");
  allBtn.classList.add("btn", "selected");
  allBtn.innerText = "Tous";
  allBtn.addEventListener("click", () => {
    travauxTrier(travauxExistant);
    updateSelectedButton(allBtn);
  });
  container.appendChild(allBtn);

  // Boutons dynamiques
  categories.forEach((category) => {
    const button = document.createElement("button");
    button.classList.add("btn");
    button.innerText = category.name;
    button.dataset.categoryId = category.id;

    button.addEventListener("click", () => {
      const filtered = travauxExistant.filter(
        (work) => work.categoryId === category.id
      );
      travauxTrier(filtered);
      updateSelectedButton(button);
    });

    container.appendChild(button);
  });
}

// fonction pour mettre à jour le bouton sélectionné
function updateSelectedButton(activeButton) {
  const buttons = document.querySelectorAll(".btn");
  buttons.forEach((btn) => btn.classList.remove("selected"));
  activeButton.classList.add("selected");
}