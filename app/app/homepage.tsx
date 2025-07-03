// import React from 'react';
// import { View, Text, Alert, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { router } from 'expo-router';

// export default function HomePage() {
//   return (
//     <View style={{ flex: 1 }}>
//       <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
//         <View style={styles.header}>
//           <Text style={styles.headerText}>PlantCare</Text>
//           <TouchableOpacity
//             onPress={() =>
//               Alert.alert(
//                 "Crop Disease Detection",
//                 `This system focuses on diagnosing diseases in four key crops:\n\n
// • Tomato:
//   - Early blight
//   - Late blight
//   - Bacterial spot
//   - Tomato Yellow Leaf Curl Virus\n\n
// • Pepper (Bell Pepper):
//   - Bacterial spot\n\n
// • Maize (Corn):
//   - Leaf blight
//   - Leaf spot
//   - Streak virus\n\n
// • Cassava:
//   - Bacterial blight
//   - Green mite
//   - Mosaic`,
//                 [{ text: "OK", style: "default" }]
//               )
//             }
//           >
//             <Ionicons name="information-circle-outline" size={30} style={styles.icon} color="black" />
//           </TouchableOpacity>
//         </View>

//         <Image source={require('../assets/images/homee.jpeg')} style={styles.image} />

//         <TouchableOpacity style={styles.button} onPress={() => router.push('/diagnose')}>
//           <Ionicons name="camera" size={24} style={styles.icon2} color="white" />
//           <Text style={styles.buttonText}>Diagnose Your Plant</Text>
//         </TouchableOpacity>

//         <View style={styles.articlesHeader}>
//           <Text style={styles.artext}>Articles on Plants</Text>
//         </View>

//         <View style={{ marginTop: 10 }}>
//           <View style={styles.articleGrid}>
//             <TouchableOpacity style={styles.articleCard} onPress={() => router.push('/cassava')}>
//               <Image source={require('../assets/images/cassava.webp')} style={styles.articleImage} />
//               <Text style={styles.articleTitle}>Cassava</Text>
//             </TouchableOpacity>

//             <TouchableOpacity style={styles.articleCard} onPress={() => router.push('/tomato')}>
//               <Image source={require('../assets/images/tomato.jpg')} style={styles.articleImage} />
//               <Text style={styles.articleTitle}>Tomato</Text>
//             </TouchableOpacity>
//           </View>

//           <View style={styles.articleGrid}>
//             <TouchableOpacity style={styles.articleCard} onPress={() => router.push('/pepper')}>
//               <Image source={require('../assets/images/pepper.jpg')} style={styles.articleImage} />
//               <Text style={styles.articleTitle}>Pepper</Text>
//             </TouchableOpacity>

//             <TouchableOpacity style={styles.articleCard} onPress={() => router.push('/maize')}>
//               <Image source={require('../assets/images/corn.jpg')} style={styles.articleImage} />
//               <Text style={styles.articleTitle}>Maize</Text>
//             </TouchableOpacity>
//           </View>

//           <View style={[styles.articleGrid, { justifyContent: 'flex-start' }]}>
//             <TouchableOpacity style={styles.articleCard} onPress={() => router.push('/potato')}>
//               <Image source={require('../assets/images/potato.jpg')} style={styles.articleImage} />
//               <Text style={styles.articleTitle}>Potato</Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* Spacer to prevent tab bar overlap */}
//         <View style={{ height: 80 }} />
//       </ScrollView>

