import React, { useState, useEffect } from "react";
import Navbar from "../common/Navbar";
import ReactApexChart from "react-apexcharts";
import HeroSection from "../dashbourd/HeroSection";
import MinimumQtyItems from "../dashbourd/MinimumQtyItems";
import DashbourdTable from "../tables/DashbourdTable";
import AddProduct from "../models/AddProduct";

function Dashboard() {
  const [tableHeight, setTableHeight] = useState(700);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && window.innerWidth <= 1024) {
        setTableHeight(450);
      } else {
        setTableHeight(500);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const pieChartOptions = {
    series: [44, 55, 13, 43, 22],
    chart: {
      width: 380,
      type: "pie",
    },
    labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  const handleOpenAddProduct = () => {
    setIsAddProductOpen(true);
  };

  const handleCloseAddProduct = () => {
    setIsAddProductOpen(false);
  };

  return (
    <div>
      <Navbar title="Dashboard" />
      <div className="w-full px-4 md:px-10">
        <div className="flex h-76">
          <div className="w-2/3 flex items-center">
            <HeroSection />
          </div>
          <div className="w-1/3">
            <ReactApexChart
              options={pieChartOptions}
              series={pieChartOptions.series}
              type="pie"
              height={250}
            />
          </div>
        </div>
        <div className="flex">
          <div className="w-2/3">
            <div className="flex ">
              <div className="w-11/12">
                <h1 className="bg-white font-bold h-12 flex items-center justify-center">
                  Products List
                </h1>
              </div>
              <div className="w-1/12 bg-white flex items-center justify-center cursor-pointer">
                <span
                  class="material-symbols-outlined"
                  onClick={handleOpenAddProduct}
                >
                  add_circle
                </span>
              </div>
            </div>

            <DashbourdTable tableHeight={tableHeight} />
          </div>
          <div className="w-1/3">
            <h1 className="ml-8 bg-white h-8 text-red-600 font-bold flex items-center justify-center">
              Lowest Quntity Items
            </h1>
            <MinimumQtyItems />
          </div>
        </div>
      </div>
      <AddProduct open={isAddProductOpen} handleClose={handleCloseAddProduct} />

    </div>
  );
}

export default Dashboard;
