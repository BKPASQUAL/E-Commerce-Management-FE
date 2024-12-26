import React from "react";
import { Outlet } from "react-router-dom";
import SidebarComp from "./Sidebar";

function Home() {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
        background:"#F8F9FD"
      }}
    >
      <SidebarComp /> {/* Sidebar Component */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          
        }}
        
      >
        <Outlet /> {/* This renders the nested route component like AddSuppliers */}
      </div>
    </div>
  );
}

export default Home;
