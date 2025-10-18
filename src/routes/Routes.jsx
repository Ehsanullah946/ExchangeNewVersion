import {
  FaLock,
  FaMoneyBill,
  FaRegArrowAltCircleUp,
  FaUser,
  FaUserTie,
  FaArrowAltCircleDown,
} from 'react-icons/fa';
import {
  MdAccountTree,
  MdCompareArrows,
  MdManageAccounts,
  MdRateReview,
  MdToday,
} from 'react-icons/md';
import { BiListCheck, BiTransferAlt } from 'react-icons/bi';
import { BiCog } from 'react-icons/bi';
import { AiFillHome, AiOutlineDashboard, AiOutlineRise } from 'react-icons/ai';
import {
  RiDownloadLine,
  RiExchangeDollarFill,
  RiSendPlaneLine,
} from 'react-icons/ri';
import { FiUser, FiUsers } from 'react-icons/fi';
import { GiPayMoney } from 'react-icons/gi';
import { BsListCheck, BsViewList } from 'react-icons/bs';

export const routes = [
  {
    path: '/',
    nameKey: 'Dashboard',
    icon: <AiOutlineDashboard />,
  },
  {
    path: '/main',
    nameKey: 'Main',
    icon: <AiFillHome />,
    subRoutes: [
      {
        path: '/main/transfer',
        nameKey: 'Send',
        icon: <RiSendPlaneLine />,
      },
      {
        path: '/main/receive',
        nameKey: 'Receive',
        icon: <RiDownloadLine />,
      },
      {
        path: '/main/deposit',
        nameKey: 'Deposit',
        icon: <FaArrowAltCircleDown />,
      },
      {
        path: '/main/withdraw',
        nameKey: 'Withdraw',
        icon: <FaRegArrowAltCircleUp />,
      },
      {
        path: '/main/consumption',
        nameKey: 'Consumption',
        icon: <GiPayMoney />,
      },
      {
        path: '/main/transferToAccount',
        nameKey: 'Transfer To Account',
        icon: <MdCompareArrows />,
      },
    ],
  },
  {
    path: '/management',
    nameKey: 'Management',
    icon: <MdManageAccounts />,
    subRoutes: [
      {
        path: '/management/customer',
        nameKey: 'Customer',
        icon: <FiUsers />,
      },
      {
        path: '/management/branch',
        nameKey: 'Branch',
        icon: <MdAccountTree />,
      },
      {
        path: '/management/employeeList',
        nameKey: 'Employees',
        icon: <FaUserTie />,
      },
      {
        path: '/management/exchangerList',
        nameKey: 'Exchanger',
        icon: <FaUser />,
      },
      {
        path: '/management/senderReceiverList',
        nameKey: 'SenderReceiver',
        icon: <BiTransferAlt />,
      },
    ],
  },
  {
    path: '/daily',
    nameKey: 'Daily',
    icon: <MdToday />,
    subRoutes: [
      {
        path: '/daily/dailyTransaction',
        nameKey: 'Daily Transaction',
        icon: <MdToday />,
      },
      {
        path: '/daily/dailyTransactionList',
        nameKey: 'Daily Transaction List',
        icon: <BsListCheck />,
      },
    ],
  },

  {
    path: '/rates',
    nameKey: 'Rates',
    icon: <AiOutlineRise />,
    subRoutes: [
      {
        path: '/rates/exchange',
        nameKey: 'Exchange',
        icon: <RiExchangeDollarFill />,
      },
      {
        path: '/rates/exchangeList',
        nameKey: 'Exchange List',
        icon: <BiListCheck />,
      },
      {
        path: '/rates/rate',
        nameKey: 'Rates',
        icon: <MdRateReview />,
      },
    ],
  },
  {
    path: 'accounts/accountList',
    nameKey: 'Account',
    icon: <FiUser />,
  },
  {
    path: '/settings',
    nameKey: 'Settings',
    icon: <BiCog />,
    exact: true,
    subRoutes: [
      {
        path: '/settings/languages',
        nameKey: 'Languages',
        icon: <FaUser />,
      },
      {
        path: '/settings/2fa',
        nameKey: '2FA',
        icon: <FaLock />,
      },
      {
        path: '/settings/billing',
        nameKey: 'Billing',
        icon: <FaMoneyBill />,
      },
    ],
  },
  {
    path: '/till',
    nameKey: 'Tills',
    icon: <BiCog />,
    exact: true,
    subRoutes: [
      {
        path: '/till/tillDashboard',
        nameKey: 'TillDashboard',
        icon: <FaUser />,
      },
      {
        path: '/till/tillHistory',
        nameKey: 'TillHistory',
        icon: <FaUser />,
      },
    ],
  },
];
