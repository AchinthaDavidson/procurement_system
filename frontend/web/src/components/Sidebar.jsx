import React, { useState } from 'react';
import {
    FaWpforms,
    FaHistory,
    FaBars,
    FaUserAlt

}from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import { FiUserPlus } from "react-icons/fi";
import { MdPayment } from "react-icons/md";
import { MdOutlineConstruction } from "react-icons/md";

const Sidebar = ({children}) => {
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
   
    const menuItem=[
        {
            path:"/",
            name:"Order Requisiton Form",
            icon:<FaWpforms/>
        },
        {
            path:"/Ordersupplier",
            name:"Order History",
            icon:<FaHistory/>
        },
        {
            path:"/Addsitemanager",
            name:"Add New Site Manager",
            icon:<FaUserAlt/>
        },
        {
            path:"/Supplierreg ",
            name:"Supplier Register",
            icon:<FiUserPlus/>
        },
        {
            path:"/Payment",
            name:"Payment",
            icon:<MdPayment/>
        },
        {
            path:"/Addsite",
            name:"Add New Site",
            icon:<MdOutlineConstruction/>
        }
    ]
    return (
        <div className="container">
           <div style={{width: isOpen ? "250px" : "50px"}} className="sidebar">
               <div className="top_section">
                   <h1 style={{display: isOpen ? "block" : "none", paddingRight: isOpen ? "10px" : "20px"}} className="logo">ConPro</h1>
                   <div style={{marginLeft: isOpen ? "80px" : "0px"}} className="bars">
                       <FaBars onClick={toggle}/>
                   </div>
               </div>
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link" activeclassname="active">
                           <div className="icon">{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                       </NavLink>
                   ))
               }
           </div>
           
           <main>
           
          
            
                {children}
         
            
            
            </main>
           
        </div>
    );
};

export default Sidebar;