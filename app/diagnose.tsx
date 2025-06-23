// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Alert } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import * as ImagePicker from 'expo-image-picker';
// import * as FileSystem from 'expo-file-system';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { router } from 'expo-router';
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

// export default function HomePage() {
//   const [storedImageUri, setStoredImageUri] = useState(null);

//   const firebaseConfig = {
//   apiKey: "AIzaSyDBG-TATwSFNYEd88kbsJRemiOzaMAqq70",
//   authDomain: "plantcare-eb240.firebaseapp.com",
//   projectId: "plantcare-eb240",
//   storageBucket: "plantcare-eb240.firebasestorage.app",
//   messagingSenderId: "105201288563",
//   appId: "1:105201288563:web:4174c738cf40ff0660b106",
//   measurementId: "G-XE62E8Z8MC"
//   };

//   const app = initializeApp(firebaseConfig);
//   const analytics = getAnalytics(app);

//   const saveImageLocally = async (uri) => {
//     try {
//       const fileName = uri.split('/').pop(); // Get image file name
//       const destPath = `${FileSystem.documentDirectory}${fileName}`; // Save to app's local doc dir

//       // Copy image to local folder
//       await FileSystem.copyAsync({ from: uri, to: destPath });

//       // Store path in AsyncStorage
//       await saveImageReference(destPath);

//       setStoredImageUri(destPath);
//       console.log('Image saved locally at:', destPath);
//     } catch (error) {
//       console.error('Error saving image locally:', error);
//     }
//   };

//   const saveImageReference = async (uri) => {
//     try {
//       const existing = await AsyncStorage.getItem('images');
//       const images = existing ? JSON.parse(existing) : [];

//       images.push(uri);
//       await AsyncStorage.setItem('images', JSON.stringify(images));

//       console.log('Image URI saved to AsyncStorage');
//     } catch (error) {
//       console.error('Failed to save image URI:', error);
//     }
//   };

//   const pickImage = async () => {
//     const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (!permissionResult.granted) {
//       return Alert.alert('Permission required', 'Please allow gallery access.');
//     }

//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       quality: 1,
//     });

//     if (!result.canceled) {
//       const uri = result.assets[0].uri;
//       await saveImageLocally(uri);
//     }
//   };

//   const takePhoto = async () => {
//     const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
//     if (!permissionResult.granted) {
//       return Alert.alert('Permission required', 'Please allow camera access.');
//     }

//     const result = await ImagePicker.launchCameraAsync({
//       allowsEditing: true,
//       quality: 1,
//     });

//     if (!result.canceled) {
//       const uri = result.assets[0].uri;
//       await saveImageLocally(uri);
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <View style={styles.header}>
//         <Ionicons name="leaf" size={32} color="green" />
//         <Text style={styles.headerText}>Diagnose Your Plant</Text>

//         <TouchableOpacity style={[styles.button, styles.uploadBtn]} onPress={pickImage}>
//           <Ionicons name="image" size={20} color="#fff" />
//           <Text style={styles.buttonText}>Upload Image</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={[styles.button, styles.scanBtn]} onPress={takePhoto}>
//           <Ionicons name="camera" size={20} color="#fff" />
//           <Text style={styles.buttonText}>Scan with Camera</Text>
//         </TouchableOpacity>

//         {storedImageUri && (
//           <Image source={{ uri: storedImageUri }} style={styles.imagePreview} />
//         )}
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     backgroundColor: '#f0fdf4',
//     padding: 20,
//     justifyContent: 'center',
//   },
//   header: {
//     alignItems: 'center',
//   },
//   headerText: {
//     fontSize: 24,
//     fontWeight: '600',
//     marginVertical: 20,
//     color: '#1b4332',
//     textAlign: 'center',
//   },
//   button: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 14,
//     paddingHorizontal: 16,
//     borderRadius: 14,
//     marginTop: 16,
//     width: '100%',
//     justifyContent: 'center',
//     gap: 10,
//   },
//   uploadBtn: {
//     backgroundColor: '#40916c',
//   },
//   scanBtn: {
//     backgroundColor: '#1b4332',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   imagePreview: {
//     width: '100%',
//     height: 200,
//     marginTop: 25,
//     borderRadius: 12,
//     resizeMode: 'cover',
//     borderWidth: 1,
//     borderColor: '#ccc',
//   },
// });













import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import axios from 'axios';

