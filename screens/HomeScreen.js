import React, { useState } from "react";
import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import { Camera } from "expo-camera";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
} from "react-native";

import { GOOGLE_API_KEY } from '../environment';
// import storage from '@react-native-firebase/storage';



const HomeScreen = () => {


  const [cameraRef, setCameraRef] = useState(null);

  const [photoUri, setPhotoUri] = useState(null); // holds photo id

  const takePicture = async () => {
    if (cameraRef) {
      const { uri } = await cameraRef.takePictureAsync(); // takes the photo
      setPhotoUri(uri);
      console.log(uri); // do something with the picture URI
      
      // convert image to Base64
      const imageBase64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
  
      // send image to Google Cloud Vision API
      getVisionApiResponse(imageBase64)
        .then((data) => {
          console.log('API response:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  };
  

  // Google Api request --- Working
  // async function getVisionApiResponse(imageBase64) {
    
  //   const url = `https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_API_KEY}`;
  //   const requestBody = {
  //     requests: [
  //       {
  //         image: {
  //           content: imageBase64,
  //         },
  //         features: [
  //           {
  //             type: "LANDMARK_DETECTION",
  //             maxResults: 1
  //           }
  //         ]
  //       }
  //     ]
  //   };


    
  //   const response = await axios.post(url, requestBody);
  //   console.log(response, 'response.data after googleCloud api access');
  //   return response.data;
  // }
  
  

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Camera
          style={{ flex: 1 }}
          type={Camera.Constants.Type.back}
          autoFocus={Camera.Constants.AutoFocus.on}
          focusDepth={0}
          zoom={0}
          ref={(ref) => setCameraRef(ref)}
        />
        {photoUri && (
          <View style={styles.imageContainer}>
            <Image source={{ uri: photoUri }} style={styles.imagePreview} />
          </View>
        )}
      </View>
      <Text style={styles.logo}>FactSnap</Text>
      <TouchableOpacity style={styles.button} onPress={takePicture}>
        <View style={styles.cameraButton}>
          <View style={styles.outerCircle}>
            <View style={styles.innerCircle} />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  logo: {
    alignSelf: "center",
    color: "#FFCD29",
    fontSize: 36,
    fontWeight: "bold",
    position: "absolute",
    top: 50,
  },
  button: {
    alignItems: "center",
    bottom: 40,
    justifyContent: "center",
    position: "absolute",
    width: "100%",
  },
  cameraButton: {
    alignItems: "center",
    backgroundColor: "#FFCD29",
    borderRadius: 50,
    height: 80,
    justifyContent: "center",
    width: 80,
  },
  outerCircle: {
    alignItems: "center",
    borderColor: "#FFF",
    borderRadius: 50,
    borderWidth: 2,
    height: 70,
    justifyContent: "center",
    width: 70,
  },
  innerCircle: {
    backgroundColor: "white",
    borderRadius: 50,
    height: 50,
    width: 50,
  },
  imageContainer: {
    position: "absolute",
    top: Dimensions.get("window").height / 4,
    width: Dimensions.get("window").width * 0.8,
    height: Dimensions.get("window").height / 2,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "white",
    backgroundColor: "black",
    opacity: 0.9,
  },
  imagePreview: {
    width: "100%",
    height: "100%",
  },
});
