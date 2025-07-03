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













// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Alert, ActivityIndicator } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import * as ImagePicker from 'expo-image-picker';
// import * as FileSystem from 'expo-file-system';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { router } from 'expo-router';
// import axios from 'axios';

// export default function HomePage() {
//   const [storedImageUri, setStoredImageUri] = useState(null);
//   const [isPredicting, setIsPredicting] = useState(false);
//   const [predictionResult, setPredictionResult] = useState(null);

//   const predictDisease = async (uri) => {
//     setIsPredicting(true);
//     try {
//       const API_URL = "https://napdents-plantapi.hf.space/predict";
      
//       // Prepare the file for upload
//       const fileName = uri.split('/').pop();
//       const fileType = fileName.split('.').pop() || 'jpg';
      
//       const formData = new FormData();
//       formData.append('file', {
//         uri,
//         name: fileName,
//         type: `image/${fileType}`,
//       });

//       // Make the prediction request
//       const response = await axios.post(API_URL, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//         timeout: 30000, // 30 seconds timeout
//       });

//       setPredictionResult(response.data);
//       showPredictionAlert(response.data);
//       return response.data;
//     } catch (error) {
//       console.error('Prediction error:', error);
//       Alert.alert('Prediction Failed', 'Could not get prediction from server. Please try again.');
//       return null;
//     } finally {
//       setIsPredicting(false);
//     }
//   };


//       const showPredictionAlert = (result) => {
//       // Detect which plant the disease belongs to
//       const plantName = result.class_name.toLowerCase();

//       // Determine route based on keyword
//       let routePath = '/';
//       if (plantName.startsWith('cassava')) routePath = '/cassava';
//       else if (plantName.startsWith('tomato')) routePath = '/tomato';
//       else if (plantName.startsWith('pepper')) routePath = '/pepper';
//       else if (plantName.startsWith('potato')) routePath = '/potato';
//       else if (plantName.startsWith('maize') || plantName.startsWith('corn')) routePath = '/maize'; // or use '/corn' if that's your route

//       Alert.alert(
//         'Disease Prediction',
//         `Predicted: ${result.class_name}\nConfidence: ${(result.confidence * 100).toFixed(1)}%`,
//         [
//           {
//             text: 'OK',
//             onPress: () => console.log('OK Pressed'),
//           },
//           {
//             text: 'View Details',
//             onPress: () =>
//               router.push({
//                 pathname: routePath,
//                 params: {
//                   prediction: JSON.stringify(result),
//                   imageUri: storedImageUri,
//                 },
//               }),
//           },
//         ]
//       );
//     };


//   const saveImageLocally = async (uri) => {
//     try {
//       const fileName = uri.split('/').pop();
//       const destPath = `${FileSystem.documentDirectory}${fileName}`;

//       await FileSystem.copyAsync({ from: uri, to: destPath });
//       await saveImageReference(destPath);

//       setStoredImageUri(destPath);
//       console.log('Image saved locally at:', destPath);
      
//       // Automatically predict after saving
//       await predictDisease(destPath);
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

//         {isPredicting && (
//           <View style={styles.loadingContainer}>
//             <ActivityIndicator size="large" color="#40916c" />
//             <Text style={styles.loadingText}>Analyzing plant health...</Text>
//           </View>
//         )}

//         {storedImageUri && (
//           <Image source={{ uri: storedImageUri }} style={styles.imagePreview} />
//         )}

//         {predictionResult && (
//           <View style={styles.predictionContainer}>
//             <Text style={styles.predictionText}>
//               Prediction: {predictionResult.class_name}
//             </Text>
//             <Text style={styles.confidenceText}>
//               Confidence: {(predictionResult.confidence * 100).toFixed(1)}%
//             </Text>
//           </View>
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
//   loadingContainer: {
//     marginTop: 20,
//     alignItems: 'center',
//   },
//   loadingText: {
//     marginTop: 10,
//     color: '#1b4332',
//   },
//   predictionContainer: {
//     marginTop: 20,
//     padding: 15,
//     backgroundColor: '#d8f3dc',
//     borderRadius: 10,
//     width: '100%',
//   },
//   predictionText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#1b4332',
//     marginBottom: 5,
//   },
//   confidenceText: {
//     fontSize: 16,
//     color: '#2d6a4f',
//   },
// });

"use client"

