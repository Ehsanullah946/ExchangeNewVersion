import { useEffect } from 'react';
import SidebarMenu from './SidebarMenu';
import { useState } from 'react';
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
import { NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    icon: <AiOutlineDashboard />,
  },
  {
    path: '/main',
    name: 'Main',
    icon: <AiFillHome />,
    subRoutes: [
      {
        path: '/main/receive',
        name: 'Receive',
        icon: <RiDownloadLine />,
      },
      {
        path: '/main/transfer',
        name: 'Transfer',
        icon: <RiSendPlaneLine />,
      },
      {
        path: '/main/depositWithdraw',
        name: 'DepositWithdraw',
        icon: <FaRegArrowAltCircleUp />,
      },
      {
        path: '/main/consumption',
        name: 'Consumption',
        icon: <GiPayMoney />,
      },
      {
        path: '/main/transferToAccount',
        name: 'TransferToAccount',
        icon: <MdCompareArrows />,
      },
    ],
  },
  {
    path: '/management',
    name: 'Management',
    icon: <MdManageAccounts />,
    subRoutes: [
      {
        path: '/management/customer',
        name: 'Customer',
        icon: <FiUsers />,
      },
      {
        path: '/management/branch',
        name: 'Branch',
        icon: <MdAccountTree />,
      },
      {
        path: '/management/employee',
        name: 'Employees',
        icon: <FaUserTie />,
      },
      {
        path: '/management/exchanger',
        name: 'Exchanger',
        icon: <FaUser />,
      },
      {
        path: '/management/senderReceiver',
        name: 'SenderReceiver',
        icon: <BiTransferAlt />,
      },
    ],
  },
  {
    path: '/daily',
    name: 'Daily',
    icon: <MdToday />,
  },
  {
    path: '/account',
    name: 'Accounts',
    icon: <FiUser />,
  },
  {
    path: '/rates',
    name: 'Rates',
    icon: <AiOutlineRise />,
  },
  {
    path: '/settings',
    name: 'Settings',
    icon: <BiCog />,
    exact: true,
    subRoutes: [
      {
        path: '/settings/profile',
        name: 'Profile ',
        icon: <FaUser />,
      },
      {
        path: '/settings/2fa',
        name: '2FA',
        icon: <FaLock />,
      },
      {
        path: '/settings/billing',
        name: 'Billing',
        icon: <FaMoneyBill />,
      },
    ],
  },
];

const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      // Auto-close sidebar on mobile when switching to desktop
      if (!mobile && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  const toggle = () => setIsOpen(!isOpen);

  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      width: '140px',
      padding: '5px 15px',
      opacity: 1,
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
      width: 'auto',
      transition: {
        duration: 0.5,
      },
    },
  };

  // Close sidebar when clicking on a link on mobile
  const handleLinkClick = () => {
    if (isMobile) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <div className="main-container">
        {/* Mobile overlay */}
        {isMobile && isOpen && (
          <div className="sidebar-overlay" onClick={() => setIsOpen(false)} />
        )}

        <motion.div
          animate={{
            width: isOpen
              ? isMobile
                ? '80%'
                : '200px'
              : isMobile
              ? '0'
              : '45px',
            transition: {
              duration: 0.3,
              type: 'spring',
              damping: 15,
            },
          }}
          className={`sidebar ${isMobile ? 'mobile-sidebar' : ''}`}
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
              {isMobile ? (
                <FaTimes onClick={toggle} />
              ) : (
                <FaBars onClick={toggle} />
              )}
            </div>
          </div>

          {isOpen && (
            <>
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
                        key={index}
                      />
                    );
                  }

                  return (
                    <NavLink
                      to={route.path}
                      key={index}
                      className="link"
                      onClick={handleLinkClick}
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
            </>
          )}
        </motion.div>
        <main className={isOpen && !isMobile ? 'sidebar-open' : ''}>
          {/* Mobile menu button */}
          {isMobile && !isOpen && (
            <button className="mobile-menu-btn" onClick={toggle}>
              <FaBars />
            </button>
          )}
          {children}
        </main>
      </div>
    </>
  );
};

// const SideBar = ({ children }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

//   useEffect(() => {
//     const handleResize = () => {
//       const mobile = window.innerWidth < 768;
//       setIsMobile(mobile);

//       // Auto-close sidebar on mobile when switching to desktop
//       if (!mobile && isOpen) {
//         setIsOpen(false);
//       }
//     };

