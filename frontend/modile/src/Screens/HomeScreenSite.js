import React, { useEffect,useState } from 'react';
import { View, Text, Button, Image, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Picker} from "@react-native-picker/picker"
// import {PORT } from '@env';

const HomeScreen = ({ navigation }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState([]);
  const [site, setsite] = useState([]);
  const [userId,setId]=useState("");  
  const PORT="http://172.28.30.199:8070/"
  
  function getuserdata(){
    AsyncStorage.getItem('userData')
    .then(data => {
      if (data !== null) {
        const userData = JSON.parse(data);
       setId(userData._id)
       console.log(userId)
      }
    }) 
    .catch(error => {
      console.error(error);
    });

  }
  getuserdata()

  // useEffect(() => {
  //         function getsitemanager() {
  //           axios.get(""+PORT+"site/"+userId).then((res) => {
            
  //             setsite(res.data);
  //             console.log(orders[1])
  //           });
  //         }
  //         getsitemanager();
  //       }, []);

        useEffect(() => {
          // Define an async function
          async function fetchSiteManager() {
            try {
              const response = await axios.get(`${PORT}site/${userId}`);
              setsite(response.data);
              console.log(site[1]);

            } catch (error) {
              // console.error('Error fetching data:', error);
            }
          }
      
          // Call the async function inside useEffect
          fetchSiteManager();
        }, [setsite]);

  const navigateToScreen = (screenName) => {
    if(selectedItem){
      AsyncStorage.setItem('siteData', JSON.stringify(selectedItem));
      navigation.navigate(screenName);
    }
    else{
      alert("select Site First");
    }
    
    
    console.log(selectedItem)
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>D a s h b o a r d</Text>

        {/* <Text style={styles.name}>{"\n"}SITE MANAGER</Text> */}
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

<View>
      <Text style={styles.labelText} >Select Site</Text>
      <Picker
      style={styles.picker}
        selectedValue={selectedItem}
        onValueChange={(itemValue, itemIndex) => setSelectedItem(itemValue)}
      >
        {site.map(item => (
          <Picker.Item key={item._id} label={item.name} value={item} />
        ))}
      </Picker>
      
    </View>

      <View style={styles.cardContainer}>
       {/* Card 1 - Purchase Requisition Form */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigateToScreen('PurchaseRequisition')}
      >
        <Text style={styles.cardTitle}>Purchase Requisition Form</Text>
        <Image source={require('../../assets/formicon.png')} style={styles.btnform}/>
      </TouchableOpacity>

      {/* Card 2 - Purchase Order Form */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigateToScreen('Order')}
      >
        <Text style={styles.cardTitle}>Order</Text>
        <Image source={require('../../assets/ordericon.png')} style={styles.btnform}/>
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
    fontWeight: 'bold',
    marginLeft: '30%',
    color: "yellow",
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
    backgroundColor: '#c266ff'

  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white'

  },
  btnform: {
    width: '15%',
    height: '35%',
    marginTop: '5%'
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
    backgroundColor: '#4c0080',
    padding: 20,
    
    // borderRadius: 10,
    // alignItems: '',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  labelText: {
    textAlign:'center',
    fontSize: 20,
    marginBottom: 10,
    color: "white",
    marginTop: '10%'
  },
  picker: {
    alignSelf:'center',
    height: 50,
    width: 200,
    backgroundColor: '#eee',
    borderRadius:10,
  },
});

export default HomeScreen;
