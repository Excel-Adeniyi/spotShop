/* eslint-disable react/no-unknown-property */
import React from "react";
import "./sidebar.css";
import Collapser from "../../components/Collapse.tsx";
import Menu from "../../constants/jsons/menu.json";
export default function Sidebar() {
  return (
    <React.Fragment>
      <div className="sidebar-color">
        <div className="d-flex justify-content-center">
          <img src="/assert/spotshop.png" alt="Logo" className="logo-img" />
        </div>

        {Menu.map((item: any, index: number) => {
          return (
            <div key={index}>
              <Collapser menu={item.menu} sub_menu={item.sub_menu} />
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
}
