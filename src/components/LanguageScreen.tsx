import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

interface LanguageScreenProps {
  onBack: () => void;
}

const LANGUAGES = [
  { code: "ru", name: "Русский", flag: "🇷🇺", native: "Русский язык" },
  { code: "kz", name: "Қазақша", flag: "🇰🇿", native: "Қазақ тілі" },
  { code: "en", name: "English", flag: "🇬🇧", native: "English (US)" },
];

export const LanguageScreen: React.FC<LanguageScreenProps> = ({ onBack }) => {
  const [selected, setSelected] = useState("ru");

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>← Назад</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Язык интерфейса</Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.content}>
        <Text style={styles.subtitle}>
          Выберите язык для отображения дисциплин, расписания и сервисов кампуса
        </Text>

        <View style={styles.list}>
          {LANGUAGES.map((lang) => {
            const isSelected = selected === lang.code;
            return (
              <TouchableOpacity
                key={lang.code}
                style={[styles.langItem, isSelected && styles.langItemActive]}
                onPress={() => setSelected(lang.code)}
              >
                <View style={styles.langLeft}>
                  <Text style={styles.flag}>{lang.flag}</Text>
                  <View>
                    <Text style={styles.langName}>{lang.name}</Text>
                    <Text style={styles.langNative}>{lang.native}</Text>
                  </View>
                </View>
                {isSelected && <Text style={styles.checkIcon}>✓</Text>}
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity style={styles.applyBtn} onPress={onBack}>
          <Text style={styles.applyBtnText}>Применить</Text>
        </TouchableOpacity>
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
    marginBottom: 20,
  },
  list: {
    gap: 12,
    marginBottom: 24,
  },
  langItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#111827",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },
  langItemActive: {
    borderColor: "#00E5FF",
    backgroundColor: "rgba(0,229,255,0.08)",
  },
  langLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  flag: {
    fontSize: 26,
  },
  langName: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
  langNative: {
    color: "#64748B",
    fontSize: 12,
  },
  checkIcon: {
    color: "#00E5FF",
    fontSize: 18,
    fontWeight: "900",
  },
  applyBtn: {
    backgroundColor: "#00E5FF",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
  },
  applyBtnText: {
    color: "#050B14",
    fontSize: 14,
    fontWeight: "700",
  },
});
