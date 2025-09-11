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
  Employees,
  Exchangers,
  SenderReceiver,
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
} from './pages';
import PageNotF from './components/common/PageNotF';

import { ContextProvider } from './context/contextProvider.jsx';
import PrivateRoute from './routes/PrivateRoute.jsx';
import ProtectedLayout from './components/layout/ProtectedLayout.jsx';
import { AuthProvider } from './context/AuthContext.jsx';

const App = () => {
  return (
    <AuthProvider>
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
                <Route path="customerAdd" element={<CustomerAdd />} />
                <Route path="branch" element={<Branches />} />
                <Route path="employee" element={<Employees />} />
                <Route path="exchanger" element={<Exchangers />} />
                <Route path="senderReceiver" element={<SenderReceiver />} />
              </Route>
              <Route path="/main" element={<Main />}>
                <Route path="receive" element={<Receive />} />
                <Route path="transfer" element={<Transfer />} />
                <Route path="deposit" element={<Deposit />} />
                <Route path="withdraw" element={<Withdraw />} />
                <Route path="consumption" element={<Consumption />} />
                <Route
                  path="transferToAccount"
                  element={<TransferToAccount />}
                />
              </Route>
              <Route path="/account" element={<Accounts />} />
              <Route path="/daily" element={<Daily />}>
                <Route path="dailyTransaction" element={<DailyTransaction />} />
              </Route>
              <Route path="/rates" element={<Rates />} />
              <Route path="/settings" element={<Settings />}>
                <Route path="languages" element={<Languages />} />
              </Route>
            </Route>

            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<PageNotF />} />
          </Routes>
        </Router>
      </ContextProvider>
    </AuthProvider>
  );
};

export default App;
