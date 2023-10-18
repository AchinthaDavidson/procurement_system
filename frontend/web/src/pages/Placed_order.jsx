
import React, { useEffect,useState } from 'react';
import Niv from '../components/Niv';
import axios from "axios";
import styles from '../Style/placeorder.module.css';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function Addsite() {
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
        axios.get("http://localhost:8070/order/getorder").then((res) => {
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
    
    
      const handleAccept = (id) => {
        axios
    .put(`http://localhost:8070/order/ok/${id}`)
    .then(() => {
      toast.success("New Supplier added successfully");
    })
    .catch((err) => {
      toast.error("New Supplier added unsuccessfully");
    });
      };
    
      const handleCancel = (id) => {
        axios
        .put(`http://localhost:8070/order/bad/${id}`)
        .then(() => {
          toast.success("New Supplier added successfully");
        })
        .catch((err) => {
          toast.error("New Supplier added unsuccessfully");
        });
      };
    

  
    return (
        <div>
            <ToastContainer position="top-right" theme="colored" />
            <Niv name='Placed Order' />
            <div className="data">
            <table className={styles.table}>
      <thead>
        <tr>
          <th>Date</th>
          <th>Site Name</th>
          <th>Item</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Supplier</th>
          <th>Supplier Accept</th>
          <th>Cancel</th>
        </tr>
      </thead>
      <tbody>
        {order.map((data, index) => (
          <tr key={index}>
            <td>{data.date}</td>
            {site.filter((val)=>{
                  if(val._id.includes(data.siteid)){
                    return val;
                  }
                }).map((sites,index)=>(
                    <td>{sites.name}</td>
                ))
                }
                 
            <td>{data.item}</td>
            <td>{data.qty}</td>
            <td>{data.price}</td>
            <td>
                    {
                    supplier.filter((val)=>{
                      var order = data.supplierid
                     
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
                      {supplier.company} <br/>
                      </>
                    ))}

                  </td>
            <td>
              <button className={styles.acceptButton} onClick={() => handleAccept(data._id)}>Accept</button>
            </td>
            <td>
              <button className={styles.cancelButton} onClick={() => handleCancel(data._id)}>Cancel</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
               
            </div>
        </div>
    );
}

export default Addsite;
