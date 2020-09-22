class Event {
  constructor(
    id,
    type,
    timestamp,
    oldBalance,
    newBalance,
    accountId,
    direction
  ) {
    this.id = id;
    this.type = type;
    this.timestamp = timestamp;
    this.oldBalance = oldBalance;
    this.newBalance = newBalance;
    this.accountId = accountId;
    this.direction = direction;
  }
}

module.exports = Event;
