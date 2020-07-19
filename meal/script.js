const search = document.getElementById("search");
const submit = document.getElementById("submit");
const random = document.getElementById("random");
const resultHeading = document.getElementById("result-heading");
const mealEL = document.getElementById("meals");
const singleMealEl = document.getElementById("single-meal");

//To fetch the meal
function searchMeal(e) {
  e.preventDefault();

  //to clear single meal
  singleMealEl.innerHTML = "";

  //Search
  const term = search.value;
  if (term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.meals === null) {
          resultHeading.innerHTML = `<h2>No results found try again</h2>`;
        } else {
          resultHeading.innerHTML = `<h2>Search results for "${term}":</h2>`;
          mealEL.innerHTML = data.meals
            .map(
              (meal) => `<div class="meal">
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
          <div class="meal-info" data-mealID="${meal.idMeal}">
          <h3>${meal.strMeal}</h3>
          </div>
          
          </div>`
            )
            .join("");
        }
      });
    search.value = "";
  } else {
    alert("Enter the dish to find");
  }
}

//Function to get whole meal information
function getMealInfo(id) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((res) => res.json())
    .then((data) => {
      const meal_info = data.meals[0];
      addMealtoDOM(meal_info);
    });
}

//Function to display the meal on DOM
function addMealtoDOM(meal) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }

  singleMealEl.innerHTML = `
  <div class="single-meal">
  <h1>${meal.strMeal}</h1>
  <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
  <div class="single-meal-info">
  ${meal.strCategory ? `<p>${meal.strCategory} </p>` : ""}
  ${meal.strArea ? `<p>${meal.strArea} </p>` : ""}
  
  </div>
  <div class="main">
  <p>${meal.strInstructions}</p>
  <h2>Ingredients</h2>
  <ul>
${ingredients.map((it) => `<li>${it}</li>`).join("")}
  </ul>
  </div> 
  </div>`;
}

//Random Meal
function randomMeal() {
  //clear all meals
  mealEL.innerHTML = "";
  resultHeading.innerHTML = "";
  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then((res) => res.json())
    .then((data) => {
      const meal_i = data.meals[0];
      addMealtoDOM(meal_i);
    });
}

//Event listners
submit.addEventListener("submit", searchMeal);
random.addEventListener("click", randomMeal);
//to click on meal and show info
mealEL.addEventListener("click", (e) => {
  const mealinfo = e.path.find((item) => {
    if (item.classList) {
      return item.classList.contains("meal-info");
    } else {
      return false;
    }
  });
  if (mealinfo) {
    const mealId = mealinfo.getAttribute("data-mealid");
    getMealInfo(mealId);
  }
});
