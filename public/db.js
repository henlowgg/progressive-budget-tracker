let db;

const request = indexedDB.open("BudgetDB", 1);

request.onupgradeneeded = function (event) {
  db = event.target.result;
  //   may need to remove !
  if (!db.objectStoreNames.length === 0) {
    db.createObjectStore("BudgetStore", { autoIncrement: true });
  }
};

request.onerror = function (event) {
  console.log(evt.target.errorCode);
};

function checkDB() {
  let transaction = db.transaction(["BudgetStore"], "readwrite");
  const store = transaction.objectStore("BudgetStore");
  const getAll = store.getAll();

  getAll.onsuccess = function () {
    if (getAll.result.length > 0) {
      fetch("/api/transaction/bulk", {
        method: "POST",
        body: JSON.stringify(getAll.result),
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then(() => {
          const transaction = db.transaction(["BudgetStore"], "readwrite");
          const store = transaction.objectStore("BudgetStore");
          store.clear();
        });
    }
  };
}

// check if there is a budget in the database and if so check if online
request.onsuccess = function (event) {
    db = event.target.result;
    if (navigator.onLine) {
      checkDB();
    }
    };
    