import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./sidebar.scss";

const sidebarNavItems = [
  {
    display: "Dashboard",
    icon: <i className="bx bx-home"></i>,
    to: "/owner-dashboard",
    section: "",
  },
  {
    display: "Server Configuration",
    icon: <i className="bx bx-server"></i>,
    to: "/config",
    section: "server",
  },
  {
    display: "Standardize Access",
    icon: <i className="bx bx-calendar"></i>,
    to: "/access",
    section: "access",
  },
  {
    display: "Devops Developers",
    icon: <i className="bx bx-user"></i>,
    to: "/devops",
    section: "devops",
  },
  {
    display: "Admins",
    icon: <i className="bx bx-user-circle"></i>,
    to: "/admins",
    section: "admins",
  },
  {
    display: "Security",
    icon: <i className="bx bx-shield"></i>,
    to: "/security",
    section: "security",
  },
  {
    display: "Applications",
    icon: <i className="bx bx-apple"></i>,
    to: "/applications",
    section: "applications",
  },
  {
    display: "Virtual Machines",
    icon: <i className="bx bx-cloud-download"></i>,
    to: "/virtualmachines",
    section: "virtualmachines",
  },
  {
    display: "System Updates",
    icon: <i className="bx bx-refresh"></i>,
    to: "/updates",
    section: "updates",
  },
  {
    display: "Inventory",
    icon: <i className="bx bx-cart"></i>,
    to: "/inventory",
    section: "inventory",
  },
];

const OwnerSidebar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [stepHeight, setStepHeight] = useState(0);
  const sidebarRef = useRef();
  const indicatorRef = useRef();
  const location = useLocation();

  useEffect(() => {
    setTimeout(() => {
      const sidebarItem = sidebarRef.current.querySelector(
        ".sidebar__menu__item"
      );
      indicatorRef.current.style.height = `${sidebarItem.clientHeight}px`;
      setStepHeight(sidebarItem.clientHeight);
    }, 50);
  }, []);

  // change active index
  useEffect(() => {
    const curPath = window.location.pathname.split("/")[1];
    const activeItem = sidebarNavItems.findIndex(
      (item) => item.section === curPath
    );
    setActiveIndex(curPath.length === 0 ? 0 : activeItem);
  }, [location]);

  return (
    <div className="sidebar">
      <div className="sidebar__logo">
        <img
          src="https://media.licdn.com/dms/image/C4D0BAQEx4wQN8NGYTA/company-logo_200_200/0/1674053392733?e=2147483647&v=beta&t=PiVEhBEBF--iBNaHT8MAY9NvFXwGDuk08yAJ6aE1c0M"
          alt=""
          style={{ width: "50px", height: "50px" }}
        />
      </div>
      <div ref={sidebarRef} className="sidebar__menu">
        <div
          ref={indicatorRef}
          className="sidebar__menu__indicator"
          style={{
            transform: `translateX(-50%) translateY(${
              activeIndex * stepHeight
            }px)`,
          }}
        ></div>
        {sidebarNavItems.map((item, index) => (
          <Link to={item.to} key={index}>
            <div
              className={`sidebar__menu__item ${
                activeIndex === index ? "active" : ""
              }`}
            >
              <div className="sidebar__menu__item__icon">{item.icon}</div>
              <div className="sidebar__menu__item__text">{item.display}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default OwnerSidebar;
