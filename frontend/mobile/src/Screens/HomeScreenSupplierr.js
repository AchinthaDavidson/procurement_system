import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';



const HomeScreen = ({ navigation }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Option 1'); // Initial selected option
<<<<<<< HEAD:frontend/modile/src/Screens/HomeScreenSupplierr.js
  const PORT="http://192.168.1.11:8070/"
=======
  const PORT="http://172.28.29.207:8070/"
>>>>>>> 9019ddb15d68781f7be18fa66a0047e71ae51004:frontend/mobile/src/Screens/HomeScreenSupplierr.js
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
        <Text style={styles.title}>D a s h b o a r d</Text>
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
        onPress={() => navigateToScreen('Invoice')}
      >
        <Text style={styles.cardTitle}>Invoice</Text>
        <Image
        source={require('../../assets/invoice.png')} // Replace with the actual path to your image
          style={styles.imageinv}
        />

      </TouchableOpacity>

      {/* Card 2 - Purchase Order Form */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigateToScreen('Product')}
      >
        <Text style={styles.cardTitle}>Product</Text>
        <Image
        source={require('../../assets/product.png')} // Replace with the actual path to your image
          style={styles.imageinv}
        />
      </TouchableOpacity>

      {/* Card 3 - Confirm Orders */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigateToScreen('Orderconfirm')}
      >
        <Text style={styles.cardTitle}>Confirm Orders</Text>
        <Image
        source={require('../../assets/confirm.png')} // Replace with the actual path to your image
          style={styles.imageinv}
        />
      </TouchableOpacity>

     
      </View>
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4c0080',
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
    fontWeight: '800',
    color: "yellow",
    marginLeft: '25%'
  },
  image1: {
    width: '100%',
    height: '20%',
    // resizeMode: 'contain',
  },
  imageinv: {
    width: '15%',
    height: '30%',
    marginTop: '5%'
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
    marginTop: '10%',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 20,
  },
  card: {
    width: '80%',
    height: '50%',
    aspectRatio: 2,
    backgroundColor: 'lightgray',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: '#c266ff'
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
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
  