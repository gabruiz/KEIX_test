const Account = require("./Account.js");

class AccountQuery {
  constructor(account) {
    this.account = account;
  }

  getId() {
    return this.account.id;
  }

  getBalance() {
    return this.account.balance;
  }

  getTransactionEventsArray() {
    return this.account.transactionEventsArray;
  }
}

module.exports = AccountQuery;
