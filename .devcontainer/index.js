const movieCreation = document.querySelector('#Movie-creation');
const movieretrieval = document.querySelector('#Movie-retrieval');
const container = document.querySelector('.container');

let currentCard = null; // keep track of the currently displayed card

movieCreation.addEventListener('click', createM);
movieretrieval.addEventListener('click', movieRetrival);



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
    };


// movie retrival
function movieRetrival(){

  if (currentCard) {
    container.removeChild(currentCard);
    currentCard = null;
  }
  const moviediv = document.createElement('div');
  moviediv.classList.add('movie-input','reterivalDiv' );
  const movies = JSON.parse(localStorage.getItem('movies'));

  let movieHTML = '';
  movies.forEach((movie) => {
    movieHTML += `
      <div>
        <p>Title: ${movie.title}</p>
        <p>Director: ${movie.director}</p>
        <p>Year of Release: ${movie.yearOfRelease}</p>
        <p>Genre: ${movie.genre}</p>
      </div>
    `;
    // const movieElement = document.createElement('div');
    // movieElement.innerHTML = movieHTML;
    // moviediv.appendChild(movieElement);


    moviediv.innerHTML =movieHTML;
  });


container.appendChild(moviediv);
 currentCard = moviediv;

}