//       {/* Static Bottom Navigation Tab */}
//       <View style={styles.bottomTab}>
//         <TouchableOpacity style={styles.tabButton} onPress={() => router.push('/homepage')}>
//           <Ionicons name="home-outline" size={24} color="black" />
//           <Text style={styles.tabLabel}>Home</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.tabButton} onPress={() => router.push('/diagnose')}>
//           <Ionicons name="camera-outline" size={24} color="black" />
//           <Text style={styles.tabLabel}>Scan</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.tabButton} onPress={() => router.push('/chatbot')}>
//           <Ionicons name="chatbubble-ellipses-outline" size={24} color="black" />
//           <Text style={styles.tabLabel}>Chatbot</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     backgroundColor: '#ffffff',
//     padding: 20,
//     paddingBottom: 100, 
//   },
//   header: {
//     flexDirection: 'row',
//     marginTop: 15,
//   },
//   headerText: {
//     fontWeight: 'bold',
//     fontSize: 24,
//   },
//   icon: {
//     marginLeft: 210,
//   },
//   image: {
//     width: '100%',
//     height: 200,
//     marginTop: 20,
//     borderRadius: 20,
//   },
//   button: {
//     backgroundColor: '#4CAF50',
//     flexDirection: 'row',
//     paddingVertical: 12,
//     borderRadius: 12,
//     width: '100%',
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   icon2: {
//     marginLeft: '25%',
//     marginRight: 10,
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   articlesHeader: {
//     flexDirection: "row",
//     marginTop: 30,
//   },
//   artext: {
//     fontWeight: 'bold',
//     fontSize: 17,
//   },
//   articleGrid: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 16,
//   },
//   articleCard: {
//     width: '48%',
//     backgroundColor: '#F2F2F2',
//     borderRadius: 16,
//     padding: 8,
//     shadowColor: '#000',
//     shadowOpacity: 0.05,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   articleImage: {
//     width: '100%',
//     height: 140,
//     borderRadius: 12,
//   },
//   articleTitle: {
//     marginTop: 10,
//     fontSize: 16,
//     fontWeight: '600',
//     textAlign: 'center',
//     color: '#333',
//   },
//   bottomTab: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     backgroundColor: '#f2f2f2',
//     paddingVertical: 10,
//     borderTopWidth: 1,
//     borderColor: '#ccc',
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     height: 60,
//     zIndex: 100,
//   },
//   tabButton: {
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   tabLabel: {
//     fontSize: 12,
//     marginTop: 2,
//   },
// });




import { View, Text, Alert, TouchableOpacity, StyleSheet, ScrollView, Image } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"
import { LinearGradient } from "expo-linear-gradient"

export default function HomePage() {
  const handleInfoPress = () => {
    Alert.alert(
      "Crop Disease Detection",
      `This system focuses on diagnosing diseases in four key crops:\n\n• Tomato:\n  - Early blight\n  - Late blight\n  - Bacterial spot\n  - Tomato Yellow Leaf Curl Virus\n\n• Pepper (Bell Pepper):\n  - Bacterial spot\n\n• Maize (Corn):\n  - Leaf blight\n  - Leaf spot\n  - Streak virus\n\n• Cassava:\n  - Bacterial blight\n  - Green mite\n  - Mosaic`,
      [{ text: "OK", style: "default" }],
    )
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient colors={["#f0fdf4", "#ffffff"]} style={styles.headerGradient}>
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <View style={styles.logoIcon}>
                <Ionicons name="leaf" size={20} color="white" />
              </View>
              <Text style={styles.headerText}>PlantCare</Text>
            </View>
            <TouchableOpacity onPress={handleInfoPress} style={styles.infoButton}>
              <Ionicons name="information-circle-outline" size={28} color="#16a34a" />
            </TouchableOpacity>
          </View>

          {/* Hero Section */}
          <View style={styles.heroSection}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>🌱 AI-Powered Plant Health</Text>
            </View>
            <Text style={styles.heroTitle}>Keep Your Plants</Text>
            <Text style={styles.heroTitleAccent}>Healthy & Happy</Text>
            <Text style={styles.heroSubtitle}>
              Detect plant diseases instantly with AI-powered scanning, get expert advice from our chatbot, and learn
              from our comprehensive plant care articles.
            </Text>
          </View>

          {/* Hero Image */}
          <View style={styles.heroImageContainer}>
            <Image source={require("../assets/images/homee.jpeg")} style={styles.heroImage} />
            <View style={styles.accuracyBadge}>
              <View style={styles.accuracyDot} />
              <Text style={styles.accuracyText}>98% Accuracy</Text>
            </View>
          </View>

          {/* Main CTA Button */}
          <TouchableOpacity style={styles.mainButton} onPress={() => router.push("/diagnose")}>
            <LinearGradient colors={["#16a34a", "#15803d"]} style={styles.buttonGradient}>
              <Ionicons name="camera" size={24} color="white" />
              <Text style={styles.mainButtonText}>Scan Your Plant</Text>
            </LinearGradient>
          </TouchableOpacity>
        </LinearGradient>

        {/* Features Section */}
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>Everything You Need for Plant Care</Text>
          <Text style={styles.sectionSubtitle}>
            Our comprehensive platform combines cutting-edge AI technology with expert knowledge
          </Text>

          <View style={styles.featuresGrid}>
            {/* Disease Detection Feature */}
            <TouchableOpacity
              style={[styles.featureCard, styles.featureCardPrimary]}
              onPress={() => router.push("/diagnose")}
            >
              <View style={[styles.featureIcon, styles.featureIconGreen]}>
                <Ionicons name="scan" size={28} color="#16a34a" />
              </View>
              <Text style={styles.featureTitle}>Disease Detection</Text>
              <Text style={styles.featureDescription}>
                Instantly identify plant diseases and pests with our AI-powered camera scanner
              </Text>
              <View style={styles.featureStats}>
                <View style={styles.statItem}>
                  <Ionicons name="shield-checkmark" size={16} color="#16a34a" />
                  <Text style={styles.statText}>98% accuracy</Text>
                </View>
                <View style={styles.statItem}>
                  <Ionicons name="flash" size={16} color="#16a34a" />
                  <Text style={styles.statText}>Instant results</Text>
                </View>
              </View>
            </TouchableOpacity>

            {/* AI Chatbot Feature */}
            <TouchableOpacity
              style={[styles.featureCard, styles.featureCardSecondary]}
              onPress={() => router.push("/chatbot")}
            >
              <View style={[styles.featureIcon, styles.featureIconBlue]}>
                <Ionicons name="chatbubble-ellipses" size={28} color="#2563eb" />
              </View>
              <Text style={styles.featureTitle}>AI Plant Expert</Text>
              <Text style={styles.featureDescription}>
                Get personalized advice and answers to all your plant care questions 24/7
              </Text>
              <View style={styles.featureStats}>
                <View style={styles.statItem}>
                  <Ionicons name="time" size={16} color="#2563eb" />
                  <Text style={styles.statText}>24/7 available</Text>
                </View>
                <View style={styles.statItem}>
                  <Ionicons name="people" size={16} color="#2563eb" />
                  <Text style={styles.statText}>Expert knowledge</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Articles Section */}
        <View style={styles.articlesSection}>
          <View style={styles.articlesSectionHeader}>
            <View>
              <Text style={styles.articlesTitle}>Plant Care Guides</Text>
              <Text style={styles.articlesSubtitle}>Learn about different plant species and their care</Text>
            </View>
          </View>

          <View style={styles.articlesGrid}>
            <View style={styles.articleRow}>
              <TouchableOpacity style={styles.modernArticleCard} onPress={() => router.push("/cassava")}>
                <Image source={require("../assets/images/cassava.webp")} style={styles.modernArticleImage} />
                <View style={styles.articleContent}>
                  <View style={styles.articleBadge}>
                    <Text style={styles.articleBadgeText}>Root Crop</Text>
                  </View>
                  <Text style={styles.modernArticleTitle}>Cassava</Text>
                  <Text style={styles.articleExcerpt}>Learn about cassava diseases and proper care techniques</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.modernArticleCard} onPress={() => router.push("/tomato")}>
                <Image source={require("../assets/images/tomato.jpg")} style={styles.modernArticleImage} />
                <View style={styles.articleContent}>
                  <View style={styles.articleBadge}>
                    <Text style={styles.articleBadgeText}>Fruit</Text>
                  </View>
                  <Text style={styles.modernArticleTitle}>Tomato</Text>
                  <Text style={styles.articleExcerpt}>Comprehensive guide to tomato plant health and diseases</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.articleRow}>
              <TouchableOpacity style={styles.modernArticleCard} onPress={() => router.push("/pepper")}>
                <Image source={require("../assets/images/pepper.jpg")} style={styles.modernArticleImage} />
                <View style={styles.articleContent}>
                  <View style={styles.articleBadge}>
                    <Text style={styles.articleBadgeText}>Vegetable</Text>
                  </View>
                  <Text style={styles.modernArticleTitle}>Pepper</Text>
                  <Text style={styles.articleExcerpt}>Essential tips for growing healthy pepper plants</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.modernArticleCard} onPress={() => router.push("/maize")}>
                <Image source={require("../assets/images/corn.jpg")} style={styles.modernArticleImage} />
                <View style={styles.articleContent}>
                  <View style={styles.articleBadge}>
                    <Text style={styles.articleBadgeText}>Grain</Text>
                  </View>
                  <Text style={styles.modernArticleTitle}>Maize</Text>
                  <Text style={styles.articleExcerpt}>Complete guide to corn cultivation and disease prevention</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={[styles.articleRow, styles.singleArticleRow]}>
              <TouchableOpacity style={styles.modernArticleCard} onPress={() => router.push("/potato")}>
                <Image source={require("../assets/images/potato.jpg")} style={styles.modernArticleImage} />
                <View style={styles.articleContent}>
                  <View style={styles.articleBadge}>
                    <Text style={styles.articleBadgeText}>Tuber</Text>
                  </View>
                  <Text style={styles.modernArticleTitle}>Potato</Text>
                  <Text style={styles.articleExcerpt}>Master potato growing with our expert care guide</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Bottom Spacer */}
        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomTab}>
        <TouchableOpacity style={styles.tabButton} onPress={() => router.push("/homepage")}>
          <View style={[styles.tabIconContainer, styles.activeTab]}>
            <Ionicons name="home" size={24} color="#16a34a" />
          </View>
          <Text style={[styles.tabLabel, styles.activeTabLabel]}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabButton} onPress={() => router.push("/diagnose")}>
          <View style={styles.tabIconContainer}>
            <Ionicons name="camera-outline" size={24} color="#6b7280" />
          </View>
          <Text style={styles.tabLabel}>Scan</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabButton} onPress={() => router.push("/chatbot")}>
          <View style={styles.tabIconContainer}>
            <Ionicons name="chatbubble-ellipses-outline" size={24} color="#6b7280" />
          </View>
          <Text style={styles.tabLabel}>Chatbot</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 80,
  },
  headerGradient: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoIcon: {
    width: 32,
    height: 32,
    backgroundColor: "#16a34a",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
  },
  infoButton: {
    padding: 4,
  },
  heroSection: {
    alignItems: "center",
    marginBottom: 20,
  },
  badge: {
    backgroundColor: "#dcfce7",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 16,
  },
  badgeText: {
    color: "#166534",
    fontSize: 14,
    fontWeight: "600",
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#111827",
    textAlign: "center",
    lineHeight: 42,
  },
  heroTitleAccent: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#16a34a",
    textAlign: "center",
    lineHeight: 42,
    marginBottom: 16,
  },
  heroSubtitle: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  heroImageContainer: {
    position: "relative",
    marginVertical: 20,
  },
  heroImage: {
    width: "100%",
    height: 200,
    borderRadius: 16,
  },
  accuracyBadge: {
    position: "absolute",
    top: 12,
    left: 12,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  accuracyDot: {
    width: 8,
    height: 8,
    backgroundColor: "#16a34a",
    borderRadius: 4,
    marginRight: 6,
  },
  accuracyText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#111827",
  },
  mainButton: {
    borderRadius: 12,
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
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  mainButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 8,
  },
  featuresSection: {
    padding: 20,
    backgroundColor: "#ffffff",
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111827",
    textAlign: "center",
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 32,
  },
  featuresGrid: {
    gap: 16,
  },
  featureCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    marginBottom: 16,
  },
  featureCardPrimary: {
    borderLeftWidth: 4,
    borderLeftColor: "#16a34a",
  },
  featureCardSecondary: {
    borderLeftWidth: 4,
    borderLeftColor: "#2563eb",
  },
  featureIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  featureIconGreen: {
    backgroundColor: "#dcfce7",
  },
  featureIconBlue: {
    backgroundColor: "#dbeafe",
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 14,
    color: "#6b7280",
    lineHeight: 20,
    marginBottom: 16,
  },
  featureStats: {
    gap: 8,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  statText: {
    fontSize: 12,
    color: "#6b7280",
    marginLeft: 6,
    fontWeight: "500",
  },
  articlesSection: {
    padding: 20,
    backgroundColor: "#f9fafb",
  },
  articlesSectionHeader: {
    marginBottom: 24,
  },
  articlesTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 4,
  },
  articlesSubtitle: {
    fontSize: 16,
    color: "#6b7280",
  },
  articlesGrid: {
    gap: 16,
  },
  articleRow: {
    flexDirection: "row",
    gap: 12,
  },
  singleArticleRow: {
    justifyContent: "flex-start",
  },
  modernArticleCard: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  modernArticleImage: {
    width: "100%",
    height: 120,
  },
  articleContent: {
    padding: 12,
  },
  articleBadge: {
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  articleBadgeText: {
    fontSize: 10,
    color: "#6b7280",
    fontWeight: "600",
    textTransform: "uppercase",
  },
  modernArticleTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 4,
  },
  articleExcerpt: {
    fontSize: 12,
    color: "#6b7280",
    lineHeight: 16,
  },
  bottomSpacer: {
    height: 20,
  },
  bottomTab: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 8,
  },
  tabButton: {
    alignItems: "center",
    flex: 1,
  },
  tabIconContainer: {
    padding: 4,
  },
  activeTab: {
    backgroundColor: "#dcfce7",
    borderRadius: 8,
  },
  tabLabel: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 4,
    fontWeight: "500",
  },
  activeTabLabel: {
    color: "#16a34a",
    fontWeight: "600",
  },
})
