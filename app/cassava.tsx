// import React, { useState } from 'react';
// import { View, Text, StyleSheet, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';

// type Disease = {
//   id: string;
//   name: string;
//   symptoms: string[];
//   causes: string[];
//   prevention: string[];
//   notes: string;
// };

// const cassavaDiseases: Disease[] = [
//   {
//     id: '1',
//     name: 'Cassava Bacterial Blight',
//     symptoms: [
//       'Leaf wilting and yellowing',
//       'Angular leaf spots with watery margins',
//       'Dieback of shoots',
//     ],
//     causes: [
//       'Caused by the bacterium Xanthomonas axonopodis pv. manihotis',
//       'Spread through infected planting material and rain splash',
//       'Favored by high humidity and warm temperatures',
//     ],
//     prevention: [
//       'Use resistant cassava varieties recommended for Ghana',
//       'Plant healthy cuttings from disease-free sources',
//       'Practice crop rotation and field sanitation',
//     ],
//     notes: 'Bacterial blight is prevalent in humid areas like the forest zones of Ghana.',
//   },
//   {
//     id: '2',
//     name: 'Cassava Green Mite',
//     symptoms: [
//       'Leaf curling and distortion',
//       'Chlorosis (yellowing) along leaf margins',
//       'Stunted plant growth',
//     ],
//     causes: [
//       'Caused by Mononychellus tanajoa (a mite)',
//       'Favored by dry weather and poor soil conditions',
//       'Spread through infested plant parts',
//     ],
//     prevention: [
//       'Use mite-resistant varieties',
//       'Apply neem-based biopesticides approved for local use',
//       'Intercrop cassava with legumes to reduce mite population',
//     ],
//     notes: 'Mites are common in the savanna zones of Ghana during dry seasons.',
//   },
//   {
//     id: '3',
//     name: 'Cassava Mosaic Disease',
//     symptoms: [
//       'Mottling and mosaic patterns on leaves',
//       'Leaf distortion and reduced leaf size',
//       'Stunted growth and poor yield',
//     ],
//     causes: [
//       'Caused by a group of geminiviruses',
//       'Transmitted by whiteflies and infected cuttings',
//       'Widespread in West Africa including Ghana',
//     ],
//     prevention: [
//       'Use certified virus-free cuttings',
//       'Remove and destroy infected plants promptly',
//       'Control whitefly populations using yellow sticky traps',
//     ],
//     notes: 'This is the most widespread cassava disease in Ghana and affects yield significantly.',
//   },
// ];

// export default function CassavaArticle() {
//   const [selectedDisease, setSelectedDisease] = useState<Disease | null>(null);

//   return (
//     <ScrollView style={styles.container}>
//       <ImageBackground
//         source={require('../assets/images/cassava.webp')} // Ensure this image exists
//         style={styles.headerImage}
//         resizeMode="cover"
//       >
//         <LinearGradient
//           colors={['transparent', 'rgba(0,0,0,0.7)']}
//           style={styles.gradient}
//         >
//           <Text style={styles.cropTitle}>Cassava</Text>
//         </LinearGradient>
//       </ImageBackground>

//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>About Cassava</Text>
//         <Text style={styles.text}>
//           Cassava is a staple crop widely grown in Ghana, especially in the Eastern, Volta, and Brong-Ahafo regions. It thrives in well-drained soils and is drought-tolerant, making it essential for food security. However, it is prone to several diseases that can reduce yield drastically.
//         </Text>
//       </View>

//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Common Diseases</Text>
//         {cassavaDiseases.map((disease) => (
//           <TouchableOpacity
//             key={disease.id}
//             style={styles.diseaseButton}
//             onPress={() => setSelectedDisease(disease)}
//           >
//             <Text style={styles.diseaseButtonText}>{disease.name}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>

//       {selectedDisease && (
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>{selectedDisease.name}</Text>

//           <Text style={styles.subSection}>Symptoms</Text>
//           {selectedDisease.symptoms.map((item: string, idx: number) => (
//             <Text key={idx} style={styles.text}>• {item}</Text>
//           ))}

//           <Text style={styles.subSection}>Causes</Text>
//           {selectedDisease.causes.map((item: string, idx: number) => (
//             <Text key={idx} style={styles.text}>• {item}</Text>
//           ))}

//           <Text style={styles.subSection}>Prevention</Text>
//           {selectedDisease.prevention.map((item: string, idx: number) => (
//             <Text key={idx} style={styles.text}>• {item}</Text>
//           ))}

