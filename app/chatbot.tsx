import { useState, useRef, useEffect } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Dimensions,
  Keyboard,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import { GROQ_API_KEY } from "@env"

const { width } = Dimensions.get("window")

const ChatbotScreen = () => {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello! I'm PlantBot, your AI plant care assistant. 🌱\n\nI can help you with:\n• Plant disease identification\n• Care instructions\n• Watering schedules\n• Fertilizer recommendations\n• Pest control solutions\n\nWhat plant question can I help you with today?",
      timestamp: new Date(),
    },
  ])
  const [loading, setLoading] = useState(false)
  const scrollViewRef = useRef(null)

  const callGroqAPI = async (userMessage) => {
    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama3-8b-8192",
          messages: [
            {
              role: "system",
              content: `You are PlantBot, a friendly and expert assistant that helps users with plant care, gardening, and plant disease identification specifically for crops grown in Ghana and West Africa. 
              
              You should focus on:
              - Plant diseases common in Ghana (cassava, tomato, pepper, potato, maize)
              - Local growing conditions and climate considerations
              - Practical solutions using locally available materials
              - Seasonal planting advice for Ghana's climate zones
              
              Keep responses helpful, concise, and practical. If users ask non-plant questions, politely redirect them to plant care topics.
              
              Use emojis occasionally to make responses friendly and engaging.`,
            },
            { role: "user", content: userMessage },
          ],
        }),
      })
      const data = await response.json()
      return data.choices[0].message.content
    } catch (error) {
      console.error("Groq API Error:", error)
      return "Sorry, I'm having trouble connecting right now. Please try again in a moment. 🌱"
    }
  }

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMsg = { role: "user", content: input, timestamp: new Date() }
    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setLoading(true)

    const reply = await callGroqAPI(input)
    const botMsg = { role: "assistant", content: reply, timestamp: new Date() }
    setMessages((prev) => [...prev, botMsg])
    setLoading(false)
  }

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const getQuickReplies = () => [
    { text: "Plant diseases", icon: "medical" },
    { text: "Watering tips", icon: "water" },
    { text: "Fertilizer advice", icon: "nutrition" },
    { text: "Pest control", icon: "bug" },
  ]

  const handleQuickReply = (text) => {
    setInput(text)
  }

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true })
  }, [messages, loading])

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        scrollViewRef.current?.scrollToEnd({ animated: true })
      }
    )

    return () => {
      keyboardDidShowListener.remove()
    }
  }, [])

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient colors={["#f0fdf4", "#ffffff"]} style={styles.headerGradient}>
        <View style={styles.header}>
          <View style={styles.botAvatarContainer}>
            <LinearGradient colors={["#16a34a", "#15803d"]} style={styles.botAvatar}>
              <Ionicons name="chatbubble-ellipses" size={24} color="white" />
            </LinearGradient>
            <View style={styles.onlineIndicator} />
          </View>
          <View style={styles.headerInfo}>
            <Text style={styles.botName}>PlantBot</Text>
            <Text style={styles.botStatus}>🟢 Online • AI Plant Expert</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Messages */}
      <KeyboardAvoidingView
        style={styles.chatContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((msg, index) => (
            <View key={index} style={styles.messageWrapper}>
              <View style={[styles.messageContainer, msg.role === "user" ? styles.userMessage : styles.botMessage]}>
                {msg.role === "assistant" && (
                  <View style={styles.botMessageHeader}>
                    <View style={styles.smallBotAvatar}>
                      <Ionicons name="leaf" size={12} color="#16a34a" />
                    </View>
                    <Text style={styles.botLabel}>PlantBot</Text>
                  </View>
                )}

                <Text style={[styles.messageText, msg.role === "user" ? styles.userText : styles.botText]}>
                  {msg.content}
                </Text>

                <Text style={styles.timestamp}>{formatTime(msg.timestamp)}</Text>
              </View>
            </View>
          ))}

          {loading && (
            <View style={styles.messageWrapper}>
              <View style={[styles.messageContainer, styles.botMessage, styles.loadingMessage]}>
                <View style={styles.botMessageHeader}>
                  <View style={styles.smallBotAvatar}>
                    <Ionicons name="leaf" size={12} color="#16a34a" />
                  </View>
                  <Text style={styles.botLabel}>PlantBot</Text>
                </View>
                <View style={styles.typingContainer}>
                  <ActivityIndicator size="small" color="#16a34a" />
                  <Text style={styles.typingText}>Thinking...</Text>
                </View>
              </View>
            </View>
          )}
        </ScrollView>

        {/* Quick Replies */}
        {messages.length <= 1 && (
          <View style={styles.quickRepliesContainer}>
            <Text style={styles.quickRepliesTitle}>Quick questions:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.quickRepliesScroll}>
              {getQuickReplies().map((reply, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.quickReplyButton}
                  onPress={() => handleQuickReply(reply.text)}
                >
                  <Ionicons name={reply.icon} size={16} color="#16a34a" />
                  <Text style={styles.quickReplyText}>{reply.text}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Input Container */}
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              value={input}
              onChangeText={setInput}
              placeholder="Ask about plant care, diseases, or growing tips..."
              style={styles.input}
              multiline
              maxLength={500}
              placeholderTextColor="#9ca3af"
            />
            <TouchableOpacity
              style={[styles.sendButton, input.trim() ? styles.sendButtonActive : styles.sendButtonInactive]}
              onPress={sendMessage}
              disabled={!input.trim() || loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Ionicons name="send" size={20} color="white" />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  )
}

export default ChatbotScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  headerGradient: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  botAvatarContainer: {
    position: "relative",
    marginRight: 16,
  },
  botAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  onlineIndicator: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    backgroundColor: "#10b981",
    borderRadius: 7,
    borderWidth: 2,
    borderColor: "white",
  },
  headerInfo: {
    flex: 1,
  },
  botName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 2,
  },
  botStatus: {
    fontSize: 14,
    color: "#6b7280",
  },
  chatContainer: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  messageWrapper: {
    marginBottom: 16,
  },
  messageContainer: {
    maxWidth: "85%",
    borderRadius: 20,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#16a34a",
    borderBottomRightRadius: 8,
  },
  botMessage: {
    alignSelf: "flex-start",
    backgroundColor: "white",
    borderBottomLeftRadius: 8,
    borderWidth: 1,
    borderColor: "#f3f4f6",
  },
  loadingMessage: {
    backgroundColor: "#f9fafb",
  },
  botMessageHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  smallBotAvatar: {
    width: 20,
    height: 20,
    backgroundColor: "#dcfce7",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 6,
  },
  botLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#16a34a",
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  userText: {
    color: "white",
  },
  botText: {
    color: "#374151",
  },
  timestamp: {
    fontSize: 11,
    color: "#9ca3af",
    marginTop: 8,
    alignSelf: "flex-end",
  },
  typingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  typingText: {
    fontSize: 14,
    color: "#6b7280",
    fontStyle: "italic",
  },
  quickRepliesContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "#f3f4f6",
    backgroundColor: "white",
  },
  quickRepliesTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6b7280",
    marginBottom: 12,
  },
  quickRepliesScroll: {
    flexDirection: "row",
  },
  quickReplyButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0fdf4",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
    borderColor: "#dcfce7",
    gap: 6,
  },
  quickReplyText: {
    fontSize: 14,
    color: "#16a34a",
    fontWeight: "500",
  },
  inputContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#f3f4f6",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "flex-end",
    backgroundColor: "#f9fafb",
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    gap: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#111827",
    maxHeight: 100,
    paddingVertical: 8,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonActive: {
    backgroundColor: "#16a34a",
  },
  sendButtonInactive: {
    backgroundColor: "#d1d5db",
  },
})
