// Sélection du formaulaire dans une variable
const form = document.querySelector('form');

// À l'envoi du formulaire
form.addEventListener('submit', (event) => {

    //Empêche le rechargement de la page
    event.preventDefault();

    // Selection des valeurs du formulaire
    var mail = document.getElementById('email').value;
    var mdp = document.getElementById('mdp').value;
    
    //Envoi et traitement des données du formulaire
    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: mail,
            password: mdp,
        }),
        })
    .then(response => {
    if (response.status === 200) {

        // Si la réponse de l'API est positive
        document.querySelector('.loginErreur').innerHTML = "";
        return response.json();
    } else {
        
        // Si la réponse de l'API est négative
        document.querySelector('.loginErreur').innerHTML = "<p class='erreurMdp'>Erreur dans l’identifiant ou le mot de passe</p>";
    }
  })
  .then(data => {

    // Utilisation des données reçues via l'API, stockage du token et redirection
    const token = data.token;
    localStorage.setItem("authToken", token);
    window.location.href = "./index.html";
  })
  .catch(error => {
    console.error(error);
  });

})