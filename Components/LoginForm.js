
import { Button, TextInput, View, StyleSheet } from 'react-native';
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '../firebase';
import React, { useState, useEffect } from "react";
import { useNavigation } from '@react-navigation/core';


const LoginForm = ({ email, setEmail, password, setPassword, onBack }) => {
  const navigation = useNavigation();

  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
         if (user) {
             navigation.replace("Home")
             navigation.setOptions({ // removes back arrow on next screen
                 headerLeft: null
             })
         }
     })
     return unsubscribe
 }, [])

 const handleLogin = () => {
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredentials) => {
      const user = userCredentials.user;
      navigation.replace("Home");
      console.log(user, '<-- logged in user');
  })
  .catch((error) => alert(error.message));
}



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
        <Button onPress={handleLogin} title="Submit" color="#FFCD29" />
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

export default LoginForm;