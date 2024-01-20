import React, { useState } from "react";
import { Collapse } from "react-bootstrap";
import { MdArrowDropDownCircle } from "react-icons/md";
import "../Layout/sidebar/sidebar.css";

interface CollapseProps {
  menu: string;
  sub_menu: any;
}
export default function Collapser({ menu, sub_menu }: CollapseProps) {
  const [open, setOpen] = useState<boolean>(false);
  const toggle = () => {
    setOpen(!open);
  };
  
  return (
    <div>
      <div className=" border-bottom  mt-2">
        <button
          className="row row-cols-2 p-2 w-100"
          onClick={toggle}
          // typeof={"button"}
          aria-expanded={open}
          aria-controls="collapseExample"
        >
          <div className="col text-start">{menu}</div>
          <div className="col d-flex justify-content-end ">
            <MdArrowDropDownCircle className="m-1" />
          </div>
        </button>
      </div>
      {sub_menu &&
        sub_menu.map((item: any) => {
          // console.log(item);
          return (
            <Collapse in={open} key={item} className="sub-menu">
              <div id="example-collapse-text " className="container  pt-2 ps-3 pe-3 pb-2">{item}</div>
            </Collapse>
          );
        })}
    </div>
  );
}
