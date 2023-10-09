import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Card, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {PORT } from '@env';

const Product = () => {
  const [itemName, setItemName] = useState('');
  const [qty, setqty] = useState('');
  const [userId,setId]=useState("");  

  function getuserdata(){
    AsyncStorage.getItem('userData')
    .then(data => {
      if (data !== null) {
        const userData = JSON.parse(data);
       setId(userData._id)
      }
    })
    .catch(error => {
      console.error(error);
    });

  }

  async function addproduct(){
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
        // console.error('An error occurred:', error);
        alert('An error occurred while authenticating. Please try again.');
      });

  }
  const handleSubmit = () => {
    getuserdata()
    addproduct()
    setItemName("")
    setqty("")
    
  };

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

          <Text style={styles.label}>Qty:</Text>
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
  });

export default Product;