import { useState } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
  ActivityIndicator,
  Dimensions,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import * as ImagePicker from "expo-image-picker"
import * as FileSystem from "expo-file-system"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { router } from "expo-router"
import { LinearGradient } from "expo-linear-gradient"
import axios from "axios"

const { width } = Dimensions.get("window")

export default function DiagnosePage() {
  const [storedImageUri, setStoredImageUri] = useState(null)
  const [isPredicting, setIsPredicting] = useState(false)
  const [predictionResult, setPredictionResult] = useState(null)

  const predictDisease = async (uri) => {
    setIsPredicting(true)
    try {
      const API_URL = "https://napdents-plantapi.hf.space/predict"

      const fileName = uri.split("/").pop()
      const fileType = fileName.split(".").pop() || "jpg"

      const formData = new FormData()
      formData.append("file", {
        uri,
        name: fileName,
        type: `image/${fileType}`,
      })

      const response = await axios.post(API_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 30000,
      })

      setPredictionResult(response.data)
      return response.data
    } catch (error) {
      console.error("Prediction error:", error)
      Alert.alert("Prediction Failed", "Could not get prediction from server. Please try again.")
      return null
    } finally {
      setIsPredicting(false)
    }
  }

  const navigateToArticle = (result) => {
    const plantName = result.class_name.toLowerCase()
    let routePath = "/"

    if (plantName.startsWith("cassava")) routePath = "/cassava"
    else if (plantName.startsWith("tomato")) routePath = "/tomato"
    else if (plantName.startsWith("pepper")) routePath = "/pepper"
    else if (plantName.startsWith("potato")) routePath = "/potato"
    else if (plantName.startsWith("maize") || plantName.startsWith("corn")) routePath = "/maize"

    router.push({
      pathname: routePath,
      params: {
        prediction: JSON.stringify(result),
        imageUri: storedImageUri,
        highlightDisease: result.class_name,
      },
    })
  }

  const getSeverityLevel = (confidence) => {
    if (confidence >= 0.8) return { level: "High", color: "#ef4444", bgColor: "#fef2f2" }
    if (confidence >= 0.6) return { level: "Medium", color: "#f59e0b", bgColor: "#fffbeb" }
    return { level: "Low", color: "#10b981", bgColor: "#f0fdf4" }
  }

  const getPlantIcon = (className) => {
    const plantName = className.toLowerCase()
    if (plantName.includes("cassava")) return "leaf"
    if (plantName.includes("tomato")) return "nutrition"
    if (plantName.includes("pepper")) return "flame"
    if (plantName.includes("potato")) return "earth"
    if (plantName.includes("maize") || plantName.includes("corn")) return "nutrition"
    return "leaf"
  }

  const saveImageLocally = async (uri) => {
    try {
      const fileName = uri.split("/").pop()
      const destPath = `${FileSystem.documentDirectory}${fileName}`
      await FileSystem.copyAsync({ from: uri, to: destPath })
      await saveImageReference(destPath)
      setStoredImageUri(destPath)

      await predictDisease(destPath)
    } catch (error) {
      console.error("Error saving image locally:", error)
    }
  }

  const saveImageReference = async (uri) => {
    try {
      const existing = await AsyncStorage.getItem("images")
      const images = existing ? JSON.parse(existing) : []
      images.push(uri)
      await AsyncStorage.setItem("images", JSON.stringify(images))
    } catch (error) {
      console.error("Failed to save image URI:", error)
    }
  }

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (!permissionResult.granted) {
      return Alert.alert("Permission required", "Please allow gallery access.")
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    })

    if (!result.canceled) {
      const uri = result.assets[0].uri
      await saveImageLocally(uri)
    }
  }

  const takePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync()
    if (!permissionResult.granted) {
      return Alert.alert("Permission required", "Please allow camera access.")
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    })

    if (!result.canceled) {
      const uri = result.assets[0].uri
      await saveImageLocally(uri)
    }
  }

  const resetDiagnosis = () => {
    setStoredImageUri(null)
    setPredictionResult(null)
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <LinearGradient colors={["#f0fdf4", "#ffffff"]} style={styles.headerGradient}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <View style={styles.logoIcon}>
              <Ionicons name="scan" size={24} color="white" />
            </View>
            <Text style={styles.headerText}>Plant Diagnosis</Text>
          </View>
          <Text style={styles.headerSubtitle}>
            Take a photo or upload an image to identify plant diseases using AI technology
          </Text>
        </View>
      </LinearGradient>

      <View style={styles.contentContainer}>
        {/* Action Buttons */}
        {!storedImageUri && (
          <View style={styles.actionSection}>
            <TouchableOpacity style={styles.primaryButton} onPress={takePhoto} activeOpacity={0.8}>
              <LinearGradient colors={["#16a34a", "#15803d"]} style={styles.buttonGradient}>
                <Ionicons name="camera" size={24} color="white" />
                <Text style={styles.primaryButtonText}>Take Photo</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.secondaryButton} onPress={pickImage} activeOpacity={0.8}>
              <Ionicons name="image" size={24} color="#16a34a" />
              <Text style={styles.secondaryButtonText}>Upload from Gallery</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Image Preview */}
        {storedImageUri && (
          <View style={styles.imageSection}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: storedImageUri }} style={styles.imagePreview} />
              <TouchableOpacity style={styles.resetButton} onPress={resetDiagnosis}>
                <Ionicons name="close-circle" size={24} color="#ef4444" />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Loading State */}
        {isPredicting && (
          <View style={styles.loadingCard}>
            <View style={styles.loadingContent}>
              <ActivityIndicator size="large" color="#16a34a" />
              <Text style={styles.loadingTitle}>Analyzing Plant Health</Text>
              <Text style={styles.loadingSubtitle}>Our AI is examining your plant image...</Text>
            </View>
          </View>
        )}

        {/* Results */}
        {predictionResult && !isPredicting && (
          <View style={styles.resultsSection}>
            <View style={styles.resultsCard}>
              <View style={styles.resultsHeader}>
                <View style={styles.diseaseIconContainer}>
                  <Ionicons name={getPlantIcon(predictionResult.class_name)} size={32} color="#16a34a" />
                </View>
                <View style={styles.resultsHeaderText}>
                  <Text style={styles.resultsTitle}>Diagnosis Complete</Text>
                  <Text style={styles.resultsSubtitle}>AI Analysis Results</Text>
                </View>
              </View>

              <View style={styles.diseaseInfo}>
                <Text style={styles.diseaseName}>{predictionResult.class_name}</Text>

                <View style={styles.confidenceContainer}>
                  <View style={styles.confidenceBar}>
                    <View
                      style={[
                        styles.confidenceFill,
                        {
                          width: `${predictionResult.confidence * 100}%`,
                          backgroundColor: getSeverityLevel(predictionResult.confidence).color,
                        },
                      ]}
                    />
                  </View>
                  <Text style={styles.confidenceText}>
                    {(predictionResult.confidence * 100).toFixed(1)}% Confidence
                  </Text>
                </View>

                <View
                  style={[
                    styles.severityBadge,
                    { backgroundColor: getSeverityLevel(predictionResult.confidence).bgColor },
                  ]}
                >
                  <Text style={[styles.severityText, { color: getSeverityLevel(predictionResult.confidence).color }]}>
                    {getSeverityLevel(predictionResult.confidence).level} Confidence
                  </Text>
                </View>
              </View>

              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={styles.primaryActionButton}
                  onPress={() => navigateToArticle(predictionResult)}
                  activeOpacity={0.8}
                >
                  <LinearGradient colors={["#16a34a", "#15803d"]} style={styles.actionButtonGradient}>
                    <Ionicons name="book" size={20} color="white" />
                    <Text style={styles.primaryActionText}>View Treatment Guide</Text>
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity style={styles.secondaryActionButton} onPress={resetDiagnosis}>
                  <Ionicons name="refresh" size={20} color="#6b7280" />
                  <Text style={styles.secondaryActionText}>Scan Another Plant</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Quick Tips */}
            <View style={styles.tipsCard}>
              <View style={styles.tipsHeader}>
                <Ionicons name="bulb" size={20} color="#f59e0b" />
                <Text style={styles.tipsTitle}>Quick Tips</Text>
              </View>
              <View style={styles.tipsList}>
                <View style={styles.tipItem}>
                  <Ionicons name="checkmark-circle" size={16} color="#10b981" />
                  <Text style={styles.tipText}>Take clear, well-lit photos for better accuracy</Text>
                </View>
                <View style={styles.tipItem}>
                  <Ionicons name="checkmark-circle" size={16} color="#10b981" />
                  <Text style={styles.tipText}>Focus on affected leaves or plant parts</Text>
                </View>
                <View style={styles.tipItem}>
                  <Ionicons name="checkmark-circle" size={16} color="#10b981" />
                  <Text style={styles.tipText}>Consult the treatment guide for detailed solutions</Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Instructions (when no image) */}
        {!storedImageUri && !isPredicting && (
          <View style={styles.instructionsCard}>
            <View style={styles.instructionsHeader}>
              <Ionicons name="information-circle" size={24} color="#3b82f6" />
              <Text style={styles.instructionsTitle}>How It Works</Text>
            </View>
            <View style={styles.instructionsList}>
              <View style={styles.instructionItem}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepText}>1</Text>
                </View>
                <Text style={styles.instructionText}>Take a clear photo of the affected plant</Text>
              </View>
              <View style={styles.instructionItem}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepText}>2</Text>
                </View>
                <Text style={styles.instructionText}>Our AI analyzes the image for diseases</Text>
              </View>
              <View style={styles.instructionItem}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepText}>3</Text>
                </View>
                <Text style={styles.instructionText}>Get diagnosis with treatment recommendations</Text>
              </View>
            </View>
          </View>
        )}

        <View style={styles.bottomSpacer} />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  headerGradient: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 30,
  },
  header: {
    alignItems: "center",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  logoIcon: {
    width: 40,
    height: 40,
    backgroundColor: "#16a34a",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111827",
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 20,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  actionSection: {
    marginTop: 20,
    gap: 16,
  },
  primaryButton: {
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
    paddingHorizontal: 24,
    gap: 12,
  },
  primaryButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  secondaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#16a34a",
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  secondaryButtonText: {
    color: "#16a34a",
    fontSize: 16,
    fontWeight: "600",
  },
  imageSection: {
    marginTop: 20,
  },
  imageContainer: {
    position: "relative",
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  imagePreview: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
  },
  resetButton: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  loadingCard: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 32,
    marginTop: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  loadingContent: {
    alignItems: "center",
  },
  loadingTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
    marginTop: 16,
    marginBottom: 8,
  },
  loadingSubtitle: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
  },
  resultsSection: {
    marginTop: 20,
    gap: 16,
  },
  resultsCard: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  resultsHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  diseaseIconContainer: {
    width: 56,
    height: 56,
    backgroundColor: "#dcfce7",
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  resultsHeaderText: {
    flex: 1,
  },
  resultsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 4,
  },
  resultsSubtitle: {
    fontSize: 14,
    color: "#6b7280",
  },
  diseaseInfo: {
    marginBottom: 24,
  },
  diseaseName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 16,
    textAlign: "center",
  },
  confidenceContainer: {
    marginBottom: 16,
  },
  confidenceBar: {
    height: 8,
    backgroundColor: "#f3f4f6",
    borderRadius: 4,
    marginBottom: 8,
    overflow: "hidden",
  },
  confidenceFill: {
    height: "100%",
    borderRadius: 4,
  },
  confidenceText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    textAlign: "center",
  },
  severityBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: "center",
  },
  severityText: {
    fontSize: 14,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  actionButtons: {
    gap: 12,
  },
  primaryActionButton: {
    borderRadius: 12,
    overflow: "hidden",
  },
  actionButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 24,
    gap: 8,
  },
  primaryActionText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  secondaryActionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    backgroundColor: "#f9fafb",
    gap: 8,
  },
  secondaryActionText: {
    color: "#6b7280",
    fontSize: 14,
    fontWeight: "600",
  },
  tipsCard: {
    backgroundColor: "#fffbeb",
    borderRadius: 16,
    padding: 20,
    borderLeftWidth: 4,
    borderLeftColor: "#f59e0b",
  },
  tipsHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#92400e",
    marginLeft: 8,
  },
  tipsList: {
    gap: 8,
  },
  tipItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  tipText: {
    fontSize: 14,
    color: "#78350f",
    flex: 1,
  },
  instructionsCard: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 24,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  instructionsHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  instructionsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
    marginLeft: 8,
  },
  instructionsList: {
    gap: 16,
  },
  instructionItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  stepNumber: {
    width: 32,
    height: 32,
    backgroundColor: "#3b82f6",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  stepText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  instructionText: {
    fontSize: 16,
    color: "#4b5563",
    flex: 1,
    lineHeight: 22,
  },
  bottomSpacer: {
    height: 100,
  },
})
