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
    return bank.createAccount(this, accountType);
  }
}

class Account {
  customer = null;
  transactions = [];
  pin = "123456";
  constructor(accNo, balance, accountType = null) {
    this.accNo = accNo;
    this.balance = balance;
    this.accountType = accountType;
  }

  createTransaction(id, type, amount, date) {
    const transaction = new Transaction(id, type, amount, date);
    this.transactions.push(transaction);
    if (type === TransactionType.DEPOSIT) {
      this.balance += amount;
    } else if (type === TransactionType.WITHDRAW) {
      this.balance -= amount;
    } else if (type === TransactionType.TRANSFER) {
      this.balance -= amount;
    }
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
  atms = [];
  constructor(name, addr, code) {
    this.name = name;
    this.addr = addr;
    this.code = code;
  }

  manage(atm) {
    this.atms.push(atm);
  }

  maintain(atm, amount) {
    atm.setAmount(amount);
  }

  verify(customer, name, phone) {
    return customer.name === name && customer.phone === phone;
  }

  openAccount(customer, accNo, balance) {
    const account = new Account(accNo, balance);
    account.setCustomer(customer);
    return account;
  }

  closeAccount(customer, account) {
    customer.accounts.pop(account);
  }

  createTransaction(account, id, type, amount, date) {
    return account.createTransaction(id, type, amount, date);
  }

  createCustomer(name, addr, phone, email) {
    const customer = new Customer(name, addr, phone, email);
    return customer;
  }

  createATM(location, manageBy) {
    const atm = new ATM(location, manageBy);
    this.atms.push(atm);
    return atm;
  }

  createAccount(customer, accountType) {
    if (accountType === AccountType.CURRENT) {
      const currentAccount = new CurrentAccount(
        50000,
        0.3,
        "C01",
        500,
        AccountType.CURRENT
      );
      currentAccount.setCustomer(customer);
      customer.accounts.push(currentAccount);
      return currentAccount;
    } else if (accountType === AccountType.SAVING) {
      const savingAccount = new SavingAccount(
        0.5,
        "S01",
        500,
        AccountType.SAVING
      );
      savingAccount.setCustomer(customer);
      customer.accounts.push(savingAccount);
      return savingAccount;
    } else {
      return null;
    }
  }
}

class ATM {
  amount = 0;
  constructor(location, manageBy) {
    this.location = location;
    this.manageBy = manageBy;
  }

  setAmount(amount) {
    this.amount = amount;
  }

  identify(account, pin) {
    return account.pin === pin;
  }

  verify(customer, name, phone) {
    return customer.name === name && customer.phone === phone;
  }

  checkBalance(account) {
    return account.balance;
  }

  changePin(account, oldPin, newPin) {
    if (account.pin === oldPin) {
      account.pin = newPin;
      return true;
    } else {
      return false;
    }
  }

  withdraw(account, amount, date) {
    account.withdraw(amount, date);
  }

  deposit(account, amount, date) {
    account.deposit(amount, date);
  }

  transfer(account, amount, date, recieve) {
    if (account.balance >= amount) {
      account.balance -= amount;
      const transaction = new Transaction(
        "T01",
        TransactionType.TRANSFER,
        amount,
        date
      );
      recieve.balance += amount;
    } else {
      return "Balance is not enough!";
    }
  }
}

class Transaction {
  status = "";
  constructor(id, type, amount, date) {
    this.id = id;
    this.type = type;
    this.amount = amount;
    this.date = date;
  }

  getTransactionID() {
    return this.id;
  }

  getTransactionType() {
    return this.type;
  }

  getTransactionDate() {
    return this.date;
  }

  getAmount() {
    return this.amount;
  }

  getStatus() {
    return this.status;
  }

  setTransactionType(type) {
    this.type = type;
  }

  setTransactionDate(date) {
    this.date = date;
  }

  setAmount(amount) {
    this.amount = amount;
  }

  setStatus(status) {
    this.status = status;
  }
}

const main = () => {
  const tan = new Customer(
    "Tan",
    "Tan House",
    "0985014572",
    "654259023@webmail.npru.ac.th"
  );

  const account1 = new Account("a01", 600);

  const punsanBank = new Bank("Rao Ja Tai Gun Hmode", "SomeWhere", "P001");

  const savingAccount1 = punsanBank.createAccount(tan, AccountType.CURRENT);

  account1.withdraw(700, "03/25/2024");

  console.log(
    tan.accounts[0].createTransaction(
      "T01",
      TransactionType.DEPOSIT,
      500,
      "03/25/2024"
    )
  );
  console.log(tan.accounts[0]);
};
main();
