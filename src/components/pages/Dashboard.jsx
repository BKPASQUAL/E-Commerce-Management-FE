import React, { useState, useEffect } from "react";
import Navbar from "../common/Navbar";
import ReactApexChart from "react-apexcharts";
import ProductsTable from "../tables/ProductsTable";
import HeroSection from "../dashbourd/HeroSection";

function Dashboard() {
  const [tableHeight, setTableHeight] = useState(700);

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

  return (
    <div>
      <Navbar title="Dashboard" />
      <div className="w-full px-4 md:px-10">
        <div className="flex h-76">
          <div className="w-2/3 flex items-center">
          <HeroSection/>
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
            <h1>Products List</h1>
            <ProductsTable tableHeight={tableHeight} />
          </div>
          <div className="w-1/3">
            <h1>Helo</h1>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
