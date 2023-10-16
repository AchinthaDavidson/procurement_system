import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet,ScrollView } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import {PORT } from '@env';


const OrderScreen = () => {
 
  const [data, setdata1] = useState([]);
  const [site, setsite] = useState("");
  const PORT="http://192.168.1.11:8070/"
  // const data = [
  //   { date: '2023-10-14', item: 'Sample Item 1', qty: 10, status: 'Shipped' },
  //   { date: '2023-10-15', item: 'Sample Item 2', qty: 5, status: 'Pending' },
  //   // Add more data objects as needed
  // ];

  function getuserdata(){
    AsyncStorage.getItem('siteData')
    .then(data => {
      if (data !== null) {
        const siteData = JSON.parse(data);
       setsite(siteData._id)
       console.log(site)

      }
    })
    .catch(error => {
      console.error(error);
    });
  
  }
  getuserdata()

 
    // Define an async function
    async function fetchSiteManager() {
      try {
        const response = await axios.get(""+PORT+"order/display/"+site);
        setdata1(response.data);
      console.log("hi"+response.data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

   
    useEffect(() => {
      fetchSiteManager();
    },[getuserdata]);
  // }, []);


  return (
    <ScrollView>
    <View style={styles.table}>
      <View style={styles.tableHeader}>
        <Text style={styles.headerCell}>Date</Text>
        <Text style={styles.headerCell}>Item</Text>
        <Text style={styles.headerCell}>Qty</Text>
        <Text style={styles.headerCell}>Status</Text>
      </View>
      {data.map((row, index) => (
        <View style={styles.tableRow} key={index}>
          <Text style={styles.cell}>{row.date}</Text>
          <Text style={styles.cell}>{row.item}</Text>
          <Text style={styles.cell}>{row.qty}</Text>
          <Text style={styles.cell}>{row.status}</Text>
        </View>
      ))}
    </View>
    </ScrollView>
    
  );
};

const styles = StyleSheet.create({
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



export default OrderScreen;
