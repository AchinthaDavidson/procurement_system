import React, { useEffect, useState } from "react";
import axios from "axios";
import Niv from '../components/Niv';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from '../Style/order.module.css';

function Order() {

  const [site, setsite] = useState([]);
  const [order, setorder] = useState([]);
  const [supplier, setsupplier] = useState([]);
  const [product, setproduct] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState('');
  const [numberValue, setNumberValue] = useState(0);
  const [addedData, setAddedData] = useState([]);
  const [addedsupplier, setaddsupplier] = useState([])
  const [selectedOptionObject,setselectedOptionObject]=useState([])
  const [budget,setbudget]=useState(0)
  const [count,setcount]=useState(0)
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



  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value)
    const selectedOptionValue = event.target.value;
    setselectedOptionObject(JSON.parse(selectedOptionValue))

  
  };


  const handleInputChange = (event) => {
    const value = event.target.value;
    setNumberValue(value); // Update the state with the numeric value
  };

  const handleAddClick = (selectedOption, numberValue, id, index) => {
    
    const newItem = { company: selectedOptionObject.supplier, qty: numberValue, id: id, companyId: selectedOptionObject.supplier_id,itemprice:selectedOptionObject.price,index:count};
    console.log(newItem)
    setcount(count+1)
    // Update the addedData state with the new item
    setAddedData([...addedData, newItem]);
    document.getElementById(index).hidden = false
console.log(addedData)
    // console.log(newItem.itemprice*Number(numberValue))
    setbudget(budget+(newItem.itemprice*Number(numberValue)))
    setSelectedOption("")
    setNumberValue("")
    setaddsupplier([])
  };

  const handlesubmit = (budget,id) => {

    {
      addedData.map((item, index) => (
        addsupplier(item)
      ))
    }

    const values={
      
      budget:budget
    }
    axios
    .put(`http://localhost:8070/site/update/${id}`, values)
    .then(() => {
      toast.success("New Supplier added successfully");
    })
    .catch((err) => {
      toast.error("New Supplier added unsuccessfully");
    });

    setAddedData([])
  }

  const addsupplier = (item) => {

    var data = {
      company: item.companyId,
      qty: item.qty
    }

    const data1 = { data }


    const link = "http://localhost:8070/order/update/" + item.id;

    axios
      .put(link, data1)
      .then(() => {
        toast.success("New Supplier added successfully");
      })
      .catch((err) => {
        toast.error("New Supplier added unsuccessfully");
      });
  }

  const onDelete = (userId,budget1) => {

    setbudget(budget-budget1)
    setAddedData(addedData.filter((user) => user.index !== userId));
  };

  return (
    <div>
      <ToastContainer position="top-right" theme="colored" />
      <Niv name='Orders' />
      <div className="data">

        <div>
          <input type="text" style={{ height: "40px" }} placeholder=" Search Items..." onChange={(event) => {
            setSearchTerm(event.tar0get.value);
          }} />


        </div>
        <div className={styles.table1}>

          <table className={styles.outertable}>
            {site.filter((val) => {
              if (searchTerm === "") {
                return val;
              } else if (
                val.name.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return val;
              }
            }).map((items, index2) => (
              <>
                <tr >
                  <th>Site: {items.name}</th>

                </tr>

                <table className={styles.innertable} border="1">
                  <tr className={styles.tabattributes}>
                    <td>Item</td>
                    <td>Quantity Required</td>
                    <td>Choose Supplier</td>
                    <td colSpan={2}>Ordering Quantity</td>
                  </tr>


                  {order.filter((val) => {
                    if (val.siteid.toLowerCase().includes(items._id.toLowerCase())) {
                      // document.getElementById(items._id+1).hidden=false
                      // document.getElementById(items._id).hidden=false
                      return val;
                    }
                  }).map((items, index1) => (
                    <>
                      <tr>
                        <td>{items.item}</td>
                        <td>{items.qty}</td>
                        <td>
                        <select id="dropdown" value={selectedOption} onChange={handleSelectChange}>
      <option value="" disabled> Select supplier</option>
      {product
        .filter((val) => val.name.includes(items.item))
        .map((product) => {
          const associatedSupplier = supplier.find((val) => val._id === product.supplier_id);
          if (associatedSupplier) {

            
            const optionValue = `${product.price} - ${associatedSupplier.company}`;
            const optionObject = {
              value: optionValue,
              supplier: associatedSupplier.company,
              item: product.name,
              price: product.price,
              supplier_id:associatedSupplier._id
            };
            return (
              <option
                // key={product._id} // Provide a unique key for each option
                className={styles.dropdown}
                value={JSON.stringify(optionObject)}
              >
                Supplier: {associatedSupplier.company} | Item: {product.name} | Unit Price: {product.price}
              </option>
            );
          }
          return null; // Return null if no matching supplier is found
        })
      }
    </select>

                        </td>
                        <td>
                          <input type="number" min="0" max={parseInt(items.qty, 10)} id="numberInput" onChange={handleInputChange} />
                        </td>
                        <td>
                          <button className={styles.addbtn}
                            onClick={() => handleAddClick(selectedOption, numberValue, items._id, index1)}
                          >
                            ADD
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={5} id={index1} hidden>

                          <table id="new">
                            <tr>
                              <th>Supplier</th>
                              <th>Ordered Quantity</th>
                              <th>Total cost</th>
                            </tr>
                            {addedData.filter((val) => {
                              if (val.id.includes(items._id)) {
                                return val;
                              }

                            }).map((item, index) => (
                              <tr key={index}>
                                <td>{item.company}</td>
                                <td>{item.qty}</td>
                                <td>{item.itemprice*Number(item.qty)}</td>
                                <td><button onClick={() => onDelete(item.index,item.itemprice*Number(item.qty))} >delete</button></td>

                              </tr>
                            ))}

                          </table>



                        </td>

                      </tr>
                    </>
                  ))}

                  <tr colSpan="5" >
                    <td className={styles.placeordertr}> <button className={styles.sendorder}
                      onClick={() => handlesubmit(items.budget-budget,items._id)}
                    >Place order</button></td>
                    <td>
                      {items.budget-budget}
                    </td>
                  </tr>

                </table>

              </>
            ))}

          </table>

        </div>
      </div>
    </div>
  );
}

export default Order;
