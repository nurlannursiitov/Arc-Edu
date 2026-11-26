import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert,
} from "react-native";

interface ChangePasswordScreenProps {
  onBack: () => void;
}

export const ChangePasswordScreen: React.FC<ChangePasswordScreenProps> = ({ onBack }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSave = () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      Alert.alert("Ошибка", "Заполните все поля");
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert("Ошибка", "Новые пароли не совпадают");
      return;
    }
    if (newPassword.length < 6) {
      Alert.alert("Ошибка", "Пароль должен содержать не менее 6 символов");
      return;
    }

    Alert.alert(
      "Успешно!",
      "Пароль от Platonus / Arc Edu успешно обновлен. Используйте новый пароль при следующем входе."
    );
    onBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>← Назад</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Смена пароля</Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.content}>
        <Text style={styles.subtitle}>
          Новый пароль будет синхронизирован с вашей единой учетной записью AITU ID
        </Text>

        <View style={styles.form}>
          <Text style={styles.label}>Текущий пароль</Text>
          <TextInput
            style={styles.input}
            placeholder="Введите текущий пароль"
            placeholderTextColor="#64748B"
            secureTextEntry
            value={oldPassword}
            onChangeText={setOldPassword}
          />

          <Text style={styles.label}>Новый пароль</Text>
          <TextInput
            style={styles.input}
            placeholder="Не менее 6 символов"
            placeholderTextColor="#64748B"
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
          />

          <Text style={styles.label}>Подтвердите новый пароль</Text>
          <TextInput
            style={styles.input}
            placeholder="Повторите новый пароль"
            placeholderTextColor="#64748B"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
            <Text style={styles.saveBtnText}>Сохранить новый пароль</Text>
          </TouchableOpacity>
        </View>
      </View>
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
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  headerSpacer: {
    width: 50,
  },
  content: {
    padding: 20,
  },
  subtitle: {
    color: "#94A3B8",
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 20,
  },
  form: {
    gap: 12,
  },
  label: {
    color: "#CBD5E1",
    fontSize: 13,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "#111827",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    borderRadius: 14,
    padding: 14,
    color: "#FFFFFF",
    fontSize: 14,
  },
  saveBtn: {
    backgroundColor: "#00E5FF",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 14,
  },
  saveBtnText: {
    color: "#050B14",
    fontSize: 14,
    fontWeight: "700",
  },
});