export default function HomePage() {
  const [storedImageUri, setStoredImageUri] = useState(null);
  const [isPredicting, setIsPredicting] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);

  const predictDisease = async (uri) => {
    setIsPredicting(true);
    try {
      const API_URL = "https://napdents-plantapi.hf.space/predict";
      
      // Prepare the file for upload
      const fileName = uri.split('/').pop();
      const fileType = fileName.split('.').pop() || 'jpg';
      
      const formData = new FormData();
      formData.append('file', {
        uri,
        name: fileName,
        type: `image/${fileType}`,
      });

      // Make the prediction request
      const response = await axios.post(API_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 30000, // 30 seconds timeout
      });

      setPredictionResult(response.data);
      showPredictionAlert(response.data);
      return response.data;
    } catch (error) {
      console.error('Prediction error:', error);
      Alert.alert('Prediction Failed', 'Could not get prediction from server. Please try again.');
      return null;
    } finally {
      setIsPredicting(false);
    }
  };

  const showPredictionAlert = (result) => {
    Alert.alert(
      'Disease Prediction',
      `Predicted: ${result.class_name}\nConfidence: ${(result.confidence * 100).toFixed(1)}%`,
      [
        {
          text: 'OK',
          onPress: () => console.log('OK Pressed'),
        },
        {
          text: 'View Details',
          onPress: () => router.push({
            pathname: '/prediction',
            params: { 
              prediction: JSON.stringify(result),
              imageUri: storedImageUri 
            }
          }),
        },
      ]
    );
  };

  const saveImageLocally = async (uri) => {
    try {
      const fileName = uri.split('/').pop();
      const destPath = `${FileSystem.documentDirectory}${fileName}`;

      await FileSystem.copyAsync({ from: uri, to: destPath });
      await saveImageReference(destPath);

      setStoredImageUri(destPath);
      console.log('Image saved locally at:', destPath);
      
      // Automatically predict after saving
      await predictDisease(destPath);
    } catch (error) {
      console.error('Error saving image locally:', error);
    }
  };

  const saveImageReference = async (uri) => {
    try {
      const existing = await AsyncStorage.getItem('images');
      const images = existing ? JSON.parse(existing) : [];
      images.push(uri);
      await AsyncStorage.setItem('images', JSON.stringify(images));
      console.log('Image URI saved to AsyncStorage');
    } catch (error) {
      console.error('Failed to save image URI:', error);
    }
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      return Alert.alert('Permission required', 'Please allow gallery access.');
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      await saveImageLocally(uri);
    }
  };

  const takePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      return Alert.alert('Permission required', 'Please allow camera access.');
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      await saveImageLocally(uri);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Ionicons name="leaf" size={32} color="green" />
        <Text style={styles.headerText}>Diagnose Your Plant</Text>

        <TouchableOpacity style={[styles.button, styles.uploadBtn]} onPress={pickImage}>
          <Ionicons name="image" size={20} color="#fff" />
          <Text style={styles.buttonText}>Upload Image</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.scanBtn]} onPress={takePhoto}>
          <Ionicons name="camera" size={20} color="#fff" />
          <Text style={styles.buttonText}>Scan with Camera</Text>
        </TouchableOpacity>

        {isPredicting && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#40916c" />
            <Text style={styles.loadingText}>Analyzing plant health...</Text>
          </View>
        )}

        {storedImageUri && (
          <Image source={{ uri: storedImageUri }} style={styles.imagePreview} />
        )}

        {predictionResult && (
          <View style={styles.predictionContainer}>
            <Text style={styles.predictionText}>
              Prediction: {predictionResult.class_name}
            </Text>
            <Text style={styles.confidenceText}>
              Confidence: {(predictionResult.confidence * 100).toFixed(1)}%
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f0fdf4',
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: '600',
    marginVertical: 20,
    color: '#1b4332',
    textAlign: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
    marginTop: 16,
    width: '100%',
    justifyContent: 'center',
    gap: 10,
  },
  uploadBtn: {
    backgroundColor: '#40916c',
  },
  scanBtn: {
    backgroundColor: '#1b4332',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginTop: 25,
    borderRadius: 12,
    resizeMode: 'cover',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  loadingContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#1b4332',
  },
  predictionContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#d8f3dc',
    borderRadius: 10,
    width: '100%',
  },
  predictionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1b4332',
    marginBottom: 5,
  },
  confidenceText: {
    fontSize: 16,
    color: '#2d6a4f',
  },
});