import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";

interface ForgotPasswordProps {
  onBack: () => void;
  onCodeSent?: (email: string) => void;
}

export const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onBack, onCodeSent }) => {
  const [email, setEmail] = useState("");
  const [isSent, setIsSent] = useState(false);

  const handleReset = () => {
    if (!email.trim()) {
      Alert.alert("Ошибка", "Введите студенческий email или Barcode ID");
      return;
    }
    setIsSent(true);
    if (onCodeSent) onCodeSent(email);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.card}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>← Назад</Text>
        </TouchableOpacity>

        <Text style={styles.badge}>Служба поддержки AITU ID</Text>
        <Text style={styles.title}>Восстановление доступа</Text>
        <Text style={styles.subtitle}>
          Введите корпоративную почту (@astanait.edu.kz) или 8-значный Barcode ID для сброса пароля Platonus / Arc Edu
        </Text>

        {!isSent ? (
          <View style={styles.form}>
            <Text style={styles.label}>Корпоративный Email / ID</Text>
            <TextInput
              style={styles.input}
              placeholder="230103055@astanait.edu.kz"
              placeholderTextColor="#64748B"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <TouchableOpacity style={styles.primaryButton} onPress={handleReset}>
              <Text style={styles.primaryButtonText}>Отправить код подтверждения</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.successBox}>
            <Text style={styles.successTitle}>✓ Код выслан на почту</Text>
            <Text style={styles.successText}>
              Проверьте входящие сообщения для <Text style={styles.highlight}>{email}</Text>. Введите полученный 6-значный OTP для сброса пароля.
            </Text>
            <TouchableOpacity style={styles.primaryButton} onPress={onBack}>
              <Text style={styles.primaryButtonText}>Вернуться к авторизации</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.footerNote}>
          <Text style={styles.footerText}>
            Проблемы с корпоративной почтой? Обратитесь в HelpDesk (Каб. 214, IT-Support)
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B0F19",
    justifyContent: "center",
    padding: 24,
  },
  card: {
    backgroundColor: "#111827",
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  backButton: {
    alignSelf: "flex-start",
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 12,
    marginBottom: 20,
  },
  backButtonText: {
    color: "#94A3B8",
    fontSize: 14,
    fontWeight: "600",
  },
  badge: {
    color: "#00E5FF",
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#94A3B8",
    lineHeight: 20,
    marginBottom: 24,
  },
  form: {
    gap: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#CBD5E1",
    marginBottom: -8,
  },
  input: {
    backgroundColor: "rgba(15, 23, 42, 0.8)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    borderRadius: 14,
    padding: 16,
    color: "#FFFFFF",
    fontSize: 15,
  },
  primaryButton: {
    backgroundColor: "#00E5FF",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 8,
  },
  primaryButtonText: {
    color: "#050B14",
    fontSize: 15,
    fontWeight: "700",
  },
  successBox: {
    backgroundColor: "rgba(16, 185, 129, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(16, 185, 129, 0.3)",
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
  },
  successTitle: {
    color: "#10B981",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 8,
  },
  successText: {
    color: "#94A3B8",
    fontSize: 13,
    lineHeight: 18,
    textAlign: "center",
    marginBottom: 16,
  },
  highlight: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  footerNote: {
    marginTop: 24,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.06)",
    paddingTop: 16,
  },
  footerText: {
    color: "#64748B",
    fontSize: 12,
    textAlign: "center",
    lineHeight: 16,
  },
});
