import SidebarMenu from "./SidebarMenu";
import { useState } from "react";
import { FaBars, FaHome, FaLock, FaMoneyBill, FaRegArrowAltCircleUp, FaUser, FaUserTie } from "react-icons/fa";
import { MdAccountTree, MdCompareArrows, MdManageAccounts, MdMessage, MdToday } from "react-icons/md";
import { BiAnalyse, BiSearch, BiTransferAlt } from "react-icons/bi";
import { BiCog } from "react-icons/bi";
import { AiFillHome, AiOutlineDashboard, AiOutlineRise } from "react-icons/ai";
import { RiDownloadLine, RiSendPlaneLine } from 'react-icons/ri';
import { FiUser, FiUsers } from "react-icons/fi"
import { GiPayMoney } from 'react-icons/gi';
import { NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const routes = [
  {
    path: "/",
    name: "Dashboard",
    icon: <AiOutlineDashboard />,
  },
    {
    path: "/main",
    name: "Main",
      icon: <AiFillHome />,
      subRoutes: [
      {
        path: "/main/receive",
        name: "Receive",
        icon: <RiDownloadLine />,
      },
      {
        path: "/main/transfer",
        name: "Transfer",
        icon: <RiSendPlaneLine />,
      },
      {
        path: "/main/depositWithdraw",
        name: "DepositWithdraw",
        icon: <FaRegArrowAltCircleUp />,
      },
      {
        path: "/main/consumption",
        name: "Consumption",
        icon: <GiPayMoney />,
      },
      {
        path: "/main/transferToAccount",
        name: "TransferToAccount",
        icon: <MdCompareArrows />,
      },
    ]
  },
  {
    path: "/management",
    name: "Management",
    icon: <MdManageAccounts />,
    subRoutes: [
       {
        path: "/management/customer",
        name: "Customer",
        icon: <FiUsers />,
      },
       {
        path: "/management/branch",
        name: "Branch",
        icon: <MdAccountTree />,
      },
       {
        path: "/management/employee",
        name: "Employees",
        icon: <FaUserTie />,
      },
       {
        path: "/management/exchanger",
        name: "Exchanger",
        icon: <FaUser />,
      },
       {
        path: "/management/senderReceiver",
        name: "SenderReceiver",
        icon: <BiTransferAlt />,
      },
    ]
  },
  {
    path: "/daily",
    name: "Daily",
    icon: <MdToday />,
  },
  {
    path: "/account",
    name: "Accounts",
    icon: <FiUser />,
  },
  {
    path: "/rates",
    name: "Rates",
    icon: <AiOutlineRise />,
  },
  {
    path: "/settings",
    name: "Settings",
    icon: <BiCog />,
    exact: true,
    subRoutes: [
      {
        path: "/settings/profile",
        name: "Profile ",
        icon: <FaUser />,
      },
      {
        path: "/settings/2fa",
        name: "2FA",
        icon: <FaLock />,
      },
      {
        path: "/settings/billing",
        name: "Billing",
        icon: <FaMoneyBill />,
      },
    ],
  },
];

const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      width: "140px",
      padding: "5px 15px",
      transition: {
        duration: 0.2,
      },
    },
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <div className="main-container">
        <motion.div
          animate={{
            width: isOpen ? "200px" : "45px",

            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          className={`sidebar `}
        >
          <div className="top_section">
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="logo"
                >
                  DoSomeCoding
                </motion.h1>
              )}
            </AnimatePresence>

            <div className="bars">
              <FaBars onClick={toggle} />
            </div>
          </div>
          <div className="search">
            <div className="search_icon">
              <BiSearch />
            </div>
            <AnimatePresence>
              {isOpen && (
                <motion.input
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={inputAnimation}
                  type="text"
                  placeholder="Search"
                />
              )}
            </AnimatePresence>
          </div>
          <section className="routes">
            {routes.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenu
                    setIsOpen={setIsOpen}
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                  />
                );
              }
              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className="link"
                  activeClassName="active"
                >
                  <div className="icon">{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </section>
        </motion.div>

        <main>{children}</main>
      </div>
    </>
  );
};

export default SideBar;
