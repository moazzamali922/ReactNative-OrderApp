import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ImageBackground,
  Keyboard
} from 'react-native';
import {useNavigation} from '@react-navigation/native'; 
import auth from '@react-native-firebase/auth';
import {TextInput} from 'react-native-paper';

const SignIn = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [isEmailFocused, setEmailFocused] = useState(false);
  const [isPasswordFocused, setPasswordFocused] = useState(false);

  const userSignIn = () => {
     if(email.trim()===''||Password.trim()===''){
      Alert.alert('Field Required','Please Fill Input Field')
      return;
     }
    auth()
      .signInWithEmailAndPassword(email, Password)
      .then(() => {
        setEmail('');
        setPassword('');
        navigation.navigate('Order');
      })
      .catch(error => {
        if (
          error.code === 'auth/user-not-found' ||
          error.code === 'auth/wrong-password'
        ) 
        {
          Alert.alert(
            'Invalid Credentials',
            'Wrong email or Password . Please try again.',
          );
        } {
          console.log(error);
        }
      });
  };

  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={{ flex: 1,}}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <SafeAreaView style={styles.container}>
      {/* <ScrollView contentContainerStyle={styles.scrollContainer}> */}
        <ImageBackground
          source={require('../assets/bg.png')}
          style={styles.imageBackground}>
          <View style={styles.contentContainer}>
            <View style={styles.createAccount}>
              <Text style={styles.textCreate}>Login</Text>
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                label="EMAIL"
                style={[styles.input, isEmailFocused && styles.focusedInput]}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                left={<TextInput.Icon icon="email" />}
                value={email}
                onChangeText={text => setEmail(text)}
                keyboardType="email-address"
                secureTextEntry={true}
                autoCorrect={false}
              />

              <TextInput
                label="PASSWORD"
                style={[styles.input, isPasswordFocused && styles.focusedInput]}
                secureTextEntry={secureTextEntry}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                value={Password}
                autoCorrect={false}
                onChangeText={text => setPassword(text)}
                left={<TextInput.Icon icon="lock"  />}
                right={
                  <TextInput.Icon
                    icon={secureTextEntry ? 'eye-off' : 'eye'}
                    onPress={() => {
                      setSecureTextEntry(!secureTextEntry);
                    }}
                  />
                }
              />
            </View>

            <TouchableOpacity style={styles.signUpButton} onPress={userSignIn}>
              <Text style={styles.buttonText}>Sign In</Text>
              <Image
                source={require('../assets/right.png')}
                style={styles.buttonIcon}
              />
            </TouchableOpacity>
            <View style={styles.footerContainer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.signInText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
          </View>
          
        </ImageBackground>
      {/* </ScrollView> */}
    </SafeAreaView>
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // scrollContainer: {
  //   flexGrow: 1,
  // },
  imageBackground: {
    flex: 1,
  },

  backButton: {
    width: 30,
    height: 20,
    margin: 20,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingTop: Platform.OS === 'ios' ? 0 : 20,
  },
  createAccount: {
    marginBottom: 20,
  },
  textCreate: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#000',
  },
  inputContainer: {
    marginVertical:20,
  },
  input: {
    marginVertical: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    color:"#000"
  },
  signUpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    width: '45%',
    borderRadius: 30,
    backgroundColor: '#5837e9',
    marginLeft: 'auto',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  buttonIcon: {
    width: 20,
    height: 20,
    tintColor: '#fff',
    marginLeft: 5,
    marginTop: 6,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 18,
    textAlign: 'center',
    color:"#000"
  },
  signInText: {
    fontSize: 18,
    color: '#5837e9',
    textDecorationLine: 'underline',
  },
  focusedInput: {
    borderColor: '#fff',
    borderWidth: 2,
  },
});

export default SignIn;