//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, [isOpen]);

//   const toggle = () => setIsOpen(!isOpen);

//   // Close sidebar when a link is clicked (especially useful for mobile)
//   const handleLinkClick = () => {
//     if (isMobile) {
//       setIsOpen(false);
//     }
//   };

//   const inputAnimation = {
//     hidden: {
//       width: 0,
//       padding: 0,
//       opacity: 0,
//       transition: {
//         duration: 0.2,
//       },
//     },
//     show: {
//       width: '140px',
//       padding: '5px 15px',
//       opacity: 1,
//       transition: {
//         duration: 0.2,
//       },
//     },
//   };

//   const showAnimation = {
//     hidden: {
//       width: 0,
//       opacity: 0,
//       transition: {
//         duration: 0.5,
//       },
//     },
//     show: {
//       opacity: 1,
//       width: 'auto',
//       transition: {
//         duration: 0.5,
//       },
//     },
//   };

//   return (
//     <>
//       <div className="main-container">
//         {/* Mobile overlay */}
//         {isMobile && isOpen && (
//           <div className="sidebar-overlay" onClick={() => setIsOpen(false)} />
//         )}

//         <motion.div
//           animate={{
//             width: isOpen
//               ? isMobile
//                 ? '80%'
//                 : '200px'
//               : isMobile
//               ? '0'
//               : '45px',
//             transition: {
//               duration: 0.3,
//               type: 'spring',
//               damping: 15,
//             },
//           }}
//           className={`sidebar ${isMobile ? 'mobile-sidebar' : ''}`}
//         >
//           <div className="top_section">
//             <AnimatePresence>
//               {isOpen && (
//                 <motion.h1
//                   variants={showAnimation}
//                   initial="hidden"
//                   animate="show"
//                   exit="hidden"
//                   className="logo"
//                 >
//                   DoSomeCoding
//                 </motion.h1>
//               )}
//             </AnimatePresence>

//             <div className="bars">
//               {isMobile ? (
//                 <FaTimes onClick={toggle} />
//               ) : (
//                 <FaBars onClick={toggle} />
//               )}
//             </div>
//           </div>

//           {isOpen && (
//             <>
//               <div className="search">
//                 <div className="search_icon">
//                   <BiSearch />
//                 </div>
//                 <AnimatePresence>
//                   {isOpen && (
//                     <motion.input
//                       initial="hidden"
//                       animate="show"
//                       exit="hidden"
//                       variants={inputAnimation}
//                       type="text"
//                       placeholder="Search"
//                     />
//                   )}
//                 </AnimatePresence>
//               </div>
//               <section className="routes">
//                 {routes.map((route, index) => {
//                   if (route.subRoutes) {
//                     return (
//                       <SidebarMenu
//                         route={route}
//                         showAnimation={showAnimation}
//                         isOpen={isOpen}
//                         onLinkClick={handleLinkClick}
//                         key={index}
//                       />
//                     );
//                   }

//                   return (
//                     <a
//                       href={route.path}
//                       key={index}
//                       className="link"
//                       onClick={handleLinkClick}
//                     >
//                       <div className="icon">{route.icon}</div>
//                       <AnimatePresence>
//                         {isOpen && (
//                           <motion.div
//                             variants={showAnimation}
//                             initial="hidden"
//                             animate="show"
//                             exit="hidden"
//                             className="link_text"
//                           >
//                             {route.name}
//                           </motion.div>
//                         )}
//                       </AnimatePresence>
//                     </a>
//                   );
//                 })}
//               </section>
//             </>
//           )}
//         </motion.div>

//         <main className={isOpen && !isMobile ? 'sidebar-open' : ''}>
//           {/* Mobile menu button */}
//           {isMobile && !isOpen && (
//             <button className="mobile-menu-btn" onClick={toggle}>
//               <FaBars />
//             </button>
//           )}
//           <div className="content">
//             <h1>Responsive Sidebar Demo</h1>
//             <p>
//               This sidebar will automatically close when a link is clicked on
//               mobile devices.
//             </p>
//             <p>Try resizing the browser to see the responsive behavior.</p>
//             <div className="card-grid">
//               <div className="card">Card 1</div>
//               <div className="card">Card 2</div>
//               <div className="card">Card 3</div>
//               <div className="card">Card 4</div>
//             </div>
//           </div>
//         </main>
//       </div>
//     </>
//   );
// };

export default SideBar;
