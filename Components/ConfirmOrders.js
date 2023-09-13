import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity, 
} from 'react-native';

const ConfirmOrders = () => {
  const [data, setData] = useState([]);
  const [expandedOrderIndex, setExpandedOrderIndex] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const username = 'Intrawide';
    const startDate = '2023-08-22';
    const endDate = '2023-12-25';
    const url = `https://api.paypro.com.pk/v2/ppro/gpo?userName=${username}&startDate=${startDate}&endDate=${endDate}`;
    const method = 'GET';
    const headers = {
      'Content-Type': 'application/json',
      Token:
        'zmdIaQLQ7u1C03kSQOpmDvBO8ZynzmDiyUYZ6Eme+pD7fRwNA0NxQDw7K8xekpfKhOeLbl+SLxHMetpN5jSlg6N07fQzQR+wAP/8W7a2RBg=',
    };

    try {
      const response = await fetch(url, {
        method,
        headers,
      });

      const responseData = await response.json();
      const filteredData = responseData.filter(item => item.Status !== '00');
      setData(filteredData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const toggleOrderDetails = index => {
    if (expandedOrderIndex === index) {
      setExpandedOrderIndex(null);
    } else {
      setExpandedOrderIndex(index);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Confirmed Orders</Text>
      {data.map((item, index) => (
        <View key={index} style={styles.orderContainer}>
          <TouchableOpacity onPress={() => toggleOrderDetails(index)}>
            <Text style={styles.orderTitle}>Order {index + 1}</Text>
          </TouchableOpacity>
          {expandedOrderIndex === index && (
            <View style={styles.orderDetails}>
              {Object.entries(item).map(([key, value], index) => (
                <View key={index} style={styles.orderDetail}>
                  <Text style={styles.orderDetailKey}>{key}:</Text>
                  <Text style={styles.orderDetailValue}>{value}</Text>
                </View>
              ))}
            </View>
          )}
          {expandedOrderIndex === index && (
            <TouchableOpacity onPress={() => toggleOrderDetails(index)}>
              <Text style={styles.seeMoreText}>See Less</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F0F0F0',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color:"#000"
  },
  orderContainer: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
    backgroundColor: 'white',
    elevation: 2,
  },
  orderTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  orderDetails: {
    marginTop: 8,
  },
  orderDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  orderDetailKey: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#555555',
  },
  orderDetailValue: {
    fontSize: 14,
    color: '#333333',
  },
  seeMoreText: {
    color: '#007BFF',
    marginTop: 8,
  },
});

export default ConfirmOrders;
