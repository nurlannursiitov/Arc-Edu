import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { ChatMessage } from "../types";

interface ChatScreenProps {
  initialMessages: ChatMessage[];
  onBack: () => void;
}

export const ChatScreen: React.FC<ChatScreenProps> = ({ initialMessages, onBack }) => {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [inputText, setInputText] = useState("");

  const handleSend = () => {
    if (!inputText.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: "user",
      text: inputText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");

    // Advisor automated response
    setTimeout(() => {
      const botMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: "advisor",
        text: "Принято в обработку. Я проверю ваш индивидуальный учебный план (ИУП) и свяжусь с деканатом. Ответ поступит в этот чат.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>← Назад</Text>
        </TouchableOpacity>
        <View style={styles.advisorInfo}>
          <Text style={styles.advisorName}>Академический Эдвайзер</Text>
          <Text style={styles.advisorStatus}>🟢 Онлайн • Деканат IT</Text>
        </View>
        <View style={styles.headerSpacer} />
      </View>

      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((m) => {
            const isUser = m.sender === "user";
            return (
              <View
                key={m.id}
                style={[
                  styles.messageBubble,
                  isUser ? styles.userBubble : styles.advisorBubble,
                ]}
              >
                <Text style={styles.messageText}>{m.text}</Text>
                <Text style={styles.messageTime}>{m.timestamp}</Text>
              </View>
            );
          })}
        </ScrollView>

        {/* Input Bar */}
        <View style={styles.inputArea}>
          <TextInput
            style={styles.input}
            placeholder="Напишите обращение эдвайзеру..."
            placeholderTextColor="#64748B"
            value={inputText}
            onChangeText={setInputText}
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Text style={styles.sendButtonText}>➔</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#070A11",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.06)",
  },
  backButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 8,
  },
  backButtonText: {
    color: "#94A3B8",
    fontSize: 14,
    fontWeight: "600",
  },
  advisorInfo: {
    alignItems: "center",
  },
  advisorName: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
  advisorStatus: {
    color: "#10B981",
    fontSize: 11,
    marginTop: 2,
  },
  headerSpacer: {
    width: 50,
  },
  container: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
    gap: 12,
  },
  messageBubble: {
    maxWidth: "80%",
    padding: 14,
    borderRadius: 16,
  },
  userBubble: {
    alignSelf: "flex-end",
    backgroundColor: "#00E5FF",
    borderBottomRightRadius: 4,
  },
  advisorBubble: {
    alignSelf: "flex-start",
    backgroundColor: "#1E293B",
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
    color: "#0F172A",
  },
  messageTime: {
    fontSize: 10,
    marginTop: 4,
    alignSelf: "flex-end",
    color: "rgba(15, 23, 42, 0.6)",
  },
  inputArea: {
    flexDirection: "row",
    padding: 14,
    backgroundColor: "#0F172A",
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.06)",
    gap: 10,
  },
  input: {
    flex: 1,
    backgroundColor: "#1E293B",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: "#FFFFFF",
    fontSize: 14,
  },
  sendButton: {
    backgroundColor: "#00E5FF",
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonText: {
    color: "#050B14",
    fontSize: 18,
    fontWeight: "800",
  },
});
