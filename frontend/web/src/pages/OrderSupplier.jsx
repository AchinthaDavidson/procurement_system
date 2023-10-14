import React, { useEffect, useState } from "react";
import axios from "axios";
import Niv from '../components/Niv';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from '../Style/ordersup.module.css';

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
        <table className={styles.table} border="1">
        {site.map ((items, index2) => (
            <>
            <tr className={styles.siterow}>
              <th colSpan={5}>Site: {items.name}</th>
            </tr>
            <tr className={styles.tablecols}>
              <td>Date</td>
              <td>Item</td>
              <td>Required quantity</td>
              <td>Quantity ordered by each supplier</td>
              <td>Status</td>
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
                        
                        {/* console.log(element) */}
                         if (val._id.includes(element.company)){
                          
                         var val1={
                            company: val.company,
                            qty: element.qty
                          }
                          console.log(val1)
                          return val1
                      }
                      })
                      console.log(val)
                      return val
                   
                    }).map((supplier,index)=>(
                      <>
                      {supplier.company} - {orders.supplierid[index].qty}<br/>
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