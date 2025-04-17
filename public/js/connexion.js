let inputCourriel = document.getElementById("input-courriel");
let inputMotDePasse = document.getElementById("input-mot-de-passe");
let formConnexion = document.getElementById("form-connexion");
 
formConnexion.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (erreurMessage) {
        erreurMessage.textContent = "";
        erreurMessage.style.display = "none";
    }

    // Validation du courriel
    const email = inputCourriel.value.trim();
    const password = inputMotDePasse.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        afficherErreur("Veuillez entrer une adresse courriel valide.");
        return;
    }

    // Validation du mot de passe
    if (password.length < 6) {
        afficherErreur("Le mot de passe doit contenir au moins 6 caractères.");
        return;
    }
 
    // Les noms des variables doivent être les mêmes
    // que celles spécifié dans les configuration de
    // passport dans le fichier "authentification.js"
    const data = {
        email: inputCourriel.value,
        password: inputMotDePasse.value,
    };
 
    let response = await fetch("/connexion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
 
    if (response.ok) {
        // Si l'authentification est réussi, on
        // redirige vers une autre page
        window.location.replace("/allTasks");
    } else {
        // Si l'authentification ne réussi pas, on
        // a le message d'erreur dans l'objet "data"
        let data = await response.json();
 
        alert("echec de connexion", data.erreur);
 
        // Utiliser "data" pour afficher l'erreur ;a
        // l'utilisateur ici ...
    }
});