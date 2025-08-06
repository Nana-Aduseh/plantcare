import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"
import { LinearGradient } from "expo-linear-gradient"

export default function ArticlesPage() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient colors={["#f0fdf4", "#ffffff"]} style={styles.headerGradient}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="#16a34a" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Plant Care Articles</Text>
            <View style={styles.placeholder} />
          </View>
        </LinearGradient>

        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Comprehensive Plant Care Guides</Text>
          <Text style={styles.heroSubtitle}>
            Discover expert knowledge about different plant species, their diseases, and proper care techniques
          </Text>
        </View>

        {/* Featured Article */}
        <View style={styles.featuredSection}>
          <Text style={styles.sectionTitle}>Featured Guide</Text>
          <TouchableOpacity style={styles.featuredCard} onPress={() => router.push("/tomato")}>
            <Image source={require("../assets/images/tomato.jpg")} style={styles.featuredImage} />
            <View style={styles.featuredOverlay}>
              <View style={styles.featuredBadge}>
                <Text style={styles.featuredBadgeText}>Most Popular</Text>
              </View>
              <Text style={styles.featuredTitle}>Complete Tomato Care Guide</Text>
              <Text style={styles.featuredDescription}>
                Learn everything about tomato diseases, prevention, and treatment methods
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* All Articles Grid */}
        <View style={styles.articlesSection}>
          <Text style={styles.sectionTitle}>All Plant Guides</Text>
          <View style={styles.articlesGrid}>
            <View style={styles.articleRow}>
              <TouchableOpacity style={styles.articleCard} onPress={() => router.push("/cassava")}>
                <Image source={require("../assets/images/cassava.webp")} style={styles.articleImage} />
                <View style={styles.articleContent}>
                  <View style={styles.articleBadge}>
                    <Text style={styles.articleBadgeText}>Root Crop</Text>
                  </View>
                  <Text style={styles.articleTitle}>Cassava</Text>
                  <Text style={styles.articleExcerpt}>Learn about cassava diseases and proper care techniques</Text>
                  <View style={styles.articleMeta}>
                    <Ionicons name="time-outline" size={14} color="#6b7280" />
                    <Text style={styles.readTime}>5 min read</Text>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.articleCard} onPress={() => router.push("/tomato")}>
                <Image source={require("../assets/images/tomato.jpg")} style={styles.articleImage} />
                <View style={styles.articleContent}>
                  <View style={styles.articleBadge}>
                    <Text style={styles.articleBadgeText}>Fruit</Text>
                  </View>
                  <Text style={styles.articleTitle}>Tomato</Text>
                  <Text style={styles.articleExcerpt}>Comprehensive guide to tomato plant health and diseases</Text>
                  <View style={styles.articleMeta}>
                    <Ionicons name="time-outline" size={14} color="#6b7280" />
                    <Text style={styles.readTime}>7 min read</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.articleRow}>
              <TouchableOpacity style={styles.articleCard} onPress={() => router.push("/pepper")}>
                <Image source={require("../assets/images/pepper.jpg")} style={styles.articleImage} />
                <View style={styles.articleContent}>
                  <View style={styles.articleBadge}>
                    <Text style={styles.articleBadgeText}>Vegetable</Text>
                  </View>
                  <Text style={styles.articleTitle}>Pepper</Text>
                  <Text style={styles.articleExcerpt}>Essential tips for growing healthy pepper plants</Text>
                  <View style={styles.articleMeta}>
                    <Ionicons name="time-outline" size={14} color="#6b7280" />
                    <Text style={styles.readTime}>4 min read</Text>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.articleCard} onPress={() => router.push("/maize")}>
                <Image source={require("../assets/images/corn.jpg")} style={styles.articleImage} />
                <View style={styles.articleContent}>
                  <View style={styles.articleBadge}>
                    <Text style={styles.articleBadgeText}>Grain</Text>
                  </View>
                  <Text style={styles.articleTitle}>Maize</Text>
                  <Text style={styles.articleExcerpt}>Complete guide to corn cultivation and disease prevention</Text>
                  <View style={styles.articleMeta}>
                    <Ionicons name="time-outline" size={14} color="#6b7280" />
                    <Text style={styles.readTime}>6 min read</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>

            <View style={[styles.articleRow, styles.singleArticleRow]}>
              <TouchableOpacity style={styles.articleCard} onPress={() => router.push("/potato")}>
                <Image source={require("../assets/images/potato.jpg")} style={styles.articleImage} />
                <View style={styles.articleContent}>
                  <View style={styles.articleBadge}>
                    <Text style={styles.articleBadgeText}>Tuber</Text>
                  </View>
                  <Text style={styles.articleTitle}>Potato</Text>
                  <Text style={styles.articleExcerpt}>Master potato growing with our expert care guide</Text>
                  <View style={styles.articleMeta}>
                    <Ionicons name="time-outline" size={14} color="#6b7280" />
                    <Text style={styles.readTime}>5 min read</Text>
                  </View>
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
          <View style={[styles.tabIconContainer, styles.activeTab]}>
            <Ionicons name="library" size={24} color="#16a34a" />
          </View>
          <Text style={[styles.tabLabel, styles.activeTabLabel]}>Articles</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton} onPress={() => router.push("/about")}>
          <View style={styles.tabIconContainer}>
            <Ionicons name="information-circle-outline" size={24} color="#6b7280" />
          </View>
          <Text style={styles.tabLabel}>About</Text>
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
    padding: 20,
    alignItems: "center",
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111827",
    textAlign: "center",
    marginBottom: 12,
  },
  heroSubtitle: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 24,
  },
  featuredSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 16,
  },
  featuredCard: {
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  featuredImage: {
    width: "100%",
    height: 200,
  },
  featuredOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    // background: "linear-gradient(transparent, rgba(0,0,0,0.7))",
    padding: 20,
  },
  featuredBadge: {
    backgroundColor: "#16a34a",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  featuredBadgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
  featuredTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 8,
  },
  featuredDescription: {
    fontSize: 14,
    color: "white",
    opacity: 0.9,
  },
  articlesSection: {
    padding: 20,
    backgroundColor: "#f9fafb",
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
  articleCard: {
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
  articleImage: {
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
  articleTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 4,
  },
  articleExcerpt: {
    fontSize: 12,
    color: "#6b7280",
    lineHeight: 16,
    marginBottom: 8,
  },
  articleMeta: {
    flexDirection: "row",
    alignItems: "center",
  },
  readTime: {
    fontSize: 11,
    color: "#6b7280",
    marginLeft: 4,
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
