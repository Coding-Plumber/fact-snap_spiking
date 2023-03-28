import React from 'react';
import { Button, TextInput, View, StyleSheet } from 'react-native';
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '../firebase';
import { useNavigation } from '@react-navigation/core';


const SignUpForm = ({ email, setEmail, password, setPassword, onBack }) => {
  const navigation = useNavigation();


  const handleSignup = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        navigation.replace("Home");
        console.log(user, "<--- user");
      })
      .catch((error) => alert(error.message));
  };



  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={"white"}
        value={email}
        onChangeText={(text) => setEmail(text)}
        color="white"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={(text) => setPassword(text)}
        placeholder="Password"
        placeholderTextColor={"white"}
        color="white"
        secureTextEntry
      />
      <View style={styles.loginButtonsContainer}>
        <Button title="<- Back" color="#FFCD29" onPress={onBack} />
        <Button title="Submit" color="#FFCD29" onPress={handleSignup}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    inputContainer: {
      position: "absolute",
      top: 260,
      left: 0,
      right: 0,
      alignItems: "center",
      borderRadius: 15,
    },
    input: {
      borderWidth: 1,
      borderColor: "#777",
      padding: 8,
      margin: 10,
      width: 250,
    },
    loginButtonsContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: 200,
      marginTop: 20,
    },
  });
  
  export default SignUpForm;





