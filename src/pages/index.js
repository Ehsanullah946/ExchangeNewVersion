export { default as Dashboard } from './Dashboard';
export { default as Daily } from './Daily';
export { default as Management } from './Management';
export { default as Rates } from './Rates';
export { default as Settings } from './Settings';
export { default as Main } from './Main';

export { default as Customers } from './managements/customer/Customers';
export { default as Branches } from './managements/branch/Branches';
export { default as EmployeeAdd } from './managements/employee/EmployeeAdd';
export { default as EmployeeList } from './managements/employee/EmployeeList';
export { default as Exchangers } from './managements/exchanger/Exchangers';
export { default as SenderReceiverList } from './managements/senderReceiver/SenderReceiverList';
export { default as SenderReceiverAdd } from './managements/senderReceiver/SenderReceiverAdd';
export { default as CustomerAdd } from './managements/customer/CustomerAdd';
export { default as CustomerTransactions } from './managements/customer/CustomerTransactions';
export { default as BranchTransaction } from './managements/branch/BranchTransaction';
export { default as BranchAdd } from './managements/branch/BranchAdd';

/// main route
export { default as Receive } from './main/receive/Receive';
export { default as Transfer } from './main/transfer/Transfer';
export { default as Deposit } from './main/depositWithdraw/Deposit';
export { default as Withdraw } from './main/depositWithdraw/Withdraw';
export { default as Consumption } from './main/consumption/Consumption';
export { default as TransferToAccount } from './main/transferToAccount/TransferToAccount';

//setting
export { default as Languages } from './settings/Languages';

export { default as Accounts } from './Accounts';
export { default as Account } from './account/Account';
export { default as AccountList } from './account/AccountList';

//Daily
export { default as DailyTransaction } from './daily/DailyTransaction';

//login
export { default as Login } from './Login';
