import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Switch,
  Alert,
} from "react-native";
import { StudentProfile } from "../types";

interface SettingScreenProps {
  student: StudentProfile;
  onBack: () => void;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export const SettingScreen: React.FC<SettingScreenProps> = ({
  student,
  onBack,
  onNavigate,
  onLogout,
}) => {
  const [biometricsEnabled, setBiometricsEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [autoRadarEnabled, setAutoRadarEnabled] = useState(true);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>← Назад</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Настройки</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {student.fullName
                .split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("")}
            </Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{student.fullName}</Text>
            <Text style={styles.profileEmail}>{student.email}</Text>
            <Text style={styles.profileBadge}>ID: {student.studentId} • {student.group}</Text>
          </View>
        </View>

        {/* Security & Access */}
        <Text style={styles.sectionHeader}>Безопасность и Доступ</Text>
        <View style={styles.sectionCard}>
          <View style={styles.row}>
            <View>
              <Text style={styles.rowTitle}>Face ID / Отпечаток пальца</Text>
              <Text style={styles.rowSub}>Биометрический вход в Arc Edu</Text>
            </View>
            <Switch
              value={biometricsEnabled}
              onValueChange={setBiometricsEnabled}
              trackColor={{ false: "#334155", true: "#00E5FF" }}
            />
          </View>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.clickableRow}
            onPress={() => onNavigate("change-password")}
          >
            <View>
              <Text style={styles.rowTitle}>Сменить пароль</Text>
              <Text style={styles.rowSub}>Пароль от Platonus / AITU ID</Text>
            </View>
            <Text style={styles.chevron}>→</Text>
          </TouchableOpacity>
        </View>

        {/* Preferences */}
        <Text style={styles.sectionHeader}>Уведомления и Геолокация</Text>
        <View style={styles.sectionCard}>
          <View style={styles.row}>
            <View>
              <Text style={styles.rowTitle}>Push-уведомления о парах</Text>
              <Text style={styles.rowSub}>Напоминание за 10 мин до начала</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: "#334155", true: "#00E5FF" }}
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <View>
              <Text style={styles.rowTitle}>Фоновый BLE Радар</Text>
              <Text style={styles.rowSub}>Автоматический поиск аудитории</Text>
            </View>
            <Switch
              value={autoRadarEnabled}
              onValueChange={setAutoRadarEnabled}
              trackColor={{ false: "#334155", true: "#00E5FF" }}
            />
          </View>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.clickableRow}
            onPress={() => onNavigate("language")}
          >
            <View>
              <Text style={styles.rowTitle}>Язык приложения</Text>
              <Text style={styles.rowSub}>Русский (Қазақша / English)</Text>
            </View>
            <Text style={styles.chevron}>→</Text>
          </TouchableOpacity>
        </View>

        {/* About & Support */}
        <Text style={styles.sectionHeader}>О системе</Text>
        <View style={styles.sectionCard}>
          <TouchableOpacity
            style={styles.clickableRow}
            onPress={() => onNavigate("app-info")}
          >
            <View>
              <Text style={styles.rowTitle}>О приложении Arc Edu</Text>
              <Text style={styles.rowSub}>Версия 2.4.0 • AITU & Freedom Bank</Text>
            </View>
            <Text style={styles.chevron}>→</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
          <Text style={styles.logoutText}>Выйти из профиля</Text>
        </TouchableOpacity>
      </ScrollView>
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
    paddingBottom: 40,
  },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#111827",
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    marginBottom: 24,
    gap: 14,
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "rgba(0,229,255,0.15)",
    borderWidth: 2,
    borderColor: "#00E5FF",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "#00E5FF",
    fontSize: 18,
    fontWeight: "800",
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  profileEmail: {
    color: "#94A3B8",
    fontSize: 12,
    marginTop: 2,
  },
  profileBadge: {
    color: "#00E5FF",
    fontSize: 11,
    fontWeight: "600",
    marginTop: 4,
  },
  sectionHeader: {
    color: "#64748B",
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 8,
    marginLeft: 4,
  },
  sectionCard: {
    backgroundColor: "#111827",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 4,
  },
  clickableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 6,
  },
  rowTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  rowSub: {
    color: "#64748B",
    fontSize: 12,
    marginTop: 2,
  },
  chevron: {
    color: "#64748B",
    fontSize: 18,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.06)",
    marginVertical: 12,
  },
  logoutButton: {
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(239, 68, 68, 0.3)",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 10,
  },
  logoutText: {
    color: "#EF4444",
    fontSize: 14,
    fontWeight: "700",
  },
});
