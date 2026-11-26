import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";

interface AppInfoScreenProps {
  onBack: () => void;
}

export const AppInfoScreen: React.FC<AppInfoScreenProps> = ({ onBack }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>← Назад</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>О приложении</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.logoSection}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoIcon}>⚡</Text>
          </View>
          <Text style={styles.appName}>Arc Edu</Text>
          <Text style={styles.appSub}>Platonus 2.0 • Next-Gen University Portal</Text>
          <Text style={styles.appVersion}>Версия 2.4.0 (Build 2026.11-TS)</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Команда разработчиков</Text>
          <Text style={styles.teamSub}>Astana IT University • Software Engineering</Text>

          <View style={styles.memberRow}>
            <Text style={styles.memberName}>Нурсиитов Нурлан</Text>
            <Text style={styles.memberRole}>Team Lead & Architecture</Text>
          </View>
          <View style={styles.memberRow}>
            <Text style={styles.memberName}>Жұмабек Қуаныш</Text>
            <Text style={styles.memberRole}>Mobile Frontend & UX (Expo)</Text>
          </View>
          <View style={styles.memberRow}>
            <Text style={styles.memberName}>Асқар Заңғар</Text>
            <Text style={styles.memberRole}>Data Models, Integrations & QA</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Технологический стек</Text>
          <Text style={styles.stackItem}>• 100% TypeScript (React Native & Expo SDK 58)</Text>
          <Text style={styles.stackItem}>• BLE Radar & Geofence (60m Verification)</Text>
          <Text style={styles.stackItem}>• Freedom Bank VIP Student FinTech Pass</Text>
          <Text style={styles.stackItem}>• Live Wikipedia API Knowledge Crawler</Text>
          <Text style={styles.stackItem}>• eGov.kz & Digital ID Integration</Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerCopy}>© 2026 Astana IT University & Freedom Finance</Text>
        </View>
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
  logoSection: {
    alignItems: "center",
    marginVertical: 20,
  },
  logoCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "rgba(0,229,255,0.15)",
    borderWidth: 2,
    borderColor: "#00E5FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  logoIcon: {
    fontSize: 34,
  },
  appName: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "900",
    letterSpacing: 1,
  },
  appSub: {
    color: "#00E5FF",
    fontSize: 13,
    fontWeight: "600",
    marginTop: 4,
  },
  appVersion: {
    color: "#64748B",
    fontSize: 12,
    marginTop: 4,
  },
  card: {
    backgroundColor: "#111827",
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    marginBottom: 16,
  },
  cardTitle: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 4,
  },
  teamSub: {
    color: "#64748B",
    fontSize: 11,
    marginBottom: 12,
  },
  memberRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.04)",
  },
  memberName: {
    color: "#CBD5E1",
    fontSize: 13,
    fontWeight: "600",
  },
  memberRole: {
    color: "#00E5FF",
    fontSize: 12,
  },
  stackItem: {
    color: "#94A3B8",
    fontSize: 13,
    lineHeight: 22,
  },
  footer: {
    alignItems: "center",
    marginTop: 10,
  },
  footerCopy: {
    color: "#475569",
    fontSize: 11,
  },
});
