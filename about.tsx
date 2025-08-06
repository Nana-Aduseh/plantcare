import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"
import { LinearGradient } from "expo-linear-gradient"

export default function AboutPage() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient colors={["#f0fdf4", "#ffffff"]} style={styles.headerGradient}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="#16a34a" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>About PlantCare</Text>
            <View style={styles.placeholder} />
          </View>
        </LinearGradient>

        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.logoContainer}>
            <View style={styles.logoIcon}>
              <Ionicons name="leaf" size={40} color="white" />
            </View>
            <Text style={styles.appName}>PlantCare</Text>
          </View>
          <Text style={styles.tagline}>AI-Powered Plant Health Assistant</Text>
          <Text style={styles.version}>Version 1.0.0</Text>
        </View>

        {/* Mission Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Mission</Text>
          <Text style={styles.sectionText}>
            PlantCare is dedicated to helping farmers, gardeners, and plant enthusiasts maintain healthy crops and
            plants through cutting-edge AI technology. We believe that early disease detection and proper plant care
            knowledge can significantly improve agricultural productivity and food security.
          </Text>
        </View>

        {/* Features Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What We Offer</Text>
          <View style={styles.featuresList}>
            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Ionicons name="scan" size={24} color="#16a34a" />
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>AI Disease Detection</Text>
                <Text style={styles.featureDescription}>
                  Advanced machine learning algorithms to identify plant diseases with 98% accuracy
                </Text>
              </View>
            </View>

            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Ionicons name="chatbubble-ellipses" size={24} color="#16a34a" />
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>Expert AI Chatbot</Text>
                <Text style={styles.featureDescription}>
                  24/7 plant care assistance with personalized advice and treatment recommendations
                </Text>
              </View>
            </View>

            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Ionicons name="library" size={24} color="#16a34a" />
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>Comprehensive Guides</Text>
                <Text style={styles.featureDescription}>
                  Detailed articles and care guides for various plant species and common diseases
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Supported Crops */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Supported Crops</Text>
          <Text style={styles.sectionText}>
            Our AI system specializes in detecting diseases for these key agricultural crops:
          </Text>
          <View style={styles.cropsList}>
            <View style={styles.cropItem}>
              <Text style={styles.cropName}>🍅 Tomato</Text>
              <Text style={styles.cropDiseases}>Early blight, Late blight, Bacterial spot, TYLCV</Text>
            </View>
            <View style={styles.cropItem}>
              <Text style={styles.cropName}>🌶️ Pepper</Text>
              <Text style={styles.cropDiseases}>Bacterial spot</Text>
            </View>
            <View style={styles.cropItem}>
              <Text style={styles.cropName}>🌽 Maize</Text>
              <Text style={styles.cropDiseases}>Leaf blight, Leaf spot, Streak virus</Text>
            </View>
            <View style={styles.cropItem}>
              <Text style={styles.cropName}>🥔 Cassava</Text>
              <Text style={styles.cropDiseases}>Bacterial blight, Green mite, Mosaic</Text>
            </View>
          </View>
        </View>

        {/* Technology Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Technology</Text>
          <Text style={styles.sectionText}>
            PlantCare leverages state-of-the-art deep learning models trained on thousands of plant images. Our AI
            system uses convolutional neural networks (CNNs) to analyze plant leaf patterns, discoloration, and other
            visual symptoms to provide accurate disease identification.
          </Text>
        </View>

        {/* Contact Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact & Support</Text>
          <View style={styles.contactInfo}>
            <View style={styles.contactItem}>
              <Ionicons name="mail" size={20} color="#16a34a" />
              <Text style={styles.contactText}>support@plantcare.app</Text>
            </View>
            <View style={styles.contactItem}>
              <Ionicons name="globe" size={20} color="#16a34a" />
              <Text style={styles.contactText}>www.plantcare.app</Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2024 PlantCare. All rights reserved.</Text>
          <Text style={styles.footerSubtext}>Made with ❤️ for farmers and plant lovers worldwide</Text>
        </View>

        {/* Bottom Spacer */}
        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomTab}>
        <TouchableOpacity style={styles.tabButton} onPress={() => router.push("/homepage")}>
          <View style={styles.tabIconContainer}>
            <Ionicons name="home-outline" size={24} color="#6b7280" />
          </View>
          <Text style={styles.tabLabel}>Home</Text>
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
        <TouchableOpacity style={styles.tabButton} onPress={() => router.push("/articles")}>
          <View style={styles.tabIconContainer}>
            <Ionicons name="library-outline" size={24} color="#6b7280" />
          </View>
          <Text style={styles.tabLabel}>Articles</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton} onPress={() => router.push("/about")}>
          <View style={[styles.tabIconContainer, styles.activeTab]}>
            <Ionicons name="information-circle" size={24} color="#16a34a" />
          </View>
          <Text style={[styles.tabLabel, styles.activeTabLabel]}>About</Text>
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
    paddingBottom: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
  },
  placeholder: {
    width: 40,
  },
  heroSection: {
    padding: 40,
    alignItems: "center",
    backgroundColor: "#f9fafb",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  logoIcon: {
    width: 80,
    height: 80,
    backgroundColor: "#16a34a",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  appName: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#111827",
  },
  tagline: {
    fontSize: 18,
    color: "#16a34a",
    fontWeight: "600",
    marginBottom: 8,
  },
  version: {
    fontSize: 14,
    color: "#6b7280",
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 16,
    color: "#6b7280",
    lineHeight: 24,
  },
  featuresList: {
    gap: 16,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  featureIcon: {
    width: 48,
    height: 48,
    backgroundColor: "#dcfce7",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: "#6b7280",
    lineHeight: 20,
  },
  cropsList: {
    marginTop: 16,
    gap: 12,
  },
  cropItem: {
    backgroundColor: "#f9fafb",
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#16a34a",
  },
  cropName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 4,
  },
  cropDiseases: {
    fontSize: 14,
    color: "#6b7280",
  },
  contactInfo: {
    gap: 12,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  contactText: {
    fontSize: 16,
    color: "#6b7280",
    marginLeft: 12,
  },
  footer: {
    padding: 20,
    alignItems: "center",
    backgroundColor: "#f9fafb",
  },
  footerText: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 12,
    color: "#9ca3af",
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
