const Event = require("./Event.js");
const Account = require("./Account.js");
const AccountQuery = require("./AccountQuery.js");
const AccountCommand = require("./AccountCommand.js");

//init array of objects
var transactionEventsArray = [];

//init(); //the accounts are empty
account1 = new Account("1", 0, transactionEventsArray);
account2 = new Account("2", 0, transactionEventsArray);

aq1 = new AccountQuery(account1);
aq2 = new AccountQuery(account2);

const aq1Id = aq1.getId();
const aq2Id = aq2.getId();

//prints the balance of accounts
console.log("The Money on Account1 are: ", aq1.getBalance());
console.log("The Money on Account2 are: ", aq2.getBalance());

ac1 = new AccountCommand(account1, aq1Id);
ac2 = new AccountCommand(account2, aq2Id);

//deposit 500 on account 1
console.log("Depositing 500 on Account1");
ac1.depositMoney(500);

console.log("The Money on Account1 are: ", aq1.getBalance());

//withdraw 100 from account 1
console.log("Withdrawing 100 on Account1");
ac1.withdrawMoney(100);
console.log("The Money on Account1 are: ", aq1.getBalance());

//try to withdraw 1000 from account1, but there is not enough money!
console.log("Withdrawing 1000 on Account1");
ac1.withdrawMoney(1000);
console.log("The Money on Account1 are: ", aq1.getBalance());

//transfer 200 from account 1 to account 2
console.log("Account1 send 200 to Account2");
ac1.transferMoney(aq2, ac2, 200);

//prints the Events Array for Account1
console.log("Events Array for Account1: ", aq1.getTransactionEventsArray());

//prints the Events Array for Account2
console.log("Events Array for Account2: ", aq2.getTransactionEventsArray());

console.log("Accounts: ");
console.log(account1);
console.log(account2);
