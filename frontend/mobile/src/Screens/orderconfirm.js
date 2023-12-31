import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const data = [
  { id: '1', itemName: 'Item 1', location: 'Location 1', qty: 5 },
  { id: '2', itemName: 'Item 2', location: 'Location 2', qty: 10 },
  { id: '3', itemName: 'Item 3', location: 'Location 3', qty: 2 },
];

const Card = ({ item, onAccept, onReject }) => {
  return (
    <View style={styles.card}>
      <Text>{item.item}</Text>
      <Text>Location: 189/A katugastots Kandy</Text>
      <Text>Quantity: {item.qty}</Text>
      <View style={styles.buttonContainer}>
      
        <Button title="Reject" onPress={() => onReject(item._id)} color="red" />
        <Button title="Accept" onPress={() => onAccept(item._id)} color="green" />
      </View>
    </View>
  );
};
const MyFlatList = () => {

<<<<<<< HEAD:frontend/modile/src/Screens/orderconfirm.js
  const PORT="http://192.168.1.11:8070/"
=======
  const PORT="http://172.28.29.207:8070/"
>>>>>>> 9019ddb15d68781f7be18fa66a0047e71ae51004:frontend/mobile/src/Screens/orderconfirm.js
  const [site, setsite] = useState("");
  const [data, setdata1] = useState([]);

  function getuserdata(){
    AsyncStorage.getItem('supplier')
    .then(data => {
      if (data !== null) {
        const siteData = JSON.parse(data);
       setsite(siteData._id)
      //  console.log(site)
      //  console.log(siteData)

      }
    })
    .catch(error => {
      console.error(error);
    });
  
  }
  getuserdata()

 
  async function fetchSiteManager() {
    try {
      const response = await axios.get(""+PORT+"order/accepted/"+site);
      setdata1(response.data);
    // console.log(data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

 
  useEffect(() => {
    fetchSiteManager();
  },[getuserdata]);



  const handleAccept = (itemId) => {
    // Handle accept action for the given item ID
    console.log(`Accepted item with ID: ${itemId}`);
    axios.put(""+PORT+`order/deliver/${itemId}`)
      .then((response) => {
       
        alert('new item added ');
      
      })
      .catch((error) => {
        console.error('An error occurred:', error);
        alert('An error occurred while authenticating. Please try again.');
      });
    
  };

  const handleReject = (itemId) => {
    // Handle reject action for the given item ID
    console.log(`Rejected item with ID: ${itemId}`);
    axios.put(""+PORT+`order/bad/${itemId}`)
      .then((response) => {
       
        alert('new item added ');
      
      })
      .catch((error) => {
        console.error('An error occurred:', error);
        alert('An error occurred while authenticating. Please try again.');
      });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Card item={item} onAccept={handleAccept} onReject={handleReject} />
        )}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});
export default MyFlatList;
