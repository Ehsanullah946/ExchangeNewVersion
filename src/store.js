import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import customerReducer from './features/customer/customerSlice';
import toastReducer from './features/toast/toastSlice';
import filterReducer from './features/ui/filterSlice';
import employeeReducer from './features/employee/employeeSlice';
import exchangerReducer from './features/exchanger/exchangerSlice';
import senderReceiverReducer from './features/senderReceiver/senderReceiverSlice';
import accountReducer from './features/account/accountSlice';
import moneyTypeReducer from './features/moneyType/moneyTypeSlice';
import exchangeReducer from './features/exchange/exchangeSlice';
import depositReducer from './features/depositWitdraw/depositSlice';
import withdrawReducer from './features/depositWitdraw/withdrawSlice';
import consumptionReducer from './features/consumption/consumptionSlice';
import transferToAccountReducer from './features/transferToAccount/transferToAccountSlice';
const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReducer,
    toast: toastReducer,
    filters: filterReducer,
    employees: employeeReducer,
    exchanger: exchangerReducer,
    senderReceiver: senderReceiverReducer,
    account: accountReducer,
    moneyType: moneyTypeReducer,
    exchange: exchangeReducer,
    deposit: depositReducer,
    withdraw: withdrawReducer,
    consumption: consumptionReducer,
    transferToAccount: transferToAccountReducer,
  },
});

export default store;