//           <Text style={styles.subSection}>Notes</Text>
//           <Text style={styles.text}>{selectedDisease.notes}</Text>
//         </View>
//       )}
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//   },
//   headerImage: {
//     height: 220,
//     justifyContent: 'flex-end',
//   },
//   gradient: {
//     height: 80,
//     justifyContent: 'flex-end',
//     paddingHorizontal: 16,
//     paddingVertical: 10,
//   },
//   cropTitle: {
//     fontSize: 30,
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   section: {
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//   },
//   sectionTitle: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 6,
//   },
//   subSection: {
//     fontSize: 18,
//     fontWeight: '600',
//     marginTop: 10,
//     color: '#444',
//   },
//   text: {
//     fontSize: 16,
//     color: '#555',
//     marginVertical: 2,
//   },
//   diseaseButton: {
//     backgroundColor: '#cce5cc',
//     padding: 10,
//     borderRadius: 10,
//     marginVertical: 5,
//   },
//   diseaseButtonText: {
//     fontSize: 16,
//     fontWeight: '500',
//   },
// });




"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ImageBackground, ScrollView, TouchableOpacity } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { Ionicons } from "@expo/vector-icons"

type Disease = {
  id: string
  name: string
  symptoms: string[]
  causes: string[]
  prevention: string[]
  notes: string
  severity: "High" | "Medium" | "Low"
  icon: keyof typeof Ionicons.glyphMap
}

const cassavaDiseases: Disease[] = [
  {
    id: "1",
    name: "Cassava Bacterial Blight",
    severity: "High",
    icon: "warning",
    symptoms: ["Leaf wilting and yellowing", "Angular leaf spots with watery margins", "Dieback of shoots"],
    causes: [
      "Caused by the bacterium Xanthomonas axonopodis pv. manihotis",
      "Spread through infected planting material and rain splash",
      "Favored by high humidity and warm temperatures",
    ],
    prevention: [
      "Use resistant cassava varieties recommended for Ghana",
      "Plant healthy cuttings from disease-free sources",
      "Practice crop rotation and field sanitation",
    ],
    notes: "Bacterial blight is prevalent in humid areas like the forest zones of Ghana.",
  },
  {
    id: "2",
    name: "Cassava Green Mite",
    severity: "Medium",
    icon: "bug",
    symptoms: ["Leaf curling and distortion", "Chlorosis (yellowing) along leaf margins", "Stunted plant growth"],
    causes: [
      "Caused by Mononychellus tanajoa (a mite)",
      "Favored by dry weather and poor soil conditions",
      "Spread through infested plant parts",
    ],
    prevention: [
      "Use mite-resistant varieties",
      "Apply neem-based biopesticides approved for local use",
      "Intercrop cassava with legumes to reduce mite population",
    ],
    notes: "Mites are common in the savanna zones of Ghana during dry seasons.",
  },
  {
    id: "3",
    name: "Cassava Mosaic Disease",
    severity: "High",
    icon: "leaf",
    symptoms: [
      "Mottling and mosaic patterns on leaves",
      "Leaf distortion and reduced leaf size",
      "Stunted growth and poor yield",
    ],
    causes: [
      "Caused by a group of geminiviruses",
      "Transmitted by whiteflies and infected cuttings",
      "Widespread in West Africa including Ghana",
    ],
    prevention: [
      "Use certified virus-free cuttings",
      "Remove and destroy infected plants promptly",
      "Control whitefly populations using yellow sticky traps",
    ],
    notes: "This is the most widespread cassava disease in Ghana and affects yield significantly.",
  },
]

export default function CassavaArticle() {
  const [selectedDisease, setSelectedDisease] = useState<Disease | null>(null)

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "High":
        return "#ef4444"
      case "Medium":
        return "#f59e0b"
      case "Low":
        return "#10b981"
      default:
        return "#6b7280"
    }
  }

  const getSeverityBgColor = (severity: string) => {
    switch (severity) {
      case "High":
        return "#fef2f2"
      case "Medium":
        return "#fffbeb"
      case "Low":
        return "#f0fdf4"
      default:
        return "#f9fafb"
    }
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero Header */}
      <ImageBackground source={require("../assets/images/cassava.webp")} style={styles.headerImage} resizeMode="cover">
        <LinearGradient colors={["rgba(0,0,0,0.3)", "rgba(0,0,0,0.7)"]} style={styles.gradient}>
          <View style={styles.headerContent}>
            <View style={styles.cropBadge}>
              <Ionicons name="leaf" size={16} color="#16a34a" />
              <Text style={styles.cropBadgeText}>Root Crop</Text>
            </View>
            <Text style={styles.cropTitle}>Cassava</Text>
            <Text style={styles.cropSubtitle}>Manihot esculenta</Text>
          </View>
        </LinearGradient>
      </ImageBackground>

      {/* About Section */}
      <View style={styles.contentContainer}>
        <View style={styles.aboutCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="information-circle" size={24} color="#16a34a" />
            <Text style={styles.sectionTitle}>About Cassava</Text>
          </View>
          <Text style={styles.aboutText}>
            Cassava is a staple crop widely grown in Ghana, especially in the Eastern, Volta, and Brong-Ahafo regions.
            It thrives in well-drained soils and is drought-tolerant, making it essential for food security. However, it
            is prone to several diseases that can reduce yield drastically.
          </Text>

          {/* Quick Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Ionicons name="location" size={20} color="#6b7280" />
              <Text style={styles.statLabel}>Growing Regions</Text>
              <Text style={styles.statValue}>Eastern, Volta, Brong-Ahafo</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="water" size={20} color="#6b7280" />
              <Text style={styles.statLabel}>Water Needs</Text>
              <Text style={styles.statValue}>Drought Tolerant</Text>
            </View>
          </View>
        </View>

        {/* Diseases Section */}
        <View style={styles.diseasesSection}>
          <View style={styles.sectionHeader}>
            <Ionicons name="medical" size={24} color="#dc2626" />
            <Text style={styles.sectionTitle}>Common Diseases</Text>
          </View>
          <Text style={styles.sectionSubtitle}>
            Tap on any disease below to learn about symptoms, causes, and prevention methods
          </Text>

          <View style={styles.diseaseGrid}>
            {cassavaDiseases.map((disease) => (
              <TouchableOpacity
                key={disease.id}
                style={[styles.diseaseCard, selectedDisease?.id === disease.id && styles.selectedDiseaseCard]}
                onPress={() => setSelectedDisease(disease)}
                activeOpacity={0.7}
              >
                <View style={styles.diseaseCardHeader}>
                  <View style={styles.diseaseIconContainer}>
                    <Ionicons name={disease.icon} size={24} color="#374151" />
                  </View>
                  <View style={[styles.severityBadge, { backgroundColor: getSeverityBgColor(disease.severity) }]}>
                    <Text style={[styles.severityText, { color: getSeverityColor(disease.severity) }]}>
                      {disease.severity}
                    </Text>
                  </View>
                </View>
                <Text style={styles.diseaseCardTitle}>{disease.name}</Text>
                <Text style={styles.diseaseCardPreview}>
                  {disease.symptoms[0]} and {disease.symptoms.length - 1} more symptoms
                </Text>
                <View style={styles.diseaseCardFooter}>
                  <Text style={styles.learnMoreText}>
                    {selectedDisease?.id === disease.id ? "Selected" : "Tap to learn more"}
                  </Text>
                  <Ionicons
                    name={selectedDisease?.id === disease.id ? "checkmark-circle" : "chevron-forward"}
                    size={16}
                    color={selectedDisease?.id === disease.id ? "#16a34a" : "#9ca3af"}
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Disease Details */}
        {selectedDisease && (
          <View style={styles.diseaseDetailsCard}>
            <View style={styles.diseaseDetailsHeader}>
              <View style={styles.diseaseDetailsTitle}>
                <Ionicons name={selectedDisease.icon} size={28} color="#374151" />
                <View style={styles.diseaseDetailsText}>
                  <Text style={styles.diseaseDetailsName}>{selectedDisease.name}</Text>
                  <View
                    style={[styles.severityBadge, { backgroundColor: getSeverityBgColor(selectedDisease.severity) }]}
                  >
                    <Text style={[styles.severityText, { color: getSeverityColor(selectedDisease.severity) }]}>
                      {selectedDisease.severity} Risk
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Symptoms */}
            <View style={styles.detailSection}>
              <View style={styles.detailSectionHeader}>
                <Ionicons name="eye" size={20} color="#dc2626" />
                <Text style={styles.detailSectionTitle}>Symptoms</Text>
              </View>
              <View style={styles.detailList}>
                {selectedDisease.symptoms.map((symptom, idx) => (
                  <View key={idx} style={styles.detailItem}>
                    <View style={styles.bulletPoint} />
                    <Text style={styles.detailText}>{symptom}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Causes */}
            <View style={styles.detailSection}>
              <View style={styles.detailSectionHeader}>
                <Ionicons name="search" size={20} color="#f59e0b" />
                <Text style={styles.detailSectionTitle}>Causes</Text>
              </View>
              <View style={styles.detailList}>
                {selectedDisease.causes.map((cause, idx) => (
                  <View key={idx} style={styles.detailItem}>
                    <View style={styles.bulletPoint} />
                    <Text style={styles.detailText}>{cause}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Prevention */}
            <View style={styles.detailSection}>
              <View style={styles.detailSectionHeader}>
                <Ionicons name="shield-checkmark" size={20} color="#16a34a" />
                <Text style={styles.detailSectionTitle}>Prevention & Treatment</Text>
              </View>
              <View style={styles.detailList}>
                {selectedDisease.prevention.map((prevention, idx) => (
                  <View key={idx} style={styles.detailItem}>
                    <View style={[styles.bulletPoint, { backgroundColor: "#16a34a" }]} />
                    <Text style={styles.detailText}>{prevention}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Notes */}
            <View style={styles.notesSection}>
              <View style={styles.notesHeader}>
                <Ionicons name="bulb" size={20} color="#8b5cf6" />
                <Text style={styles.notesSectionTitle}>Expert Notes</Text>
              </View>
              <Text style={styles.notesText}>{selectedDisease.notes}</Text>
            </View>
          </View>
        )}

        {/* Bottom Spacer */}
        <View style={styles.bottomSpacer} />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  headerImage: {
    height: 280,
    justifyContent: "flex-end",
  },
  gradient: {
    height: 140,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerContent: {
    alignItems: "flex-start",
  },
  cropBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 12,
  },
  cropBadgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#16a34a",
    marginLeft: 4,
    textTransform: "uppercase",
  },
  cropTitle: {
    fontSize: 36,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 4,
  },
  cropSubtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    fontStyle: "italic",
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  aboutCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#111827",
    marginLeft: 8,
  },
  aboutText: {
    fontSize: 16,
    color: "#4b5563",
    lineHeight: 24,
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#f3f4f6",
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statLabel: {
    fontSize: 12,
    color: "#6b7280",
    fontWeight: "500",
    marginTop: 4,
    textAlign: "center",
  },
  statValue: {
    fontSize: 14,
    color: "#111827",
    fontWeight: "600",
    marginTop: 2,
    textAlign: "center",
  },
  diseasesSection: {
    marginBottom: 24,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 20,
    lineHeight: 20,
  },
  diseaseGrid: {
    gap: 12,
  },
  diseaseCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedDiseaseCard: {
    borderColor: "#16a34a",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  diseaseCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  diseaseIconContainer: {
    width: 40,
    height: 40,
    backgroundColor: "#f3f4f6",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  severityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  severityText: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  diseaseCardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 6,
  },
  diseaseCardPreview: {
    fontSize: 14,
    color: "#6b7280",
    lineHeight: 20,
    marginBottom: 12,
  },
  diseaseCardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  learnMoreText: {
    fontSize: 12,
    color: "#9ca3af",
    fontWeight: "500",
  },
  diseaseDetailsCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  diseaseDetailsHeader: {
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  diseaseDetailsTitle: {
    flexDirection: "row",
    alignItems: "center",
  },
  diseaseDetailsText: {
    marginLeft: 12,
    flex: 1,
  },
  diseaseDetailsName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 6,
  },
  detailSection: {
    marginBottom: 24,
  },
  detailSectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  detailSectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
    marginLeft: 8,
  },
  detailList: {
    gap: 8,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingLeft: 8,
  },
  bulletPoint: {
    width: 6,
    height: 6,
    backgroundColor: "#6b7280",
    borderRadius: 3,
    marginTop: 8,
    marginRight: 12,
  },
  detailText: {
    fontSize: 15,
    color: "#4b5563",
    lineHeight: 22,
    flex: 1,
  },
  notesSection: {
    backgroundColor: "#faf5ff",
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#8b5cf6",
  },
  notesHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  notesSectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#7c3aed",
    marginLeft: 8,
  },
  notesText: {
    fontSize: 14,
    color: "#6b46c1",
    lineHeight: 20,
    fontStyle: "italic",
  },
  bottomSpacer: {
    height: 40,
  },
})
