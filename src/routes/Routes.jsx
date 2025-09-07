import {
  FaBars,
  FaHome,
  FaLock,
  FaMoneyBill,
  FaRegArrowAltCircleUp,
  FaUser,
  FaUserTie,
  FaTimes,
} from 'react-icons/fa';
import {
  MdAccountTree,
  MdCompareArrows,
  MdManageAccounts,
  MdToday,
} from 'react-icons/md';
import { BiAnalyse, BiSearch, BiTransferAlt } from 'react-icons/bi';
import { BiCog } from 'react-icons/bi';
import { AiFillHome, AiOutlineDashboard, AiOutlineRise } from 'react-icons/ai';
import { RiDownloadLine, RiSendPlaneLine } from 'react-icons/ri';
import { FiUser, FiUsers } from 'react-icons/fi';
import { GiPayMoney } from 'react-icons/gi';

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
        icon: <FaRegArrowAltCircleUp />,
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
        nameKey: 'TransferToAccount',
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
        path: '/management/employee',
        nameKey: 'Employees',
        icon: <FaUserTie />,
      },
      {
        path: '/management/exchanger',
        nameKey: 'Exchanger',
        icon: <FaUser />,
      },
      {
        path: '/management/senderReceiver',
        nameKey: 'SenderReceiver',
        icon: <BiTransferAlt />,
      },
    ],
  },
  {
    path: '/daily',
    nameKey: 'Daily',
    icon: <MdToday />,
  },
  {
    path: '/account',
    nameKey: 'Accounts',
    icon: <FiUser />,
  },
  {
    path: '/rates',
    nameKey: 'Rates',
    icon: <AiOutlineRise />,
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
];
