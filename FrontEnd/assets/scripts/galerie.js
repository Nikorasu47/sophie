//variables
const gallery = document.getElementsByClassName("gallery")[0];
const travauxExistant = fetch("http://localhost:5678/api/works");

//affichage des travaux present dans la banque de données
travauxExistant
  .then((response) => {
    return response.json();
  })
  // récuperation des travaux pour la galerie
  .then((works) => {
    //boucle d'ajout des balises figure
    for (const work of works) {
      const worksFigures = document.createElement("figure");
      //ajout d'une classe afin de préparer le tri futur
      worksFigures.classList.add(work.category.name.replaceAll(" ", "_"));

      worksFigures.innerHTML = `
		<img src="${work.imageUrl}"+ "alt="${work.title}"">
		<figcaption>${work.title}</figcaption>
        `;

      gallery.appendChild(worksFigures);
    }
    creeButtonsCatégorie(works);
    triAuClickSurBouton(buttons);
  });

//fonction d'ajout bouttons de tri
function creeButtonsCatégorie(works) {
  //recup de l'ensemble des boutons
  const bouttonsTri = document.getElementsByClassName("tri");

  for (const work of works) {
    //ajout bouttons si dans l'ensemble il n'y a pas de classe correspondant au category.name(espace remplacer par underscore+ css escape pour le "&")
    if (
      document.querySelectorAll(
        ".tri ." + CSS.escape(work.category.name.replaceAll(" ", "_"))
      ).length == 0
    ) {
      const buttonNew = document.createElement("button");
      buttonNew.classList.add("btn");
      buttonNew.classList.add(work.category.name.replaceAll(" ", "_"));
      buttonNew.innerText = work.category.name;

      bouttonsTri[0].appendChild(buttonNew);
    }
  }
}
//fonction tri au click
const buttons = document.getElementsByClassName("btn"); // HTMLCollection
console.log(buttons);

function triAuClickSurBouton(buttons) {
  // On transforme HTMLCollection en array pour pouvoir utiliser forEach
  Array.from(buttons).forEach(button => {
    button.addEventListener("click", function () {
      
      if (!button.classList.contains("selected")) {
        
        button.classList.add("selected");
      } else {
        button.classList.remove("selected");
      }
    });
  });
}
// ajout de nouveaux travaux dans la galerie
