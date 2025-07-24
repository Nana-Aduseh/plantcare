import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Animated, Dimensions } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"
import { LinearGradient } from "expo-linear-gradient"
import { useState, useEffect, useRef } from "react"
import { useUser, useAuth } from "@clerk/clerk-expo"

const { width: SCREEN_WIDTH } = Dimensions.get("window")
const SIDEBAR_WIDTH = 320

export default function HomePage() {
  const [sidebarVisible, setSidebarVisible] = useState(false)
  const slideAnim = useRef(new Animated.Value(SIDEBAR_WIDTH)).current
  const overlayOpacity = useRef(new Animated.Value(0)).current

  const { user } = useUser()
  const { signOut } = useAuth()

  

  const handleUserPress = () => {
    setSidebarVisible(true)
  }

  const closeSidebar = () => {
    setSidebarVisible(false)
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      setSidebarVisible(false)
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  useEffect(() => {
    if (sidebarVisible) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start()
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: SIDEBAR_WIDTH,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start()
    }
  }, [sidebarVisible])

  const userEmail = user?.emailAddresses[0]?.emailAddress || "No email found"
  const userName = user?.fullName || user?.firstName || "User"
  const userImage = user?.imageUrl

  const sidebarItems = [
    {
      icon: "person-outline",
      title: "Edit Profile",
      subtitle: "Update your personal information",
      onPress: () => {
        setSidebarVisible(false)
        console.log("Navigate to profile edit")
      },
    },
    {
      icon: "notifications-outline",
      title: "Notifications",
      subtitle: "Manage your notification preferences",
      onPress: () => {
        setSidebarVisible(false)
        console.log("Navigate to notifications")
      },
    },
    {
      icon: "bookmark-outline",
      title: "Saved Articles",
      subtitle: "View your bookmarked plant guides",
      onPress: () => {
        setSidebarVisible(false)
        console.log("Navigate to saved articles")
      },
    },
    {
      icon: "time-outline",
      title: "Scan History",
      subtitle: "Review your previous plant scans",
      onPress: () => {
        setSidebarVisible(false)
        console.log("Navigate to scan history")
      },
    },
    {
      icon: "settings-outline",
      title: "Settings",
      subtitle: "App preferences and configurations",
      onPress: () => {
        setSidebarVisible(false)
        console.log("Navigate to settings")
      },
    },
    {
      icon: "help-circle-outline",
      title: "Help & Support",
      subtitle: "Get help and contact support",
      onPress: () => {
        setSidebarVisible(false)
        router.push("/about")
      },
    },
  ]

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
            <TouchableOpacity onPress={handleUserPress} style={styles.userButton}>
              <Ionicons name="person-circle-outline" size={28} color="#16a34a" />
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

        {/* Quick Articles Preview */}
        <View style={styles.articlesPreview}>
          <View style={styles.previewHeader}>
            <Text style={styles.previewTitle}>Popular Plant Guides</Text>
            <TouchableOpacity onPress={() => router.push("/articles")}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            <TouchableOpacity style={styles.previewCard} onPress={() => router.push("/tomato")}>
              <Image source={require("../assets/images/tomato.jpg")} style={styles.previewImage} />
              <Text style={styles.previewCardTitle}>Tomato Care</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.previewCard} onPress={() => router.push("/cassava")}>
              <Image source={require("../assets/images/cassava.webp")} style={styles.previewImage} />
              <Text style={styles.previewCardTitle}>Cassava Guide</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.previewCard} onPress={() => router.push("/pepper")}>
              <Image source={require("../assets/images/pepper.jpg")} style={styles.previewImage} />
              <Text style={styles.previewCardTitle}>Pepper Tips</Text>
            </TouchableOpacity>
          </ScrollView>
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
        <TouchableOpacity style={styles.tabButton} onPress={() => router.push("/articles")}>
          <View style={styles.tabIconContainer}>
            <Ionicons name="library-outline" size={24} color="#6b7280" />
          </View>
          <Text style={styles.tabLabel}>Articles</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton} onPress={() => router.push("/about")}>
          <View style={styles.tabIconContainer}>
            <Ionicons name="information-circle-outline" size={24} color="#6b7280" />
          </View>
          <Text style={styles.tabLabel}>About</Text>
        </TouchableOpacity>
      </View>

      {/* Sidebar Overlay and Sidebar */}
      {sidebarVisible && (
        <>
          <Animated.View
            style={[
              styles.overlay,
              {
                opacity: overlayOpacity,
              },
            ]}
          >
            <TouchableOpacity style={styles.overlayTouch} onPress={closeSidebar} activeOpacity={1} />
          </Animated.View>

          <Animated.View
            style={[
              styles.sidebar,
              {
                transform: [{ translateX: slideAnim }],
              },
            ]}
          >
            {/* Header */}
            <View style={styles.sidebarHeader}>
              <TouchableOpacity onPress={closeSidebar} style={styles.closeButton}>
                <Ionicons name="close" size={24} color="#6b7280" />
              </TouchableOpacity>
            </View>

            {/* User Info */}
            <View style={styles.userInfo}>
              <View style={styles.avatarContainer}>
                {userImage ? (
                  <Image source={{ uri: userImage }} style={styles.avatar} />
                ) : (
                  <View style={styles.avatarPlaceholder}>
                    <Ionicons name="person" size={32} color="#16a34a" />
                  </View>
                )}
              </View>
              <Text style={styles.userName}>{userName}</Text>
              <Text style={styles.userEmail}>{userEmail}</Text>
            </View>

            {/* Menu Items */}
            <ScrollView style={styles.menuContainer}>
              {sidebarItems.map((item, index) => (
                <TouchableOpacity key={index} style={styles.menuItem} onPress={item.onPress}>
                  <View style={styles.menuIconContainer}>
                    <Ionicons name={item.icon as any} size={24} color="#16a34a" />
                  </View>
                  <View style={styles.menuContent}>
                    <Text style={styles.menuTitle}>{item.title}</Text>
                    <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Sign Out Button */}
            <View style={styles.footer}>
              <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
                <Ionicons name="log-out-outline" size={24} color="#dc2626" />
                <Text style={styles.signOutText}>Sign Out</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </>
      )}
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
  userButton: {
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
  articlesPreview: {
    padding: 20,
    backgroundColor: "#f9fafb",
  },
  previewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  previewTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
  },
  viewAllText: {
    fontSize: 14,
    color: "#16a34a",
    fontWeight: "600",
  },
  horizontalScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  previewCard: {
    width: 120,
    marginRight: 12,
    backgroundColor: "white",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  previewImage: {
    width: "100%",
    height: 80,
  },
  previewCardTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#111827",
    padding: 8,
    textAlign: "center",
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
  // Sidebar Styles
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 999,
  },
  overlayTouch: {
    flex: 1,
  },
  sidebar: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    width: SIDEBAR_WIDTH,
    backgroundColor: "white",
    paddingTop: 50,
    shadowColor: "#000",
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
    zIndex: 1000,
  },
  sidebarHeader: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  closeButton: {
    padding: 8,
  },
  userInfo: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#dcfce7",
    justifyContent: "center",
    alignItems: "center",
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: "#6b7280",
  },
  menuContainer: {
    flex: 1,
    paddingTop: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f9fafb",
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f0fdf4",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 12,
    color: "#6b7280",
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#f3f4f6",
  },
  signOutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: "#fef2f2",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#fecaca",
  },
  signOutText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#dc2626",
    marginLeft: 8,
  },
})
