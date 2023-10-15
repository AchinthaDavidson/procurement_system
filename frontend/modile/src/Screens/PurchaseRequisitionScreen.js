import React, { useState,useEffect } from 'react';
import { View, Text,ScrollView} from 'react-native';
import { Button, Input } from 'react-native-elements';
import SearchableDropdown from 'react-native-searchable-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
// import {PORT } from '@env';
// import { green100 } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

// const orderItems = [
//   {  name: 'Item 1' },
//   {  name: 'Item 2' },
//   { name: 'Item 3' },
//   // Add more items as needed
// ];



const PurchaseRequisitionScreen  = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [selectedItemText, setSelectedItemText] = useState('');
  const [itemarray, setitemArray] = useState([]);
  const [qtyarray, setqtyArray] = useState([]);
  const [site, setsite] = useState("");
  const [orderItems,setorderitems]=useState("")
  const PORT="http://192.168.8.114:8070/"

  function getuserdata(){
    AsyncStorage.getItem('siteData')
    .then(data => {
      if (data !== null) {
        const siteData = JSON.parse(data);
       setsite(siteData._id)
      }
    })
    .catch(error => {
      console.error(error);
    });
  
  }
  getuserdata()

  // console.log(PORT)
  useEffect(() => {
    // Define an async function
    async function fetchproduct() {
      try {
        const response = await axios.get(""+PORT+"product/");
        // setorderitems(response.data);

        const uniqueNames = new Set();

        // Use filter to remove duplicates based on "name" field
        const filteredData = response.data.filter((item) => {
          if (!uniqueNames.has(item.name)) {
            uniqueNames.add(item.name);
            return true; // Keep the first occurrence of each name
          }
          return false; // Skip duplicates
        });

        console.log(filteredData);
        setorderitems(filteredData)
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

   
    fetchproduct();
  }, [setorderitems]);


  const handleItemSelect = (item) => {
    setSelectedItem(item);
    setSelectedItemText(item.name); // Set the selected item's name in the text input field
  };

  const handleQuantityChange = (text) => {
    setQuantity(text);
  };

  const placeOrder = () => {
    if(!selectedItem || !quantity){
      console.log("error");
      alert("Add quantity and item both ")
    }
    else{
      setitemArray([...itemarray,selectedItemText ]);
      setqtyArray([...qtyarray,quantity])
      setQuantity("")
      setSelectedItemText("")
    }
   
  };
  async function addorder(item,qty){
    const data = {
        item: item,
        qty: qty,
        siteid:site,
        status:"pending"
      };
console.log(data)
      await axios.post(""+PORT+"order/add/", data)
      .then((response) => {
       
        alert('new item added ');
      
      })
      .catch((error) => {
        // console.error('An error occurred:', error);
        alert('An error occurred while authenticating. Please try again.');
      });

  }
  const submitorder = () => {
   
    {itemarray.map((item, index) => (
    addorder(item,qtyarray[index])
    ))}
    setitemArray([])
   
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Create an Order</Text>
      <SearchableDropdown
        onTextChange={(text) => console.log(text)}
        onItemSelect={handleItemSelect}
        containerStyle={{ padding: 5 }}
        textInputStyle={{ padding: 12, borderWidth: 1, borderColor: '#ccc', borderRadius: 5 }}
        itemStyle={{ padding: 10, marginTop: 2, backgroundColor: '#ddd', borderColor: '#bbb', borderWidth: 1, borderRadius: 5 }}
        itemTextStyle={{ color: '#222' }}
        itemsContainerStyle={{ maxHeight: 140 }}
        items={orderItems}
        defaultIndex={0}
        placeholder="Select an item"
        resetValue={false}
        underlineColorAndroid="transparent"
        textInputValue={selectedItemText} // Set the value of the text input to the selected item's name
      />
        <Input
        label="Item"
        value={selectedItemText}
        editable={false} 
       
      />
      <Input
        label="Quantity"
        placeholder="Enter quantity"
        keyboardType="numeric"
        value={quantity}
        onChangeText={handleQuantityChange}
      />
      <Button
        title="ADD"
        mode="contained"
        onPress={placeOrder}
        containerStyle={{ marginTop: 20 }}
      />
      <ScrollView>
        <View>
          {itemarray.map((item, index) => (
            <Text key={index}>{item}   : {qtyarray[index]}</Text>
          ))}
        </View>
      </ScrollView>

      <Button
        title="SUBMIT ORDER"
        onPress={submitorder}
        containerStyle={{ marginTop: 20 }}
      />
    </View>

    
  );
};

export default PurchaseRequisitionScreen ;
