import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import the navigation hook
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {PORT } from '@env';

const AuthScreen = () => {
  const navigation = useNavigation(); // Access the navigation prop
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const toggleAuthType = () => {
    setIsLogin(!isLogin);
  };

  async function login(data) {
    
      
      await axios.post(""+PORT+"supplier/login", data)
      .then((response) => {
        navigation.navigate('SupplierHome');
      //  console.log(response.data.message)
       AsyncStorage.setItem('userData', JSON.stringify(response.data.message));
      })
      .catch(() => {
         axios.post(""+PORT+"sitemanager/login", data)
        .then((response) => {
          navigation.navigate('SiteHome');
        //  console.log(response.data.message)
         AsyncStorage.setItem('userData', JSON.stringify(response.data.message));
        })
        .catch((error) => {
          // console.error('An error occurred:', error);
          
          alert('An error occurred while authenticating. Please try again.');
        });
      });
      
   
  }

   const  handleLogin = () => {
  
    const data = {
      email: email,
      password: password,
    };
   
    if(isLogin){
      login(data)
    }
    
    

  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isLogin ? 'Login' : 'Change password'}</Text>
      {isLogin? 
      <>
      <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={text => setEmail(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            onChangeText={text => setPassword(text)}
          />
          </>
            : <TextInput
            style={styles.input}
            placeholder="Email"
            secureTextEntry
            onChangeText={text => setConfirmPassword(text)}
          />}
     
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>{isLogin ? 'Login' : 'Next'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={toggleAuthType}>
        <Text style={styles.toggleText}>
          {isLogin
            ? "Forgot password"
            : 'Back'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: 'blue',
    width: '80%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  toggleText: {
    marginTop: 20,
    color: 'blue',
  },
});

export default AuthScreen;
