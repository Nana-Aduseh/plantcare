import React from 'react';
import { View, Text, Alert, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function HomePage() {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerText}>PlantCare</Text>
          <TouchableOpacity
            onPress={() =>
              Alert.alert(
                "Crop Disease Detection",
                `This system focuses on diagnosing diseases in four key crops:\n\n
• Tomato:
  - Early blight
  - Late blight
  - Bacterial spot
  - Tomato Yellow Leaf Curl Virus\n\n
• Pepper (Bell Pepper):
  - Bacterial spot\n\n
• Maize (Corn):
  - Leaf blight
  - Leaf spot
  - Streak virus\n\n
• Cassava:
  - Bacterial blight
  - Green mite
  - Mosaic`,
                [{ text: "OK", style: "default" }]
              )
            }
          >
            <Ionicons name="information-circle-outline" size={30} style={styles.icon} color="black" />
          </TouchableOpacity>
        </View>

        <Image source={require('../assets/images/homee.jpeg')} style={styles.image} />

        <TouchableOpacity style={styles.button} onPress={() => router.push('/diagnose')}>
          <Ionicons name="camera" size={24} style={styles.icon2} color="white" />
          <Text style={styles.buttonText}>Diagnose Your Plant</Text>
        </TouchableOpacity>

        <View style={styles.articlesHeader}>
          <Text style={styles.artext}>Articles on Plants</Text>
        </View>

        <View style={{ marginTop: 10 }}>
          <View style={styles.articleGrid}>
            <TouchableOpacity style={styles.articleCard} onPress={() => router.push('/cassava')}>
              <Image source={require('../assets/images/cassava.webp')} style={styles.articleImage} />
              <Text style={styles.articleTitle}>Cassava</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.articleCard} onPress={() => router.push('/tomato')}>
              <Image source={require('../assets/images/tomato.jpg')} style={styles.articleImage} />
              <Text style={styles.articleTitle}>Tomato</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.articleGrid}>
            <TouchableOpacity style={styles.articleCard} onPress={() => router.push('/pepper')}>
              <Image source={require('../assets/images/pepper.jpg')} style={styles.articleImage} />
              <Text style={styles.articleTitle}>Pepper</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.articleCard} onPress={() => router.push('/maize')}>
              <Image source={require('../assets/images/corn.jpg')} style={styles.articleImage} />
              <Text style={styles.articleTitle}>Maize</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.articleGrid, { justifyContent: 'flex-start' }]}>
            <TouchableOpacity style={styles.articleCard} onPress={() => router.push('/potato')}>
              <Image source={require('../assets/images/potato.jpg')} style={styles.articleImage} />
              <Text style={styles.articleTitle}>Potato</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Spacer to prevent tab bar overlap */}
        <View style={{ height: 80 }} />
      </ScrollView>

      {/* Static Bottom Navigation Tab */}
      <View style={styles.bottomTab}>
        <TouchableOpacity style={styles.tabButton} onPress={() => router.push('/homepage')}>
          <Ionicons name="home-outline" size={24} color="black" />
          <Text style={styles.tabLabel}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabButton} onPress={() => router.push('/diagnose')}>
          <Ionicons name="camera-outline" size={24} color="black" />
          <Text style={styles.tabLabel}>Scan</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabButton} onPress={() => router.push('/homepage')}>
          <Ionicons name="chatbubble-ellipses-outline" size={24} color="black" />
          <Text style={styles.tabLabel}>Chatbot</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#ffffff',
    padding: 20,
    paddingBottom: 100, 
  },
  header: {
    flexDirection: 'row',
    marginTop: 15,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  icon: {
    marginLeft: 210,
  },
  image: {
    width: '100%',
    height: 200,
    marginTop: 20,
    borderRadius: 20,
  },
  button: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    paddingVertical: 12,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  icon2: {
    marginLeft: '25%',
    marginRight: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  articlesHeader: {
    flexDirection: "row",
    marginTop: 30,
  },
  artext: {
    fontWeight: 'bold',
    fontSize: 17,
  },
  articleGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  articleCard: {
    width: '48%',
    backgroundColor: '#F2F2F2',
    borderRadius: 16,
    padding: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  articleImage: {
    width: '100%',
    height: 140,
    borderRadius: 12,
  },
  articleTitle: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    color: '#333',
  },
  bottomTab: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    zIndex: 100,
  },
  tabButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 2,
  },
});
