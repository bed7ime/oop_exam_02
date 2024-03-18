class Customer {
  accounts = [];
  constructor(name, address, phone, email) {
    this.name = name;
    this.address = address;
    this.phone = phone;
    this.email = email;
  }

  verify(name, phone) {
    if (name === this.name && phone === this.phone) {
      return true;
    } else {
      return false;
    }
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
  bank = null;
  transactions = [];
  constructor(accountNo, balance) {
    this.accountNo = accountNo;
    this.balance = balance;
  }

  deposit(amount) {
    this.balance += amount;
    return this.balance;
  }

  withdraw(amount) {
    if (this.balance >= amount) {
      this.balance -= amount;
      return this.balance;
    } else {
      return "Balance is not enough";
    }
  }

  createTransaction(transaction) {
    this.transactions.push(transaction);
  }

  getTransaction() {
    return this.transactions;
  }

  getBalance() {
    return this.balance;
  }

  getAccountType() {
    return accountType;
  }

  getCustomer() {
    return this.customer;
  }

  setCustomer(customer) {
    this.customer = customer;
  }

  setBank(bank) {
    this.bank = bank;
  }
}

class Transaction {
  status = "";
  amount = 0;
  constructor(transactionID, transactionType, amount, transactionDate) {
    this.transactionID = transactionID;
    this.transactionType = transactionType;
    this.amount = amount;
    this.transactionDate = transactionDate;
    // this.status = status;
  }

  getTransactionID() {
    return this.transactionID;
  }

  getTransactionType() {
    return this.transactionType;
  }

  getTransactionDate() {
    return this.transactionDate;
  }

  getAmount() {
    return this.amount;
  }

  getStatus() {
    return this.status;
  }

  setStatus(status) {
    this.status = status;
  }

  setAmount(amount) {
    this.amount = amount;
  }

  setTransactionDate(date) {
    this.transactionDate = date;
  }
}

class SavingAccount extends Account {
  constructor(interestRate, accountNo, balance) {
    super(accountNo, balance);
    this.interestRate = interestRate;
  }

  calculateInterest() {
    let interest = (this.balance * this.interestRate) / 100;
    return interest;
  }

  getInterestRate() {
    return this.interestRate;
  }

  setInterestRate(rate) {
    this.interestRate = rate;
  }
}

class CurrentAccount extends Account {
  constructor(overdraftLimit, overdraftInterest, accountNo, balance) {
    super(accountNo, balance);
    this.overdraftLimit = overdraftLimit;
    this.overdraftInterest = overdraftInterest;
  }

  calculateInterest() {
    let interest = (this.balance * this.overdraftInterest) / 100;
  }

  getOverdraftLimit() {
    return this.overdraftLimit;
  }

  setOverdraftLimit(limit) {
    this.overdraftLimit = limit;
  }
}

class Bank {
  constructor(name, address, code) {
    this.name = name;
    this.address = address;
    this.code = code;
  }

  manage() {}

  maintain() {}

  verify() {
    return true;
  }

  openAccount() {}

  closeAccount() {}

  createTransaction(id, type, amount, date) {
    const transaction = new Transaction(id, type, amount, date);
  }

  createCustomer(name, address, phone, email) {
    const customer = new Customer(name, address, phone, email);
    return customer;
  }

  createATM(location, managedBy) {
    const atm = new ATM(location, managedBy);
  }

  createAccount(accountType, customer) {
    // let account;
    if (accountType === "savingAccount") {
      const account = new SavingAccount(0.5, "s01", 500);
      account.setCustomer(customer.name);
      account.setBank(this.name);
      return account;
    } else if (accountType === "currentAccount") {
      const account = new CurrentAccount(50000, 0.3, "c01", 500);
      account.setCustomer(customer.name);
      account.setBank(this.name);
      return account;
    } else {
      return null;
    }
  }
}

class ATM {
  constructor(location, managedBy) {
    this.location = location;
    this.managedBy = managedBy;
  }

  //   identify(name, phone) {
  //     if (name && phone === verify(name, phone)) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   }
}

const main = () => {
  const customer1 = new Customer(
    "Tan",
    "60",
    "0985014572",
    "654259023@webmail.npru.ac.th"
  );

  const account1 = new Account("A01", 500);

  const saving1 = new SavingAccount(1.25, account1.accountNo, account1.balance);

  const bank1 = new Bank("Punsan", "BangPae", "P001");

  console.log(bank1.createAccount("currentAccount", customer1));
};

main();
