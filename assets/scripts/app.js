const addMovie = document.getElementById("add-modal");
// const addMovie = document.querySelector("#add-modal");

const addStartButton = document.querySelector("header button");
// const addStartButton = document.querySelector("header").lastElementChild;

const backDropEl = document.getElementById("backdrop");

const cancelAddButton = addMovie.querySelector(".btn--passive");
const acceptAddButton = addMovie.querySelector(".btn--success");
//or
//const acceptAddButton = cancelAddButton.extElementSibling;
const userInputs = addMovie.querySelectorAll("input");
const entryTextSection = document.getElementById("entry-text");

const deleteMovieModal = document.getElementById("delete-modal");

const movies = [];
// const userInputs = addMovie.getElementsByTagName("input");
// console.log(addMovie);

const updateUI = () => {
  if (movies.length === 0) {
    entryTextSection.style.display = "block";
  } else {
    entryTextSection.style.display = "none";
  }
};

const toggleBacDrop = () => {
  backDropEl.classList.toggle("visible");
};

const cancelDeletion = () => {
  toggleBacDrop();
  deleteMovieModal.classList.remove("visible");
};

const deleteMoviehandler = (movieId) => {
  let movieIndex = 0;
  for (const movie of movies) {
    if (movie.id == movieId) {
      break;
    }
    movieIndex++;
  }
  movies.splice(movieIndex, 1);
  const listRoot = document.getElementById("movie-list");
  listRoot.children[movieIndex].remove();
  cancelDeletion();
};

const startDeleteMovie = (movieId) => {
  deleteMovieModal.classList.add("visible");
  toggleBacDrop();
  const concelDeleteBtn = deleteMovieModal.querySelector(".btn--passive");
  let confirmDeletionBtn = deleteMovieModal.querySelector(".btn--danger");

  confirmDeletionBtn.replaceWith(confirmDeletionBtn.cloneNode(true));

  confirmDeletionBtn = deleteMovieModal.querySelector(".btn--danger");

  // concelDeleteBtn.removeEventListener("click", cancelDeletion());
  concelDeleteBtn.addEventListener("click", cancelDeletion);
  confirmDeletionBtn.addEventListener(
    "click",
    deleteMoviehandler(null, movieId)
  );
  // deleteMovie(movieId);
};

const renderNewMovieElement = (id, title, imageUrl, rating) => {
  const newMovieElement = document.createElement("li");
  newMovieElement.className = "movie-element";
  newMovieElement.innerHTML = `
    <div class="movie-element__image">
      <img src="${imageUrl}" alt="${title}">
    </div>
    <div class="movie-element__info">
      <h2>${title}</h2>
      <p>${rating}/5 stars</p>
    </div>
  `;
  newMovieElement.addEventListener("click", startDeleteMovie.bind(null, id));
  const listRoot = document.getElementById("movie-list");
  listRoot.append(newMovieElement);
};

const showMovieModal = () => {
  addMovie.classList.add("visible");
  toggleBacDrop();
  //   backDropEl.classList.toggle("visible");
};

const clearMovieInput = () => {
  for (const usrInput of userInputs) {
    usrInput.value = "";
  }
};

const BackDropClickHandler = () => {
  closeModal();
  cancelDeletion();
  clearMovieInput();
};

const closeModal = () => {
  addMovie.classList.remove("visible");
};

const cancelButtonHandler = () => {
  closeModal();
  clearMovieInput();
  toggleBacDrop();
};

const addButtonHandler = () => {
  const titleValue = userInputs[0].value;
  const imageUrlValue = userInputs[1].value;
  const ratingValue = userInputs[2].value;

  if (
    titleValue.trim() === "" ||
    imageUrlValue.trim() === "" ||
    ratingValue.trim() === "" ||
    +ratingValue < 1 ||
    +ratingValue > 5
  ) {
    alert("Please enter valid values (rating between 1 and 5).");
    return;
  }
  const newMovie = {
    id: Math.random().toString(),
    title: titleValue,
    image: imageUrlValue,
    rating: ratingValue,
  };

  movies.push(newMovie);
  console.log(movies);
  toggleBacDrop();
  closeModal();
  clearMovieInput();
  updateUI();
  renderNewMovieElement(newMovie.id, title, newMovie.imageUrl, newMovie.rating);
};

addStartButton.addEventListener("click", showMovieModal);
backDropEl.addEventListener("click", BackDropClickHandler);
cancelAddButton.addEventListener("click", cancelButtonHandler);
acceptAddButton.addEventListener("click", addButtonHandler);
