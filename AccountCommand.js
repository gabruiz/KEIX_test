const Account = require("./Account.js");
const AccountQuery = require("./AccountQuery.js");
const Event = require("./Event.js");

//init array of objects
var transactionEventsArray = [];

class AccountCommand {
  constructor(account) {
    this.account = account;
  }

  setBalance(newBalance) {
    this.account.balance = newBalance;
  }

  setTransactionEventsArray(transactionEventsArray) {
    this.account.transactionEventsArray = transactionEventsArray;
  }

  depositMoney(deposit) {
    var oldBalance = this.account.balance;
    var newBalance = oldBalance + deposit;

    //saving deposit state
    var state = new Event();
    state.id = createRandomId();
    state.type = "deposit";
    state.accountId = this.account.id;
    state.timestamp = Date.now();
    state.oldBalance = oldBalance;
    state.newBalance = newBalance;
    state.direction = "IN";

    transactionEventsArray.push(state);
    this.account.transactionEventsArray = transactionEventsArray;

    this.setBalance(newBalance);
  }

  withdrawMoney(withdraw) {
    var oldBalance = this.account.balance;
    var newBalance = oldBalance - withdraw;
    if (newBalance < 0) {
      console.log("Error, insufficient funds for withdrawal!");
      return;
    }

    //saving withdraw state
    var state = new Event();
    state.id = createRandomId();
    state.type = "withdraw";
    state.accountId = this.account.id;
    state.timestamp = Date.now();
    state.oldBalance = oldBalance;
    state.newBalance = newBalance;
    state.direction = "OUT";

    transactionEventsArray.push(state);
    this.account.transactionEventsArray = transactionEventsArray;

    this.setBalance(newBalance);
  }

  transferMoney(receiverQ, receiverC, transferedMoney) {
    var verifyBalance = this.account.balance - transferedMoney;
    if (verifyBalance < 0) {
      console.log("Error, insufficient funds for this transfer!");
      return;
    }
    var senderOldBalance = this.account.balance;
    var receiverOldBalance = receiverQ.getBalance();

    var currentTime = Date.now();

    //saving transfer state // sender side
    var state = new Event();
    state.id = createRandomId();
    state.type = "transfer_out";
    state.accountId = this.account.id;
    state.timestamp = currentTime;
    state.oldBalance = senderOldBalance;
    state.newBalance = verifyBalance;
    state.direction = receiverQ.getId();
    transactionEventsArray.push(state);
    this.account.transactionEventsArray = transactionEventsArray;

    //saving transfer state // receiver side
    var state = new Event();
    state.id = createRandomId();
    state.type = "transfer_in";
    state.accountId = receiverQ.getId();
    state.timestamp = currentTime;
    state.oldBalance = receiverOldBalance;
    state.newBalance = verifyBalance;
    state.direction = this.account.id;
    var receiverArray = receiverQ.getTransactionEventsArray();
    receiverArray.push(state);

    this.setBalance(verifyBalance);
    receiverC.setBalance(receiverQ.getBalance() + verifyBalance);
  }
}

function createRandomId() {
  return Math.random().toString(36).substr(2, 18);
}

module.exports = AccountCommand;
