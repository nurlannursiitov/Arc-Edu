import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";
import { PartnerPerk } from "../types";

interface FreedomPerksScreenProps {
  perks: PartnerPerk[];
  onBack: () => void;
}

export const FreedomPerksScreen: React.FC<FreedomPerksScreenProps> = ({ perks, onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { key: "all", label: "Все скидки" },
    { key: "food", label: "Еда & Кофе" },
    { key: "lifestyle", label: "Спорт & Одежда" },
    { key: "edtech", label: "IT Курсы" },
    { key: "travel", label: "Поездки" },
  ];

  const filtered =
    selectedCategory === "all"
      ? perks
      : perks.filter((p) => p.category === selectedCategory);

  const copyCode = (code?: string) => {
    Alert.alert(
      "Промокод скопирован! 📋",
      `Код "${code}" применен к вашей студенческой карте Freedom VIP. Покажите его на кассе или введите в приложении партнера.`
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>← Назад</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Freedom Student Perks</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.heroBanner}>
          <Text style={styles.heroBrand}>FREEDOM HOLDING CORP. × AITU</Text>
          <Text style={styles.heroTitle}>Привилегии студенческой карты</Text>
          <Text style={styles.heroDesc}>
            Эксклюзивный кешбэк до 20% и партнерские скидки по всему Казахстану при оплате картой Arc Edu Black VIP.
          </Text>
        </View>

        {/* Categories row */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.catScroll}
        >
          {categories.map((c) => (
            <TouchableOpacity
              key={c.key}
              style={[
                styles.catPill,
                selectedCategory === c.key && styles.catPillActive,
              ]}
              onPress={() => setSelectedCategory(c.key)}
            >
              <Text
                style={[
                  styles.catPillText,
                  selectedCategory === c.key && styles.catPillTextActive,
                ]}
              >
                {c.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Perks list */}
        {filtered.map((perk) => (
          <View key={perk.id} style={styles.perkCard}>
            <View style={styles.perkTopRow}>
              <View style={styles.brandInfo}>
                <Text style={styles.brandName}>{perk.partnerName}</Text>
                <Text style={styles.perkTitle}>{perk.title}</Text>
              </View>
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>{perk.discount}</Text>
              </View>
            </View>

            <Text style={styles.perkDesc}>{perk.description}</Text>

            <View style={styles.perkFooter}>
              <Text style={styles.expiryText}>Действует до {perk.expiresAt}</Text>
              {perk.promoCode && (
                <TouchableOpacity
                  style={styles.codeBtn}
                  onPress={() => copyCode(perk.promoCode)}
                >
                  <Text style={styles.codeBtnText}>Код: {perk.promoCode} ❐</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}
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
  heroBanner: {
    backgroundColor: "#111827",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(14, 165, 233, 0.4)",
    marginBottom: 20,
  },
  heroBrand: {
    color: "#0EA5E9",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1,
    marginBottom: 4,
  },
  heroTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 6,
  },
  heroDesc: {
    color: "#94A3B8",
    fontSize: 13,
    lineHeight: 18,
  },
  catScroll: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 20,
  },
  catPill: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: "#111827",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },
  catPillActive: {
    backgroundColor: "rgba(14, 165, 233, 0.2)",
    borderColor: "#0EA5E9",
  },
  catPillText: {
    fontSize: 12,
    color: "#94A3B8",
    fontWeight: "600",
  },
  catPillTextActive: {
    color: "#0EA5E9",
    fontWeight: "700",
  },
  perkCard: {
    backgroundColor: "#111827",
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    marginBottom: 14,
  },
  perkTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  brandInfo: {
    flex: 1,
  },
  brandName: {
    color: "#0EA5E9",
    fontSize: 11,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  perkTitle: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
    marginTop: 2,
  },
  discountBadge: {
    backgroundColor: "rgba(16, 185, 129, 0.15)",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  discountText: {
    color: "#10B981",
    fontSize: 13,
    fontWeight: "800",
  },
  perkDesc: {
    color: "#CBD5E1",
    fontSize: 12,
    lineHeight: 17,
    marginBottom: 12,
  },
  perkFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.04)",
    paddingTop: 10,
  },
  expiryText: {
    color: "#64748B",
    fontSize: 11,
  },
  codeBtn: {
    backgroundColor: "rgba(255,255,255,0.06)",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  codeBtnText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
  },
});
