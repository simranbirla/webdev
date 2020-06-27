const currencyOne = document.getElementById("currency-one");
const currencyTwo = document.getElementById("currency-two");
const amountOne = document.getElementById("amount-one");
const amountTwo = document.getElementById("amount-two");
const rate = document.getElementById("rate");
const swap = document.getElementById("swap");

//fetch API Calculate function
function calculate() {
  let elem_one = currencyOne.value;
  let elem_two = currencyTwo.value;

  fetch(`https://api.exchangerate-api.com/v4/latest/${elem_one}`).then((res) =>
    res.json().then((data) => {
      const rates = data.rates[elem_two]; //retreive exchange rate
      rate.innerHTML = `1 ${elem_one} = ${rates} ${elem_two} `; //write the value of exchange rates
      amountTwo.value = (amountOne.value * rates).toFixed(2); //update the second exchange rate
    })
  );
}

//Event Listeners
currencyOne.addEventListener("change", calculate);
currencyTwo.addEventListener("change", calculate);
amountOne.addEventListener("input", calculate);
amountTwo.addEventListener("input", calculate);

//Swap button
swap.addEventListener("click", () => {
  let temp = currencyOne.value;
  currencyOne.value = currencyTwo.value;
  currencyTwo.value = temp;
  calculate();
});

calculate();
