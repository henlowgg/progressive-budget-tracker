let db;

const request = indexedDB.open('BudgetDB', 1);

request.onupgradeneeded = function(event) {
  db = event.target.result;
//   may need to remove !
  if (!db.objectStoreNames.length === 0) {
    db.createObjectStore('BudgetStore', { autoIncrement: true });
  }
};

request.onerror = function(event) {
    console.log(evt.target.errorCode);
};
