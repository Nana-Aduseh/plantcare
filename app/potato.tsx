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

// ✅ Disease type definition
type Disease = {
  id: string;
  name: string;
  symptoms: string[];
  causes: string[];
  prevention: string[];
  notes: string;
};

// ✅ Potato disease data (example for Ghana)
const potatoDiseases: Disease[] = [
  {
    id: '1',
    name: 'Late Blight',
    symptoms: [
      'Dark brown or black lesions on leaves and stems',
      'White mold under leaves in humid conditions',
      'Rapid wilting and death of plant',
    ],
    causes: [
      'Caused by the fungus *Phytophthora infestans*',
      'Thrives in cool, moist environments especially during rainy seasons in Ghana’s middle and southern zones',
    ],
    prevention: [
      'Use certified disease-free seed tubers',
      'Apply fungicides early during wet seasons',
      'Practice crop rotation and remove infected plants',
    ],
    notes: 'This is the most destructive disease for potato and can cause entire crop failure if unmanaged.',
  },
  {
    id: '2',
    name: 'Early Blight',
    symptoms: [
      'Small brown spots with concentric rings on older leaves',
      'Premature leaf drop',
    ],
    causes: [
      'Caused by the fungus *Alternaria solani*',
      'More common in dry and warm areas like northern Ghana',
    ],
    prevention: [
      'Ensure adequate spacing for air flow',
      'Use resistant varieties where available',
      'Remove and burn infected foliage',
    ],
    notes: 'Manage using protective fungicides and ensure good field hygiene.',
  },
  {
    id: '3',
    name: 'Bacterial Wilt',
    symptoms: [
      'Sudden wilting of the entire plant with no yellowing',
      'Brown discoloration of vascular tissue in stems',
    ],
    causes: [
      'Caused by the bacterium *Ralstonia solanacearum*',
      'Spreads through infected soil or contaminated tools',
    ],
    prevention: [
      'Avoid planting in fields with a history of bacterial wilt',
      'Rotate with non-solanaceous crops like maize or beans',
      'Disinfect tools and practice good sanitation',
    ],
    notes: 'This disease is hard to control once established, so prevention is key.',
  },
];

const PotatoArticle = () => {
  const [selectedDisease, setSelectedDisease] = useState<Disease | null>(null);
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      {/* 🥔 Header Image with Gradient */}
      <ImageBackground
        source={require('../assets/images/potato.jpg')} // ✅ Replace with actual image
        style={styles.image}
      >
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.7)']}
          style={styles.gradient}
        >
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.title}>Potato</Text>
        </LinearGradient>
      </ImageBackground>

      {/* 📝 General Info */}
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>General Info</Text>
        <Text style={styles.text}>
          Potato is a valuable root crop grown in parts of Ghana with cooler temperatures, especially in the highlands and parts of the Ashanti and Eastern regions. It is sensitive to moisture and requires well-drained soils for healthy growth.
        </Text>

        {/* 🦠 Disease List */}
        <Text style={styles.sectionTitle}>Common Diseases</Text>
        {potatoDiseases.map((disease) => (
          <TouchableOpacity
            key={disease.id}
            style={styles.diseaseItem}
            onPress={() => setSelectedDisease(disease)}
          >
            <Text style={styles.diseaseName}>{disease.name}</Text>
          </TouchableOpacity>
        ))}

        {/* 📋 Disease Details */}
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

export default PotatoArticle;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9', // ✅ Light background
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
