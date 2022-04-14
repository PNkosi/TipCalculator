let billAmount = document.getElementById("bill-amount");
let numberOfCustomers = document.getElementById("customers");
const tipBtns = document.querySelectorAll(".tip-button");
let tipAmount = document.getElementById("tip-amount");
let totalAmount = document.getElementById("total-amount");
const resetBtn = document.getElementById("reset-btn");

tipBtns.forEach((button) => {
  button.addEventListener("click", (event) => {
    let billErrorId = getBillErrorId();
    let customersErrorId = getCustomersErrorId();

    if (billErrorId === undefined && customersErrorId === undefined) {
      calculateTip(event);
      calculateTotal(event);
    } else if (
      billErrorId === "bill-amount" &&
      customersErrorId === undefined
    ) {
      printErrorMsg(billErrorId);
    } else if (customersErrorId === "customers" && billErrorId === undefined) {
      printErrorMsg(customersErrorId);
    } else {
      printErrorMsg(billErrorId);
      printErrorMsg(customersErrorId);
    }
  });
});

function calculateTip(event) {
  let tipRate = event.target.value;
  //Handling custom tip rate
  if (tipRate === "custom") {
    tipRate = prompt("Enter custom tip");
  }

  let tip = (
    (billAmount.value * (tipRate / 100)) /
    numberOfCustomers.value
  ).toFixed(2);
  tipAmount.textContent = tip;

  return tip;
}

function calculateTotal(event) {
  let tip = Number(calculateTip(event));
  let total = (
    Number(billAmount.value) / Number(numberOfCustomers.value) +
    tip
  ).toFixed(2);
  totalAmount.textContent = total;
}

function printErrorMsg(elementId) {
  const errorInputEl = document.getElementById(elementId);
  const errorType = getErrorType(errorInputEl);
  let msg = "";

  if (errorType === "empty") msg = "Please fill in this field";
  else if (errorType === "NaN") msg = "Invalid input. Only numbers allowed";
  else if (errorType === "negative") msg = "Input cannot be negative";
  else if (errorType === "zero") msg = "This cannot be zero";

  let errorDisplay = document.getElementById(`${elementId}-error`);
  errorDisplay.textContent = msg;
  setTimeout(() => {
    errorDisplay.textContent = "";
  }, 2000);
}

function getErrorType(element) {
  let input = element.value;
  if (input === "") return "empty";
  else if (isNaN(input)) return "NaN";
  else if (Number(input) < 0) return "negative";
  else if (Number(input) === 0) return "zero";
}

function getBillErrorId() {
  const bill = billAmount.value;
  if (bill === "" || isNaN(bill) || Number(bill) < 0) return "bill-amount";
  else return undefined;
}

function getCustomersErrorId() {
  const customers = numberOfCustomers.value;
  if (customers === "" || isNaN(customers) || Number(customers) < 0)
    return "customers";
  else return undefined;
}

resetBtn.addEventListener("click", () => {
  billAmount.value = "";
  numberOfCustomers.value = "";
  tipAmount.textContent = "0.00";
  totalAmount.textContent = "0.00";
});
