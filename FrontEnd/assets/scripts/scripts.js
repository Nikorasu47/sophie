document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const messageElement = document.getElementById("login-message");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    // Réinitialise le message
    messageElement.style.display = "none";
    messageElement.textContent = "";

    // Vérification simple
    if (!email && !password) {
      afficherMessage("Veuillez remplir tous les champs.");
      return;
    }
    if (!email || !password) {
      afficherMessage("Veuillez remplir le champ manquant.");
      return;
    }

    // Vérifie compatibilité
    const emailAttendu = window.localStorage.setItem("user", "SophieBuel@gmail.com");
    const passwordAttendu = window.localStorage.setItem("mot de passe", "123456789");

    if (email === emailAttendu && password === passwordAttendu) {
     
      // Redirection menu de modif
      // window.location.href = "admin.html";
    } else {
      afficherMessage("Identifiants incorrects !");
    }
  });

  function afficherMessage(texte) {
    messageElement.textContent = texte;
    messageElement.style.display = "block";
    messageElement.style.color = "red";
  }
});