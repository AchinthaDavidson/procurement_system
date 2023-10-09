import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';



const HomeScreen = ({ navigation }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Option 1'); // Initial selected option

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
    AsyncStorage.getItem('userData')
    .then(data => {
      if (data !== null) {
        const userData = JSON.parse(data);
        console.log(userData._id); // This will log the parsed object
      }
    })
    .catch(error => {
      console.error(error);
    });
  

  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Dashboard</Text>
        <TouchableOpacity onPress={toggleModal}>
          <Image
            source={require('../../assets/profile.png')} // Replace with the actual path to your image
            style={styles.image}
          />
        </TouchableOpacity>
      </View>
      <Modal
        visible={isModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer} >
          <View style={styles.modalContent}>
            <TouchableOpacity   onPress={toggleModal}> 
                <View style={styles.imageclose}>
                    <Image source={require('../../assets/close.png')} style={styles.close}/>
                </View>
            </TouchableOpacity>
         
            <Text style={styles.modalTitle}>Select an Option:</Text>
            <Button title="Logout" onPress={() => {navigation.navigate('Auth'); }}/>
          </View>
        </View>
      </Modal>
      <Image
          source={require('../../assets/background.jpg')} // Replace with the actual path to your image
          style={styles.image1}
        />
      <View style={styles.cardContainer}>
       {/* Card 1 - Purchase Requisition Form */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigateToScreen('PurchaseRequisition')}
      >
        <Text style={styles.cardTitle}>Invoice</Text>
      </TouchableOpacity>

      {/* Card 2 - Purchase Order Form */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigateToScreen('Product')}
      >
        <Text style={styles.cardTitle}>Product</Text>
      </TouchableOpacity>

     
      </View>
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom:30
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  image1: {
    width: '100%',
    height: '20%',
    // resizeMode: 'contain',
  },
  image: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  close: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    },
  imageclose:{
    alignItems: 'flex-end', // Horizontal alignment: 'center', 'flex-start', or 'flex-end'
    justifyContent: 'flex-end', // Vertical alignment: 'center', 'flex-start', or 'flex-end'
    },
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 20,
  },
  card: {
    width: '90%',

    aspectRatio: 2,
    backgroundColor: 'lightgray',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'flex-end',
    // paddingTop:"5%",
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '45%',
    backgroundColor: 'white',
    padding: 20,
    
    // borderRadius: 10,
    // alignItems: '',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default HomeScreen;
  