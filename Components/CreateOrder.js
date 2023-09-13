import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const CreateOrder = () => {
  const [orderData, setOrderData] = useState({
    OrderNumber: '',
    OrderAmount: '',
    OrderDueDate: '',
    OrderType: '',
    IssueDate: '',
    OrderExpireAfterSeconds: '',
    CustomerName: '',
    CustomerMobile: '',
    CustomerEmail: '',
    CustomerAddress: '',
  });

  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [showPickerr, setShowPickerr] = useState(false);

  const onOrderDueDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(Platform.OS === 'ios');
    setDate(currentDate);

    const day = currentDate.getUTCDate();
    const month = currentDate.getUTCMonth() + 1;
    const year = currentDate.getUTCFullYear();

    const formattedDate = `${day < 10 ? '0' + day : day}/${
      month < 10 ? '0' + month : month
    }/${year}`;

    setOrderData(prevData => ({
      ...prevData,
      OrderDueDate: formattedDate,
    }));
  };

  const onIssueDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPickerr(Platform.OS === 'ios');
    setDate(currentDate);

    const day = currentDate.getUTCDate();
    const month = currentDate.getUTCMonth() + 1;
    const year = currentDate.getUTCFullYear();

    const formattedDate = `${day < 10 ? '0' + day : day}/${
      month < 10 ? '0' + month : month
    }/${year}`;

    setOrderData(prevData => ({
      ...prevData,
      IssueDate: formattedDate,
    }));
  };

  const showDatePicker = () => {
    setShowPicker(true);
  };
  const showDatePickerr = () => {
    setShowPickerr(true);
  };

  const handleInputChange = (fieldName, value) => {
    setOrderData(prevData => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleCreateOrder = () => {
    for (const key in orderData) {
      if (orderData.hasOwnProperty(key) && orderData[key] === '') {
        Alert.alert('Fill Complete Order', 'Please fill all required fields.');
        return;
      }
    }

    const apiUrl = 'https://api.paypro.com.pk/v2/ppro/cmo';
    const requestData = [
      {
        MerchantId: 'Intrawide',
      },
      {
        OrderNumber: orderData.OrderNumber,
        OrderAmount: orderData.OrderAmount,
        OrderDueDate: orderData.OrderDueDate,
        OrderType: orderData.OrderType,
        IssueDate: orderData.IssueDate,
        OrderExpireAfterSeconds: orderData.OrderExpireAfterSeconds,
        CustomerName: orderData.CustomerName,
        CustomerMobile: orderData.CustomerMobile,
        CustomerEmail: orderData.CustomerEmail,
        CustomerAddress: orderData.CustomerAddress,
      },
    ];

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Token:
          'zmdIaQLQ7u1C03kSQOpmDvBO8ZynzmDiyUYZ6Eme+pD7fRwNA0NxQDw7K8xekpfKhOeLbl+SLxHMetpN5jSlg6N07fQzQR+wAP/8W7a2RBg=',
      },
      body: JSON.stringify(requestData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('API Response:', data);
        if (data && data[0] && data[0].Status == '00') {
          Alert.alert('Order Created', 'Order Successfully Created');
        } else {
          Alert.alert(
            'Order Creation Failed,',
            'API Response :' + JSON.stringify(data),
          );
        }
        // Alert.alert('Order Created', 'API Response: ' + JSON.stringify(data));
        setOrderData({
          OrderNumber: '',
          OrderAmount: '',
          OrderDueDate: '',
          OrderType: '',
          IssueDate: '',
          OrderExpireAfterSeconds: '',
          CustomerName: '',
          CustomerMobile: '',
          CustomerEmail: '',
          CustomerAddress: '',
        });
      })
      .catch(error => {
        console.error('API Error:', error);
        Alert.alert('Error', 'An error occurred while creating the order.');
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <ScrollView>
        <SafeAreaView style={styles.container}>
          <View style={styles.inputRow}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="OrderNumber"
                placeholderTextColor="#121212"
                autoCorrect={false}
                keyboardType="phone-pad"
                autoCapitalize="none"
                value={orderData.OrderNumber}
                onChangeText={text => handleInputChange('OrderNumber', text)}
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="OrderAmount"
                keyboardType="phone-pad"
                placeholderTextColor="#121212"
                autoCorrect={false}
                autoCapitalize="none"
                value={orderData.OrderAmount}
                onChangeText={text => handleInputChange('OrderAmount', text)}
              />
            </View>
          </View>
          <View style={styles.inputRow}>
            <TouchableOpacity
              onPress={showDatePicker}
              style={{
                flex: 1,
                marginRight: 10,
                borderWidth: 3,
                borderColor: '#ccc',
                borderRadius: 5,
                color: '#000',
              }}>
              <Text style={{color: 'black', padding: 10}}>
                DueDate: {orderData.OrderDueDate}
              </Text>
            </TouchableOpacity>
            {showPicker && (
              <DateTimePicker
                value={date}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={onOrderDueDateChange}
              />
            )}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="OrderType"
                placeholderTextColor="#121212"
                autoCorrect={false}
                value={orderData.OrderType}
                onChangeText={text => handleInputChange('OrderType', text)}
              />
            </View>
          </View>
          <View style={styles.inputRow}>
            <TouchableOpacity
              onPress={showDatePickerr}
              style={{
                flex: 1,
                marginRight: 10,
                borderWidth: 3,
                borderColor: '#ccc',
                borderRadius: 5,
                color: '#000',
              }}>
              <Text style={{color: 'black', padding: 10}}>
                IssueDate: {orderData.IssueDate}
              </Text>
            </TouchableOpacity>
            {showPickerr && (
              <DateTimePicker
                value={date}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={onIssueDateChange}
              />
            )}
            {/* <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="IssueDate mm-dd- yyyy"
                keyboardType="phone-pad"
                placeholderTextColor="#121212"
                autoCorrect={false}
                value={orderData.IssueDate}
                onChangeText={text => handleInputChange('IssueDate', text)}
              />
            </View> */}

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="OrderExpire"
                placeholderTextColor="#121212"
                autoCorrect={false}
                value={orderData.OrderExpireAfterSeconds}
                onChangeText={text =>
                  handleInputChange('OrderExpireAfterSeconds', text)
                }
              />
            </View>
          </View>
          <View style={styles.inputRow}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="CustomerName"
                autoCorrect={false}
                placeholderTextColor="#121212"
                value={orderData.CustomerName}
                onChangeText={text => handleInputChange('CustomerName', text)}
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="CustomerMobile"
                keyboardType="phone-pad"
                autoCapitalize="none"
                placeholderTextColor="#121212"
                autoCorrect={false}
                value={orderData.CustomerMobile}
                onChangeText={text => handleInputChange('CustomerMobile', text)}
              />
            </View>
          </View>
          <View style={styles.inputRow}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="CustomerEmail"
                autoCorrect={false}
                keyboardType="email-address"
                placeholderTextColor="#121212"
                value={orderData.CustomerEmail}
                onChangeText={text => handleInputChange('CustomerEmail', text)}
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="CustomerAddress"
                placeholderTextColor="#121212"
                autoCorrect={false}
                value={orderData.CustomerAddress}
                onChangeText={text =>
                  handleInputChange('CustomerAddress', text)
                }
              />
            </View>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={handleCreateOrder}
            activeOpacity={0.8}>
            <Text style={styles.buttonText}>Create Order</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  inputContainer: {
    flex: 1,
    marginRight: 10,
  },
  input: {
    borderWidth: 3,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    color: '#000',
  },
  button: {
    backgroundColor: '#5837e9',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CreateOrder;
