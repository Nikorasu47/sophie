// variables
const gallery = document.querySelector(".gallery");
let travauxExistant = [];

// affichage des travaux présents
fetch("http://localhost:5678/api/works")
  .then((response) => response.json())
  .then((works) => {
    travauxExistant = works;
    travauxTrier(travauxExistant)
    // Affiche tout au début
  })
  .catch((error) => {
    console.error("Erreur lors du chargement des Travaux :", error);
  });

// fonction d'affichage des travaux dans la galerie
function travauxTrier(works) {
  gallery.innerHTML = ""; // vide la galerie

  works.forEach((work) => {
    const worksFigures = document.createElement("figure");

    worksFigures.innerHTML = `
      <img src="${work.imageUrl}" alt="${work.title}">
      <figcaption>${work.title}</figcaption>
    `;

    gallery.appendChild(worksFigures);
  });
}