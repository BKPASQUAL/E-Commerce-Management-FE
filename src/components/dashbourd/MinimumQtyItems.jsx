import React from "react";
import { useGetMinimumQuantityQuery } from "../../store/api/productApi";
import { CircularProgress } from "@mui/material";

function MinimumQtyItems() {
  const { data, isLoading, error } = useGetMinimumQuantityQuery();

  console.log(data?.products, "sdds");

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-96">
        <CircularProgress />
      </div>
    );
  if (error) return <div>Error: {error.message}</div>;

  const items = Array.isArray(data) ? data : data?.products || [];

  return (
    <div className="ml-8 bg-white ">
      <div className="p-4 ">
        {items.map((item) => (
          <div
            key={item.id}
            className="w-full bg-slate-200 h-16 flex justify-between mb-4"
          >
            <div className="p-2 px-6">
              <p className="font-semibold">Item Code: {item.productCode}</p>
              <h1 className="font-semibold">Item Name: {item.productName}</h1>
            </div>
            <div className="p-2 px-8 flex items-center text-red-700">
              <h1 className="font-semibold">Quantity: {item.quantity}</h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MinimumQtyItems;
