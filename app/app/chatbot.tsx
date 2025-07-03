import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

export default function ChatbotScreen() {
  const [messages, setMessages] = useState([
    {
      id: "1",
      text: "Hi! How can I help you with your plants today?",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    // --- Replace this with your AI API call ---
    // Example: Call OpenAI API or use a placeholder
    let botReply = "Sorry, I am just a demo bot!";
    // Uncomment and implement your API call here
    botReply = await fetchBotReply(input);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), text: botReply, sender: "bot" },
      ]);
      setLoading(false);
    }, 1000);
  };

  // Example function for OpenAI API (requires your API key)
  async function fetchBotReply(userInput: string) {
     const response = await fetch("https://api.openai.com/v1/chat/completions", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
         Authorization: "Bearer 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",
       },
       body: JSON.stringify({
       model: "gpt-3.5-turbo",
         messages: [{ role: "user", content: userInput }],
       }),
     });
     const data = await response.json();
     return data.choices[0].message.content.trim();
   }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#fff" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={80}
    >
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.message,
              item.sender === "user" ? styles.userMessage : styles.botMessage,
            ]}
          >
            <Text style={{ color: "#222" }}>{item.text}</Text>
          </View>
        )}
        contentContainerStyle={{ padding: 16, paddingBottom: 80 }}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={input}
          onChangeText={setInput}
          editable={!loading}
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={sendMessage}
          disabled={loading}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>
            {loading ? "..." : "Send"}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  message: {
    marginVertical: 4,
    padding: 12,
    borderRadius: 12,
    maxWidth: "80%",
  },
  userMessage: {
    backgroundColor: "#DCF8C6",
    alignSelf: "flex-end",
  },
  botMessage: {
    backgroundColor: "#F1F0F0",
    alignSelf: "flex-start",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 8,
    borderTopWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  input: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 8,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 20,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
