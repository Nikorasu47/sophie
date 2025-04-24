document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  const adminBanner = document.getElementById("admin-banner");
  const logLink = document.getElementById("log");
  const modif = document.getElementById("modif");

  if (token) {
    // Affiche la bannière admin
    adminBanner.style.display = "block";
    logLink.textContent = "logout";
    modif.style.display = "block";

    // Gère la déconnexion

    logLink.addEventListener("click", () => {
      //retire le "statut connecter"(token)
      localStorage.removeItem("token");
      // recharge la page en mode "non connecté"
      window.location.reload();
    });
  }
});

const modifierOpen = document.getElementById("modif");

modifierOpen.addEventListener("click", () => {
  const modalePopup = document.getElementById("modalModif");
  modalePopup.style.display = "block";

  const modifBtn = document.getElementById("modif");

  const closeModal = document.querySelector(".close");
  const worksListContainer = document.getElementById("works-modif");

  fetch("http://localhost:5678/api/works")
    .then((res) => res.json())
    .then((works) => {
      travauxExistant = works;
      displayWorksInModal();
    });

  function displayWorksInModal() {
    worksListContainer.innerHTML = "";

    travauxExistant.forEach((work) => {
      const item = document.createElement("div");

      item.innerHTML = `
        <div class="work-item">
          <img src="${work.imageUrl}" alt="${work.title}">
           <button class="delete-btn" data-id="${work.id}"><i class="fa-solid fa-trash "></i></button>
        </div>
       
      `;

      worksListContainer.appendChild(item);
    });
  }
});
