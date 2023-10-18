import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthScreen from './src/Screens/AuthScreen'; // Import your login/register screen component
import HomeScreenSite from './src/Screens/HomeScreenSite'; // Import your home screen component
import HomeScreenSupplier from './src/Screens/HomeScreenSupplierr';
import PurchaseRequisitionScreen from './src/Screens/PurchaseRequisitionScreen'; // Import your Purchase Requisition Form screen component
import OrderScreen from './src/Screens/OrderScreen'; // Import your Purchase Order Form screen component
import Product from './src/Screens/product';
import Invoice from './src/Screens/invoice'
import Orderconfirm from "./src/Screens/orderconfirm"
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Auth">
        <Stack.Screen name="Auth" component={AuthScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SiteHome" component={HomeScreenSite} options={{ headerShown: false }}/>
        <Stack.Screen name="SupplierHome" component={HomeScreenSupplier} options={{ headerShown: false }}/>
        <Stack.Screen name="PurchaseRequisition" component={PurchaseRequisitionScreen} />
        <Stack.Screen name="Order" component={OrderScreen} />
        <Stack.Screen name="Product" component={Product} />
        <Stack.Screen name="Invoice" component={Invoice} />
        <Stack.Screen name="Orderconfirm" component={Orderconfirm} />


       
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
