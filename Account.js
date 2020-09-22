class Account {
  constructor(id, balance, transactionEventsArray) {
    this.id = id;
    this.balance = balance;
    this.transactionEventsArray = transactionEventsArray;
  }
}

module.exports = Account;
