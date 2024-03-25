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
  accounts = [];
  constructor(name, addr, phone, email) {
    this.name = name;
    this.addr = addr;
    this.phone = phone;
    this.email = email;
  }

  verify(name, phone) {
    return this.name === name && this.phone === phone;
  }

  getAccount() {
    return this.accounts;
  }

  createAccount(bank, accountType) {
    return bank.createAccount(accountType);
  }
}

class Account {
  customer = null;
  transactions = [];
  constructor(accNo, balance, accountType = null) {
    this.accNo = accNo;
    this.balance = balance;
    this.accountType = accountType;
  }

  createTransaction(id, type, amount, date) {
    const transaction = new Transaction(id, type, amount, date);
    return transaction;
  }

  withdraw(amount, date) {
    if (this.balance >= amount) {
      this.balance -= amount;
      this.transactions.push(
        this.createTransaction("W01", TransactionType.WITHDRAW, amount, date)
      );
    }
    return `Balance is not enough!`;
  }

  deposit(amount, date) {
    this.balance += amount;
    this.transactions.push(
      this.createTransaction("D01", TransactionType.DEPOSIT, amount, date)
    );
  }

  getTransaction() {
    return this.transactions;
  }

  getBalance() {
    return this.balance;
  }

  getAccountType() {
    return this.accountType;
  }

  getCustomer() {
    return this.customer;
  }

  setCustomer(customer) {
    this.customer = customer;
  }
}

class SavingAccount extends Account {
  constructor(interestRate, accNo, balance, accountType) {
    super(accNo, balance, accountType);
    this.interestRate = interestRate;
  }
}

class CurrentAccount extends Account {
  constructor(overdraftLimit, overdraftInterest, accNo, balance, accountType) {
    super(accNo, balance, accountType);
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

const main = () => {
  const a01 = new Account("a01", 600);

  a01.withdraw(700, "03/25/2024");

  console.log(a01);
};
main();
