import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const tomatoDiseases = [
  {
    id: '1',
    name: 'Early Blight',
    symptoms: ['Dark spots with concentric rings on older leaves', 'Yellowing around affected areas'],
    causes: ['Fungus *Alternaria solani*', 'Warm, moist conditions'],
    prevention: ['Crop rotation', 'Use clean seeds', 'Avoid overhead watering', 'Use fungicides'],
    notes: 'Common during Ghana’s rainy seasons in densely planted farms.',
  },
  {
    id: '2',
    name: 'Late Blight',
    symptoms: ['Water-soaked lesions', 'White fungal growth', 'Fruit rot'],
    causes: ['*Phytophthora infestans*', 'High humidity & cool nights'],
    prevention: ['Remove infected plants', 'Improve drainage', 'Apply fungicides early'],
    notes: 'Spreads fast in Ashanti and Eastern Regions during wet periods.',
  },
  {
    id: '3',
    name: 'Bacterial Spot',
    symptoms: ['Small dark lesions with yellow halos', 'Fruit spotting and cracking'],
    causes: ['Bacteria from rain splash or contaminated tools'],
    prevention: ['Copper sprays', 'Sanitize tools', 'Proper spacing'],
    notes: 'Thrives in humid coastal zones of Ghana.',
  },
  {
    id: '4',
    name: 'Tomato Yellow Leaf Curl Virus (TYLCV)',
    symptoms: ['Yellow curling leaves', 'Stunted growth', 'Poor fruiting'],
    causes: ['Spread by whiteflies', 'Favored in hot, dry climates'],
    prevention: ['Resistant varieties', 'Neem sprays', 'Destroy infected plants'],
    notes: 'Common in northern Ghana and dry season farms.',
  },
];

export default function TomatoArticle() {
  const [selectedDisease, setSelectedDisease] = useState<null | typeof tomatoDiseases[0]>(null);
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>

      <ImageBackground
        source={require('../assets/images/tomato.jpg')}
        style={styles.headerImage}
        resizeMode="cover"
      >
        
        <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.7)']}
                  style={styles.gradient}
                >
                  <Text style={styles.cropTitle}>Tomato</Text>
                </LinearGradient>
        
      </ImageBackground>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>General Information</Text>
        <Text style={styles.paragraph}>
          Tomatoes are essential in Ghanaian cuisine and are widely grown in regions like Ashanti,
          Upper East, and Brong-Ahafo. They thrive in well-drained loamy soil with regular sunlight.
          However, they’re vulnerable to several diseases that reduce yield and quality.
        </Text>

        <Text style={styles.sectionTitle}>Tap a Disease to Learn More</Text>
        <FlatList
          data={tomatoDiseases}
          horizontal
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.diseaseButton}
              onPress={() => setSelectedDisease(item)}
            >
              <Text style={styles.diseaseButtonText}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />

        {selectedDisease && (
          <View style={styles.diseaseDetails}>
            <Text style={styles.diseaseTitle}>{selectedDisease.name}</Text>
            <Text style={styles.subheading}>Symptoms:</Text>
            {selectedDisease.symptoms.map((item, idx) => (
              <Text key={idx} style={styles.listItem}>• {item}</Text>
            ))}
            <Text style={styles.subheading}>Causes:</Text>
            {selectedDisease.causes.map((item, idx) => (
              <Text key={idx} style={styles.listItem}>• {item}</Text>
            ))}
            <Text style={styles.subheading}>Prevention:</Text>
            {selectedDisease.prevention.map((item, idx) => (
              <Text key={idx} style={styles.listItem}>• {item}</Text>
            ))}
            <Text style={styles.subheading}>Notes:</Text>
            <Text style={styles.paragraph}>{selectedDisease.notes}</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 16,
    zIndex: 2,
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 20,
    elevation: 3,
  },
  headerImage: {
    height: 220,
    justifyContent: 'flex-end',
  },
  gradient: {
    height: 70,
    justifyContent: 'flex-end',
    padding: 16,
  },
  cropTitle: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
  },
  content: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 7,
    marginBottom: 8,
    color: '#1E3D59',
  },
  paragraph: {
    fontSize: 16,
    color: '#333333',
    lineHeight: 22,
  },
  diseaseButton: {
    backgroundColor: '#E2E8F0',
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginRight: 10,
    borderRadius: 20,
  },
  diseaseButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1A202C',
  },
  diseaseDetails: {
    marginTop: 20,
    backgroundColor: '#F1F5F9',
    borderRadius: 10,
    padding: 16,
  },
  diseaseTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#D32F2F',
  },
  subheading: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 4,
    color: '#2D3748',
  },
  listItem: {
    fontSize: 16,
    marginLeft: 8,
    color: '#4A5568',
  },
});
