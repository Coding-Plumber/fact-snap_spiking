import { useNavigation } from "@react-navigation/core";
import {
  Button,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Camera } from "expo-camera";
import React, { useState, useEffect } from "react";
import LoginForm from "../Components/LoginForm";
import SignUpForm from "../Components/SignUpForm";
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '../firebase';

const LoginScreen = () => {
  const [cameraPermission, setCameraPermission] = useState(false);
  const [login, setLogin] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();





  useEffect(() => {
    const getCameraPermissionAsync = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status === "granted") {
        setCameraPermission(true);
      }
      if (status !== "granted") {
        alert("Sorry, we need camera permissions to make this work!");
      }
    };
    getCameraPermissionAsync();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {cameraPermission ? (
        <View style={{ flex: 1 }}>
          <Camera
            style={{ flex: 1 }}
            type={Camera.Constants.Type.back} // or Camera.Constants
            autoFocus={Camera.Constants.AutoFocus.on}
            focusDepth={0}
            zoom={0}
          />
          <Text style={styles.logo}>FactSnap</Text>

          {!login && !signUp && (
            <View style={styles.buttonContainer}>
              <View style={styles.buttonWrapper}>
                <Button
                  title="Login"
                  onPress={() => setLogin(true)}
                  color="#FFCD29"

                />
              </View>
              <View style={styles.buttonWrapper}>
                <Button
                  title="Sign Up"
                  onPress={() => setSignUp(true)}
                  color="#FFCD29"
                />
              </View>
            </View>
          )}

          {login && (
            <LoginForm
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              onBack={() => setLogin(false)}
            />
          )}

          {signUp && (
            <SignUpForm
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              onBack={() => setSignUp(false)}
            />
          )}
        </View>
      ) : (
        <View style={styles.container}>
          <Text>Enable Camera Permission to proceed</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    position: "absolute",
    top: 100,
    left: 0,
    right: 0,
    color: "#FFCD29",
    fontSize: 50,
    textAlign: "center",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  buttonWrapper: {
    width: "40%",
    borderRadius: 20,
  },
});

export default LoginScreen;
