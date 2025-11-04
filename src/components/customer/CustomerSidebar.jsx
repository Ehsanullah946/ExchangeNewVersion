// components/customer/CustomerSidebar.jsx
import { useEffect } from 'react';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { BiSearch } from 'react-icons/bi';
import { NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const CustomerSidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      clearTimeout(window.resizeTimer);
      window.resizeTimer = setTimeout(() => {
        setIsMobile(window.innerWidth < 768);
      }, 150);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggle = () => setIsOpen(!isOpen);

  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      opacity: 0,
      transition: {
        duration: 0.1,
      },
    },
    show: {
      width: '140px',
      padding: '5px 15px',
      opacity: 1,
      transition: {
        duration: 0.1,
      },
    },
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.15,
      },
    },
    show: {
      opacity: 1,
      width: 'auto',
      transition: {
        duration: 0.1,
      },
    },
  };

  // Customer-specific menu items
  const customerRoutes = [
    {
      path: '/customer',
      nameKey: 'dashboard',
      icon: '📊',
    },
    {
      path: '/customer/accounts',
      nameKey: 'my_accounts',
      icon: '🏦',
    },
    {
      path: '/customer/transactions',
      nameKey: 'transactions',
      icon: '💳',
    },
    {
      path: '/customer/transfer',
      nameKey: 'transfer_money',
      icon: '🔄',
    },
    {
      path: '/customer/statements',
      nameKey: 'statements',
      icon: '📄',
    },
    {
      path: '/customer/profile',
      nameKey: 'my_profile',
      icon: '👤',
    },
  ];

  // Close sidebar when clicking on a link on mobile
  const handleLinkClick = () => {
    if (isMobile) {
      setIsOpen(false);
    }
  };

  return (
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
              : '250px'
            : isMobile
            ? '0'
            : '60px',
          transition: {
            duration: 0.1,
            type: 'spring',
            damping: 15,
          },
        }}
        className={`sidebar ${isMobile ? 'mobile-sidebar' : ''}`}
      >
        <div className="sidebar-content">
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
                  {t('Customer Portal')}
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
                      className="search-input"
                    />
                  )}
                </AnimatePresence>
              </div>
              <section className="routes">
                {customerRoutes.map((route, index) => (
                  <NavLink
                    to={route.path}
                    key={index}
                    className="link"
                    onClick={handleLinkClick}
                  >
                    <div className="icon">{route.icon}</div>
                    {isOpen && (
                      <span className="link_text">{t(route.nameKey)}</span>
                    )}
                  </NavLink>
                ))}
              </section>
            </>
          )}
        </div>
      </motion.div>

      <main
        className={`main-content ${isOpen && !isMobile ? 'sidebar-open' : ''}`}
      >
        {/* Mobile menu button */}
        {isMobile && !isOpen && (
          <button className="mobile-menu-btn" onClick={toggle}>
            <FaBars />
          </button>
        )}
        {children}
      </main>
    </div>
  );
};

export default CustomerSidebar;
