import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import CreateOrder from './CreateOrder';
import ConfirmOrders from './ConfirmOrders';
import auth from '@react-native-firebase/auth';


const Order = () => {
  const navigation = useNavigation();
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.toLocaleString('default', {month: 'short'});
  const [activeComponent, setActiveComponent] = useState('ConfirmOrders');

  const handleLogout = async () => {
    try {
      await auth().signOut();
      navigation.navigate('SignIn');
    } catch (error) {
      console.error('Logout Error:', error);
    }
  };

  return (
    <ScrollView>
      <SafeAreaView style={styles.maincontainer}>
        <View style={{backgroundColor: '#5837e9', width: '100%', height: 220}}>
          <View style={styles.container}>
            <View style={styles.leftside}>
              <TouchableOpacity onPress={handleLogout}>
                <Image
                  style={styles.ImageHeader}
                  source={require('../assets/logoutbutton.png')}
                />
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 24,
                  color: '#fff',
                  marginHorizontal: 20,
                  fontWeight: 'bold',
                }}>
                Order App
              </Text>
            </View>
            <Image
              style={styles.ImageHeader1}
              source={require('../assets/mountain.png')}
            />
          </View>
          <Text
            style={{
              paddingHorizontal: 35,
              marginTop: 30,
              color: '#fff',
              fontSize: 18,
            }}>
            Today {day} {month}
          </Text>
          <View
            style={{
              marginVertical: 10,
              paddingHorizontal: 35,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text style={{color: '#fff', fontSize: 25}}>$120K</Text>
              <Text style={{marginVertical: 3, color: '#5dc55f', fontSize: 15}}>
                ConfirmOrders
              </Text>
            </View>

            <View
              style={{
                borderLeftWidth: 1,
                borderLeftColor: '#5dc55f',
                height: '100%',
                alignSelf: 'center',
              }}
            />

            <View>
              <Text style={{color: '#fff', fontSize: 25}}>$125</Text>
              <Text style={{marginVertical: 3, color: '#5dc55f', fontSize: 15}}>
                Uncomplete
              </Text>
            </View>

            <View
              style={{
                borderLeftWidth: 1,
                borderLeftColor: '#5dc55f',
                height: '100%',
                alignSelf: 'center',
              }}
            />

            <View>
              <Text style={{color: '#fff', fontSize: 25}}>$145</Text>
              <Text style={{marginVertical: 3, color: '#5dc55f', fontSize: 15}}>
                Order
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            height: 50,
            width: '100%',
            backgroundColor: '#5237e9',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}>
          <TouchableOpacity
            style={{paddingVertical: 10}}
            onPress={() => setActiveComponent('ConfirmOrders')}>
            <Text
              style={[
                styles.buttonText,
                activeComponent === 'CreateOrders' && styles.activeButtonText,
              ]}>
              ConfirmOrder
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{paddingVertical: 10}}
            onPress={() => setActiveComponent('CreateOrder')}>
            <Text
              style={[
                styles.buttonText,
                activeComponent === 'ConfirmOrders' && styles.activeButtonText,
              ]}>
              CreateOrder +
            </Text>
          </TouchableOpacity>
        </View>

        {/* Conditionally render components */}
         <ScrollView>
        {activeComponent === 'ConfirmOrders' ? (
          <ConfirmOrders />
        ) : (
          <CreateOrder />
        )}
        </ScrollView>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Order;

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  leftside: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ImageHeader: {
    width: 35,
    height: 35,
    tintColor: '#fff',
  },
  ImageHeader1: {
    width: 45,
    height: 45,
    tintColor: '#fff',
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    textDecorationLine: 'underline',
    textDecorationColor: '#fff',
  },
  activeButtonText: {
    color: '#fff',
    fontSize: 15,
    textDecorationLine: 'none',
  },
});
