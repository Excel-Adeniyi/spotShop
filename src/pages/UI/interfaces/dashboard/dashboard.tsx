/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Breadcrumb } from "react-bootstrap";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FaHome } from "react-icons/fa";
import DailySalesTable from "../../components/salesTable/Sales/salesTable.tsx";
import ProductTable from "../../components/salesTable/productTable.tsx";

export default function Dashboard() {
  return (
    <div className="pt-5 m-5">
      <Breadcrumb>
        <Breadcrumb.Item href="#" className="pt-1 ">
          <div className="col">Dashboard</div>
        </Breadcrumb.Item>
        <Breadcrumb.Item href="#" className="pt-1 d-flex">
          <div className="pt-1">
            <FaHome />
          </div>
        </Breadcrumb.Item>
      </Breadcrumb>

      <div className="pt-5 row row-cols-1">
        <div className="col p-2 ">
          <h5>Daily Sales</h5>
          <div className="overflow-x-scroll">
            <DailySalesTable />
          </div>
        </div>

        {/* <div className="col p-2">
          <h5>Products</h5>
          <div className="overflow-x-scroll">
            <ProductTable />
          </div>
        </div>
        <div className="col">
          <h5>Daily Sales</h5>
          <DailySalesTable />
        </div> */}
      </div>
    </div>
  );
}
