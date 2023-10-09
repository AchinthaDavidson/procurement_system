import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal, TouchableOpacity, FlatList } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {PORT } from '@env';


const OrderScreen = () => {
 
  const [quantity, setQuantity] = useState('');
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = data.filter((item) =>
      item.label.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        onSelect(item.value);
        setSearchText(item.label);
        setFilteredData(data);
      }}
    >
      <Text>{item.label}</Text>
    </TouchableOpacity>
  );

  const handleOrderSubmit = () => {
    // Handle the order submission here, including selectedItem and quantity
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Purchase Requisition Form</Text>
      <Text style={styles.label}>Select an item:</Text>
      <View>
      <TextInput
        placeholder="Select an item"
        value={selectedItem ? selectedItem.name : ''}
        onFocus={() => setModalVisible(true)}
      />
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View>
          <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleDropdownSelect(item)}
              >
                <Text>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
          >
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
      



      <Text style={styles.label}>Quantity:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter quantity"
        keyboardType="numeric"
        value={quantity}
        onChangeText={(text) => setQuantity(text)}
      />

      <Button
        title="Submit Order"
        onPress={handleOrderSubmit}
        style={styles.button}
      />
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
  form: {
    flex: 1,
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

export default OrderScreen;
