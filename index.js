const movieCreation = document.querySelector('#Movie-creation');
const movieretrieval = document.querySelector('#Movie-retrieval');
const moviedeletion= document.querySelector('#Movie-deletion');
const search= document.querySelector('.search');
const container = document.querySelector('.container');



let currentCard = null; // keep track of the currently displayed card

movieCreation.addEventListener('click', createM);
movieretrieval.addEventListener('click', movieRetrival);
moviedeletion.addEventListener('click', moviedelete);


function createM() {
    // form of movie creation card
   if(currentCard){
    container.removeChild(currentCard);
    currentCard = null;
   }
  
    const movieForm = document.createElement('form');
    movieForm.classList.add('movie-input');

    const formHTML = `  <input type="text" name="title" placeholder="Title" class=" title">
    <input type="text" name="director" placeholder="Director" class=" director">
    <input type="text" name="YearOfRelease" placeholder="Year of release" class="release">
    <input type="text" name="genre" placeholder="Genre" class=" genre">
    <button type="submit" class="enter-Btn">Enter</button>
  `;

    movieForm.innerHTML = formHTML;
    movieForm.addEventListener('submit', btnOperation);

    container.appendChild(movieForm);
    currentCard = movieForm;
};
// enter btn operations
function btnOperation(event){
    event.preventDefault();
    let titleValue = document.querySelector('.title').value;

    let directorValue = document.querySelector('.director').value;

    let releaseValue = document.querySelector('.release').value;
    let movieGenreValue = document.querySelector('.genre').value;
     
    // creating movie object
    const movie = {
        title: titleValue,
        director: directorValue,
        yearOfRelease: releaseValue,
        genre: movieGenreValue
    }
    console.log(movie);
    // create an array to hold all movie objects
let movies = [];

// check if local storage already has movies data
if (localStorage.getItem('movies')) {
  // if it exists, parse the data and set it to the movies array
  movies = JSON.parse(localStorage.getItem('movies'));
}

// add the movie object to the movies array
movies.push(movie);

// store the updated movies array in local storage
localStorage.setItem('movies', JSON.stringify(movies));

// clearing the input feild
document.querySelector('.title').value = '';
document.querySelector('.director').value = '';
document.querySelector('.release').value = '';
document.querySelector('.genre').value = '';

    };

