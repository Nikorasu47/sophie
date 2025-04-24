
document.addEventListener("DOMContentLoaded", () => {

    const form = document.querySelector("form");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const messageElement = document.getElementById("login-message");
  
    //ecoute de l'evenement de l'action "se connecter"
    form.addEventListener("submit", (event) => {
      event.preventDefault();
  
      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();
  
      // Réinitialise le message d'erreur
      messageElement.style.display = "none";
      messageElement.textContent = "";
  
      // Vérification des champs vides
      if (!email && !password) {
        afficherMessage("Veuillez remplir tous les champs.");
        return;
      }
      if (!email || !password) {
        afficherMessage("Veuillez remplir le champ manquant.");
        return;
      }
  
      fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })
        .then((response) => {
          if (!response.ok) {
            //prevention de l'erreur
            throw new Error("Erreur dans l’identifiant ou le mot de passe");
          }
          return response.json();
        })
        .then((data) => {
          // Stocke le token dans le localStorage
          localStorage.setItem("token", data.token);
          messageElement.style.color = "green";
          afficherMessage("Connexion réussie !");
          // Redirection vers "index.html" + modif possible
          window.location.href = "index.html";
        })
        .catch((error) => {
          afficherMessage("Erreur dans l’identifiant ou le mot de passe.");
          console.error("Erreur de connexion :", error);
        });
    });
  
    function afficherMessage(texte) {
      messageElement.textContent = texte;
      messageElement.style.display = "block";
      messageElement.style.color = "red";
    }
    
    
  });
  