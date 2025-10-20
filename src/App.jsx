import React from 'react';
import SideBar from './components/layout/SideBar';
import {
  Navigate,
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';

import './App.css';
import {
  Management,
  Dashboard,
  Daily,
  Settings,
  Rates,
  Customers,
  Branches,
  Main,
  Receive,
  Transfer,
  Deposit,
  Withdraw,
  Consumption,
  TransferToAccount,
  Accounts,
  Languages,
  DailyTransaction,
  Login,
  CustomerAdd,
  CustomerTransactions,
  Account,
  AccountList,
  BranchTransaction,
  BranchAdd,
  EmployeeAdd,
  EmployeeList,
  SenderReceiverList,
  SenderReceiverAdd,
  TransferList,
  ReceiveList,
  DepositList,
  WithdrawList,
  DailyTransactionList,
  AccountTransaction,
  ConsumptionList,
  TransferToAccountList,
  Exchange,
  Rate,
  ExchangerList,
  ExchangerAdd,
  ExchangeList,
  CustomerEdit,
  BranchEdit,
  EmployeeEdit,
  ExchangerEdit,
  SenderReceiverEdit,
  DepositEdit,
  WithdrawEdit,
  ConsumptionEdit,
  TransferToAccountEdit,
  AccountEdit,
  ExchangeEdit,
  TransferEdit,
  ReceiveEdit,
  TillDashboard,
  TillHistory,
  SalaryDashboard,
  Employee,
  Till,
} from './pages';
import PageNotF from './components/common/PageNotF';

import { ContextProvider } from './context/contextProvider.jsx';
import PrivateRoute from './routes/PrivateRoute.jsx';
import ProtectedLayout from './components/layout/ProtectedLayout.jsx';

const App = () => {
  return (
    <ContextProvider>
      <Router>
        <Routes>
          <Route
            element={
              <PrivateRoute>
                <ProtectedLayout />
              </PrivateRoute>
            }
          >
            <Route path="/" element={<Dashboard />} />
            <Route path="/management" element={<Management />}>
              <Route index element={<Navigate replace to="customer" />} />
              <Route path="customer" element={<Customers />} />
              <Route path="customer/:id/edit" element={<CustomerEdit />} />
              <Route path="customerAdd" element={<CustomerAdd />} />
              <Route
                path="customer/:customerId/transactions"
                element={<CustomerTransactions />}
              />
              <Route path="branch" element={<Branches />} />
              <Route path="branchAdd" element={<BranchAdd />} />
              <Route path="branch/:id/edit" element={<BranchEdit />} />
              <Route
                path="branch/:id/transactions"
                element={<BranchTransaction />}
              />

              <Route path="exchangerList" element={<ExchangerList />} />
              <Route path="exchanger/:id/edit" element={<ExchangerEdit />} />
              <Route path="exchangerAdd" element={<ExchangerAdd />} />
              <Route
                path="senderReceiverList"
                element={<SenderReceiverList />}
              />
              <Route path="senderReceiverAdd" element={<SenderReceiverAdd />} />
              <Route
                path="senderReceiver/:id/edit"
                element={<SenderReceiverEdit />}
              />
            </Route>
            <Route path="/main" element={<Main />}>
              <Route path="receive" element={<Receive />} />
              <Route path="receive/:id/edit" element={<ReceiveEdit />} />
              <Route path="receiveList" element={<ReceiveList />} />
              <Route path="transferList" element={<TransferList />} />
              <Route path="transfer" element={<Transfer />} />
              <Route path="transfer/:id/edit" element={<TransferEdit />} />
              <Route path="deposit" element={<Deposit />} />
              <Route path="depositList" element={<DepositList />} />
              <Route path="deposit/:id/edit" element={<DepositEdit />} />
              <Route path="withdraw/:id/edit" element={<WithdrawEdit />} />
              <Route path="withdraw" element={<Withdraw />} />
              <Route path="withdrawList" element={<WithdrawList />} />
              <Route path="consumption" element={<Consumption />} />
              <Route
                path="consumption/:id/edit"
                element={<ConsumptionEdit />}
              />
              <Route path="consumptionList" element={<ConsumptionList />} />
              <Route path="transferToAccount" element={<TransferToAccount />} />
              <Route
                path="transferToAccount/:id/edit"
                element={<TransferToAccountEdit />}
              />
              <Route
                path="transferToAccountList"
                element={<TransferToAccountList />}
              />
            </Route>
            <Route path="/accounts" element={<Accounts />}>
              <Route path="accountAdd" element={<Account />} />
              <Route path="account/:id/edit" element={<AccountEdit />} />
              <Route path="accountList" element={<AccountList />} />
              <Route
                path="account/:accountId/transactions"
                element={<AccountTransaction />}
              />
            </Route>
            <Route path="/daily" element={<Daily />}>
              <Route path="dailyTransaction" element={<DailyTransaction />} />
              <Route
                path="dailyTransactionList"
                element={<DailyTransactionList />}
              />
            </Route>
            <Route path="/rates" element={<Rates />}>
              <Route path="exchange" element={<Exchange />} />
              <Route path="exchangeList" element={<ExchangeList />} />
              <Route path="exchange/:id/edit" element={<ExchangeEdit />} />
              <Route path="rate" element={<Rate />} />
            </Route>
            <Route path="/settings" element={<Settings />}>
              <Route path="languages" element={<Languages />} />
            </Route>

            <Route path="/till" element={<Till />}>
              <Route path="tillDashboard" element={<TillDashboard />} />
              <Route path="tillHistory" element={<TillHistory />} />
            </Route>

            <Route path="/employees" element={<Employee />}>
              <Route path="SalaryDashboard" element={<SalaryDashboard />} />
              <Route path="employeeAdd" element={<EmployeeAdd />} />
              <Route path="employee/:id/edit" element={<EmployeeEdit />} />
              <Route path="employeeList" element={<EmployeeList />} />
            </Route>
          </Route>

          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<PageNotF />} />
        </Routes>
      </Router>
    </ContextProvider>
  );
};

export default App;
