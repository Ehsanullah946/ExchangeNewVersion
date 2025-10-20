// lazyComponents.js - Lazy load all components
import { lazy } from 'react';

// Layout components
export const Dashboard = lazy(() => import('./Dashboard'));
export const Daily = lazy(() => import('./Daily'));
export const Management = lazy(() => import('./Management'));
export const Rates = lazy(() => import('./Rates'));
export const Settings = lazy(() => import('./Settings'));
export const Main = lazy(() => import('./Main'));

// Management components
export const Customers = lazy(() => import('./managements/customer/Customers'));
export const TillDashboard = lazy(() => import('./till/TillDashboard'));
export const Till = lazy(() => import('./Tills'));
export const TillClose = lazy(() => import('./till/TillClose'));
export const TillDetail = lazy(() => import('./till/TillDetail'));
export const TillHistory = lazy(() => import('./till/TillHistory'));

export const SalaryDashboard = lazy(() =>
  import('./employees/SalaryDashboard')
);

export const Employee = lazy(() => import('./Employee'));

export const EmployeeAdd = lazy(() => import('./employees/EmployeeAdd'));
export const EmployeeEdit = lazy(() => import('./employees/EmployeeEdit'));
export const EmployeeList = lazy(() => import('./employees/EmployeeList'));

export const CustomerEdit = lazy(() =>
  import('./managements/customer/CustomerEdit')
);
export const CustomerAdd = lazy(() =>
  import('./managements/customer/CustomerAdd')
);
export const CustomerTransactions = lazy(() =>
  import('./managements/customer/CustomerTransactions')
);

export const Branches = lazy(() => import('./managements/branch/Branches'));
export const BranchEdit = lazy(() => import('./managements/branch/BranchEdit'));
export const BranchAdd = lazy(() => import('./managements/branch/BranchAdd'));
export const BranchTransaction = lazy(() =>
  import('./managements/branch/BranchTransaction')
);

export const ExchangerList = lazy(() =>
  import('./managements/exchanger/ExchangerList')
);
export const ExchangerEdit = lazy(() =>
  import('./managements/exchanger/ExchangerEdit')
);
export const ExchangerAdd = lazy(() =>
  import('./managements/exchanger/ExchangerAdd')
);

export const SenderReceiverList = lazy(() =>
  import('./managements/senderReceiver/SenderReceiverList')
);
export const SenderReceiverEdit = lazy(() =>
  import('./managements/senderReceiver/SenderReceiverEdit')
);
export const SenderReceiverAdd = lazy(() =>
  import('./managements/senderReceiver/SenderReceiverAdd')
);

// Account components
export const AccountTransaction = lazy(() =>
  import('./account/AccountTransaction')
);
export const Accounts = lazy(() => import('./Accounts'));
export const Account = lazy(() => import('./account/Account'));
export const AccountEdit = lazy(() => import('./account/AccountEdit'));
export const AccountList = lazy(() => import('./account/AccountList'));

// Main transaction components
export const Receive = lazy(() => import('./main/receive/Receive'));
export const ReceiveEdit = lazy(() => import('./main/receive/ReceiveEdit'));
export const ReceiveList = lazy(() => import('./main/receive/ReceiveList'));

export const Transfer = lazy(() => import('./main/transfer/Transfer'));
export const TransferEdit = lazy(() => import('./main/transfer/TransferEdit'));
export const TransferList = lazy(() => import('./main/transfer/TransferList'));

export const Deposit = lazy(() => import('./main/depositWithdraw/Deposit'));
export const DepositList = lazy(() =>
  import('./main/depositWithdraw/DepositList')
);
export const DepositEdit = lazy(() =>
  import('./main/depositWithdraw/DepositEdit')
);

export const Withdraw = lazy(() => import('./main/depositWithdraw/Withdraw'));
export const WithdrawEdit = lazy(() =>
  import('./main/depositWithdraw/WithdrawEdit')
);
export const WithdrawList = lazy(() =>
  import('./main/depositWithdraw/WithdrawList')
);

export const Consumption = lazy(() => import('./main/consumption/Consumption'));
export const ConsumptionEdit = lazy(() =>
  import('./main/consumption/ConsumptionEdit')
);
export const ConsumptionList = lazy(() =>
  import('./main/consumption/ConsumptionList')
);

export const TransferToAccount = lazy(() =>
  import('./main/transferToAccount/TransferToAccount')
);
export const TransferToAccountEdit = lazy(() =>
  import('./main/transferToAccount/TransferToAccountEdit')
);
export const TransferToAccountList = lazy(() =>
  import('./main/transferToAccount/TransferToAccountList')
);

// Settings
export const Languages = lazy(() => import('./settings/Languages'));

// Daily
export const DailyTransaction = lazy(() => import('./daily/DailyTransaction'));
export const DailyTransactionList = lazy(() =>
  import('./daily/DailyTransactionList')
);

// Login
export const Login = lazy(() => import('./Login'));

// Rates
export const Exchange = lazy(() => import('./rates/Exchange'));
export const ExchangeList = lazy(() => import('./rates/ExchangeList'));
export const ExchangeEdit = lazy(() => import('./rates/ExchangeEdit'));
export const Rate = lazy(() => import('./rates/Rate'));
