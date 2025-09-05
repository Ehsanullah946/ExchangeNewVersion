import React from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { AiOutlineMenu } from 'react-icons/ai';
import { BsChatLeft } from 'react-icons/bs';
import { RiNotification3Line } from 'react-icons/ri';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

const NavButton = ({ title, customeFunc, icon, color, dotColor }) => {
  return (
    <TooltipComponent position="BottomCenter" content={title}>
      <button
        onClick={customeFunc}
        style={{ color }}
        className="relative text-xl rounded-full p-3 hover:bg-light-gray"
      >
        <span
          style={{ background: dotColor }}
          className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
        />
        {icon}
      </button>
    </TooltipComponent>
  );
};

const Navbar = () => {
  return (
    <div className="flex justify-between p-2 md:mx-6 relative">
      <NavButton
        title="Menue"
        customeFunc={() => setActiveMenue((prevState) => !prevState)}
        color="blue"
        icon={<AiOutlineMenu />}
      />
      <div className="flex">
        <NavButton
          dotColor="#03C907"
          title="Chat"
          customeFunc={() => handleClick('chat')}
          color="blue"
          icon={<BsChatLeft />}
        />
        <NavButton
          dotColor="#03C907"
          title="Notification"
          customeFunc={() => handleClick('notification')}
          color="blue"
          icon={<RiNotification3Line />}
        />
        <TooltipComponent content="Profile" position="BottomCenter">
          <div
            className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
            onClick={() => handleClick('userProfile')}
          >
            <img src={avatar} alt="" className="rounded-full h-8 w-8 " />
            <p>
              <span className="text-gray-400 text-14">Hi, </span>{' '}
              <span className="text-gray-400 text-14 font-bold">
                Ehsanullah
              </span>
            </p>
            <MdKeyboardArrowDown />
          </div>
        </TooltipComponent>
        {isClicked.cart && <Cart />}
        {isClicked.chat && <Chat />}
        {isClicked.notification && <Notification />}
        {isClicked.userProfile && <UserProfile />}
      </div>
    </div>
  );
};

export default Navbar;
