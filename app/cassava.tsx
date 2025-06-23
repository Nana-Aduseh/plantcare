import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

type Disease = {
  id: string;
  name: string;
  symptoms: string[];
  causes: string[];
  prevention: string[];
  notes: string;
};

const cassavaDiseases: Disease[] = [
  {
    id: '1',
    name: 'Cassava Bacterial Blight',
    symptoms: [
      'Leaf wilting and yellowing',
      'Angular leaf spots with watery margins',
      'Dieback of shoots',
    ],
    causes: [
      'Caused by the bacterium Xanthomonas axonopodis pv. manihotis',
      'Spread through infected planting material and rain splash',
      'Favored by high humidity and warm temperatures',
    ],
    prevention: [
      'Use resistant cassava varieties recommended for Ghana',
      'Plant healthy cuttings from disease-free sources',
      'Practice crop rotation and field sanitation',
    ],
    notes: 'Bacterial blight is prevalent in humid areas like the forest zones of Ghana.',
  },
  {
    id: '2',
    name: 'Cassava Green Mite',
    symptoms: [
      'Leaf curling and distortion',
      'Chlorosis (yellowing) along leaf margins',
      'Stunted plant growth',
    ],
    causes: [
      'Caused by Mononychellus tanajoa (a mite)',
      'Favored by dry weather and poor soil conditions',
      'Spread through infested plant parts',
    ],
    prevention: [
      'Use mite-resistant varieties',
      'Apply neem-based biopesticides approved for local use',
      'Intercrop cassava with legumes to reduce mite population',
    ],
    notes: 'Mites are common in the savanna zones of Ghana during dry seasons.',
  },
  {
    id: '3',
    name: 'Cassava Mosaic Disease',
    symptoms: [
      'Mottling and mosaic patterns on leaves',
      'Leaf distortion and reduced leaf size',
      'Stunted growth and poor yield',
    ],
    causes: [
      'Caused by a group of geminiviruses',
      'Transmitted by whiteflies and infected cuttings',
      'Widespread in West Africa including Ghana',
    ],
    prevention: [
      'Use certified virus-free cuttings',
      'Remove and destroy infected plants promptly',
      'Control whitefly populations using yellow sticky traps',
    ],
    notes: 'This is the most widespread cassava disease in Ghana and affects yield significantly.',
  },
];

export default function CassavaArticle() {
  const [selectedDisease, setSelectedDisease] = useState<Disease | null>(null);

  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        source={require('../assets/images/cassava.webp')} // Ensure this image exists
        style={styles.headerImage}
        resizeMode="cover"
      >
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.7)']}
          style={styles.gradient}
        >
          <Text style={styles.cropTitle}>Cassava</Text>
        </LinearGradient>
      </ImageBackground>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About Cassava</Text>
        <Text style={styles.text}>
          Cassava is a staple crop widely grown in Ghana, especially in the Eastern, Volta, and Brong-Ahafo regions. It thrives in well-drained soils and is drought-tolerant, making it essential for food security. However, it is prone to several diseases that can reduce yield drastically.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Common Diseases</Text>
        {cassavaDiseases.map((disease) => (
          <TouchableOpacity
            key={disease.id}
            style={styles.diseaseButton}
            onPress={() => setSelectedDisease(disease)}
          >
            <Text style={styles.diseaseButtonText}>{disease.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {selectedDisease && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{selectedDisease.name}</Text>

          <Text style={styles.subSection}>Symptoms</Text>
          {selectedDisease.symptoms.map((item: string, idx: number) => (
            <Text key={idx} style={styles.text}>• {item}</Text>
          ))}

          <Text style={styles.subSection}>Causes</Text>
          {selectedDisease.causes.map((item: string, idx: number) => (
            <Text key={idx} style={styles.text}>• {item}</Text>
          ))}

          <Text style={styles.subSection}>Prevention</Text>
          {selectedDisease.prevention.map((item: string, idx: number) => (
            <Text key={idx} style={styles.text}>• {item}</Text>
          ))}

          <Text style={styles.subSection}>Notes</Text>
          <Text style={styles.text}>{selectedDisease.notes}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerImage: {
    height: 220,
    justifyContent: 'flex-end',
  },
  gradient: {
    height: 80,
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  cropTitle: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  subSection: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
    color: '#444',
  },
  text: {
    fontSize: 16,
    color: '#555',
    marginVertical: 2,
  },
  diseaseButton: {
    backgroundColor: '#cce5cc',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  diseaseButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
