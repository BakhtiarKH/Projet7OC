// Déclaration des constantes
const modifier = document.querySelector('.portfolio-title')
const filterTous = document.getElementById('filterTous')
const filterObjets = document.getElementById('filterObjets')
const filterAppartements = document.getElementById('filterAppartements')
const filterHotels = document.getElementById('filterHotels')
const apiUrl = 'http://localhost:5678/api/'

// Fonction pour demander la liste des objets via l'API
function getData(callback) {
  fetch(apiUrl + 'works')
    .then(response => response.json())
    .then(data => callback(data))
    .catch(error => console.error(error))
}

// Utilisation de la fonction précédante et affichage de toutes les donnés au chargement de la page
getData(data => {
  const works = data

  document.querySelector('.gallery').innerHTML = ''
  for (let selecteur = 0; selecteur < works.length; selecteur++) {
    document.querySelector('.gallery').innerHTML += '<figure><img src="' + works[selecteur].imageUrl + '" alt="' + works[selecteur].title + '"><figcaption>' + works[selecteur].title + '</figcaption>';
  }
})

// Les 4 suivants remplacent l'affichage des éléments en fonction de la catégorie sélectionnée
filterTous.addEventListener('click', function() {
  getData(data => {
    const works = data

    document.querySelector('.gallery').innerHTML = ''
    for (let selecteur = 0; selecteur < works.length; selecteur++) {
      document.querySelector('.gallery').innerHTML += '<figure><img src="' + works[selecteur].imageUrl + '" alt="' + works[selecteur].title + '"><figcaption>' + works[selecteur].title + '</figcaption>';
    }
  })
})

filterObjets.addEventListener('click', function() {
  getData(data => {
    const works = data.filter(work => work.categoryId === 1)
    
    document.querySelector('.gallery').innerHTML = ''
    for (let selecteur = 0; selecteur < works.length; selecteur++) {
      document.querySelector('.gallery').innerHTML += '<figure><img src="' + works[selecteur].imageUrl + '" alt="' + works[selecteur].title + '"><figcaption>' + works[selecteur].title + '</figcaption>';
    }
  })
})

filterAppartements.addEventListener('click', function() {
  getData(data => {
    const works = data.filter(work => work.categoryId === 2)
    
    document.querySelector('.gallery').innerHTML = ''
    for (let selecteur = 0; selecteur < works.length; selecteur++) {
      document.querySelector('.gallery').innerHTML += '<figure><img src="' + works[selecteur].imageUrl + '" alt="' + works[selecteur].title + '"><figcaption>' + works[selecteur].title + '</figcaption>';
    }
  })
})

filterHotels.addEventListener('click', function() {
  getData(data => {
    const works = data.filter(work => work.categoryId === 3)
    
    document.querySelector('.gallery').innerHTML = ''
    for (let selecteur = 0; selecteur < works.length; selecteur++) {
      document.querySelector('.gallery').innerHTML += '<figure><img src="' + works[selecteur].imageUrl + '" alt="' + works[selecteur].title + '"><figcaption>' + works[selecteur].title + '</figcaption>';
    }
  })
})

// Vérification de la disponibilité du token et réaction en concéquance
const token = localStorage.getItem("authToken");

if (token) {

  document.querySelector('.log-button').innerHTML = 'Logout'
  document.querySelector('.log-button').addEventListener('click', function() {
    localStorage.removeItem("authToken");
    window.location.reload();
  })

  document.querySelector('.edit-button').style.display = 'flex';
  
    // Bouton d'édition
  modifier.addEventListener('click', function() {
    document.querySelector('.modal').style.display = 'flex';
  })


  // Bouton de fermeture de la modal
  document.querySelector('.fermer-modal').addEventListener('click', function() {
    document.querySelector('.modal').style.display = 'none';
  })

  // Chargement de la galerie dans la modal
  getData(data => {
    const works = data

    document.querySelector('.modal-gallery').innerHTML = ''
    for (let selecteur = 0; selecteur < works.length; selecteur++) {
    document.querySelector('.modal-gallery').innerHTML += `
      <div class="modal-object" id="n${works[selecteur].id}">
        <img src="./assets/icons/trash.svg" class="trash-icon" onclick="supprimer(${works[selecteur].id})">
        <img src="${works[selecteur].imageUrl}" alt="${works[selecteur].title}">
      </div>
    `;
  }
  })


  // Fonction de suppression des éléments via la modal
  function supprimer(id) {

  // Envoyer la requête à l'API
    fetch("http://localhost:5678/api/works/" + id, {
      method: 'DELETE',
      headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcwOTY3ODk0NiwiZXhwIjoxNzA5NzY1MzQ2fQ.xu8Kvvd-TVqmJDZ8bFzp07ifV6su7PUVZKN4R2pL3ho",
      },
    })
      .then(response => {
        if (response.status === 204) {
          // Supprimer l'élément du DOM
          const objet = document.querySelector('#n' + id);
          objet.parentNode.removeChild(objet);
        } else {
          // Une erreur est survenue
          console.error(`Erreur lors de la suppression de l'objet ${works[id].title} : ${response.status}`);
        }
      });
  }
  }

else {
  console.error('Token introuvable');
}

// Efface le token afin de permettre de recommencer le test du login
localStorage.removeItem("authToken");