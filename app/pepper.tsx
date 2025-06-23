import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

type Disease = {
  id: string;
  name: string;
  symptoms: string[];
  causes: string[];
  prevention: string[];
  notes: string;
};

const pepperDiseases: Disease[] = [
  {
    id: '1',
    name: 'Anthracnose',
    symptoms: [
      'Dark, sunken spots on fruits with pinkish spore masses',
      'Spots may enlarge and cause fruit rot',
    ],
    causes: [
      'Caused by the fungus *Colletotrichum spp.*',
      'Thrives in warm, humid conditions common in southern Ghana',
    ],
    prevention: [
      'Use disease-free seeds',
      'Apply fungicides when fruits begin to form',
      'Practice crop rotation and remove infected plant debris',
    ],
    notes: 'One of the most damaging fruit diseases for pepper; timely spraying helps reduce spread.',
  },
  {
    id: '2',
    name: 'Powdery Mildew',
    symptoms: [
      'White, powdery coating on leaves and stems',
      'Leads to leaf distortion and premature drop',
    ],
    causes: [
      'Caused by fungal pathogens (*Leveillula taurica*)',
      'Favored by warm, dry days and cool nights',
    ],
    prevention: [
      'Improve air circulation by spacing plants properly',
      'Remove and destroy infected leaves',
      'Apply sulfur-based fungicides early',
    ],
    notes: 'Common during dry spells in Ghana’s middle belt.',
  },
  {
    id: '3',
    name: 'Bacterial Leaf Spot',
    symptoms: [
      'Water-soaked spots on leaves that turn brown or black',
      'Leaf drop and poor fruit development',
    ],
    causes: [
      'Caused by *Xanthomonas campestris* bacteria',
      'Spreads through splashing water and contaminated tools',
    ],
    prevention: [
      'Avoid overhead watering',
      'Disinfect tools regularly',
      'Use resistant varieties if available',
    ],
    notes: 'Can be devastating if unmanaged during wet seasons.',
  },
];

const PepperArticle = () => {
  const [selectedDisease, setSelectedDisease] = useState<Disease | null>(null);
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        source={require('../assets/images/pepper.jpg')} // Replace with your actual pepper image
        style={styles.image}
      >
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.7)']}
          style={styles.gradient}
        >
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.title}>Pepper</Text>
        </LinearGradient>
      </ImageBackground>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>General Info</Text>
        <Text style={styles.text}>
          Pepper is widely grown across Ghana, especially in the Volta, Eastern, and Northern regions. It thrives in well-drained soils with good sun exposure. Major threats to pepper crops include fungal and bacterial infections that affect both leaves and fruits.
        </Text>

        <Text style={styles.sectionTitle}>Common Diseases</Text>
        {pepperDiseases.map((disease) => (
          <TouchableOpacity
            key={disease.id}
            style={styles.diseaseItem}
            onPress={() => setSelectedDisease(disease)}
          >
            <Text style={styles.diseaseName}>{disease.name}</Text>
          </TouchableOpacity>
        ))}

        {selectedDisease && (
          <View style={styles.detailsContainer}>
            <Text style={styles.diseaseHeader}>{selectedDisease.name}</Text>

            <Text style={styles.subHeader}>Symptoms:</Text>
            {selectedDisease.symptoms.map((item: string, idx: number) => (
              <Text key={idx} style={styles.detailItem}>• {item}</Text>
            ))}

            <Text style={styles.subHeader}>Causes:</Text>
            {selectedDisease.causes.map((item: string, idx: number) => (
              <Text key={idx} style={styles.detailItem}>• {item}</Text>
            ))}

            <Text style={styles.subHeader}>Prevention:</Text>
            {selectedDisease.prevention.map((item: string, idx: number) => (
              <Text key={idx} style={styles.detailItem}>• {item}</Text>
            ))}

            <Text style={styles.subHeader}>Additional Notes:</Text>
            <Text style={styles.detailItem}>{selectedDisease.notes}</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default PepperArticle;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  image: {
    height: 220,
    justifyContent: 'flex-end',
  },
  gradient: {
    height: '100%',
    justifyContent: 'flex-end',
    padding: 16,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
  },
  content: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 8,
    color: '#333',
  },
  text: {
    fontSize: 16,
    color: '#444',
    lineHeight: 22,
  },
  diseaseItem: {
    backgroundColor: '#E0E0E0',
    padding: 10,
    borderRadius: 8,
    marginVertical: 6,
  },
  diseaseName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#222',
  },
  detailsContainer: {
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  diseaseHeader: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
    color: '#444',
  },
  subHeader: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 4,
    color: '#444',
  },
  detailItem: {
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
  },
});
