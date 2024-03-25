class AccountType {
  static CURRENT = "CurrentAccount";
  static SAVING = "SavingAccount";

  constructor(name) {
    this.name = name;
  }
}

class TransactionType {
  static DEPOSIT = "Deposit";
  static WITHDRAW = "Withdraw";
  static TRANSFER = "Transfer";

  constructor(name) {
    this.name = name;
  }
}

class TransactionStatus {
  static CONFIRMED = "Confirmed";
  static DENIED = "Denied";

  constructor(name) {
    this.name = name;
  }
}

class Customer {
  constructor(name, addr, phone, email) {
    this.name = name;
    this.addr = addr;
    this.phone = phone;
    this.email = email;
  }
}

class Account {
  constructor(accNo, balance) {
    this.accNo = accNo;
    this.balance = balance;
  }
}

class SavingAccount extends Account {
  constructor(interestRate, accNo, balance) {
    super(accNo, balance);
    this.interestRate = interestRate;
  }
}

class CurrentAccount extends Account {
  constructor(overdraftLimit, overdraftInterest, accNo, balance) {
    super(accNo, balance);
    this.overdraftLimit = overdraftLimit;
    this.overdraftInterest = overdraftInterest;
  }
}

class Bank {
  constructor(name, addr, code) {
    this.name = name;
    this.addr = addr;
    this.code = code;
  }
}

class ATM {
  constructor(location, manageBy) {
    this.location = location;
    this.manageBy = manageBy;
  }
}

class Transaction {
  constructor(id, type, amount, date) {
    this.id = id;
    this.type = type;
    this.amount = amount;
    this.date = date;
  }
}
