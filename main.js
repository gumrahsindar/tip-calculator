const billInputEl = document.querySelector("#bill-input");
const radioButtons = document.querySelectorAll('input[name="tip-percentage"]');
const customPercentEl = document.querySelector("#custom-percent");
const totalAmountEl = document.querySelector("#total-amount");
const tipAmountEl = document.querySelector("#tip-amount");
const peopleNumberEl = document.querySelector("#number-of-people");
const errorTextEl = document.querySelector(".people-error-text");

const updateTotalAmount = () => {
  const billAmount = parseFloat(billInputEl.value);
  const numberOfPeople = parseInt(peopleNumberEl.value);
  if (numberOfPeople <= 0 || isNaN(numberOfPeople)) {
    return;
  }

  let tipPercentage;
  if (customPercentEl.value) {
    tipPercentage = parseFloat(customPercentEl.value) / 100;
  } else {
    tipPercentage = parseFloat(
      document.querySelector('input[name="tip-percentage"]:checked').value,
    );
  }

  const totalAmount =
    (billAmount + billAmount * tipPercentage) / numberOfPeople;
  totalAmountEl.textContent = `$${totalAmount.toFixed(2)}`;
  const tipAmount = (billAmount * tipPercentage) / numberOfPeople;
  tipAmountEl.textContent = `$${tipAmount.toFixed(2)}`;
};

billInputEl.addEventListener("change", () => {
  const billAmount = parseFloat(billInputEl.value);
  if (billAmount <= 0 || isNaN(billAmount)) {
    return;
  }
  updateTotalAmount();
});

peopleNumberEl.addEventListener("change", () => {
  const numberOfPeople = parseInt(peopleNumberEl.value);
  if (numberOfPeople <= 0 || isNaN(numberOfPeople)) {
    peopleNumberEl.classList.add("error");
    errorTextEl.style.display = "block";
  } else {
    peopleNumberEl.classList.remove("error");
    errorTextEl.style.display = "none";
  }
  updateTotalAmount();
});

radioButtons.forEach((button) => {
  button.addEventListener("click", () => {
    updateTotalAmount();
  });
});

customPercentEl.addEventListener("change", () => {
  updateTotalAmount();
});

// Enter tuşuna basıldığında custom-percent alanındaki değişikliği yakala
customPercentEl.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    updateTotalAmount();
  }
});
