// Déclaration des constantes
const filterTous = document.getElementById('filterTous')
const filterObjets = document.getElementById('filterObjets')
const filterAppartements = document.getElementById('filterAppartements')
const filterHotels = document.getElementById('filterHotels')
const apiUrl = 'http://localhost:5678/api/'


function getData(callback) {
  fetch(apiUrl + 'works')
    .then(response => response.json())
    .then(data => callback(data))
    .catch(error => console.error(error))
}

getData(data => {
  const works = data

  document.querySelector('.gallery').innerHTML = ''
  for (let selecteur = 0; selecteur < works.length; selecteur++) {
    document.querySelector('.gallery').innerHTML += '<figure><img src="' + works[selecteur].imageUrl + '" alt="' + works[selecteur].title + '"><figcaption>' + works[selecteur].title + '</figcaption>';
  }
})

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