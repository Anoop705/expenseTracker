const balance = document.getElementById("balance");
const incomes = document.getElementById("income");
const expenses = document.getElementById("expense");
const amount = document.getElementById("amount");
const list = document.getElementById("list");
const text = document.getElementById("description");
const form = document.getElementById("form");

// const dummyTransactions = [
//   { id: 1, text: "Food", amount: -20 },
//   { id: 2, text: "salary", amount: 3000 },
//   { id: 3, text: "Book", amount: -200 },
//   { id: 4, text: "petrol", amount: -200 },
// ];

const localStorageTransactions = JSON.parse(localStorage.getItem("transactions"));
// let transactions = localStorage.getItem("transactions") !== null ? localStorageTransactions: [];
let transactions = [];

function addTransaction(e) {
  e.preventDefault();
  if (text.value.trim() === "" || amount.value.trim() === "") {
    alert("please add text and amount");
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value,
    };
    transactions.push(transaction);

    addTransactionDOM(transaction);
    updateValues();
    // updateLocalStorage();

    text.value = "";
    amount.value = "";
  }
}

function generateID() {
  return Math.floor(Math.random() * 100000000);
}

function addTransactionDOM(transaction) {
  const sign = transaction.amount < 0 ? "-" : "+";
  // creating an element
  const item = document.createElement("li");

  item.innerHTML = `${transaction.text}<span> &#8377 ${sign}${Math.abs(
    transaction.amount
  )}<button class="del-btn" onclick = removeTransaction(${
    transaction.id
  })>x</button>`;

  list.appendChild(item);
}


//update values
function updateValues() {
  const amounts = transactions.map((transaction) => transaction.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  const expense = (
    amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  balance.innerHTML = `&#8377 ${total}`;
  incomes.innerHTML = `&#8377 ${income}`;
  expenses.innerHTML = `&#8377 ${expense}`;
}

//remove values
function removeTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);
  updateLocalStorage();
  Init();
}

//storage
function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
  
}

// Init app
function Init() {
  list.innerHTML = "";
  updateValues();
}
Init();
form.addEventListener("submit", addTransaction);

// addTransactionDOM(transactions);
// addTransactionDOM(transactions[2]);
