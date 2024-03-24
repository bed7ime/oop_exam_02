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

  addAccount(account) {
    this.accounts.push(account);
  }

  createAccount(bank, accountType) {
    return bank.createAccount(accountType, this);
  }
}

class Account {
  customer = null;
  bank = null;
  pin = "";
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

  createTransaction(type, amount, date) {
    const transaction = new Transaction("T01", type, amount, date);
    this.transactions.push(transaction);
    return transaction;
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

  setPin(pin) {
    this.pin = pin;
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
  atms = [];
  constructor(name, address, code) {
    this.name = name;
    this.address = address;
    this.code = code;
  }

  manage(atm) {
    this.atms.push(atm);
  }

  maintain() {
    // I don't have enough information what bank maintaining.
  }

  verify(customer, name, phone) {
    if (customer.name === name && customer.phone === phone) {
      return true;
    } else {
      return false;
    }
  }

  openAccount(accountType, customer) {
    const account = this.createAccount(accountType, customer);
    if (account) {
      return account;
    } else {
      return null;
    }
  }

  closeAccount(customer, account) {
    // I don't have any ideas of this method too so don't ask me and help yourself.
  }

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
      account.setCustomer(customer);
      account.setBank(this);
      customer.addAccount(account);
      return account;
    } else if (accountType === "currentAccount") {
      const account = new CurrentAccount(50000, 0.3, "c01", 500);
      account.setCustomer(customer);
      account.setBank(this);
      customer.addAccount(account);
      return account;
    } else {
      return null;
    }
  }
}

class ATM {
  cash = 0;
  constructor(location, managedBy) {
    this.location = location;
    this.managedBy = managedBy;
  }

  identify(customer, name, phone) {
    if (customer.name === name && customer.phone === phone) {
      return true;
    } else {
      return false;
    }
  }

  checkBalance(account) {
    return account.getBalance();
  }

  withdraw(cash, account) {
    if (this.cash >= account.balance) {
      this.cash -= cash;
      return account.withdraw(cash);
    } else {
      return "This ATM don't have enough cash!";
    }
  }

  deposit(cash, account) {
    this.cash += cash;
    return account.deposit(cash);
  }

  changePin(account, newPin) {
    if (account.pin === newPin) {
      return "This pin is the same!";
    } else {
      account.setPin(newPin);
      return true;
    }
  }

  transfer(account, type, amount, date) {
    const transaction = new Transaction("T01", type, amount, date);
    account.transactions.push(transaction);
    return true;
  }

  verify(account, pin) {
    if (account.pin === pin) {
      return true;
    } else {
      return false;
    }
  }

  setCash(cash) {
    this.cash = cash;
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

class AccountType {
  static SAVING = "savingAccount";
  static CURRENT = "currentAccount";
  constructor(name) {
    this.name = name;
  }
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

  const account2 = bank1.createAccount("currentAccount", customer1);

  account2.setPin("123456");

  const atm1 = new ATM("Thailand", bank1);

  atm1.setCash(500000);

  console.log(account2.createTransaction("giving", 100, "03/24/2024"));
};

main();
