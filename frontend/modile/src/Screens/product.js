import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, StyleSheet,ScrollView } from 'react-native';
import { Card, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
// import {PORT } from '@env';

const Product = () => {
  const [itemName, setItemName] = useState('');
  const [qty, setqty] = useState('');
  const [userId,setId]=useState("");  
  const [data, setdata] = useState([]);
  const PORT="http://192.168.1.11:8070/"

  async function getuserdata(){
   await AsyncStorage.getItem('userData')
    .then(data => {
      if (data !== null) {
        const userData = JSON.parse(data);
       setId(userData._id)
      //  console.log(userData)
      }
    })
    .catch(error => {
      console.error(error);
    });

  }
  getuserdata()
  async function addproduct(){
    // getuserdata()
    const data = {
        pname: itemName,
        qty: qty,
        supplier_id:userId
      };

      await axios.post(""+PORT+"product/add", data)
      .then((response) => {
       
        alert('new item added ');
      
      })
      .catch((error) => {
        console.error('An error occurred:', error);
        alert('An error occurred while authenticating. Please try again.');
      });

  }
  const handleSubmit = () => {
    // getuserdata()
    addproduct()
    setItemName("")
    setqty("")
    
  };

  const handledelete = function(id) {
    // Use the 'id' in your function
    console.log(`Button with id ${id} was pressed`);
    axios
    .delete(""+PORT+`product/delete/${id}`)
    .then(() => {
    alert("Item delete successfully");
    })
    .catch((err) => {
      alert("Item |Deleta unsuccessfully");
    });
  }


  async function fetchSiteManager() {
    try {
      const response = await axios.get(""+PORT+"product/get/"+userId);
      setdata(response.data);
    // console.log("hi"+response.data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

 
  useEffect(() => {
    fetchSiteManager();
  },[getuserdata]);

  return (
 
    <View style={styles.container}>
      <Text style={styles.title}>Add new Product</Text>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.label}>Item Name:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter item name"
            value={itemName}
            onChangeText={(text) => setItemName(text)}
          />

          <Text style={styles.label}>Unit Price:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Qty"
            keyboardType="numeric"
            value={qty}
            onChangeText={(text) => setqty(text)}
          />
        </Card.Content>
        <Card.Actions>
          <Button mode="contained" onPress={handleSubmit}>
            ADD
          </Button>
        </Card.Actions>
      </Card>
      <ScrollView>
    <View style={styles.table}>
      <View style={styles.tableHeader}>
        <Text style={styles.headerCell}>Item</Text>
        <Text style={styles.headerCell}>price</Text>
        <Text style={styles.headerCell}></Text>
      </View>
      {data.map((row, index) => (
        <View style={styles.tableRow} key={index}>
          <Text style={styles.cell}>{row.name}</Text>
          <Text style={styles.cell}>{row.price}</Text>
          <Button  onPress={handledelete.bind(this, row._id)}>
           DELETE
          </Button>
         
        </View>
      ))}
    </View>
    </ScrollView>
    </View>

  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    card: {
      marginVertical: 10,
    },
    label: {
      fontSize: 18,
      marginBottom: 5,
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 15,
      paddingLeft: 10,
    },
    table: {
      borderWidth: 1,
      borderColor: '#000',
      margin: 10,
      flexDirection: 'column',
    },
    tableHeader: {
      flexDirection: 'row',
      backgroundColor: '#333',
      justifyContent: 'space-between',
    },
    tableRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    headerCell: {
      flex: 1,
      color: '#fff',
      padding: 10,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    cell: {
      flex: 1,
      padding: 10,
      textAlign: 'center',
    },
  });

export default Product;
