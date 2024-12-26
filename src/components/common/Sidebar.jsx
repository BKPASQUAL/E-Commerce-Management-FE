import React, { useState, useEffect } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import "../../assets/css/Sidebar.css";
import { useNavigate } from "react-router-dom";

function SidebarComp() {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState("dashboard");
  const [theme, setTheme] = useState("light");

  const navigate = useNavigate();

  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
    navigate(menuItem);
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.body.setAttribute("data-theme", newTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.body.setAttribute("data-theme", savedTheme);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="sidebar-container">
      <Sidebar
        collapsed={collapsed}
        width="200px"
        collapsedWidth="70px"
        transitionDuration={500}
        className="sidebar 	"
      >
        <div className="sidebar-log"></div>
        <Menu>
          <div className="sidebar-link">
            <MenuItem
              className={
                selectedMenuItem === "dashboard" ? "selected-menu-item" : ""
              }
              icon={<span className="material-symbols-outlined sidebar-icon">home</span>}
              onClick={() => handleMenuItemClick("dashboard")}
            >
              Dashboard
            </MenuItem>
          </div>
          <div className="sidebar-link">
            <MenuItem
              className={
                selectedMenuItem === "Products" ? "selected-menu-item" : ""
              }
              icon={<span className="material-symbols-outlined sidebar-icon">add_box</span>}
              onClick={() => handleMenuItemClick("Products")}
            >
              Products
            </MenuItem>
          </div>
          <div className="sidebar-link">
            <MenuItem
              className={
                selectedMenuItem === "custormers" ? "selected-menu-item" : ""
              }
              icon={<span className="material-symbols-outlined sidebar-icon">event_note</span>}
              onClick={() => handleMenuItemClick("custormers")}
            >
              Customers
            </MenuItem>
          </div>
         
        
          <div className="sidebar-link">
            <MenuItem
              className={
                selectedMenuItem === "category" ? "selected-menu-item" : ""
              }
              icon={<span className="material-symbols-outlined sidebar-icon">group</span>}
              onClick={() => handleMenuItemClick("category")}
            >
              Categories
            </MenuItem>
          </div>
          <div className="sidebar-link">
            <MenuItem
              className={
                selectedMenuItem === "users" ? "selected-menu-item" : ""
              }
              icon={<span className="material-symbols-outlined sidebar-icon">group</span>}
              onClick={() => handleMenuItemClick("users")}
            >
              Users
            </MenuItem>
          </div>
        </Menu>
      </Sidebar>
    </div>
  );
}

export default SidebarComp;
