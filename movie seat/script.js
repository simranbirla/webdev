const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
populateUI();
let ticketPrice = parseInt(movieSelect.value);

//set movie data and seats to local storage
function setMovieData(movieindex, movievalue) {
  localStorage.setItem("Movie index", movieindex);
  localStorage.setItem("Value", movievalue);
}

//update count and total
function updateSelectedCount() {
  const selectedseats = document.querySelectorAll(".row .seat.selected");
  const seatIndex = [...selectedseats].map(function (seat) {
    return [...seats].indexOf(seat);
  });

  //stores seats in local storage
  localStorage.setItem("seatIndexes", JSON.stringify(seatIndex));

  const selectedseatsValue = selectedseats.length;
  count.innerHTML = selectedseatsValue;
  total.innerHTML = selectedseatsValue * ticketPrice;
}

//get data from local storage and populate UI
function populateUI() {
  const selectedseats = localStorage.getItem("seatIndexes");
  if (selectedseats !== null && selectedseats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedseats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }
  //retain the last selected movie
  const selectedmovie = localStorage.getItem("Movie index");
  if (selectedmovie !== null) {
    movieSelect.selectedIndex = selectedmovie;
  }
}

//Movie selector event
movieSelect.addEventListener("change", (e) => {
  ticketPrice = parseInt(e.target.value);
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

//Seats selector event listener
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
    updateSelectedCount();
  }
});

//on page load update movie seats
updateSelectedCount();
