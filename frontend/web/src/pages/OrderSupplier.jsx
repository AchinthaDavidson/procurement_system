import React, { useEffect, useState } from "react";
import axios from "axios";
import Niv from '../components/Niv';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from '../Style/order.module.css';

function Ordersupplier() {

  const [site, setsite] = useState([]);
  const [order, setorder] = useState([]);
  const [supplier, setsupplier] = useState([]);
  const [product, setproduct] = useState([]);
  var orderData = null

  useEffect(() => {
    function getItems() {
      axios.get("http://localhost:8070/site/").then((res) => {
        setsite(res.data);

      });
    }
    getItems();
  }, []);

  useEffect(() => {
    function getItems() {
      axios.get("http://localhost:8070/order/").then((res) => {
        setorder(res.data);

      });
    }
    getItems();
  }, []);



  useEffect(() => {
    function getItems() {
      axios.get("http://localhost:8070/supplier/").then((res) => {
        setsupplier(res.data);

      });
    }
    getItems();
  }, []);
  useEffect(() => {
    function getItems() {
      axios.get("http://localhost:8070/product/order").then((res) => {
        setproduct(res.data);

      });
    }
    getItems();
  }, []);

  return (
    <div>
      <Niv name='Order From Suppliers' />
      <div className="data">
        <table border="1">
        {site.map ((items, index2) => (
            <>
            <tr>
              <td >{items.name}</td>
            </tr>
            <tr>
              <td>date</td>
              <td>item</td>
              <td>qty</td>
              <td>supplier</td>
              <td>status</td>
            </tr>
           
              {
                order.filter((val)=>{
                  if(val.siteid.includes(items._id)){
                    return val;
                  }
                }).map((orders,index)=>(
                  <>
                   <tr>
                  <td>{orders.date}</td>
                  <td>{orders.item}</td>
                  <td>{orders.qty}</td>
                  
                  <td>
                    {
                    supplier.filter((val)=>{
                      var order = orders.supplierid
                      order.forEach(element => {
                        
                         if (val._id.includes(element.company)){
                          return val
                      }
                      })
                      return val
                   
                    }).map((supplier,index)=>(
                      <>
                      {supplier.company}
                      hjj
                      </>
                    ))}

                  </td>
                  <td>
                    {orders.status}
                  </td>
                  </tr>
                  
                  </>
                ))
              }
              
            
            </>
            ))}

        </table>
      </div>
    </div>
  );
}

export default Ordersupplier;