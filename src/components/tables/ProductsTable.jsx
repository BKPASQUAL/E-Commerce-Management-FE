import React, { useState, useEffect } from "react";
import { Table, Button } from "rsuite";
import mockUsers from "../../assets/mocks/ProductMocks";

const { Column, HeaderCell, Cell } = Table;
const data = mockUsers(20);

function ProductsTable() {
  const [tableHeight, setTableHeight] = useState(700);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && window.innerWidth <= 1024) {
        setTableHeight(550);
      } else {
        setTableHeight(700);
      }
    };

    handleResize(); 
    window.addEventListener("resize", handleResize); 
    return () => window.removeEventListener("resize", handleResize); 
  }, []);

  return (
    <div>
      <Table
        height={tableHeight}
        data={data}
        onRowClick={(rowData) => {
          console.log(rowData);
        }}
        style={{ width: "100%" }}
      >
        <Column flexGrow={1} align="center">
          <HeaderCell className="bg-gray-200 text-gray-700">Code</HeaderCell>
          <Cell dataKey="id" />
        </Column>
        <Column flexGrow={2}>
          <HeaderCell className="bg-gray-200 text-gray-700">
            Product Name
          </HeaderCell>
          <Cell dataKey="firstName" />
        </Column>
        <Column flexGrow={2}>
          <HeaderCell className="bg-gray-200 text-gray-700">Brand</HeaderCell>
          <Cell dataKey="firstName" />
        </Column>

        <Column flexGrow={2}>
          <HeaderCell className="bg-gray-200 text-gray-700">
            Category
          </HeaderCell>
          <Cell dataKey="firstName" />
        </Column>

        <Column flexGrow={2}>
          <HeaderCell className="bg-gray-200 text-gray-700">MRP</HeaderCell>
          <Cell dataKey="lastName" />
        </Column>

        <Column flexGrow={2}>
          <HeaderCell className="bg-gray-200 text-gray-700">
            SELLING PRICE
          </HeaderCell>
          <Cell dataKey="email" />
        </Column>

        <Column flexGrow={1}>
          <HeaderCell>Action</HeaderCell>
          <Cell>
            {(rowData) => (
              <>
                <span
                  className="material-symbols-outlined sidebar-icon text-lg font-medium text-txtdarkblue mr-3 cursor-pointer"
                  onClick={() => handleEditItem(rowData)}
                >
                  edit
                </span>
                <span
                  className="material-symbols-outlined sidebar-icon text-lg font-medium text-red mr-3 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteOpen(rowData.id);
                  }}
                >
                  delete
                </span>
              </>
            )}
          </Cell>
        </Column>
      </Table>
    </div>
  );
}

export default ProductsTable;
