const token = localStorage.getItem("token");
document.addEventListener("DOMContentLoaded", () => {
 
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

const modifBtn = document.getElementById("modif");

modifBtn.addEventListener("click", () => {
  const modal = document.getElementById("modalModif");
  const closeModal = document.querySelector(".close");
  const worksListContainer = document.getElementById("works-modif");

  modalModif.style.display = "flex";

  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  fetch("http://localhost:5678/api/works")
    .then((res) => res.json())
    .then((works) => {
      travauxExistant = works;
      displayWorksInModal();
    });

  function displayWorksInModal() {
    worksListContainer.innerHTML = "";

    travauxExistant.forEach((works) => {
      const item = document.createElement("div");
      item.classList.add("work-item");

      item.innerHTML = `          
              <img src="${works.imageUrl}" alt="${works.title}">
               <button class="delete-btn" data-id="${works.id}"><i class="fa-solid fa-trash "></i></button>         
          `;

      worksListContainer.appendChild(item);
    });

    // Ajout listeners "Supprimer"
    const deleteButtons = document.querySelectorAll(".delete-btn");

    deleteButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        fetch(`http://localhost:5678/api/works/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((res) => {
          if (res.ok) {
            travauxExistant = travauxExistant.filter((work) => work.id != id);
            displayWorksInModal();
            travauxTrier(travauxExistant);
          } else {
            alert("Erreur lors de la suppression.");
          }
        });
      });
    });
  }
});
