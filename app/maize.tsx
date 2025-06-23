import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const maizeDiseases = [
  {
    id: '1',
    name: 'Leaf Blight',
    symptoms: [
      'Yellowing and browning of leaf tips and edges.',
      'Irregular, elongated lesions on leaves.',
      'Reduced photosynthesis and stunted growth.'
    ],
    causes: [
      'Fungal infection (Exserohilum turcicum).',
      'High humidity and poor air circulation.',
      'Plant residue from previous crops.'
    ],
    prevention: [
      'Use resistant maize varieties.',
      'Rotate crops to prevent build-up of the fungus.',
      'Apply appropriate fungicides if necessary.'
    ],
    notes: 'Leaf blight is more severe in wet, humid conditions and can significantly reduce yield if unmanaged.'
  },
  {
    id: '2',
    name: 'Leaf Spot',
    symptoms: [
      'Small, round to oval brown spots on leaves.',
      'Severe infections cause leaf drop and poor grain filling.'
    ],
    causes: [
      'Fungal pathogens like Bipolaris and Cercospora species.',
      'Overhead irrigation or persistent rains.',
      'Infected crop debris.'
    ],
    prevention: [
      'Practice good field sanitation.',
      'Ensure good crop spacing to promote airflow.',
      'Use fungicides when needed.'
    ],
    notes: 'Early detection and prompt fungicide use are key to control.'
  },
  {
    id: '3',
    name: 'Maize Streak Virus',
    symptoms: [
      'Yellow streaks running along leaf veins.',
      'Stunted plant growth and distorted leaves.',
      'Poor cob development and low yields.'
    ],
    causes: [
      'Transmitted by leafhoppers (Cicadulina spp).',
      'Presence of infected wild grasses.',
      'Delayed planting times in maize zones.'
    ],
    prevention: [
      'Use certified virus-free seeds.',
      'Control leafhoppers using insecticides.',
      'Avoid planting maize near wild grasses or alternate hosts.'
    ],
    notes: 'Maize streak virus is a major concern in Ghana and requires integrated pest management practices.'
  }
];

export default function MaizeArticle() {
  const navigation = useNavigation();
  const [selectedDisease, setSelectedDisease] = useState<typeof maizeDiseases[0] | null>(null);

  return (
    <View style={styles.container}>
      <ScrollView>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="white" />
        </TouchableOpacity>

        <ImageBackground
          source={require('../assets/images/corn.jpg')}
          style={styles.image}
        >
          <LinearGradient colors={['transparent', 'rgba(0,0,0,0.7)']} style={styles.gradient}>
            <Text style={styles.title}>Maize</Text>
          </LinearGradient>
        </ImageBackground>

        <View style={styles.content}>
          <Text style={styles.heading}>General Information</Text>
          <Text style={styles.text}>
            Maize (Zea mays) is a staple crop widely grown in Ghana, especially in the forest and savannah zones.
            It plays a vital role in food security and is used for human consumption, animal feed, and industrial products.
          </Text>

          <Text style={styles.heading}>Select a Disease</Text>
          <FlatList
            data={maizeDiseases}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.diseaseButton} onPress={() => setSelectedDisease(item)}>
                <Text style={styles.diseaseButtonText}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />

          {selectedDisease && (
            <View style={styles.detailsBox}>
              <Text style={styles.subHeading}>{selectedDisease.name}</Text>

              <Text style={styles.detailTitle}>Symptoms</Text>
              {selectedDisease.symptoms.map((item, idx) => (
                <Text key={idx} style={styles.text}>- {item}</Text>
              ))}

              <Text style={styles.detailTitle}>Causes</Text>
              {selectedDisease.causes.map((item, idx) => (
                <Text key={idx} style={styles.text}>- {item}</Text>
              ))}

              <Text style={styles.detailTitle}>Prevention</Text>
              {selectedDisease.prevention.map((item, idx) => (
                <Text key={idx} style={styles.text}>- {item}</Text>
              ))}

              <Text style={styles.detailTitle}>Additional Notes</Text>
              <Text style={styles.text}>{selectedDisease.notes}</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 8,
    borderRadius: 30,
  },
  image: {
    height: 250,
    justifyContent: 'flex-end',
  },
  gradient: {
    height: 100,
    justifyContent: 'flex-end',
    padding: 16,
  },
  title: {
    fontSize: 32,
    color: 'white',
    fontWeight: 'bold',
  },
  content: {
    padding: 16,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  subHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
  },
  text: {
    fontSize: 16,
    marginBottom: 6,
  },
  diseaseButton: {
    backgroundColor: '#c0e6c5',
    padding: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  diseaseButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  detailsBox: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginTop: 20,
    elevation: 3,
  },
  detailTitle: {
    fontWeight: 'bold',
    marginTop: 10,
  },
});