// movie retrival
function movieRetrival(){

  if (currentCard) {
    container.removeChild(currentCard);
    currentCard = null;
  }
  const moviediv = document.createElement('div');
  const movies = JSON.parse(localStorage.getItem('movies'));

  let movieHTML  ='';
  movies.forEach((movie) => {
   movieHTML += `
      <div class="reterivalDiv">
        <p class="movie-p">Title: ${movie.title} </p>
        <p class="movie-p">Director: ${movie.director}</p>
        <p class="movie-p">Year of Release: ${movie.yearOfRelease}</p>
        <p class="movie-p">Genre: ${movie.genre}</p>
        <p class="edit"><i class="fa fa-pencil-square-o" aria-hidden="true edit"></i></p>
      </div>
    `;
    moviediv.innerHTML =movieHTML;
  });
container.appendChild(moviediv);
 currentCard = moviediv;

 // edit btn
 let  editbtns = document.querySelectorAll('.edit');
 editbtns.forEach((editbtn) =>{
    editbtn.addEventListener('click', editFn);
 });

}
function editFn(event) {
    // Brings the moviecreation card.
    const movieDiv = event.target.closest('.reterivalDiv');
    const title = movieDiv.querySelector('.movie-p:nth-child(1)').textContent.slice(7);;
    const  director = movieDiv.querySelector('.movie-p:nth-child(2)').textContent.slice(10);
    const yearOfRelease = movieDiv.querySelector('.movie-p:nth-child(3)').textContent.slice(17);
    const genre = movieDiv.querySelector('.movie-p:nth-child(4)').textContent.slice(7);

    // remove the movie from local storage
    const movies = JSON.parse(localStorage.getItem('movies'));
    const updatedMovies = movies.filter((movie) => {
        return movie.title !== title && movie.director !== director && movie.yearOfRelease !== yearOfRelease && movie.genre !== genre;
      });
    
    localStorage.setItem('movies', JSON.stringify(updatedMovies));
// create the movie creation form and pre-fill the inputs with the deleted movie's values
  createM();
  document.querySelector('.title').value = title;
  document.querySelector('.director').value = director;
  document.querySelector('.release').value = yearOfRelease;
  document.querySelector('.genre').value = genre;
  };

  // to delete the movies

  function moviedelete(){
    console.log("delete");
    if (currentCard) {
        container.removeChild(currentCard);
        currentCard = null;
      }
      const moviediv = document.createElement('div');
      const movies = JSON.parse(localStorage.getItem('movies'));
    
      let movieHTML  ='';
      movies.forEach((movie) => {
       movieHTML += `
          <div class="reterivalDiv">
            <p class="movie-p">Title: ${movie.title} </p>
            <p class="movie-p">Director: ${movie.director}</p>
            <p class="movie-p">Year of Release: ${movie.yearOfRelease}</p>
            <p class="movie-p">Genre: ${movie.genre}</p>
            <p class="edit"><i class="fa-solid fa-trash"></i></p>
          </div>
        `;
        moviediv.innerHTML =movieHTML;
      });
    container.appendChild(moviediv);
     currentCard = moviediv;
    
// delete btn
     let deletebtns = document.querySelectorAll('.edit');
 deletebtns.forEach((deletebtn) =>{
    deletebtn.addEventListener('click', deleteFn);
 });
  }

  function deleteFn(event){
    const movieDiv = event.target.closest('.reterivalDiv');
    const title = movieDiv.querySelector('.movie-p:nth-child(1)').textContent.slice(7);;
    const  director = movieDiv.querySelector('.movie-p:nth-child(2)').textContent.slice(10);
    const yearOfRelease = movieDiv.querySelector('.movie-p:nth-child(3)').textContent.slice(17);
    const genre = movieDiv.querySelector('.movie-p:nth-child(4)').textContent.slice(7);

    const movies = JSON.parse(localStorage.getItem('movies'));
    const updatedMovies = movies.filter((movie) => {
        return movie.title !== title && movie.director !== director && movie.yearOfRelease !== yearOfRelease && movie.genre !== genre;
      });

      localStorage.setItem('movies', JSON.stringify(updatedMovies));
      moviedelete();
  }
// To search the movies form localstorage
search.addEventListener('keypress',(event)=>{
    if (currentCard) {
        container.removeChild(currentCard);
        currentCard = null;
      }

    if(event.key == 'Enter'){
     
      const movies = JSON.parse(localStorage.getItem('movies'));
    
      const searchValue = search.value.trim().toLowerCase();
if(searchValue  == ''){
alert('Please enter the movie to search');
}else{
    
      const filteredMovies = movies.filter((movie) => {
        const title = movie.title.toLowerCase();
        const director = movie.director.toLowerCase();
        const yearOfRelease = movie.yearOfRelease.toString().toLowerCase();
        const genre = movie.genre.toLowerCase();
    
        return (
          title.includes(searchValue) ||
          director.includes(searchValue) ||
          yearOfRelease.includes(searchValue) ||
          genre.includes(searchValue)
        );
      });
    
      let movieHTML = '';
      filteredMovies.forEach((movie) => {
        movieHTML += `
          <div class="reterivalDiv">
            <p class="movie-p">Title: ${movie.title} </p>
            <p class="movie-p">Director: ${movie.director}</p>
            <p class="movie-p">Year of Release: ${movie.yearOfRelease}</p>
            <p class="movie-p">Genre: ${movie.genre}</p>
            <p class="edit"><i class="fa-solid fa-trash"></i></p>
          </div>
        `;
      });
    
      const moviediv = document.createElement('div');
      moviediv.innerHTML = movieHTML;
      container.appendChild(moviediv);
      currentCard = moviediv;
    
    }
}
})