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
    document.querySelector('.gallery').innerHTML += '<figure class="n' + works[selecteur].id + '"><img src="' + works[selecteur].imageUrl + '" alt="' + works[selecteur].title + '"><figcaption>' + works[selecteur].title + '</figcaption>';
  }
})

// Les 4 suivants remplacent l'affichage des éléments en fonction de la catégorie sélectionnée
filterTous.addEventListener('click', function() {
  getData(data => {
    const works = data

    document.querySelector('.gallery').innerHTML = ''
    for (let selecteur = 0; selecteur < works.length; selecteur++) {
      document.querySelector('.gallery').innerHTML += '<figure  class="n' + works[selecteur].id + '"><img src="' + works[selecteur].imageUrl + '" alt="' + works[selecteur].title + '"><figcaption>' + works[selecteur].title + '</figcaption>';
    }
  })
})

filterObjets.addEventListener('click', function() {
  getData(data => {
    const works = data.filter(work => work.categoryId === 1)
    
    document.querySelector('.gallery').innerHTML = ''
    for (let selecteur = 0; selecteur < works.length; selecteur++) {
      document.querySelector('.gallery').innerHTML += '<figure class="n' + works[selecteur].id + '"><img src="' + works[selecteur].imageUrl + '" alt="' + works[selecteur].title + '"><figcaption>' + works[selecteur].title + '</figcaption>';
    }
  })
})

filterAppartements.addEventListener('click', function() {
  getData(data => {
    
    const works = data.filter(work => work.categoryId === 2)
    
    document.querySelector('.gallery').innerHTML = ''
    for (let selecteur = 0; selecteur < works.length; selecteur++) {
      document.querySelector('.gallery').innerHTML += '<figure  class="n' + works[selecteur].id + '"><img src="' + works[selecteur].imageUrl + '" alt="' + works[selecteur].title + '"><figcaption>' + works[selecteur].title + '</figcaption>';
    }
  })
})

filterHotels.addEventListener('click', function() {
  getData(data => {
    const works = data.filter(work => work.categoryId === 3)
    
    document.querySelector('.gallery').innerHTML = ''
    for (let selecteur = 0; selecteur < works.length; selecteur++) {
      document.querySelector('.gallery').innerHTML += '<figure class="n' + works[selecteur].id + '"><img src="' + works[selecteur].imageUrl + '" alt="' + works[selecteur].title + '"><figcaption>' + works[selecteur].title + '</figcaption>';
    }
  })
})

// Vérification de la disponibilité du token et réaction en concéquance
const token = localStorage.getItem("authToken");

if (token) {

  document.querySelector('.log-button').innerHTML = '<a href="./index.html">Logout</a>'
  document.querySelector('.log-button').addEventListener('click', function() {
    localStorage.removeItem("authToken");
  })

  document.querySelector('.edit-button').style.display = 'flex';
  
    // Bouton d'édition
  modifier.addEventListener('click', function() {
    document.querySelector('.modal').style.display = 'flex';
  })


  // Bouton de fermeture de la modal
  const fermerModal = document.getElementsByClassName('fermer-modal');

  for (let i = 0; i < fermerModal.length; i++) {
    fermerModal[i].addEventListener('click', function() {
      document.querySelector('.modal').style.display = 'none';
    });
  }

  // Navigation entre les différentes pages de la modal
  document.querySelector('.ajouter-button').addEventListener('click', function() {
    document.querySelector('.modal-delete').style.display = 'none';
    document.querySelector('.modal-add').style.display = 'block';
  })
  document.querySelector('.plus-photo').addEventListener('click', () => {
    document.querySelector('.file-input').click();
    })
  document.querySelector('.retour').addEventListener('click', function() {
    document.querySelector('.modal-add').style.display = 'none';
    document.querySelector('.modal-delete').style.display = 'block';
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
        "Authorization": "Bearer " + token,
      },
    })
      .then(response => {
        if (response.status === 204) {
          // Supprimer l'élément du DOM
          var objet = document.querySelector('#n' + id);
          objet.parentNode.removeChild(objet);
          var objet = document.querySelector('.n' + id);
          objet.parentNode.removeChild(objet);
        } else {
          // Une erreur est survenue
          console.error(`Erreur lors de la suppression de l'objet ${works[id].title} : ${response.status}`);
        }
      });
  }

  function addNewObject(image, title, category) {
    // Conversion des données en format multipart/form-data
    const formData = new FormData();
    formData.append('image', image);
    formData.append('title', title);
    formData.append('category', category);
  
    fetch("http://localhost:5678/api/works", {
      method: 'POST',
      headers: {
        "Authorization": "Bearer " + token,
      },
      body: formData
    })
      .then(response => {
        if (response.status === 201) {
          return response.json();
        } else {
          console.error("Erreur lors de la création de l'objet", response.status);
        }
      })
      .catch(error => {
        console.error("Erreur lors de la création de l'objet", error);
      });
  }
  
  // Vérification du remplissage des champs en temps réel
  document.querySelector('#titre').addEventListener('change', function() {
    valueCheck();
  });
  document.querySelector('#file-input').addEventListener('change', function() {
    valueCheck();
  });
  document.querySelector('#categorie').addEventListener('change', function() {
    valueCheck();
  });

  function valueCheck() {
    let title = document.querySelector('#titre').value;
    let image = document.querySelector('#file-input').files[0];
    let category = document.querySelector('#categorie').value;
  
    if (image) {
      // Aménagement de l'espace afin d'afficher uniquement un aperçu de la photo selectionnée
      document.querySelector('.icone-img').style.display = 'none';
      document.querySelector('.ajouter-photo').style.display = 'none';
      document.querySelector('.info-photo').style.display = 'none';
      
      document.querySelector('.aperçu').style = `width: 100%; height: 100%; opacity: 1; z-index: 1000; object-fit: contain; object-position: center;`;
      const imgApreçu = document.querySelector('.aperçu');
      imgApreçu.src = URL.createObjectURL(image);
      imgApreçu.style.display = 'block';
    }
  
    // Vérifie si les champs sont remplis
    const allFieldsFilled = title && image && category;
    document.querySelector('.ajouter-objet').style.backgroundColor = allFieldsFilled ? '#1D6154' : '';
  
    // Si tout les champs sont remplis, alors le bouton de validation devient actif et passe au vert
    if (allFieldsFilled) {
      document.querySelector('#form-submit').addEventListener('click', function() {
        addNewObject(image, title, category);
        window.location.href = "./index.html";
      });
    }
  }
}