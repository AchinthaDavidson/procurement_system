import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, StyleSheet,ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const invoice = () => {
    const [userId,setId]=useState(""); 
    const [data, setdata] = useState([]);
    const PORT="http://172.28.10.131:8070/"

    async function getuserdata(){
        await AsyncStorage.getItem('userData')
         .then(data => {
           if (data !== null) {
             const userData = JSON.parse(data);
            setId(userData._id)
            // console.log(userData)
           }
         })
         .catch(error => {
           console.error(error);
         });
     
       }
       getuserdata()
       async function fetchSiteManager() {
        try {
          const response = await axios.get(""+PORT+"order/processing/"+userId);
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
    <ScrollView>
    <View style={styles.table}>
      <View style={styles.tableHeader}>
        <Text style={styles.headerCell}>Item</Text>
        <Text style={styles.headerCell}>Qty</Text>
        <Text style={styles.headerCell}>Price</Text>
      </View>
      {data.map((row, index) => (
        <View style={styles.tableRow} key={index}>
          <Text style={styles.cell}>{row.item}</Text>
          <Text style={styles.cell}>{row.qty}</Text>
         
         
        </View>
      ))}
    </View>
    </ScrollView>
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


export default invoice;
