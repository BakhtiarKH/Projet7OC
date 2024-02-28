// Déclaration des constantes
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
  document.querySelector('#portfolio h2').innerHTML += (' ->modale ici<-');
}

else {
  console.error('Token introuvable');
}

// Efface le token afin de permettre de recommencer le test du login
localStorage.removeItem("authToken");