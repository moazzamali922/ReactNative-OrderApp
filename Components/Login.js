import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';

const Login = () => {
  const [token, setToken] = useState('');
  const [clientID, setClientID] = useState('');
  const [clientSecret, setClientSecret] = useState('');

  const handleLogin = async () => {
    const url = 'https://api.paypro.com.pk/v2/ppro/auth';
    const credentials = {
      clientid: clientID,
      clientsecret: clientSecret,
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const data = await response.json();
        const newToken = data.Token;
        setToken(newToken);
      } else {
        console.error('Login Error:', response.statusText);
      }
    } catch (error) {
      console.error('Network Error:', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TextInput
        placeholder="Client ID"
        value={clientID}
        onChangeText={setClientID}
        style={{ marginBottom: 10 }}
      />
      <TextInput
        placeholder="Client Secret"
        value={clientSecret}
        onChangeText={setClientSecret}
        style={{ marginBottom: 10 }}
      />
      <Button title="Login" onPress={handleLogin} />
      {token ? <Text>Token: {token}</Text> : null}
    </View>
  );
};

export default Login;
