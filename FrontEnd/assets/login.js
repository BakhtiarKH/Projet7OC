const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    var mail = document.getElementById('email').value;
    var mdp = document.getElementById('mdp').value;
    
    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "email": mail,
            "password": mdp
          })
      })

      .then(response => {
        if (response.status === 200) {
            window.location.href ='./index.html';
        } else {
            document.querySelector('.loginErreur').innerHTML = '<p class="erreurMdp">Identifiant ou mot de passe incorrect</p>';
        }
    }).catch(error => {
        console.error(error);
    });
})
